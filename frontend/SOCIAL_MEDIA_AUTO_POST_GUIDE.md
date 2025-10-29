# 📱 Auto-Post Articles to Social Media - Complete Guide

## 🎯 Overview

**Goal:** When you publish an article on your website, automatically post it to:
- ✅ Instagram
- ✅ LinkedIn
- ✅ Twitter/X (optional)
- ✅ Facebook (optional)

---

## 🏗️ Architecture

### **How It Works:**

```
Admin publishes article on website
        ↓
Firestore trigger (Cloud Function)
        ↓
Generate social media post
        ↓
Post to Instagram, LinkedIn, etc.
        ↓
✅ Article shared automatically!
```

---

## 🚀 **Option 1: Meta API (Instagram + Facebook)** ⭐ Recommended

### **Setup for Instagram Business Account:**

#### **Prerequisites:**
1. Instagram Business or Creator account
2. Facebook Page linked to Instagram
3. Meta Business Suite access

#### **Step 1: Create Meta App**

```
1. Go to: https://developers.facebook.com/

2. Click "My Apps" → "Create App"

3. Choose "Business" app type

4. App name: "Impala Auto Poster"

5. Contact email: info@impalaresearch.com

6. Click "Create App"
```

#### **Step 2: Add Instagram Graph API**

```
1. In your app dashboard, click "Add Product"

2. Find "Instagram Graph API" → Click "Set Up"

3. Complete the setup wizard

4. Get your:
   - App ID
   - App Secret
   - Access Token
```

#### **Step 3: Get Long-Lived Access Token**

```bash
# Exchange short-lived token for long-lived (60 days)
https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id=YOUR_APP_ID&
  client_secret=YOUR_APP_SECRET&
  fb_exchange_token=YOUR_SHORT_LIVED_TOKEN
```

#### **Step 4: Install Dependencies**

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend\functions

npm install axios form-data
```

#### **Step 5: Add Cloud Function**

Create file: `functions/src/socialMediaPoster.ts`

```typescript
import * as functions from "firebase-functions";
import axios from "axios";

const INSTAGRAM_ACCOUNT_ID = functions.config().meta.instagram_id;
const META_ACCESS_TOKEN = functions.config().meta.access_token;

