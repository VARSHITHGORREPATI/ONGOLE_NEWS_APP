# 🧪 API Testing Guide

Complete guide to test all backend APIs for OngoleConnect.

## 📋 Prerequisites

1. ✅ Supabase database schema executed
2. ✅ Environment variables configured in `.env.local`
3. ✅ Development server running: `npm run dev`

## 🔧 Setup

### 1. Run Database Schema

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Copy content from `supabase/schema.sql`
5. Paste and **Run**
6. Verify tables created in **Table Editor**

### 2. Install Testing Tool (Optional)

```bash
# Install httpie (better than curl)
npm install -g httpie

# Or use curl (built-in)
```

## 🧪 API Tests

### Test 1: News Ingestion API

#### Add Single Article to Queue
```bash
curl -X POST http://localhost:3000/api/news/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.thehindu.com/news/national/andhra-pradesh/",
    "name": "The Hindu",
    "language": "english"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Article processed successfully",
  "data": {
    "id": "uuid",
    "title": "...",
    "category": "local"
  }
}
```

#### Add Multiple Articles to Queue
```bash
curl -X POST http://localhost:3000/api/news/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "sources": [
      {
        "url": "https://example.com/news1",
        "name": "Source 1",
        "language": "english"
      },
      {
        "url": "https://example.com/news2",
        "name": "Source 2",
        "language": "telugu"
      }
    ]
  }'
```

#### Process Ingestion Queue
```bash
curl -X POST http://localhost:3000/api/news/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "processQueue": true,
    "limit": 10
  }'
```

#### Get Queue Status
```bash
curl http://localhost:3000/api/news/ingest
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "pending": 5,
    "processing": 2,
    "completed": 10,
    "failed": 1
  }
}
```

---

### Test 2: Posts API

#### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

#### Get Posts by Category
```bash
curl "http://localhost:3000/api/posts?category=local&limit=10"
```

#### Get Featured Posts
```bash
curl "http://localhost:3000/api/posts?featured=true"
```

#### Get Trending Posts
```bash
curl "http://localhost:3000/api/posts?trending=true"
```

#### Get Single Post
```bash
curl http://localhost:3000/api/posts/POST_ID_HERE
```

#### Create New Post (Admin)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "ఒంగోలు బుల్ ఫెస్టివల్",
    "title_en": "Ongole Bull Festival",
    "summary": "ఒంగోలు బుల్ ఫెస్టివల్ గొప్ప ఉత్సాహంతో జరిగింది",
    "summary_en": "Ongole Bull Festival celebrated with great enthusiasm",
    "content": "పూర్తి కథనం...",
    "content_en": "Full article...",
    "category": "local",
    "tags": ["festival", "ongole", "bull"],
    "featured": true,
    "published": true
  }'
```

#### Update Post (Admin)
```bash
curl -X PUT http://localhost:3000/api/posts/POST_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "featured": true,
    "trending": true
  }'
```

#### Delete Post (Admin)
```bash
curl -X DELETE http://localhost:3000/api/posts/POST_ID_HERE
```

---

### Test 3: Social Media API

#### Post to Social Media
```bash
curl -X POST http://localhost:3000/api/social/post \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "POST_ID_HERE",
    "platforms": ["facebook", "instagram"]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Posted to social media",
  "results": {
    "facebook": {
      "success": true,
      "postId": "fb_post_id"
    },
    "instagram": {
      "success": true,
      "mediaId": "ig_media_id"
    }
  }
}
```

#### Process Social Queue
```bash
curl -X POST http://localhost:3000/api/social/post \
  -H "Content-Type: application/json" \
  -d '{
    "processQueue": true,
    "limit": 5
  }'
```

#### Get Social Stats
```bash
curl http://localhost:3000/api/social/post
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "facebook": {
        "success": 10,
        "failed": 2,
        "pending": 0
      },
      "instagram": {
        "success": 8,
        "failed": 1,
        "pending": 0
      }
    },
    "queueCount": 5
  }
}
```

---

### Test 4: Cron Jobs (Manual Trigger)

#### Trigger News Ingestion Cron
```bash
curl http://localhost:3000/api/cron/ingest \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

