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
import {onDocumentCreated} from "firebase-functions/v2/firestore";

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
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const contactsSnapshot = await db.collection("contacts").get();
    const contacts = contactsSnapshot.docs.map((doc) => doc.data());

    const csvStringifier = csvWriter.createObjectCsvStringifier({
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "subject", title: "Subject" },
        { id: "message", title: "Message" },
        { id: "timestamp", title: "Submitted At" },
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
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const subscriptionsSnapshot = await db.collection("subscriptions").get();
      const subscriptions = subscriptionsSnapshot.docs.map((doc) => doc.data());

      const csvStringifier = csvWriter.createObjectCsvStringifier({
        header: [
          { id: "email", title: "Email" },
          { id: "subscribedAt", title: "Subscribed At" },
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

// Send email notification when new contact is created
export const sendContactNotification = onDocumentCreated(
  "contacts/{contactId}",
  async (event) => {
    const contactData = event.data?.data();

    if (!contactData) {
      console.error("No contact data found");
      return;
    }

    const {name, email, subject, message, timestamp} = contactData;

    // Email configuration
    const emailContent = {
      to: "info@impalaresearch.com",
      from: name,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> 
              <a href="mailto:${email}" style="color: #007bff;">${email}</a>
            </p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> 
              ${new Date(timestamp).toLocaleString()}
            </p>
          </div>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This is an automated message from the Impala Healthtech Research contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
    };

    // Log the email (for now)
    // TODO: Integrate with SendGrid, Mailgun, or Resend to actually send emails
    console.log("Contact form submission received:");
    console.log("Email that would be sent:", emailContent);
    console.log("To implement email sending:");
    console.log("1. Install email service: npm install @sendgrid/mail");
    console.log("2. Add SendGrid API key to Firebase config");
    console.log("3. Use SendGrid to send the email");

    // Example SendGrid implementation (commented out):
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(functions.config().sendgrid.key);
    // await sgMail.send(emailContent);

    return null;
  }
);
