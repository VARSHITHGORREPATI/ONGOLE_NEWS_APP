# Ongole Connect - ఒంగోలు కనెక్ట్ 🐂

**Your trusted source for Prakasam District News**

## 🎉 Status: FULLY IMPLEMENTED

Complete AI-powered news platform with automated ingestion, translation, and social media integration!

Ongole Connect is a modern, bilingual news platform serving the people of Ongole and Prakasam District in Andhra Pradesh, India. Named after the famous Ongole Bull (Ongole Cattle), a symbol of strength and pride for the region, this platform delivers local, state, and national news in both Telugu and English.

## 🌟 Features

### 🤖 Backend System (NEW!)
- **AI Translation**: Automatic Telugu ↔ English translation using Google Gemini
- **News Ingestion**: Fetch and process news from any URL
- **AI News Scraper**: Automatically fetch from 8 news sources (Zee News, Eenadu, Andhra Jyothy, Sakshi)
- **Smart Duplicate Detection**: URL matching + 75% title similarity detection
- **Image Optimization**: Cloudinary CDN with automatic optimization (16:9, 1200x675)
- **Database**: Supabase PostgreSQL with 6 tables and Row Level Security
- **Social Media**: Auto-post to Facebook & Instagram
- **Cron Jobs**: Automated news scraping (every 3 hours), ingestion (every 2 hours) & social posting (every hour)
- **Analytics**: Track views, shares, and engagement
- **Smart Categorization**: AI-powered content categorization
- **Queue Management**: Process articles systematically with retry logic

### 📰 News Management
- **Full CRUD Operations**: Create, Read, Update, and Delete news articles
- **Admin Panel**: Comprehensive admin interface at `/admin`
- **Rich Content**: Support for Telugu and English content with images
- **Categories**: Local, State, National, Spiritual, Business, Sports, Movies, Agriculture
- **Featured & Trending**: Mark articles as featured or trending

### 🌐 Bilingual Support
- **Language Toggle**: Switch between Telugu (తెలుగు) and English seamlessly
- **Complete Translation**: All UI elements and content available in both languages
- **Persistent Preference**: Language choice saved in browser

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Powered by Framer Motion
- **Beautiful Typography**: Custom Telugu fonts (Gurajada, Ramabhadra)
- **Ongole Bull Branding**: Iconic 🐂 emoji representing the famous Ongole cattle

### 📱 Additional Features
- Hero slider for featured articles
- Category-based navigation
- Trending and most-read sections
- Weather widget
- E-Paper promotion
- Mobile bottom navigation
- Notification system
- Search and filter functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)
- Cloudinary account (free tier works)
- Google Gemini API key (free tier works)

### Quick Setup (10 minutes)

1. **Clone and Install**
```bash
git clone <repository-url>
cd ongole-app
npm install
```

2. **Setup Database** (5 minutes)
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Open **SQL Editor**
   - Copy content from `supabase/schema.sql`
   - Paste and **Run**
   - Verify 6 tables created

3. **Test Backend** (2 minutes)
```bash
npm run test:backend
```
Expected: All 5 tests pass ✅

4. **Start Development Server**
```bash
npm run dev
```

5. **Open Browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

**See [QUICK_START.md](QUICK_START.md) for detailed instructions.**

