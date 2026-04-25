# 🤖 AI News Scraper Agent Guide

## Overview

The AI News Scraper Agent automatically fetches news from configured websites, processes them with AI, and posts to your platform with **automatic duplicate detection**.

---

## 📰 Configured News Sources

### English Sources
1. **Zee News**
   - National: https://zeenews.india.com/india
   - Andhra Pradesh: https://zeenews.india.com/andhra-pradesh

### Telugu Sources
2. **Eenadu**
   - Prakasam (Local): https://www.eenadu.net/telugu-news/andhra-pradesh/prakasam/
   - Andhra Pradesh (State): https://www.eenadu.net/telugu-news/andhra-pradesh/

3. **Andhra Jyothy**
   - Andhra Pradesh: https://www.andhrajyothy.com/andhra-pradesh
   - National: https://www.andhrajyothy.com/india

4. **Sakshi**
   - Andhra Pradesh: https://www.sakshi.com/andhra-pradesh
   - Prakasam: https://www.sakshi.com/andhra-pradesh/prakasam

**Total: 8 news sources**

---

## 🚀 How It Works

### 1. Fetch Articles
- Visits each news source homepage
- Extracts article URLs using intelligent selectors
- Finds 3-5 latest articles per source

### 2. Process with AI
- Fetches full article content
- Translates to Telugu (if English) or English (if Telugu)
- Generates summaries in both languages
- Categorizes automatically
- Extracts relevant tags

### 3. Duplicate Detection
- Checks source URL (exact match)
- Checks title similarity (>75%)
- Skips if already in database

### 4. Post to Platform
- Uploads images to Cloudinary
- Saves to Supabase database
- Marks as published
- Queues for social media

---

## 🎯 Usage

### Method 1: Run Manually via Script

```bash
# Scrape all sources (3 articles each)
npm run scraper:run

# Scrape all sources (5 articles each)
npx tsx scripts/run-scraper.ts all 5

# Scrape only local news
npm run scraper:local

# Scrape only state news
npm run scraper:state

# Scrape only Telugu sources
npm run scraper:telugu

# Scrape only English sources
npx tsx scripts/run-scraper.ts english 3
```

### Method 2: Run via API

```bash
# Scrape all sources
curl -X POST http://localhost:3000/api/scraper/run \
  -H "Content-Type: application/json" \
  -d '{"articlesPerSource": 5}'

# Scrape by category
curl -X POST http://localhost:3000/api/scraper/run \
  -H "Content-Type: application/json" \
  -d '{"category": "local", "articlesPerSource": 3}'

# Scrape by language
curl -X POST http://localhost:3000/api/scraper/run \
  -H "Content-Type: application/json" \
  -d '{"language": "telugu", "articlesPerSource": 5}'

# Scrape specific sources
curl -X POST http://localhost:3000/api/scraper/run \
  -H "Content-Type: application/json" \
  -d '{"sources": ["Eenadu", "Sakshi"], "articlesPerSource": 5}'
```

### Method 3: Automated (Cron Job)

The scraper runs automatically every 3 hours via Vercel Cron:
- Schedule: `0 */3 * * *` (every 3 hours)
- Endpoint: `/api/cron/scraper`
- Articles per source: 3

---

## 📊 Expected Output

```
🤖 Starting AI News Scraper Agent...

📊 Configuration:
   Articles per source: 3
   Total sources: 8

============================================================
📰 Processing: Zee News (english)
   URL: https://zeenews.india.com/india
   Category: national
============================================================

📰 Fetching articles from Zee News...
   Found 5 article URLs
   Processing: https://zeenews.india.com/india/article-1...
   ✅ Posted: Breaking News from Delhi...
   Processing: https://zeenews.india.com/india/article-2...
   ⏭️  Skipped (duplicate)
   Processing: https://zeenews.india.com/india/article-3...
   ✅ Posted: New Policy Announced...

📊 Zee News Summary:
   Found: 5
   Processed: 2
   Duplicates: 1
   Errors: 0

============================================================
📰 Processing: Eenadu (telugu)
   URL: https://www.eenadu.net/telugu-news/andhra-pradesh/prakasam/
   Category: local
============================================================

📰 Fetching articles from Eenadu...
   Found 4 article URLs
   Processing: https://www.eenadu.net/article-1...
   ✅ Posted: ప్రకాశం జిల్లా వార్తలు...
   Processing: https://www.eenadu.net/article-2...
   ✅ Posted: ఒంగోలు నుండి తాజా వార్తలు...

📊 Eenadu Summary:
   Found: 4
   Processed: 2
   Duplicates: 0
   Errors: 0

[... continues for all sources ...]

============================================================
🎉 AI News Scraper Agent Complete!
============================================================
📊 Overall Summary:
   Total articles found: 35
   Successfully processed: 18
   Duplicates skipped: 12
   Errors: 5
============================================================
```

---

## 🔍 Duplicate Detection

The scraper has **smart duplicate detection**:

### 1. URL-Based Detection
- Checks if source URL already exists in database
- 100% accurate for exact matches

### 2. Title Similarity Detection
- Compares article titles using Jaccard similarity
- Threshold: 75% similarity
- Catches same news from different sources

### Example:
```
Article 1: "PM Modi visits Andhra Pradesh"
Article 2: "PM Modi's visit to Andhra Pradesh"
Similarity: 80% → Marked as duplicate ✅
```

---

## ⚙️ Configuration

### Add New News Source

Edit `src/lib/ingestion/newsSources.ts`:

