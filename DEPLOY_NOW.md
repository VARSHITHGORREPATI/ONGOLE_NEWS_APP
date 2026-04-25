# 🚀 DEPLOY TO VERCEL - QUICK START

## ⚡ 3-Minute Deployment

### Step 1: Go to Vercel
👉 **https://vercel.com/new**

### Step 2: Import Your GitHub Repo
1. Click "Import Git Repository"
2. Select: **VARSHITHGORREPATI/ONGOLE_NEWS_APP**
3. Click "Import"

### Step 3: Add Environment Variables
⚠️ **Copy your actual credentials from your local `.env.local` file**

Add these variables in Vercel (one by one):

```env
SUPABASE_URL=<from your .env.local>
SUPABASE_ANON_KEY=<from your .env.local>
SUPABASE_SERVICE_ROLE_KEY=<from your .env.local>
GEMINI_API_KEY=<from your .env.local>
CLOUDINARY_CLOUD_NAME=<from your .env.local>
CLOUDINARY_API_KEY=<from your .env.local>
CLOUDINARY_API_SECRET=<from your .env.local>
CRON_SECRET=<create a random secure string>
NODE_ENV=production
```

**IMPORTANT**: 
- Use YOUR actual values from `.env.local` (don't use placeholders)
- Set for **Production**, **Preview**, AND **Development** environments
- Never commit real credentials to GitHub!

### Step 4: Deploy
Click **"Deploy"** and wait 2-3 minutes ⏱️

### Step 5: Done! 🎉
Your app will be live at: `https://your-app-name.vercel.app`

---

## 🔍 After Deployment

### Test Your Site
- **Homepage**: `https://your-app.vercel.app`
- **Admin Panel**: `https://your-app.vercel.app/admin`
- **API Test**: `https://your-app.vercel.app/api/posts`

### Verify Cron Jobs
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Cron Jobs"
3. You should see 3 cron jobs:
   - News Scraper (every 3 hours)
   - News Ingestion (every 2 hours)
   - Social Posting (every hour)

### Update App URL
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_APP_URL=https://your-actual-url.vercel.app`
3. Redeploy

---

## 🆘 Need Help?

See **VERCEL_DEPLOYMENT_GUIDE.md** for detailed instructions and troubleshooting.

---

## ✅ What Happens After Deployment?

Your AI-powered news platform will:
- ✅ Automatically scrape news every 3 hours
- ✅ Translate articles to Telugu & English
- ✅ Detect and skip duplicates
- ✅ Optimize images via Cloudinary
- ✅ Store everything in Supabase
- ✅ Display on your live website

**Your Ongole News App is ready to go LIVE! 🐂**
