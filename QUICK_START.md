# 🚀 Quick Start Guide - OngoleConnect Backend

## ⚡ 3-Step Setup (10 minutes)

### Step 1: Setup Database (5 min)

1. **Open Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   Project: euypkjegbawiiskufdow
   ```

2. **Run Database Schema**
   - Click **SQL Editor** (left sidebar)
   - Click **New Query**
   - Open file: `supabase/schema.sql`
   - Copy ALL content
   - Paste in SQL Editor
   - Click **RUN** button

3. **Verify Tables**
   - Click **Table Editor** (left sidebar)
   - You should see 6 tables:
     - posts ✅
     - social_logs ✅
     - businesses ✅
     - ingestion_queue ✅
     - admin_users ✅
     - analytics ✅

### Step 2: Test Backend (2 min)

```bash
npm run test:backend
```

**Expected Output:**
```
🚀 Starting Backend Tests...
✅ DATABASE: PASSED
✅ AI: PASSED
✅ IMAGE: PASSED
✅ INGESTION: PASSED
✅ OPERATIONS: PASSED
🎉 All tests passed!
```

### Step 3: Start Development Server (1 min)

```bash
npm run dev
```

Server starts at: http://localhost:3000

---

## 🧪 Quick API Tests

### Test 1: Create a Post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "ఒంగోలు వార్తలు",
    "title_en": "Ongole News",
    "summary": "ఒంగోలు నుండి తాజా వార్తలు",
    "summary_en": "Latest news from Ongole",
    "content": "ఇది ఒక టెస్ట్ వార్త",
    "content_en": "This is a test news",
    "category": "local",
    "published": true
  }'
```

### Test 2: Get All Posts

```bash
curl http://localhost:3000/api/posts
```

### Test 3: Ingest News from URL

```bash
curl -X POST http://localhost:3000/api/news/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.thehindu.com/news/national/andhra-pradesh/",
    "name": "The Hindu"
  }'
```

---

## 📊 What You Have

### ✅ Complete Backend System
- Database with 6 tables
- AI translation (Telugu ↔ English)
- Image optimization (Cloudinary)
- News ingestion pipeline
- Social media integration
- RESTful APIs
- Automated cron jobs

### ✅ Key Features
- Fetch news from any URL
- Automatic Telugu translation
- Smart categorization
- Duplicate detection
- Image optimization
- Social media posting
- Analytics tracking

---

## 📚 Documentation

- **BACKEND_COMPLETE_SUMMARY.md** - Overview & status
- **COMPLETE_BACKEND_GUIDE.md** - Comprehensive guide
- **API_TESTING_GUIDE.md** - API documentation
- **BACKEND_SETUP_GUIDE.md** - Setup details

---

## 🎯 Next Steps

1. ✅ Database setup complete
2. ✅ Backend tests passing
3. ✅ APIs working
4. → Integrate with admin panel
5. → Deploy to Vercel

---

## 🐛 Troubleshooting

### Tests Failing?
- Check `.env.local` has all credentials
- Verify Supabase schema is executed
- Check internet connection

### API Not Working?
- Ensure dev server is running (`npm run dev`)
- Check port 3000 is not in use
- Verify environment variables

### Need Help?
- Read COMPLETE_BACKEND_GUIDE.md
- Check API_TESTING_GUIDE.md
- Review error messages

---

## 🎉 Success!

Your backend is ready! Time to:
1. Integrate with frontend
2. Deploy to production
3. Start serving news! 🐂

**OngoleConnect - Built for Prakasam District**
