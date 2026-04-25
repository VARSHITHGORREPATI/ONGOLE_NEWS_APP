'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { Article } from '@/types';
import { getImageProps } from '@/lib/sanitizeImageUrl';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured' | 'horizontal';
  index?: number;
}

function timeAgo(timestamp: string, language: 'te' | 'en'): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (language === 'te') {
    if (diffMins < 1) return 'ఇప్పుడే';
    if (diffMins < 60) return `${diffMins} నిమిషాల క్రితం`;
    if (diffHours < 24) return `${diffHours} గంటల క్రితం`;
    if (diffDays < 7) return `${diffDays} రోజుల క్రితం`;
    return past.toLocaleDateString('te-IN');
  } else {
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return past.toLocaleDateString('en-US');
  }
}

const categoryColors: Record<string, string> = {
  local: '#F37021', state: '#2B6CB0', national: '#8CC63F', spiritual: '#FFB600',
  business: '#E53E3E', sports: '#38A169', movies: '#805AD5', agriculture: '#D69E2E',
};

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const imgProps = getImageProps(article.imageUrl);
  const categoryColor = categoryColors[article.category] || '#F37021';
  const { language, t } = useLanguage();
  
  const title = language === 'te' ? article.title : article.titleEn;
  const summary = language === 'te' ? article.summary : article.summaryEn;

  if (variant === 'featured') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
        <Link href={`/article/${article.id}`} className="group block">
          <div className="relative aspect-video rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <Image src={imgProps.src} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 800px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2" style={{ backgroundColor: categoryColor }}>
                {article.category.toUpperCase()}
              </span>
              <h2 className="text-white font-bold text-lg md:text-xl leading-snug line-clamp-2 mb-2" style={{ fontFamily: 'Ramabhadra, sans-serif' }}>
                {title}
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(article.timestamp, language)}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.readTime} {t('నిమి చదవడం', 'min read')}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
        <Link href={`/article/${article.id}`} className="group flex gap-4 p-3 rounded-2xl transition-colors hover:bg-opacity-5" style={{ color: 'var(--text-primary)' }}>
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ boxShadow: 'var(--shadow-card)' }}>
            <Image src={imgProps.src} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium text-white mb-1" style={{ backgroundColor: categoryColor }}>
              {article.category.toUpperCase()}
            </span>
            <h3 className="text-sm font-semibold line-clamp-2 leading-snug mb-1" style={{ fontFamily: 'Ramabhadra, sans-serif', color: 'var(--text-primary)' }}>
              {title}
            </h3>
            <p className="text-xs line-clamp-1 mb-1" style={{ color: 'var(--text-tertiary)' }}>{summary}</p>
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{timeAgo(article.timestamp, language)}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
        <Link href={`/article/${article.id}`} className="group flex gap-3 py-3" style={{ borderBottom: '1px solid rgba(243, 112, 33, 0.05)' }}>
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={imgProps.src} alt={title} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium line-clamp-2 leading-snug" style={{ fontFamily: 'Ramabhadra, sans-serif', color: 'var(--text-primary)' }}>
              {title}
            </h4>
            <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-tertiary)' }}>{timeAgo(article.timestamp, language)}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
      <Link href={`/article/${article.id}`} className="group block">
        <div className="rounded-3xl overflow-hidden transition-shadow hover:shadow-elevated" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={imgProps.src} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 400px" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-medium text-white" style={{ backgroundColor: categoryColor }}>
              {article.category.toUpperCase()}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold line-clamp-2 leading-snug mb-2" style={{ fontFamily: 'Ramabhadra, sans-serif', color: 'var(--text-primary)' }}>
              {title}
            </h3>
            <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{summary}</p>
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(article.timestamp, language)}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.readTime} {t('నిమి', 'min')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