```typescript
{
  name: 'Your News Source',
  url: 'https://example.com/news',
  language: 'telugu', // or 'english'
  category: 'local', // or 'state', 'national'
  selectors: {
    articleLinks: '.news-item a', // CSS selector for article links
    title: 'h1.title', // CSS selector for title
    content: '.article-content', // CSS selector for content
    image: 'meta[property="og:image"]' // CSS selector for image
  }
}
```

### Adjust Scraping Frequency

Edit `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/scraper",
      "schedule": "0 */3 * * *"  // Every 3 hours
    }
  ]
}
```

Schedule options:
- `0 * * * *` - Every hour
- `0 */2 * * *` - Every 2 hours
- `0 */3 * * *` - Every 3 hours (current)
- `0 */6 * * *` - Every 6 hours
- `0 0 * * *` - Once daily at midnight

---

## 📈 Performance

### Speed
- ~2-3 seconds per article
- ~20-30 seconds per source (5 articles)
- ~3-5 minutes for all sources

### Rate Limiting
- 2 second delay between articles
- 3 second delay between sources
- Prevents IP blocking

### Resource Usage
- Minimal CPU usage
- ~50-100 MB memory per run
- Cloudinary: ~1-2 MB per image

---

## 🐛 Troubleshooting

### Issue: No articles found
**Cause:** Website structure changed
**Solution:** Update selectors in `newsSources.ts`

### Issue: Duplicate detection not working
**Cause:** Database not set up
**Solution:** Run `supabase/schema.sql` in Supabase

### Issue: AI translation failing
**Cause:** Invalid Gemini API key
**Solution:** Update `GEMINI_API_KEY` in `.env.local`

### Issue: Image upload failing
**Cause:** Invalid Cloudinary credentials
**Solution:** Verify Cloudinary credentials in `.env.local`

### Issue: Rate limiting / IP blocked
**Cause:** Too many requests
**Solution:** Increase delays in `newsScraperAgent.ts`

---

## 📊 Monitoring

### Check Scraper Status

```bash
# Get scraper configuration
curl http://localhost:3000/api/scraper/run

# Response:
{
  "success": true,
  "data": {
    "totalSources": 8,
    "sources": [...],
    "categories": ["local", "state", "national"],
    "languages": ["english", "telugu"]
  }
}
```

### Check Database

```sql
-- Check recent posts
SELECT title, source_name, created_at 
FROM posts 
ORDER BY created_at DESC 
LIMIT 10;

-- Check duplicates prevented
SELECT COUNT(*) as total_articles,
       COUNT(DISTINCT source_url) as unique_sources
FROM posts;

-- Check by source
SELECT source_name, COUNT(*) as articles
FROM posts
GROUP BY source_name
ORDER BY articles DESC;
```

---

## 🎯 Best Practices

### 1. Start Small
```bash
# Test with 1 article per source first
npx tsx scripts/run-scraper.ts all 1
```

### 2. Monitor First Run
- Watch console output
- Check for errors
- Verify posts in database

### 3. Adjust Frequency
- Start with every 6 hours
- Increase to every 3 hours if stable
- Monitor for duplicates

### 4. Review Duplicates
- Check duplicate rate
- If >50%, sources overlap too much
- Consider removing redundant sources

### 5. Update Selectors
- Websites change frequently
- Test scraper monthly
- Update selectors as needed

---

## 🔐 Security

### API Protection
- Cron endpoints protected with `CRON_SECRET`
- Set in `.env.local`
- Required in Authorization header

### Rate Limiting
- Built-in delays prevent blocking
- Respects robots.txt
- Uses proper User-Agent

### Data Privacy
- Only public news articles
- No personal data collected
- Complies with copyright (fair use)

---

## 📝 API Reference

### POST /api/scraper/run

Run the scraper manually.

**Request Body:**
```json
{
  "articlesPerSource": 5,  // Optional, default: 5
  "category": "local",     // Optional: local, state, national
  "language": "telugu",    // Optional: telugu, english
  "sources": ["Eenadu"]    // Optional: specific sources
}
```

**Response:**
```json
{
  "success": true,
  "message": "News scraper agent completed",
  "data": {
    "totalArticlesFound": 35,
    "totalArticlesProcessed": 18,
    "totalDuplicates": 12,
    "totalErrors": 5,
    "results": [...]
  }
}
```

### GET /api/scraper/run

Get scraper configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSources": 8,
    "sources": [...],
    "categories": ["local", "state", "national"],
    "languages": ["english", "telugu"]
  }
}
```

### GET /api/cron/scraper

Automated cron endpoint (protected).

**Headers:**
```
Authorization: Bearer YOUR_CRON_SECRET
```

---

## ✅ Success Checklist

- [ ] Database schema executed
- [ ] All environment variables set
- [ ] Test scraper with 1 article: `npx tsx scripts/run-scraper.ts all 1`
- [ ] Verify posts in database
- [ ] Check duplicate detection working
- [ ] Test each news source individually
- [ ] Configure cron job schedule
- [ ] Monitor first automated run
- [ ] Set up error alerts

---

## 🎉 You're Ready!

Your AI News Scraper Agent is configured and ready to automatically fetch, process, and post news from:
- ✅ Zee News (English)
- ✅ Eenadu (Telugu)
- ✅ Andhra Jyothy (Telugu)
- ✅ Sakshi (Telugu)

**With automatic duplicate detection and AI processing!**

🐂 **OngoleConnect - Automated News Platform**