## 📂 Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel for news management
│   ├── article/        # Article detail pages
│   ├── business/       # Business listings
│   ├── category/       # Category pages
│   ├── epaper/         # E-Paper section
│   ├── spiritual/      # Spiritual content
│   ├── api/            # Backend API routes (NEW!)
│   │   ├── news/       # News ingestion API
│   │   ├── posts/      # Posts CRUD API
│   │   ├── social/     # Social media API
│   │   └── cron/       # Automated cron jobs
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
├── contexts/           # React contexts (Language, Theme)
├── data/              # Mock data and initial content
├── lib/               # Backend modules (NEW!)
│   ├── supabase/      # Database client
│   ├── ai/            # AI processing (Gemini)
│   ├── cloudinary/    # Image processing
│   ├── ingestion/     # News ingestion pipeline
│   └── social/        # Social media integration
├── types/             # TypeScript type definitions
├── scripts/           # Testing and utility scripts (NEW!)
└── supabase/          # Database schema (NEW!)
```

## 🔧 Admin Panel

Access the admin panel at `/admin` to:
- Create new articles with Telugu and English content
- Edit existing articles
- Delete articles
- Mark articles as featured or trending
- Manage categories
- Upload images
- Set read time and author information

## 🧪 API Endpoints (NEW!)

### News Ingestion
- `POST /api/news/ingest` - Ingest news from URL
- `GET /api/news/ingest` - Get queue status

### Posts Management
- `GET /api/posts` - Get all posts (with filters)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Social Media
- `POST /api/social/post` - Post to social media
- `GET /api/social/post` - Get social stats

### Cron Jobs
- `GET /api/cron/ingest` - Trigger ingestion cron
- `GET /api/cron/social` - Trigger social cron

**See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for complete documentation.**

## 📚 Documentation (NEW!)

- **[START_HERE.md](START_HERE.md)** - Quick start guide
- **[TESTS_PASSING.md](TESTS_PASSING.md)** - Test results summary
- **[NEWS_SCRAPER_GUIDE.md](NEWS_SCRAPER_GUIDE.md)** - AI scraper complete guide
- **[SCRAPER_COMPLETE.md](SCRAPER_COMPLETE.md)** - Scraper implementation summary
- **[QUICK_START.md](QUICK_START.md)** - 10-minute setup
- **[BACKEND_COMPLETE_SUMMARY.md](BACKEND_COMPLETE_SUMMARY.md)** - Backend overview
- **[COMPLETE_BACKEND_GUIDE.md](COMPLETE_BACKEND_GUIDE.md)** - Comprehensive guide
- **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)** - API documentation
- **[BACKEND_SETUP_GUIDE.md](BACKEND_SETUP_GUIDE.md)** - Setup details

## 🌍 About Ongole

Ongole is a city in Prakasam District, Andhra Pradesh, India. It's famous for:
- **Ongole Cattle (Ongole Bull)**: A world-renowned breed of cattle known for strength and resilience
- **Agricultural Hub**: Major center for farming and livestock
- **Cultural Heritage**: Rich Telugu culture and traditions
- **Strategic Location**: Well-connected to major cities in Andhra Pradesh

## 🛠️ Technologies Used

### Frontend
- **Framework**: Next.js 14 (React App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Gurajada, Ramabhadra, Playfair Display, Inter)

### Backend (NEW!)
- **Database**: Supabase (PostgreSQL)
- **AI/ML**: Google Gemini Pro
- **Images**: Cloudinary CDN
- **Social Media**: Meta Graph API (Facebook + Instagram)
- **Automation**: Vercel Cron Jobs
- **APIs**: RESTful with Next.js API Routes

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:backend` - Test complete backend system (NEW!)
- `npm run ingest:sample` - Ingest sample news articles (NEW!)

## 🎯 System Architecture (NEW!)

```
News URL → Fetch HTML → Clean Content → AI Processing (Gemini)
                                              ↓
                                    Translate to Telugu
                                    Generate Summaries
                                    Categorize Article
                                    Extract Tags
                                              ↓
                                    Upload Image (Cloudinary)
                                              ↓
                                    Check Duplicates
                                              ↓
                                    Save to Database (Supabase)
                                              ↓
                                    Post to Social Media (FB + IG)
```

## 🎯 Future Enhancements

- ~~Backend integration with database~~ ✅ DONE
- ~~AI-powered translation~~ ✅ DONE
- ~~Automated news ingestion~~ ✅ DONE
- ~~Social media integration~~ ✅ DONE
- User authentication and roles
- Comment system
- Push notifications
- Advanced search
- Analytics dashboard
- RSS feed
- Mobile app

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For inquiries, please contact the development team.

## 📞 Contact

- **Email**: info@ongoleconnect.com
- **Phone**: +91 85920 12345
- **Address**: Main Road, Ongole, Prakasam District

---

Made with ❤️ for the people of Ongole and Prakasam District
