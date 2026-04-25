'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data/mockArticles';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryTabsProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoryTabs({ activeCategory = 'all', onCategoryChange }: CategoryTabsProps) {
  const { language, t } = useLanguage();
  
  const handleClick = (categoryId: string) => {
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide">
        <Link href="/" onClick={() => handleClick('all')} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all" style={activeCategory === 'all' ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 2px 8px rgba(243, 112, 33, 0.3)' } : { backgroundColor: 'var(--bg-sage)', color: 'var(--text-secondary)' }}>
          {t('అన్నీ', 'All')}
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.id}`} onClick={() => handleClick(cat.id)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all" style={activeCategory === cat.id ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 2px 8px rgba(243, 112, 33, 0.3)' } : { backgroundColor: 'var(--bg-sage)', color: 'var(--text-secondary)' }}>
            {cat.icon} {language === 'te' ? cat.name : cat.nameEn}
          </Link>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-2 w-8 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />
    </div>
  );
}