export const postToInstagram = async (
  imageUrl: string,
  caption: string
) => {
  try {
    // Step 1: Create media container
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media`,
      {
        image_url: imageUrl,
        caption: caption,
        access_token: META_ACCESS_TOKEN,
      }
    );

    const creationId = containerResponse.data.id;

    // Step 2: Publish the container
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
      {
        creation_id: creationId,
        access_token: META_ACCESS_TOKEN,
      }
    );

    console.log("Posted to Instagram:", publishResponse.data);
    return publishResponse.data;
  } catch (error: any) {
    console.error("Error posting to Instagram:", error.response?.data || error);
    throw error;
  }
};

// Firestore trigger when article is published
export const onArticlePublished = functions.firestore
  .document("articles/{articleId}")
  .onCreate(async (snap) => {
    const article = snap.data();
    
    // Generate caption
    const caption = `
📢 New Update: ${article.title}

${article.content.substring(0, 200)}...

Read more at: https://impalaresearch.com/articles/${snap.id}

#HealthTech #Innovation #Research #AMR #DigitalHealth
    `.trim();

    try {
      // Post to Instagram
      if (article.imageUrl) {
        await postToInstagram(article.imageUrl, caption);
        console.log("Article posted to Instagram successfully");
      }
    } catch (error) {
      console.error("Error posting to social media:", error);
    }
  });
```

#### **Step 6: Set Firebase Config**

```bash
cd C:\Users\HP\Desktop\impalawebsite\impalawebsite\frontend

firebase functions:config:set meta.instagram_id="YOUR_INSTAGRAM_ACCOUNT_ID"
firebase functions:config:set meta.access_token="YOUR_ACCESS_TOKEN"
```

#### **Step 7: Deploy**

```bash
firebase deploy --only functions
```

---

## 🚀 **Option 2: LinkedIn API** ⭐ Recommended

### **Setup for LinkedIn Company Page:**

#### **Step 1: Create LinkedIn App**

```
1. Go to: https://www.linkedin.com/developers/

2. Click "Create App"

3. Fill in:
   - App name: Impala Auto Poster
   - LinkedIn Page: Select your company page
   - App logo: Upload your logo

4. Agree to terms → "Create app"
```

#### **Step 2: Request API Access**

```
1. In app settings, go to "Products"

2. Request access to:
   - "Share on LinkedIn"
   - "Sign In with LinkedIn using OpenID Connect"

3. Wait for approval (usually instant)
```

#### **Step 3: Get Access Token**

```
1. Go to "Auth" tab

2. Copy:
   - Client ID
   - Client Secret

3. OAuth 2.0 settings:
   - Redirect URL: https://impalaresearch.com/auth/linkedin/callback
```

#### **Step 4: Add LinkedIn Function**

```typescript
import axios from "axios";

const LINKEDIN_ACCESS_TOKEN = functions.config().linkedin.access_token;
const LINKEDIN_ORG_ID = functions.config().linkedin.org_id;

export const postToLinkedIn = async (
  title: string,
  text: string,
  articleUrl: string,
  imageUrl?: string
) => {
  try {
    const post = {
      author: `urn:li:organization:${LINKEDIN_ORG_ID}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: imageUrl ? "IMAGE" : "ARTICLE",
          media: [
            {
              status: "READY",
              description: {
                text: title,
              },
              originalUrl: articleUrl,
              title: {
                text: title,
              },
              ...(imageUrl && {
                media: imageUrl,
              }),
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const response = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      post,
      {
        headers: {
          Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    console.log("Posted to LinkedIn:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error posting to LinkedIn:", error.response?.data || error);
    throw error;
  }
};
```

#### **Step 5: Update Article Trigger**

```typescript
export const onArticlePublished = functions.firestore
  .document("articles/{articleId}")
  .onCreate(async (snap) => {
    const article = snap.data();
    const articleUrl = `https://impalaresearch.com/articles/${snap.id}`;
    
    // LinkedIn post
    const linkedInText = `
🚀 New Article: ${article.title}

${article.content.substring(0, 300)}...

Read the full article: ${articleUrl}

#HealthTech #Innovation #Research #ImpalaHealthtech
    `.trim();

    try {
      // Post to LinkedIn
      await postToLinkedIn(
        article.title,
        linkedInText,
        articleUrl,
        article.imageUrl
      );
      
      // Post to Instagram (if image exists)
      if (article.imageUrl) {
        const instaCaption = `
📢 ${article.title}

Read more at the link in bio!

#HealthTech #Innovation
        `.trim();
        
        await postToInstagram(article.imageUrl, instaCaption);
      }
      
      console.log("Article posted to all social media platforms");
    } catch (error) {
      console.error("Error posting to social media:", error);
    }
  });
```

---

## 🚀 **Option 3: Buffer/Hootsuite API** (Easiest)

### **Using Social Media Management Tools:**

#### **Buffer (Recommended for Simplicity):**

```
1. Sign up: https://buffer.com/

2. Connect accounts:
   - Instagram
   - LinkedIn
   - Twitter
   - Facebook

3. Get API key:
   - Settings → Developers → Create Access Token

4. Install: npm install buffer

5. Code:
```

```typescript
import { BufferClient } from "buffer";

const buffer = new BufferClient(functions.config().buffer.access_token);

export const postToBuffer = async (
  text: string,
  imageUrl: string,
  link: string
) => {
  try {
    // Post to all connected profiles
    await buffer.updates.create({
      text: text,
      profile_ids: [
        functions.config().buffer.instagram_id,
        functions.config().buffer.linkedin_id,
      ],
      media: {
        photo: imageUrl,
        link: link,
      },
    });
    
    console.log("Posted via Buffer");
  } catch (error) {
    console.error("Buffer error:", error);
  }
};
```

**Pros:**
- ✅ One API for all platforms
- ✅ Simple setup
- ✅ Analytics included
- ✅ Scheduling options

**Cons:**
- ❌ Costs $6/month (after free trial)

---

## 🎨 **Post Template Customization**

### **Customize Social Media Posts:**

```typescript
// functions/src/postTemplates.ts

export const generateInstagramCaption = (article: any, articleUrl: string) => {
  return `
📢 New Update Alert! 

${article.title}

${extractFirstParagraph(article.content)}

🔗 Read the full article at the link in bio!
Or visit: impalaresearch.com

#HealthTech #Innovation #Research #Uganda #DigitalHealth #AMR #ImpalaHealthtech
  `.trim();
};

export const generateLinkedInPost = (article: any, articleUrl: string) => {
  return `
🚀 ${article.title}

${extractIntroduction(article.content)}

We're excited to share this update on our work in health technology and research. 

Key highlights:
${extractKeyPoints(article.content)}

Read the full article: ${articleUrl}

#HealthTech #Research #Innovation #DigitalHealth #AMR #Uganda
  `.trim();
};

function extractFirstParagraph(html: string): string {
  // Strip HTML tags
  const text = html.replace(/<[^>]*>/g, "");
  // Get first 200 characters
  return text.substring(0, 200) + "...";
}

function extractKeyPoints(html: string): string {
  // Extract bullet points or first 3 sentences
  const text = html.replace(/<[^>]*>/g, "");
  const sentences = text.split(". ").slice(0, 3);
  return sentences.map(s => `• ${s}`).join("\n");
}
```

---

## 📊 **Complete Implementation**

### **Full Cloud Function File:**

Create: `functions/src/index.ts` (update existing):

```typescript
import * as functions from "firebase-functions";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import axios from "axios";

// Instagram posting
const postToInstagram = async (imageUrl: string, caption: string) => {
  const INSTAGRAM_ACCOUNT_ID = functions.config().meta?.instagram_id;
  const META_ACCESS_TOKEN = functions.config().meta?.access_token;

  if (!INSTAGRAM_ACCOUNT_ID || !META_ACCESS_TOKEN) {
    console.log("Instagram credentials not configured");
    return;
  }

  try {
    // Create media container
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media`,
      {
        image_url: imageUrl,
        caption: caption,
        access_token: META_ACCESS_TOKEN,
      }
    );

    const creationId = containerResponse.data.id;

    // Publish
    await axios.post(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
      {
        creation_id: creationId,
        access_token: META_ACCESS_TOKEN,
      }
    );

    console.log("✅ Posted to Instagram");
  } catch (error: any) {
    console.error("❌ Instagram error:", error.response?.data || error.message);
  }
};

// LinkedIn posting
const postToLinkedIn = async (
  title: string,
  text: string,
  articleUrl: string
) => {
  const LINKEDIN_ACCESS_TOKEN = functions.config().linkedin?.access_token;
  const LINKEDIN_ORG_ID = functions.config().linkedin?.org_id;

  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_ORG_ID) {
    console.log("LinkedIn credentials not configured");
    return;
  }

  try {
    const post = {
      author: `urn:li:organization:${LINKEDIN_ORG_ID}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: "ARTICLE",
          media: [
            {
              status: "READY",
              originalUrl: articleUrl,
              title: {
                text: title,
              },
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    await axios.post("https://api.linkedin.com/v2/ugcPosts", post, {
      headers: {
        Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    console.log("✅ Posted to LinkedIn");
  } catch (error: any) {
    console.error("❌ LinkedIn error:", error.response?.data || error.message);
  }
};

// Main trigger
export const autoPostArticleToSocial = onDocumentCreated(
  "articles/{articleId}",
  async (event) => {
    const article = event.data?.data();
    if (!article) return;

    const articleId = event.params.articleId;
    const articleUrl = `https://impalaresearch.com/articles/${articleId}`;

    console.log(`📝 New article published: ${article.title}`);

    // Generate captions
    const instagramCaption = `
📢 New Update: ${article.title}

${stripHtml(article.content).substring(0, 150)}...

🔗 Link in bio to read more!

#HealthTech #Innovation #Research #Uganda
    `.trim();

    const linkedInText = `
🚀 ${article.title}

${stripHtml(article.content).substring(0, 300)}...

Read the full article: ${articleUrl}

#HealthTech #Innovation #Research #DigitalHealth #AMR
    `.trim();

    // Post to platforms
    const postPromises = [];

    if (article.imageUrl) {
      postPromises.push(postToInstagram(article.imageUrl, instagramCaption));
    }

    postPromises.push(postToLinkedIn(article.title, linkedInText, articleUrl));

    await Promise.allSettled(postPromises);
    console.log("✅ Social media posting complete");
  }
);

// Helper function
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
```

---

## 🔧 **Setup Checklist**

### **Step-by-Step:**

- [ ] **Choose platform(s):** Instagram, LinkedIn, or both
- [ ] **Create developer accounts:**
  - [ ] Meta Developer account (for Instagram)
  - [ ] LinkedIn Developer account
- [ ] **Create apps and get credentials:**
  - [ ] Instagram Account ID + Access Token
  - [ ] LinkedIn Organization ID + Access Token
- [ ] **Install dependencies:**
  ```bash
  npm install axios
  ```
- [ ] **Add Cloud Function code** (see above)
- [ ] **Set Firebase config:**
  ```bash
  firebase functions:config:set meta.instagram_id="..."
  firebase functions:config:set meta.access_token="..."
  firebase functions:config:set linkedin.org_id="..."
  firebase functions:config:set linkedin.access_token="..."
  ```
- [ ] **Deploy:**
  ```bash
  firebase deploy --only functions
  ```
- [ ] **Test:** Publish an article and check social media!

---

## 🧪 **Testing**

### **Test the Integration:**

1. **Publish a test article:**
   - Login to admin
   - Create new article with title, content, image
   - Click "Publish"

2. **Check Firebase Logs:**
   ```bash
   firebase functions:log --only autoPostArticleToSocial
   ```

3. **Check Social Media:**
   - Instagram: Check your business account
   - LinkedIn: Check your company page
   - Should see new post within 1-2 minutes

4. **Verify:**
   - ✅ Caption correct?
   - ✅ Image displayed?
   - ✅ Link works?
   - ✅ Hashtags included?

---

## 💰 **Cost**

### **Free Option:**
- Meta API (Instagram): **FREE**
- LinkedIn API: **FREE**
- Firebase Functions: **FREE** (within free tier)

**Total: $0/month**

### **Paid Option (Buffer/Hootsuite):**
- All platforms in one: **$6-15/month**
- Includes analytics and scheduling

---

## 📊 **Summary**

### **Recommendation:**

**Best Setup for You:**
1. ✅ **LinkedIn API** (easiest, professional)
2. ✅ **Instagram Graph API** (free, direct)
3. ⏸️ Skip Buffer unless you want analytics

**Implementation Time:**
- LinkedIn: 30 minutes
- Instagram: 1 hour
- Total: ~1.5 hours

**Result:**
- ✅ Automatic posting when article published
- ✅ Consistent social media presence
- ✅ No manual posting needed
- ✅ Professional appearance

---

Would you like me to implement this? I can:
1. Create the Cloud Function files
2. Provide step-by-step credential setup
3. Test the integration

Let me know which platforms you want to start with! 🚀