#### Trigger Social Media Cron
```bash
curl http://localhost:3000/api/cron/social \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 🧪 Backend Testing Scripts

### Run Complete Backend Test
```bash
npx tsx scripts/test-backend.ts
```

This will test:
- ✅ Database connection
- ✅ AI processing (Gemini)
- ✅ Image upload (Cloudinary)
- ✅ News ingestion pipeline
- ✅ Database CRUD operations

### Ingest Sample News
```bash
npx tsx scripts/ingest-sample-news.ts
```

---

## 🔍 Debugging

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Click **Logs** in sidebar
3. View API logs, Database logs

### Check Cloudinary Dashboard
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. View uploaded images in Media Library

### Check Gemini API Usage
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. View API usage and quotas

---

## 📊 Expected Database State After Tests

### Posts Table
- Should have test articles
- Both Telugu and English content
- Proper categorization
- Images from Cloudinary

### Social Logs Table
- Logs of social media posts
- Success/failure status
- Platform post IDs

### Ingestion Queue Table
- Pending articles
- Processing status
- Error messages (if any)

---

## ⚠️ Common Issues

### Issue 1: "Failed to fetch article"
**Solution:** The URL might be blocked or require authentication. Try different news sources.

### Issue 2: "AI processing failed"
**Solution:** Check Gemini API key and quota limits.

### Issue 3: "Image upload failed"
**Solution:** Check Cloudinary credentials and image URL accessibility.

### Issue 4: "Database insert failed"
**Solution:** Verify Supabase schema is properly set up and RLS policies are correct.

### Issue 5: "Social media post failed"
**Solution:** 
- Check Meta credentials (PAGE_ACCESS_TOKEN, PAGE_ID, INSTAGRAM_BUSINESS_ID)
- Verify Facebook Page and Instagram Business Account are properly linked
- Check Meta API permissions

---

## 🚀 Production Deployment

### Vercel Cron Jobs
The `vercel.json` file configures automatic cron jobs:
- News ingestion: Every 2 hours
- Social media posting: Every hour

### Environment Variables on Vercel
Add all variables from `.env.local` to Vercel:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all variables

### Cron Secret (Recommended)
Add to `.env.local` and Vercel:
```
CRON_SECRET=your-random-secret-here
```

---

## 📈 Monitoring

### Key Metrics to Track
1. **Ingestion Success Rate**: Completed / Total
2. **Social Media Success Rate**: Posted / Total
3. **Average Processing Time**: Time per article
4. **Duplicate Detection Rate**: Duplicates / Total
5. **API Response Times**: Monitor with Vercel Analytics

### Recommended Tools
- **Vercel Analytics**: Built-in monitoring
- **Supabase Dashboard**: Database metrics
- **Cloudinary Dashboard**: Image usage
- **Google Cloud Console**: Gemini API usage

---

## ✅ Success Checklist

- [ ] Database schema executed successfully
- [ ] All environment variables configured
- [ ] Backend test script passes all tests
- [ ] Can create posts via API
- [ ] Can fetch posts via API
- [ ] News ingestion works end-to-end
- [ ] Images upload to Cloudinary
- [ ] AI processing generates Telugu content
- [ ] Social media posting works (if configured)
- [ ] Cron jobs configured on Vercel

---

## 🎯 Next Steps

1. **Integrate with Frontend**: Update admin panel to use new APIs
2. **Add Authentication**: Implement admin authentication
3. **Configure Social Media**: Set up Facebook and Instagram
4. **Deploy to Production**: Deploy to Vercel
5. **Monitor and Optimize**: Track performance and optimize

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review error logs in Supabase
3. Check API responses for error messages
4. Verify all environment variables are set correctly

**Backend is ready! 🎉**
