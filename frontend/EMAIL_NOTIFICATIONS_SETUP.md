# 📧 Email Notifications Setup Guide

## 🎯 Current Status

**✅ What's Working:**
- Contact form saves to Firestore ✅
- CSV download of contacts ✅
- Footer email updated to: `info@impalaresearch.com` ✅
- Email notification function created ✅

**⏳ What Needs Setup:**
- Email service integration (SendGrid, Mailgun, or Resend)
- Deploy Cloud Function with email credentials

---

## 📬 How It Works

### **Current Flow:**

```
User fills contact form
        ↓
Submitted to Firestore ✅
        ↓
Cloud Function triggered ✅
        ↓
Email sent to: info@impalaresearch.com ⏳ (needs email service)
        ↓
Admin downloads CSV ✅
```

---

## 🚀 **Option 1: SendGrid (Recommended)** ⭐

### **Why SendGrid:**
- ✅ Free tier: 100 emails/day
- ✅ Easy to set up
- ✅ Reliable delivery
- ✅ Good documentation

### **Setup Steps:**

#### **1. Create SendGrid Account**

```
1. Go to: https://signup.sendgrid.com/

2. Sign up (free account)

3. Verify your email

4. Complete setup wizard
```

#### **2. Get API Key**

```
1. Login to SendGrid dashboard

2. Go to: Settings → API Keys

3. Click "Create API Key"

4. Name: "Impala Contact Form"

5. Permissions: "Full Access"

6. Copy the API key (save it!)
   Example: SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### **3. Verify Sender Email**

```
1. Go to: Settings → Sender Authentication

2. Click "Verify a Single Sender"

3. Enter:
   - From Name: Impala Healthtech Research
   - From Email: info@impalaresearch.com
   - Reply To: info@impalaresearch.com

4. Check your email inbox

5. Click verification link

6. ✅ Email verified!
```

#### **4. Install SendGrid in Cloud Functions**

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend\functions

npm install @sendgrid/mail
```

#### **5. Update Cloud Function**

Open `functions/src/index.ts` and replace the TODO section:

```typescript
import * as sgMail from '@sendgrid/mail';

// At the top, after initializeApp():
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// In sendContactNotification function, replace console.log with:
try {
  await sgMail.send(emailContent);
  console.log("Email sent successfully to info@impalaresearch.com");
} catch (error) {
  console.error("Error sending email:", error);
}
```

#### **6. Set Firebase Config**

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend

firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY_HERE"
```

Replace `YOUR_SENDGRID_API_KEY_HERE` with your actual API key.

#### **7. Deploy**

```bash
firebase deploy --only functions
```

#### **8. Test**

1. Go to your website contact form
2. Fill out and submit
3. Check `info@impalaresearch.com` inbox
4. ✅ You should receive the email!

---

## 🚀 **Option 2: Resend (Modern Alternative)**

### **Why Resend:**
- ✅ Free tier: 100 emails/day, 3,000/month
- ✅ Very simple API
- ✅ Great developer experience
- ✅ Modern dashboard

### **Setup Steps:**

#### **1. Create Resend Account**

```
1. Go to: https://resend.com/

2. Sign up with GitHub or email

3. Verify email
```

#### **2. Get API Key**

```
1. Dashboard → API Keys

2. Click "Create API Key"

3. Name: "Impala Contact Form"

4. Copy key (starts with: re_...)
```

#### **3. Verify Domain (Optional but Recommended)**

```
1. Go to: Domains → Add Domain

2. Enter: impalaresearch.com

3. Add DNS records (provided by Resend)

4. Wait for verification (can take 24-48 hours)
```

OR use Resend's onboarding domain temporarily:
```
onboarding@resend.dev (for testing)
```

#### **4. Install Resend**

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend\functions

npm install resend
```

#### **5. Update Cloud Function**

```typescript
import {Resend} from 'resend';

const resend = new Resend(functions.config().resend.key);

// In sendContactNotification:
try {
  await resend.emails.send({
    from: 'Impala Contact Form <onboarding@resend.dev>',
    to: 'info@impalaresearch.com',
    replyTo: email,
    subject: `New Contact: ${subject}`,
    html: emailContent.html,
  });
  console.log("Email sent via Resend");
} catch (error) {
  console.error("Error:", error);
}
```

#### **6. Set Config**

```bash
firebase functions:config:set resend.key="YOUR_RESEND_API_KEY"
```

#### **7. Deploy**

```bash
firebase deploy --only functions
```

---

## 🚀 **Option 3: Mailgun**

### **Setup:**

1. Sign up: https://www.mailgun.com/
2. Free tier: 5,000 emails/month
3. Follow similar steps as SendGrid
4. Use `mailgun-js` npm package

---

## 💰 **Cost Comparison**

| Service | Free Tier | Best For |
|---------|-----------|----------|
| **SendGrid** | 100/day forever | Most popular, proven |
| **Resend** | 100/day, 3K/month | Modern, developer-friendly |
| **Mailgun** | 5,000/month (3 months) | High volume |

**Recommendation:** Start with **SendGrid** or **Resend**

---

## 🧪 **Testing Email Function**

### **Before Deploying:**

Test locally with Firebase Emulators:

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend

# Start emulators
firebase emulators:start

