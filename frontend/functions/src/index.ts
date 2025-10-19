/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import * as functions from "firebase-functions";
import {Firestore, getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import * as csvWriter from "csv-writer";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Initialize Firebase Admin
initializeApp();
const db: Firestore = getFirestore();

// Generate CSV of contacts
export const generateContactsCSV = functions.https.onRequest(async (req, res) => {
  try {
    const contactsSnapshot = await db.collection("contacts").get();
    const contacts = contactsSnapshot.docs.map((doc) => doc.data());

    const csvStringifier = csvWriter.createObjectCsvStringifier({
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "subject", title: "Subject" },
        { id: "message", title: "Message" },
        { id: "created_at", title: "Submitted At" },
      ],
    });

    const csvData = csvStringifier.stringifyRecords(contacts);
    const csvString = csvStringifier.getHeaderString() + csvData;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="contacts.csv"');
    res.status(200).send(csvString);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).send("Error generating CSV");
  }
});

// Generate CSV of subscriptions
export const generateSubscriptionsCSV = functions.https.onRequest(
  async (req, res) => {
    try {
      const subscriptionsSnapshot = await db.collection("subscriptions").get();
      const subscriptions = subscriptionsSnapshot.docs.map((doc) => doc.data());

      const csvStringifier = csvWriter.createObjectCsvStringifier({
        header: [
          { id: "email", title: "Email" },
          { id: "subscribed_at", title: "Subscribed At" },
        ],
      });

      const csvData = csvStringifier.stringifyRecords(subscriptions);
      const csvString = csvStringifier.getHeaderString() + csvData;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="subscriptions.csv"'
      );
      res.status(200).send(csvString);
    } catch (error) {
      console.error("Error generating CSV:", error);
      res.status(500).send("Error generating CSV");
    }
  }
);

// Send notification when new contact is created
export const sendContactNotification = functions.firestore
  .document("contacts/{contactId}")
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot) => {
    const data = snap.data();
    console.log("New contact submission:", data);
    // Implement email notification logic here (e.g., using SendGrid)
    // Example: Send email to operations@impalaresearch.com with contact details
  });
