# 🚀 Vercel Deployment Guide - Ongole News App

## Prerequisites
- GitHub account with code pushed to: https://github.com/VARSHITHGORREPATI/ONGOLE_NEWS_APP
- Vercel account (sign up at https://vercel.com)

---

## 🎯 Step-by-Step Deployment

### Step 1: Install Vercel CLI (Optional - for CLI deployment)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (RECOMMENDED)

#### A. Go to Vercel Dashboard
1. Visit https://vercel.com/new
2. Sign in with your GitHub account
3. Click "Import Project"

#### B. Import Your Repository
1. Select "Import Git Repository"
2. Find and select: `VARSHITHGORREPATI/ONGOLE_NEWS_APP`
3. Click "Import"

#### C. Configure Project Settings
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `next build` (auto-detected)
4. **Output Directory**: `.next` (auto-detected)
5. **Install Command**: `npm install` (auto-detected)

#### D. Add Environment Variables
Click "Environment Variables" and add ALL of these:

```env
# Supabase (REQUIRED)
SUPABASE_URL=https://euypkjegbawiiskufdow.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eXBramVnYmF3aWlza3VmZG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5OTU3MDAsImV4cCI6MjA5MjU3MTcwMH0.mE4nugj87sxJa7aW-wwfbDi4JZyw18P1UQkAyLEn19M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eXBramVnYmF3aWlza3VmZG93Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk5NTcwMCwiZXhwIjoyMDkyNTcxNzAwfQ.vAajHAJ5S5ZXnJUJdKSSyr4Zukm5jw_C-8RaP3O65Ms

# AI (REQUIRED)
GEMINI_API_KEY=AIzaSyBIf7btoowvTbczndtaY11nI1croUBCNMs

# Cloudinary (REQUIRED)
CLOUDINARY_CLOUD_NAME=dckr64n9u
CLOUDINARY_API_KEY=753139177247747
CLOUDINARY_API_SECRET=eqRIkurspXxRGrwT_LjvaY4qy0s

# Cron Security (REQUIRED)
CRON_SECRET=ongole-news-2026-secure-cron-key

# App Config (REQUIRED)
NODE_ENV=production

# Meta/Facebook (OPTIONAL - Add later)
META_PAGE_ACCESS_TOKEN=
META_PAGE_ID=
INSTAGRAM_BUSINESS_ID=

# News API (OPTIONAL)
NEWS_API_KEY=
```

**IMPORTANT**: 
- Make sure to add ALL environment variables
- Set them for "Production", "Preview", and "Development" environments
- Double-check there are no extra spaces or line breaks

#### E. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a live URL like: `https://ongole-news-app.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Step 3: Enable Cron Jobs
Vercel cron jobs are automatically enabled from `vercel.json`:
- **News Scraper**: Runs every 3 hours (`/api/cron/scraper`)
- **News Ingestion**: Runs every 2 hours (`/api/cron/ingest`)
- **Social Posting**: Runs every hour (`/api/cron/social`)

To verify cron jobs:
1. Go to your project dashboard on Vercel
2. Click "Settings" → "Cron Jobs"
3. You should see 3 cron jobs listed

### Step 4: Update NEXT_PUBLIC_APP_URL
After deployment, update the app URL:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Update: `NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app`
3. Redeploy (Settings → Deployments → Latest → Redeploy)

### Step 5: Test Your Deployment
Visit these URLs to verify everything works:

```
# Homepage
https://your-app-name.vercel.app

# Admin Panel
https://your-app-name.vercel.app/admin

# Test API (should return "Scraper is running...")
https://your-app-name.vercel.app/api/scraper/run

# Test Posts API (should return articles)
https://your-app-name.vercel.app/api/posts
```

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `ongole-news.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

---

## 🔒 Security Recommendations

### 1. Secure Cron Endpoints
Your cron endpoints are protected with `CRON_SECRET`. To manually trigger:

```bash
curl -X POST https://your-app.vercel.app/api/cron/scraper \
  -H "Authorization: Bearer ongole-news-2026-secure-cron-key"
```

### 2. Rotate Secrets (Recommended)
After deployment, consider rotating:
- `CRON_SECRET` - Change to a random 32-character string
- `GEMINI_API_KEY` - Get a fresh key from Google AI Studio

### 3. Enable Supabase RLS (Row Level Security)
Go to Supabase Dashboard → Authentication → Policies and enable RLS on tables.

---

## 📊 Monitoring & Logs

### View Deployment Logs
1. Vercel Dashboard → Your Project → Deployments
2. Click on any deployment
3. View "Build Logs" and "Function Logs"

### Monitor Cron Jobs
1. Vercel Dashboard → Your Project → Logs
2. Filter by function: `/api/cron/scraper`
3. Check for errors or successful runs

### Check Database
1. Go to Supabase Dashboard
2. Table Editor → `posts` table
3. Verify new articles are being added

---

## 🐛 Troubleshooting

### Build Fails
**Error**: "Module not found"
**Solution**: Make sure all dependencies are in `package.json`, not just `devDependencies`

### Cron Jobs Not Running
**Error**: Cron jobs don't trigger
**Solution**: 
- Verify `vercel.json` is in root directory
- Check you're on a paid Vercel plan (Hobby or Pro)
- Free tier has limited cron job support

### Environment Variables Not Working
**Error**: "SUPABASE_URL is required"
**Solution**:
- Go to Settings → Environment Variables
- Make sure variables are set for "Production" environment
- Redeploy after adding variables

### Images Not Loading
**Error**: 403 or broken images
**Solution**: 
- Verify Cloudinary credentials
- Check CORS settings in Cloudinary dashboard
- System uses placeholder images as fallback

### Gemini API Errors
**Error**: "API key invalid"
**Solution**:
- Get new key from https://aistudio.google.com/apikey
- Update `GEMINI_API_KEY` in Vercel environment variables
- System works with fallback (no translation) if key is invalid

---

## 🚀 Alternative: CLI Deployment

If you prefer command line:

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: ongole-news-app
# - Directory: ./
# - Override settings? No

# Add environment variables via CLI
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
# ... (add all variables)

# Redeploy
vercel --prod
```

---

## ✅ Deployment Checklist

Before going live, verify:

- [ ] All environment variables added to Vercel
- [ ] Build completes successfully
- [ ] Homepage loads correctly
- [ ] Admin panel accessible at `/admin`
- [ ] API endpoints return data (`/api/posts`)
- [ ] Cron jobs are scheduled (check Settings → Cron Jobs)
- [ ] Database connection works (check Supabase logs)
- [ ] Images load from Cloudinary
- [ ] Language toggle works (Telugu ↔ English)
- [ ] News scraper runs successfully (check `/api/scraper/run`)

---

## 📞 Support

### Vercel Documentation
- https://vercel.com/docs
- https://vercel.com/docs/cron-jobs

### Project Documentation
- `README.md` - Project overview
- `API_TESTING_GUIDE.md` - API endpoints
- `NEWS_SCRAPER_GUIDE.md` - Scraper details
- `BACKEND_SETUP_GUIDE.md` - Backend configuration

---

## 🎉 Success!

Once deployed, your Ongole News App will be live at:
**https://your-app-name.vercel.app**

The AI scraper will automatically fetch news every 3 hours from:
- Zee News (English)
- Eenadu (Telugu)
- Andhra Jyothy (Telugu)
- Sakshi (Telugu)

Articles will be automatically:
✅ Translated to Telugu & English
✅ Categorized by AI
✅ Optimized images via Cloudinary
✅ Stored in Supabase
✅ Displayed on your site

**Your local news platform is now LIVE! 🐂**
