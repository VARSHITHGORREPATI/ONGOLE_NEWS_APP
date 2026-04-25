'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, ChevronRight, Flame } from 'lucide-react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ArticleCard from '@/components/ArticleCard';
import CategoryTabs from '@/components/CategoryTabs';
import AdCarousel from '@/components/AdCarousel';
import EPaperPromo from '@/components/EPaperPromo';
import WeatherWidget from '@/components/WeatherWidget';
import { getFeaturedArticles, getLatestArticles, getTrendingArticles, getArticlesByCategory, categories } from '@/data/mockArticles';
import { ArticleGridSkeleton, HorizontalCardSkeleton } from '@/components/SkeletonLoader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { language, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles(6);
  const trendingArticles = getTrendingArticles();
  const categoryArticles = activeCategory === 'all' ? latestArticles : getArticlesByCategory(activeCategory);

  const categorySectionArticles = categories.slice(0, 4).map(cat => ({
    category: cat,
    articles: getArticlesByCategory(cat.id).slice(0, 3),
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-6">
        {loading ? <div className="px-4"><div className="aspect-[16/9] rounded-none md:rounded-3xl animate-pulse" style={{ backgroundColor: 'rgba(136, 136, 136, 0.1)' }} /></div> : <HeroSlider articles={featuredArticles} />}
      </section>

      <section className="mb-6">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </section>

      <section className="mb-8">
        <AdCarousel />
      </section>

      <section className="hidden md:block mb-8 px-4 md:px-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/category/${cat.id}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-colors whitespace-nowrap hover:bg-opacity-10" style={{ backgroundColor: 'var(--bg-sage)' }}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {language === 'te' ? cat.name : cat.nameEn}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                  {t('తాజా వార్తలు', 'Latest News')}
                </h2>
              </div>
              <Link href="/category/local" className="flex items-center gap-1 text-sm hover:underline" style={{ color: 'var(--primary)' }}>
                <span>{t('ఇంకా చూడండి', 'View More')}</span><ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? <ArticleGridSkeleton count={4} /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryArticles.slice(0, 4).map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
              </div>
            )}

            {!loading && categorySectionArticles.map(({ category, articles }) => (
              articles.length > 0 && (
                <div key={category.id} className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <h3 className="text-lg md:text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>{category.name}</h3>
                    </div>
                    <Link href={`/category/${category.id}`} className="flex items-center gap-1 text-sm hover:underline" style={{ color: 'var(--primary)' }}>
                      <span>More</span><ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {articles.map((article, i) => <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />)}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="space-y-6">
            <WeatherWidget />

            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <h3 className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                  {t('ట్రెండింగ్', 'Trending')}
                </h3>
              </div>
              {loading ? <div className="space-y-2">{[1, 2, 3].map((i) => <HorizontalCardSkeleton key={i} />)}</div> : <div className="space-y-1">{trendingArticles.slice(0, 4).map((article, i) => <ArticleCard key={article.id} article={article} variant="compact" index={i} />)}</div>}
            </div>

            <div className="ad-slot"><span className="text-sm font-medium">Ad Space</span></div>

            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent-green)' }} />
                <h3 className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                  {t('ఎక్కువగా చదివినవి', 'Most Read')}
                </h3>
              </div>
              {loading ? <div className="space-y-2">{[1, 2, 3].map((i) => <HorizontalCardSkeleton key={i} />)}</div> : (
                <div className="space-y-1">
                  {latestArticles.slice(0, 4).map((article, i) => (
                    <div key={article.id} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid rgba(243, 112, 33, 0.05)' }}>
                      <span className="text-2xl font-bold flex-shrink-0 w-8" style={{ color: 'rgba(243, 112, 33, 0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <Link href={`/article/${article.id}`} className="text-sm line-clamp-2 transition-colors hover:opacity-80" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{article.title}</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 mb-8">
        <EPaperPromo />
      </section>
    </div>
  );
}