# In another terminal, submit a test contact
# Watch logs for email content
```

### **After Deploying:**

1. **Submit test contact:**
   ```
   https://impala1-2leh.vercel.app/contact
   
   Name: Test User
   Email: test@example.com
   Subject: Test Contact
   Message: This is a test message
   ```

2. **Check Firebase Logs:**
   ```bash
   firebase functions:log --only sendContactNotification
   ```

3. **Check Email:**
   - Open `info@impalaresearch.com`
   - Should receive email within 1-2 minutes

---

## 📧 **Email Template**

The email sent to `info@impalaresearch.com` includes:

```
Subject: New Contact Form Submission: [Subject]

Content:
┌────────────────────────────────────┐
│ New Contact Form Submission        │
├────────────────────────────────────┤
│ From: John Doe                     │
│ Email: john@example.com            │
│ Subject: Partnership Inquiry       │
│ Submitted: Oct 21, 2025, 10:30 AM │
├────────────────────────────────────┤
│ Message:                           │
│ Hello, I'd like to discuss...      │
└────────────────────────────────────┘

Reply directly to respond to the sender
```

**Features:**
- ✅ Professional HTML formatting
- ✅ Reply-To set to sender's email
- ✅ Timestamp included
- ✅ Easy to read on mobile
- ✅ Links for quick response

---

## 🔧 **Troubleshooting**

### **Issue: Emails not arriving**

**Check:**
```
1. SendGrid/Resend API key is correct
2. Sender email is verified
3. Firebase config is set: firebase functions:config:get
4. Function deployed successfully
5. Check spam folder
6. Check Firebase logs for errors
```

### **Issue: "Sender not verified"**

**Solution:**
```
1. Go to SendGrid → Settings → Sender Authentication
2. Verify the sender email
3. Use verified email in "from" field
4. Redeploy function
```

### **Issue: Function not triggering**

**Check:**
```
1. Firestore write successful?
2. Function deployed? Check Firebase Console → Functions
3. Check logs: firebase functions:log
4. Collection name is "contacts" (not "contact")
```

---

## 📊 **Current Setup Summary**

### **What's Ready:**

```typescript
✅ Footer email: info@impalaresearch.com
✅ Contact form saves to Firestore
✅ Cloud Function template created
✅ Email HTML template designed
✅ Trigger on new contact (Firestore)
✅ CSV download still works
```

### **What You Need to Do:**

```
1. Choose email service (SendGrid recommended)
2. Create account & get API key
3. Install npm package
4. Update function code (uncomment SendGrid section)
5. Set Firebase config with API key
6. Deploy function
7. Test contact form
8. ✅ Receive emails!
```

---

## 🎯 **Quick Start (SendGrid)**

**Copy-paste commands:**

```bash
# 1. Install SendGrid
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend\functions
npm install @sendgrid/mail

# 2. Set API key (replace with yours)
cd ..
firebase functions:config:set sendgrid.key="SG.your-api-key-here"

# 3. Deploy
firebase deploy --only functions

# 4. Test
# Go to website, submit contact form, check email!
```

---

## 📝 **Email Service Comparison**

### **SendGrid:**
```
✅ Pros:
- Industry standard
- 100 emails/day free forever
- Great documentation
- Reliable delivery

⚠️ Cons:
- More complex dashboard
- Requires email verification
```

### **Resend:**
```
✅ Pros:
- Modern, clean UI
- Simple API
- 3,000 emails/month free
- Fast setup

⚠️ Cons:
- Newer service (less proven)
- Requires domain verification for production
```

---

## 🚀 **Deployment Checklist**

### **Before Deploying:**

- [ ] Email service account created
- [ ] API key obtained
- [ ] Sender email verified
- [ ] npm package installed
- [ ] Function code updated
- [ ] Firebase config set
- [ ] Blaze plan active (for Cloud Functions)

### **After Deploying:**

- [ ] Function shows in Firebase Console
- [ ] Test contact form submission
- [ ] Check Firebase logs
- [ ] Email received at info@impalaresearch.com
- [ ] Reply-to works correctly
- [ ] CSV download still works

---

## 💡 **Pro Tips**

1. **Set up email forwarding:**
   - Forward info@impalaresearch.com to your main email
   - Never miss a contact!

2. **Create email template response:**
   - Save common responses in Gmail/Outlook
   - Faster reply to common inquiries

3. **Monitor email sending:**
   - Check SendGrid/Resend dashboard weekly
   - Watch for bounces or spam reports

4. **Set up alerts:**
   ```bash
   # Get notified if function fails
   firebase functions:log --only sendContactNotification
   ```

---

## 📞 **Need Help?**

### **SendGrid Issues:**
- Docs: https://docs.sendgrid.com/
- Support: https://support.sendgrid.com/

### **Resend Issues:**
- Docs: https://resend.com/docs
- Discord: https://resend.com/discord

### **Firebase Issues:**
- Check logs: `firebase functions:log`
- Console: https://console.firebase.google.com/

---

**Status:** ✅ Code ready, needs email service setup  
**Time to complete:** 10-15 minutes  
**Recommended:** SendGrid (most reliable)  
**Alternative:** Resend (easiest to set up)

**Once configured, all contact form submissions will automatically email info@impalaresearch.com!** 📧
