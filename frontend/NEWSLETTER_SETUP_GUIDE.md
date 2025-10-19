# Newsletter & Contact Management System - Setup Guide

## 🎉 What's Included

Your website now has a complete newsletter subscription and contact management system:

### Features Implemented:

1. **Newsletter Subscription Form**
   - Available at: `/newsletter` page
   - Also integrated into the footer of every page
   - Saves subscribers to Firestore `subscriptions` collection

2. **Contact Form**
   - Available at: `/contact` page
   - Saves submissions to Firestore `contacts` collection

3. **Admin Dashboard**
   - Available at: `/admin` (requires login)
   - Download contacts as CSV
   - Download newsletter subscribers as CSV
   - Manage articles

4. **Firebase Cloud Functions**
   - `generateContactsCSV` - Exports all contact submissions
   - `generateSubscriptionsCSV` - Exports all newsletter subscribers
   - `sendContactNotification` - Triggers when new contact is submitted

---

## 📋 Setup Instructions

### Step 1: Configure Firebase Environment Variables

Create or update your `.env` file in the frontend root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 2: Set Up Firestore Database

1. Go to Firebase Console → Firestore Database
2. Create these collections (they'll be created automatically when first used):
   - `contacts`
   - `subscriptions`
   - `articles`

### Step 3: Configure Firestore Security Rules

Update your `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to contacts and subscriptions
    match /contacts/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow write: if true; // Anyone can submit contact form
    }
    
    match /subscriptions/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow write: if true; // Anyone can subscribe
    }
    
    // Articles - authenticated users only
    match /articles/{document=**} {
      allow read: if true; // Anyone can read articles
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

### Step 4: Deploy Cloud Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

This will deploy:
- `generateContactsCSV`
- `generateSubscriptionsCSV`
- `sendContactNotification`

### Step 5: Update Function Region (if needed)

If your functions are deployed to a different region than `us-central1`, update the region in `AdminDashboard.tsx`:

```typescript
const region = "us-central1"; // Change to your region (e.g., "europe-west1")
```

---

## 🚀 How to Use

### For Website Visitors:

1. **Subscribe to Newsletter**
   - Fill out the form in the footer on any page
   - Or visit `/newsletter` for a dedicated subscription page
   - Email is stored in Firestore

2. **Contact Form**
   - Visit `/contact` page
   - Fill out name, email, subject, and message
   - Submission is stored in Firestore

### For Administrators:

1. **Login**
   - Visit `/login`
   - Use your admin credentials

2. **Access Admin Dashboard**
   - Visit `/admin` (or click Admin in navigation after login)
   - See overview of available data exports

3. **Download CSV Files**
   - Click "Download Contacts CSV" to export all contact submissions
   - Click "Download Subscriptions CSV" to export all newsletter subscribers
   - Files are named with current date: `contacts-2025-10-19.csv`

---

## 📊 CSV File Format

### Contacts CSV Columns:
- Name
- Email
- Subject
- Message
- Submitted At

### Subscriptions CSV Columns:
- Email
- Subscribed At

---

## 🔐 Security Notes

1. **Authentication Required**: Only logged-in users can access `/admin` and download CSVs
2. **Cloud Functions**: Functions should verify the user's authentication token
3. **Firestore Rules**: Ensure only authenticated users can read contacts/subscriptions
4. **CORS**: May need to configure CORS for Cloud Functions if accessing from different domains

---

## 🛠️ Troubleshooting

### Problem: "Failed to download CSV"

**Solutions:**
1. Make sure Cloud Functions are deployed: `firebase deploy --only functions`
2. Check the region in `AdminDashboard.tsx` matches your Firebase region
3. Verify Firebase project ID is correct in `.env`
4. Check browser console for specific error messages

### Problem: "Authentication failed"

**Solutions:**
1. Make sure you're logged in
2. Try logging out and logging back in
3. Check Firebase Authentication is enabled

### Problem: Subscription not saving

**Solutions:**
1. Check Firestore rules allow writes to `subscriptions` collection
2. Verify Firebase is initialized correctly
3. Check browser console for errors

---

## 📝 Testing

### Test Newsletter Subscription:
1. Go to any page with the footer
2. Enter email: `test@example.com`
3. Click Subscribe
4. Check Firestore → subscriptions collection for new entry

### Test Contact Form:
1. Visit `/contact`
2. Fill out the form
3. Submit
4. Check Firestore → contacts collection for new entry

### Test CSV Download:
1. Login at `/login`
2. Visit `/admin`
3. Click download buttons
4. CSV files should download to your computer

---

## 🎨 Customization

### Change CSV Column Names:
Edit `functions/src/index.ts` and modify the header arrays:

```typescript
header: [
  { id: "email", title: "Email Address" }, // Change "Email Address" to your preference
  { id: "subscribed_at", title: "Date Subscribed" },
]
```

### Add More Fields:
1. Update the frontend form to collect more data
2. Update the Firestore document structure
3. Update the CSV header in Cloud Functions

---

## 📧 Email Notifications (Optional Enhancement)

To send email notifications when someone subscribes or contacts you:

1. Install SendGrid or similar email service
2. Update `sendContactNotification` function in `functions/src/index.ts`
3. Add email sending logic

Example with SendGrid:
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendContactNotification = functions.firestore
  .document("contacts/{contactId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const msg = {
      to: 'operations@impalaresearch.com',
      from: 'noreply@impalaresearch.com',
      subject: `New Contact: ${data.subject}`,
      text: `From: ${data.name} (${data.email})\n\n${data.message}`,
    };
    await sgMail.send(msg);
  });
```

---

## ✅ Deployment Checklist

- [ ] Firebase project created
- [ ] Environment variables configured in `.env`
- [ ] Firestore database created
- [ ] Firestore rules updated
- [ ] Cloud Functions deployed
- [ ] Admin account created
- [ ] Tested newsletter subscription
- [ ] Tested contact form
- [ ] Tested CSV downloads
- [ ] Frontend deployed

---

## 🎯 Next Steps

1. **Deploy to Production**: `firebase deploy` or deploy frontend to hosting
2. **Set Up Monitoring**: Enable Firebase Analytics
3. **Add Email Service**: Integrate SendGrid/AWS SES for notifications
4. **Backup Data**: Set up regular Firestore backups
5. **Add Analytics**: Track subscription conversion rates

---

## 📞 Support

If you encounter any issues:
1. Check Firebase Console logs
2. Check browser console for errors
3. Verify all dependencies are installed
4. Ensure Firebase CLI is up to date: `npm install -g firebase-tools`

---

**Created:** October 19, 2025  
**Version:** 1.0
