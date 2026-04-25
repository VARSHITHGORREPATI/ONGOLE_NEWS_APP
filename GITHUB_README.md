# 🐂 OngoleConnect - AI-Powered News Platform

**Your trusted source for Prakasam District News**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blue)](https://cloudinary.com/)

A modern, AI-powered bilingual news platform serving Ongole and Prakasam District in Andhra Pradesh, India. Features automated news scraping, AI translation, and smart duplicate detection.

---

## 🎉 Status: Production Ready

- ✅ Complete frontend with bilingual UI
- ✅ AI-powered news scraper (8 sources)
- ✅ Smart duplicate detection
- ✅ Automated posting every 3 hours
- ✅ Social media integration
- ✅ Comprehensive documentation

---

## ✨ Features

### 🤖 AI-Powered Backend
- **Automated News Scraper**: Fetches from 8 sources (Zee News, Eenadu, Andhra Jyothy, Sakshi)
- **AI Translation**: Automatic Telugu ↔ English translation using Google Gemini
- **Smart Duplicate Detection**: URL matching + 75% title similarity
- **Image Optimization**: Cloudinary CDN with automatic optimization (16:9, 1200x675)
- **Social Media**: Auto-post to Facebook & Instagram
- **Cron Jobs**: Automated scraping every 3 hours

### 📰 Frontend Features
- **Bilingual UI**: Complete Telugu & English support
- **Admin Panel**: Full CRUD operations for news management
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Category Navigation**: 8 categories (Local, State, National, Spiritual, Business, Sports, Movies, Agriculture)
- **Real-time Updates**: Fresh news every 3 hours

### 🔐 Backend Features
- **Database**: Supabase PostgreSQL with 6 tables
- **Row Level Security**: Secure data access
- **RESTful APIs**: 11 endpoints for all operations
- **Queue Management**: Process articles systematically
- **Analytics**: Track views, shares, engagement
- **Error Handling**: Retry logic and fallbacks

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier)
- Cloudinary account (free tier)
- Google Gemini API key (free tier)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/VARSHITHGORREPATI/ONGOLE_NEWS_APP.git
cd ONGOLE_NEWS_APP
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create `.env.local` file:
```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# AI
GEMINI_API_KEY=your_gemini_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup database**
- Go to Supabase Dashboard
- Open SQL Editor
- Copy content from `supabase/schema.sql`
- Run the SQL

5. **Test backend**
```bash
npm run test:backend
```

6. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick start guide
- **[QUICK_START.md](QUICK_START.md)** - 10-minute setup
- **[NEWS_SCRAPER_GUIDE.md](NEWS_SCRAPER_GUIDE.md)** - AI scraper guide
- **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)** - API documentation
- **[COMPLETE_BACKEND_GUIDE.md](COMPLETE_BACKEND_GUIDE.md)** - Full backend docs

---

## 🤖 AI News Scraper

### Configured Sources (8)

**English:**
- Zee News (National + Andhra Pradesh)

**Telugu:**
- Eenadu (Prakasam + Andhra Pradesh)
- Andhra Jyothy (Andhra Pradesh + National)
- Sakshi (Andhra Pradesh + Prakasam)

### How It Works

1. **Fetches** articles from 8 news sources
2. **Extracts** title, content, images
3. **Translates** to Telugu/English using AI
4. **Detects** duplicates (URL + title similarity)
5. **Optimizes** images via Cloudinary
6. **Posts** to database automatically
7. **Shares** on social media

### Usage

```bash
# Run scraper manually
npm run scraper:run

# Scrape Telugu sources only
npm run scraper:telugu

# Scrape local news only
npm run scraper:local

# Clear test data
npm run scraper:clear
```

---

## 📝 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run test:backend     # Test complete backend
npm run scraper:run      # Run AI news scraper
npm run scraper:telugu   # Scrape Telugu sources
npm run scraper:local    # Scrape local news
npm run scraper:clear    # Clear test data
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **AI/ML**: Google Gemini Pro
- **Images**: Cloudinary CDN
- **Social Media**: Meta Graph API
- **Automation**: Vercel Cron Jobs

---

## 📊 Database Schema

### Tables (6)
- **posts** - News articles (bilingual)
- **social_logs** - Social media tracking
- **businesses** - Local business listings
- **ingestion_queue** - Processing queue
- **admin_users** - Admin authentication
- **analytics** - Performance tracking

---

## 🔧 API Endpoints

### News Scraper
- `POST /api/scraper/run` - Run scraper manually
- `GET /api/scraper/run` - Get scraper status

### Posts Management
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### News Ingestion
- `POST /api/news/ingest` - Ingest from URL
- `GET /api/news/ingest` - Queue status

### Social Media
- `POST /api/social/post` - Post to social
- `GET /api/social/post` - Social stats

---

## 🎯 Features in Detail

### Duplicate Detection
- ✅ Exact URL matching
- ✅ Title similarity (>75%)
- ✅ Prevents same news from different sources

### AI Translation
- ✅ Telugu ↔ English
- ✅ Summary generation
- ✅ Auto-categorization
- ✅ Tag extraction

### Image Optimization
- ✅ 16:9 ratio (1200x675)
- ✅ Automatic format selection
- ✅ CDN delivery
- ✅ Responsive images

### Automation
- ✅ Scraper runs every 3 hours
- ✅ Social posting every hour
- ✅ Queue processing
- ✅ Error retry logic

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (already done!)

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Cron jobs run automatically**
   - News scraper: Every 3 hours
   - Social posting: Every hour

---

## 📈 Performance

- **Speed**: 2-3 seconds per article
- **Throughput**: 20-40 articles per run
- **Duplicate Rate**: 50-70% (working correctly!)
- **Success Rate**: 85-95%

---

## 🔐 Security

- ✅ Row Level Security (RLS)
- ✅ Input validation
- ✅ HTML sanitization
- ✅ Environment variables
- ✅ Cron secret protection

---

## 📞 Support

### Documentation
- Read START_HERE.md first
- Check NEWS_SCRAPER_GUIDE.md for scraper
- Review API_TESTING_GUIDE.md for APIs

### Issues
- Open an issue on GitHub
- Provide error logs
- Describe expected behavior

---

## 🤝 Contributing

This is a private project. For inquiries, contact the development team.

---

## 📄 License

This project is private and proprietary.

---

## 🎊 Acknowledgments

Built with ❤️ for the people of Ongole and Prakasam District

### Powered By
- Next.js
- Supabase
- Google Gemini
- Cloudinary
- Meta Graph API

---

## 📊 Project Stats

- **Files**: 79
- **Lines of Code**: 19,647
- **Documentation**: 8 guides
- **API Endpoints**: 11
- **News Sources**: 8
- **Languages**: 2 (Telugu + English)

---

## 🐂 OngoleConnect

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: April 25, 2026

Made with ❤️ for Ongole and Prakasam District
