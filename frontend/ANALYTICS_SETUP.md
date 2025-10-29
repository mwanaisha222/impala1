# 📊 Website Analytics Setup Guide

## 🎯 How to Track Website Visitors

You've added Google Analytics code to your website. Now follow these steps to activate it and view your analytics dashboard.

---

## 🚀 **Quick Setup (10 minutes)**

### **Step 1: Get Your Google Analytics Measurement ID**

1. **Go to Google Analytics:**
   ```
   https://analytics.google.com/
   ```

2. **Sign in** with your Google account

3. **Create Account:**
   - Click "Start measuring"
   - Account name: `Impala Healthtech Research`
   - Click "Next"

4. **Create Property:**
   - Property name: `Impala Website`
   - Reporting time zone: `(GMT+03:00) East Africa Time`
   - Currency: `USD` or `UGX`
   - Click "Next"

5. **Business Information:**
   - Industry: `Health & Fitness`
   - Business size: `Small (1-10 employees)`
   - How you plan to use: `Measure site content performance`
   - Click "Create"

6. **Accept Terms** of Service

7. **Set Up Data Stream:**
   - Platform: Click "Web"
   - Website URL: `https://impalaresearch.com`
   - Stream name: `Impala Main Site`
   - Click "Create stream"

8. **Copy Measurement ID:**
   - You'll see: `G-XXXXXXXXXX`
   - Copy this ID!

---

### **Step 2: Add Measurement ID to Your Website**

1. **Open your code:**
   ```
   File: index.html (already updated)
   ```

2. **Replace `YOUR_MEASUREMENT_ID` with your actual ID:**
   
   **Before:**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'YOUR_MEASUREMENT_ID');
   </script>
   ```

   **After (example with G-ABC123XYZ):**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-ABC123XYZ');
   </script>
   ```

3. **Save the file**

4. **Commit and push:**
   ```bash
   git add index.html
   git commit -m "Add Google Analytics tracking"
   git push
   ```

5. **Wait for Vercel to deploy** (2-3 minutes)

---

### **Step 3: Verify Installation**

1. **Visit your website:**
   ```
   https://impalaresearch.com
   ```

2. **Go back to Google Analytics**

3. **Click "View real-time report"**

4. **You should see yourself** as an active user!

5. ✅ **Analytics is working!**

---

## 📊 **Viewing Your Analytics Dashboard**

### **Access Dashboard:**

```
https://analytics.google.com/

→ Select "Impala Website" property
→ Click "Reports" in left sidebar
```

### **Key Reports:**

#### **1. Realtime Report**
```
Reports → Realtime
```
**Shows:**
- Users on site right now
- What pages they're viewing
- Where they're from
- What devices they're using

**Use for:** Checking if tracking works, seeing live traffic

---

#### **2. Acquisition Report**
```
Reports → Acquisition → Traffic acquisition
```
**Shows:**
- Where visitors come from
- Direct traffic
- Social media clicks
- Google search
- Referral sites

**Use for:** Understanding how people find your site

---

#### **3. Engagement Report**
```
Reports → Engagement → Pages and screens
```
**Shows:**
- Most visited pages
- Time spent on each page
- Bounce rate
- Popular content

**Use for:** Seeing what content is popular

---

#### **4. Demographics Report**
```
Reports → User → Demographic details
```
**Shows:**
- Visitor locations (countries, cities)
- Languages
- Devices (mobile, desktop, tablet)
- Browsers

**Use for:** Understanding your audience

---

## 📈 **What You'll See in Analytics**

### **Daily Metrics:**

```
Active Users: 
  - Last 7 days: 125
  - Last 30 days: 487

Top Pages:
  1. Homepage (/) - 45%
  2. Updates (/articles) - 25%
  3. Who We Are (/who-we-are) - 15%
  4. Contact (/contact) - 10%
  5. What We Do (/what-we-do) - 5%

Traffic Sources:
  - Direct: 40%
  - Organic Search: 30%
  - Social Media: 20%
  - Referral: 10%

Locations:
  1. Uganda - 65%
  2. Kenya - 15%
  3. United States - 10%
  4. Others - 10%
```

