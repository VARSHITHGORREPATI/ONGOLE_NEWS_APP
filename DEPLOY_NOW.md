# 🚀 DEPLOY TO VERCEL - QUICK START

## ⚡ 3-Minute Deployment

### Step 1: Go to Vercel
👉 **https://vercel.com/new**

### Step 2: Import Your GitHub Repo
1. Click "Import Git Repository"
2. Select: **VARSHITHGORREPATI/ONGOLE_NEWS_APP**
3. Click "Import"

### Step 3: Add Environment Variables
Copy and paste these into Vercel's Environment Variables section:

```env
SUPABASE_URL=https://euypkjegbawiiskufdow.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eXBramVnYmF3aWlza3VmZG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5OTU3MDAsImV4cCI6MjA5MjU3MTcwMH0.mE4nugj87sxJa7aW-wwfbDi4JZyw18P1UQkAyLEn19M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eXBramVnYmF3aWlza3VmZG93Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk5NTcwMCwiZXhwIjoyMDkyNTcxNzAwfQ.vAajHAJ5S5ZXnJUJdKSSyr4Zukm5jw_C-8RaP3O65Ms
GEMINI_API_KEY=AIzaSyBIf7btoowvTbczndtaY11nI1croUBCNMs
CLOUDINARY_CLOUD_NAME=dckr64n9u
CLOUDINARY_API_KEY=753139177247747
CLOUDINARY_API_SECRET=eqRIkurspXxRGrwT_LjvaY4qy0s
CRON_SECRET=ongole-news-2026-secure-cron-key
NODE_ENV=production
```

**IMPORTANT**: Set these for **Production**, **Preview**, AND **Development** environments!

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
