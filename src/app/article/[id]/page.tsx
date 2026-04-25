'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, ArrowLeft, Clock, User, Calendar, MessageCircle, Share } from 'lucide-react';
import { useState } from 'react';
import { getArticleById, getRelatedArticles } from '@/data/mockArticles';
import { getImageProps } from '@/lib/sanitizeImageUrl';
import ArticleCard from '@/components/ArticleCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = getArticleById(articleId);
  const [copied, setCopied] = useState(false);
  const { language, t } = useLanguage();

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('వార్త కనుగొనబడలేదు', 'Article Not Found')}
        </h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('మీరు వెతుకుతున్న వార్త ఉనికిలో లేదు.', 'The article you are looking for does not exist.')}
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>
          <ArrowLeft className="w-4 h-4" />
          {t('హోమ్‌కు వెళ్ళండి', 'Go Home')}
        </Link>
      </div>
    );
  }

  const imgProps = getImageProps(article.imageUrl);
  const relatedArticles = getRelatedArticles(article.id, article.category, 3);
  const title = language === 'te' ? article.title : article.titleEn;
  const summary = language === 'te' ? article.summary : article.summaryEn;
  const content = language === 'te' ? article.content : article.contentEn;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = title;
    switch (platform) {
      case 'facebook': window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); break;
      case 'twitter': window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank'); break;
      case 'linkedin': window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank'); break;
      case 'copy': navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); break;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return language === 'te' 
      ? date.toLocaleDateString('te-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <article className="max-w-4xl mx-auto">
      <div className="px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" />
          <span>{t('హోమ్‌కు తిరిగి వెళ్ళండి', 'Back to Home')}</span>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden">
        <Image src={imgProps.src} alt={title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 text-white text-xs font-medium rounded-full" style={{ backgroundColor: 'var(--primary)' }}>{article.category.toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="px-4 md:px-8 py-6">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm mb-6 pb-6" style={{ color: 'var(--text-tertiary)', borderBottom: '1px solid rgba(243, 112, 33, 0.1)' }}>
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.timestamp)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime} {t('నిమి చదవడం', 'min read')}</span>
        </div>

        <div className="rounded-2xl p-5 mb-8 border-l-4" style={{ backgroundColor: 'var(--bg-sage)', borderLeftColor: 'var(--primary)' }}>
          <p className="font-medium leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Ramabhadra, sans-serif' }}>
            {summary}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {t('షేర్ చేయండి:', 'Share:')}
          </span>
          {[
            { p: 'facebook', c: '#1877F2', b: 'rgba(24, 119, 242, 0.1)', icon: MessageCircle }, 
            { p: 'twitter', c: '#1DA1F2', b: 'rgba(29, 161, 242, 0.1)', icon: MessageCircle }, 
            { p: 'linkedin', c: '#0A66C2', b: 'rgba(10, 102, 194, 0.1)', icon: MessageCircle }
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.p} onClick={() => handleShare(s.p)} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:text-white" style={{ backgroundColor: s.b, color: s.c }} aria-label={`Share on ${s.p}`}>
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
          <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:text-white" style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)', color: 'var(--primary)' }} aria-label="Copy link">{copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}</button>
          <button onClick={() => { if (navigator.share) navigator.share({ title: title, text: summary, url: window.location.href }); }} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:text-white" style={{ backgroundColor: 'rgba(140, 198, 63, 0.1)', color: 'var(--accent-green)' }} aria-label="Share"><Share2 className="w-5 h-5" /></button>
        </div>

        <div className="drop-cap whitespace-pre-line text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Ramabhadra, sans-serif' }}>
          {content}
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}>
          {[`#${article.category}`, '#OngoleConnect', '#TeluguNews'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-secondary)' }}>{tag}</span>
          ))}
        </div>
      </motion.div>

      {relatedArticles.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-4 md:px-8 py-8" style={{ borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}>
          <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
            {t('సంబంధిత వార్తలు', 'Related Articles')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
          </div>
        </motion.section>
      )}
    </article>
  );
}