---

## 🎯 **Custom Reports You Can Create**

### **1. Newsletter Subscription Tracking**

Add to your newsletter subscription button:

```typescript
// In Footer.tsx handleSubscribe function
gtag('event', 'newsletter_signup', {
  'event_category': 'engagement',
  'event_label': 'footer_form'
});
```

### **2. Contact Form Tracking**

Add to your contact form:

```typescript
// In Contact.tsx handleSubmit function
gtag('event', 'contact_form_submit', {
  'event_category': 'engagement',
  'event_label': 'contact_page'
});
```

### **3. Article View Tracking**

Add to ArticleDetail.tsx:

```typescript
// When article loads
gtag('event', 'article_view', {
  'event_category': 'content',
  'event_label': articleTitle,
  'value': articleId
});
```

---

## 📱 **Mobile App (Optional)**

### **Google Analytics Mobile App:**

1. **Download:**
   - iOS: App Store → "Google Analytics"
   - Android: Play Store → "Google Analytics"

2. **Sign in** with same Google account

3. **View stats on the go!**

**Features:**
- Real-time visitors
- Daily summaries
- Push notifications for traffic spikes
- Quick insights

---

## 🔔 **Set Up Alerts**

### **Get Notified of Important Events:**

1. **Go to Analytics Admin:**
   ```
   https://analytics.google.com/
   → Admin (bottom left)
   → View → Custom Alerts
   ```

2. **Create Alert:**
   ```
   Alert name: "Traffic Spike"
   Apply to: All Web Site Data
   
   Alert conditions:
   - Metric: Users
   - Condition: Increases by more than
   - Value: 50%
   - Compared to: Previous day
   
   Send me an email when this alert triggers
   ```

3. **Save Alert**

**Get emails when:**
- Traffic increases significantly
- Traffic drops unexpectedly
- Conversion goals are met

---

## 💡 **Alternative Analytics Options**

### **Option 2: Vercel Analytics (Simple)**

**Pros:**
- ✅ Built into Vercel
- ✅ Privacy-focused
- ✅ One-click setup
- ✅ No cookies needed

**Setup:**
```
1. Go to: https://vercel.com/dashboard
2. Select your project: impala1
3. Settings → Analytics
4. Click "Enable"
5. Done!
```

**View:**
```
Vercel Dashboard → Your Project → Analytics tab
```

**Shows:**
- Page views
- Top pages
- Unique visitors
- Countries
- Referrers

**Cost:** Free tier: 10K events/month

---

### **Option 3: Plausible (Privacy-Friendly)**

**Pros:**
- ✅ GDPR compliant
- ✅ No cookies
- ✅ Simple dashboard
- ✅ Lightweight script

**Setup:**
```
1. Sign up: https://plausible.io/
2. Add site: impalaresearch.com
3. Copy tracking code
4. Add to index.html
```

**Cost:** $9/month for 10K pageviews

---

## 📊 **What Metrics to Track**

### **Key Performance Indicators (KPIs):**

#### **1. Traffic Metrics:**
- **Total visitors** - How many people visit
- **Page views** - How many pages viewed
- **Bounce rate** - % who leave immediately
- **Session duration** - How long they stay

#### **2. Engagement Metrics:**
- **Most popular articles** - What content works
- **Newsletter signups** - Email list growth
- **Contact form submissions** - Lead generation
- **Social shares** - Content virality

#### **3. Technical Metrics:**
- **Device breakdown** - Mobile vs Desktop
- **Browser usage** - Chrome, Safari, etc.
- **Page load speed** - Performance
- **Error rates** - Technical issues

#### **4. Conversion Metrics:**
- **Goal completions** - Newsletter, Contact
- **Conversion rate** - % who take action
- **Top converting pages** - What drives action
- **Drop-off points** - Where people leave

---

## 🎯 **Setting Goals in Google Analytics**

### **Example: Newsletter Signup Goal**

