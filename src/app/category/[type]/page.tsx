'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, List, Filter } from 'lucide-react';
import { getArticlesByCategory, categories } from '@/data/mockArticles';
import ArticleCard from '@/components/ArticleCard';
import CategoryTabs from '@/components/CategoryTabs';
import { ArticleGridSkeleton, HorizontalCardSkeleton } from '@/components/SkeletonLoader';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewMode = 'grid' | 'list';

const categoryNames: Record<string, { te: string; en: string }> = {
  local: { te: 'స్థానిక వార్తలు', en: 'Local News' },
  state: { te: 'రాష్ట్ర వార్తలు', en: 'State News' },
  national: { te: 'జాతీయ వార్తలు', en: 'National News' },
  spiritual: { te: 'ఆధ్యాత్మిక వార్తలు', en: 'Spiritual News' },
  business: { te: 'వ్యాపార వార్తలు', en: 'Business News' },
  sports: { te: 'క్రీడా వార్తలు', en: 'Sports News' },
  movies: { te: 'సినిమా వార్తలు', en: 'Movie News' },
  agriculture: { te: 'వ్యవసాయ వార్తలు', en: 'Agriculture News' },
};

export default function CategoryPage() {
  const params = useParams();
  const categoryType = params.type as string;
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState(categoryType);
  const { language, t } = useLanguage();

  useEffect(() => { setLoading(true); const timer = setTimeout(() => setLoading(false), 800); return () => clearTimeout(timer); }, [categoryType]);
  useEffect(() => { setActiveCategory(categoryType); }, [categoryType]);

  const articles = getArticlesByCategory(categoryType);
  const categoryInfo = categoryNames[categoryType] || { te: 'వార్తలు', en: 'News' };
  const currentCategory = categories.find(c => c.id === categoryType);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" />
          <span>{t('హోమ్‌కు తిరిగి వెళ్ళండి', 'Back to Home')}</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{currentCategory?.icon || '📰'}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
              {language === 'te' ? categoryInfo.te : categoryInfo.en}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {language === 'te' ? categoryInfo.en : categoryInfo.te}
            </p>
          </div>
        </motion.div>

        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {articles.length} {t('వార్తలు కనుగొనబడ్డాయి', 'articles found')}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 overflow-hidden">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>
        <div className="flex items-center gap-1 rounded-xl p-1 flex-shrink-0" style={{ backgroundColor: 'var(--bg-parchment)' }}>
          <button onClick={() => setViewMode('grid')} className="p-2 rounded-lg transition-all" style={viewMode === 'grid' ? { backgroundColor: 'var(--primary)', color: 'white' } : { color: 'var(--text-tertiary)' }} aria-label="Grid view"><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className="p-2 rounded-lg transition-all" style={viewMode === 'list' ? { backgroundColor: 'var(--primary)', color: 'white' } : { color: 'var(--text-tertiary)' }} aria-label="List view"><List className="w-4 h-4" /></button>
        </div>
      </div>

      {loading ? (viewMode === 'grid' ? <ArticleGridSkeleton count={6} /> : <div className="space-y-2">{[1, 2, 3, 4, 5, 6].map((i) => <HorizontalCardSkeleton key={i} />)}</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <Filter className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('వార్తలు కనుగొనబడలేదు', 'No articles found')}
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {t('ఈ వర్గంలో ఇంకా వార్తలు లేవు.', 'There are no articles in this category yet.')}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
        </div>
      ) : (
        <div className="space-y-2 rounded-2xl p-4" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
          {articles.map((article, i) => <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />)}
        </div>
      )}
    </div>
  );
}
