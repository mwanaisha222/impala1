# 🔧 Firebase Authentication Setup Guide

## ❌ Current Error

```
Firebase: Error (auth/configuration-not-found)
```

This means Firebase Authentication is not enabled in your Firebase project.

---

## ✅ How to Fix

### **Step 1: Open Firebase Console**

1. Go to: https://console.firebase.google.com/
2. Select your project: **impala-11e2b**

### **Step 2: Enable Authentication**

1. In the left sidebar, click **"Authentication"** (🔐 icon)
2. If you see a "Get Started" button, click it
3. Click on the **"Sign-in method"** tab

### **Step 3: Enable Email/Password Authentication**

1. Click on **"Email/Password"** in the providers list
2. Toggle **"Enable"** to ON
3. You can leave **"Email link (passwordless sign-in)"** OFF for now
4. Click **"Save"**

### **Step 4: (Optional) Add Authorized Domains**

1. Still in the **"Sign-in method"** tab
2. Scroll down to **"Authorized domains"**
3. Add your domains:
   - `localhost` (should already be there)
   - Your production domain when you deploy

---

## 🔄 After Enabling Authentication

### **Restart Your Development Server:**

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### **Test Signup:**

1. Visit: http://localhost:8081/signup
2. Fill in the form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: Test123456
3. Click "Sign Up"
4. ✅ Should see success message

### **Test Login:**

1. Visit: http://localhost:8081/login
2. Enter the credentials you just created
3. Click "Login"
4. ✅ Should redirect to home page with "Admin" button visible

---

## 🐛 If Still Getting Errors

### **Error: "auth/invalid-api-key"**

**Fix:** Check your `.env` file has the correct API key

### **Error: "auth/network-request-failed"**

**Fix:** 
- Check your internet connection
- Verify Firebase project is not deleted
- Check if you have any firewall/proxy blocking Firebase

### **Error: "auth/operation-not-allowed"**

**Fix:** Email/Password auth not enabled - follow Step 3 above

### **Error: "auth/weak-password"**

**Fix:** Password must be at least 6 characters

---

## 📋 Verification Checklist

After enabling authentication, verify:

- [ ] Firebase Console → Authentication is enabled
- [ ] Firebase Console → Sign-in method → Email/Password is ON
- [ ] `.env` file has correct configuration (no typos)
- [ ] Development server restarted
- [ ] Can sign up new user
- [ ] Can login with created user
- [ ] "Admin" button appears after login
- [ ] Can access `/admin` dashboard
- [ ] Can logout successfully

---

## 🎯 Quick Visual Guide

### Firebase Console Navigation:

```
Firebase Console
├── Project: impala-11e2b
│   ├── Authentication ← Click here
│   │   ├── Get Started ← Click if you see this
│   │   ├── Sign-in method ← Go to this tab
│   │   │   ├── Email/Password ← Enable this
│   │   │   │   └── Toggle to ON
│   │   │   └── Save
```

---

## 🔐 Create Your First Admin Account

Once authentication is enabled:

1. **Sign Up** at http://localhost:8081/signup
2. Use your real email (for admin account)
3. Remember the password!
4. **Login** at http://localhost:8081/login
5. Access **Admin Dashboard** at http://localhost:8081/admin

---

## 📝 Configuration Fixed

I've already fixed the typo in your `.env` file:

**Before:**
```
VITE_FIREBASE_STORAGE_BUCKET=mpala-11e2b.firebasestorage.app
```

**After (Fixed):**
```
VITE_FIREBASE_STORAGE_BUCKET=impala-11e2b.firebasestorage.app
```

---

## 🚨 Important Security Note

### **Firestore Security Rules**

After creating users, update your `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contacts - anyone can write, only auth users can read
    match /contacts/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
    }
    
    // Subscriptions - anyone can write, only auth users can read
    match /subscriptions/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
    }
    
    // Articles - public read, auth write
    match /articles/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

---

## ✅ Next Steps

1. **Enable Authentication** in Firebase Console (most important!)
2. **Restart dev server**
3. **Sign up** your first admin account
4. **Test** all features
5. **Deploy** when ready

---

## 📞 Need Help?

If you're still having issues after following this guide:

1. Check Firebase Console status page
2. Verify project billing (if required)
3. Clear browser cache
4. Try in incognito mode
5. Check browser console for specific errors

---

**Status:** Configuration file fixed ✅  
**Next:** Enable Authentication in Firebase Console 🔥  
**Then:** Restart server and test 🚀