1. **Admin → Data Display → Events**

2. **Create Event:**
   ```
   Event name: newsletter_signup
   Conditions: event_name = newsletter_signup
   Mark as conversion: Yes
   ```

3. **Track in Reports:**
   ```
   Reports → Engagement → Conversions
   ```

---

## 📈 **Weekly Analytics Routine**

### **Every Monday Morning:**

1. **Check Overview:**
   - How many visitors last week?
   - Up or down from previous week?

2. **Top Pages:**
   - What content is popular?
   - Any surprises?

3. **Traffic Sources:**
   - Where are people coming from?
   - Which social media is working?

4. **New Insights:**
   - Any unusual spikes?
   - Any technical issues?

5. **Action Items:**
   - Create more of what's working
   - Fix issues you find
   - Promote underperforming content

---

## 🔍 **Common Questions**

### **Q: When will I see data?**
**A:** Within 24-48 hours of adding the tracking code. Real-time reports work immediately.

### **Q: Why is my data empty?**
**A:** 
- Check Measurement ID is correct
- Verify code is on all pages
- Wait 24 hours for data to appear
- Check browser console for errors

### **Q: How accurate is the data?**
**A:** Very accurate, but:
- Ad blockers may hide ~15% of users
- Privacy settings affect tracking
- Bots are filtered automatically

### **Q: Can I track specific buttons?**
**A:** Yes! Add event tracking (see Custom Reports above)

---

## 🎨 **Custom Dashboard Example**

Create a custom dashboard with:

```
┌─────────────────────────────────────┐
│  Impala Analytics Dashboard         │
├─────────────────────────────────────┤
│  This Week: 247 visitors (+15%)     │
│  Top Article: "DIGAMS Launch"       │
│  Newsletter: 12 new subscribers     │
│  Contact: 5 inquiries               │
├─────────────────────────────────────┤
│  Traffic Sources:                   │
│  ████████ Social (35%)              │
│  ██████ Direct (25%)                │
│  █████ Search (20%)                 │
│  ████ Referral (20%)                │
└─────────────────────────────────────┘
```

---

## ✅ **Setup Checklist**

### **Initial Setup:**
- [ ] Create Google Analytics account
- [ ] Get Measurement ID
- [ ] Add ID to index.html (replace YOUR_MEASUREMENT_ID)
- [ ] Commit and push changes
- [ ] Verify in real-time report
- [ ] Wait 24 hours for full data

### **Advanced Setup:**
- [ ] Set up conversion goals
- [ ] Create custom alerts
- [ ] Install mobile app
- [ ] Set up weekly email reports
- [ ] Add event tracking for buttons
- [ ] Create custom dashboard

### **Ongoing:**
- [ ] Check analytics weekly
- [ ] Review popular content
- [ ] Monitor traffic sources
- [ ] Track newsletter growth
- [ ] Identify improvement areas

---

## 🚀 **Next Steps**

1. **Right now:**
   - Get your Google Analytics Measurement ID
   - Replace `YOUR_MEASUREMENT_ID` in index.html
   - Commit and push

2. **After 24 hours:**
   - Check your dashboard
   - Review initial data
   - Set up goals

3. **After 1 week:**
   - Create custom reports
   - Set up alerts
   - Share insights with team

---

## 📞 **Need Help?**

### **Google Analytics Support:**
- Help Center: https://support.google.com/analytics
- Community: https://support.google.com/analytics/community

### **Video Tutorials:**
- Google Analytics for Beginners: https://analytics.google.com/analytics/academy/

### **Quick Links:**
- **Dashboard:** https://analytics.google.com/
- **Get ID:** Admin → Data Streams → Web Stream
- **Reports:** Reports → Realtime (to verify it's working)

---

**Once you add your Measurement ID and deploy, you'll be able to see:**
- ✅ Who visits your site
- ✅ Where they come from
- ✅ What they read
- ✅ How long they stay
- ✅ What devices they use
- ✅ Which countries they're in

**All data updates in real-time!** 📊
