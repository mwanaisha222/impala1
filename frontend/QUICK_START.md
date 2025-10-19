# 🚀 Quick Start - Newsletter CSV Export

## To Get Your Firebase Project ID:

1. Run: `firebase projects:list`
2. Find your project in the list
3. Copy the project ID

## Create `.firebaserc` file:

Create a file named `.firebaserc` in the frontend root directory with:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID_HERE"
  }
}
```

Replace `YOUR_PROJECT_ID_HERE` with your actual Firebase project ID.

## Deploy Functions:

```bash
firebase deploy --only functions
```

## Test It:

1. Visit: http://localhost:8080/
2. Subscribe to newsletter using footer form
3. Login at: http://localhost:8080/login
4. Visit admin: http://localhost:8080/admin
5. Click "Download Subscriptions CSV"

## Files to Check:

- ✅ `firebase.json` - Created
- ✅ `.firebaserc` - YOU NEED TO CREATE THIS
- ✅ `functions/src/index.ts` - Updated with Cloud Functions
- ✅ `src/pages/AdminDashboard.tsx` - New admin page
- ✅ `src/components/layout/Footer.tsx` - Newsletter form added

## CSV Files Include:

**Subscriptions CSV:**
- Email
- Subscribed At (date/time)

**Contacts CSV:**
- Name
- Email  
- Subject
- Message
- Submitted At (date/time)

## Need Help?

See `NEWSLETTER_STATUS.md` and `NEWSLETTER_SETUP_GUIDE.md` for complete documentation.
