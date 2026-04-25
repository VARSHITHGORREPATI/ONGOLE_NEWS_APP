'use client';

import { motion } from 'framer-motion';

function PulseBox({ className }: { className: string }) {
  return <div className={`animate-pulse ${className}`} style={{ backgroundColor: 'rgba(136, 136, 136, 0.1)' }} />;
}

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
      <PulseBox className="aspect-[16/9]" />
      <div className="p-4 space-y-3">
        <PulseBox className="h-4 rounded w-20" />
        <PulseBox className="h-5 rounded" />
        <PulseBox className="h-5 rounded w-3/4" />
        <PulseBox className="h-3 rounded" />
        <PulseBox className="h-3 rounded w-2/3" />
        <div className="flex justify-between pt-2">
          <PulseBox className="h-3 rounded w-16" />
          <PulseBox className="h-3 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function HorizontalCardSkeleton() {
  return (
    <div className="flex gap-4 p-3">
      <PulseBox className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <PulseBox className="h-3 rounded w-16" />
        <PulseBox className="h-4 rounded" />
        <PulseBox className="h-4 rounded w-3/4" />
        <PulseBox className="h-3 rounded w-24" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full px-4">
      <PulseBox className="aspect-[16/9] md:aspect-[21/9] rounded-none md:rounded-3xl" />
      <div className="flex items-center justify-center gap-2 mt-4">
        {[1, 2, 3].map((i) => <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(136, 136, 136, 0.2)' }} />)}
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
          <ArticleCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function BusinessCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
      <PulseBox className="aspect-[16/9]" />
      <div className="p-4 space-y-2">
        <PulseBox className="h-4 rounded w-3/4" />
        <PulseBox className="h-3 rounded" />
        <PulseBox className="h-3 rounded w-2/3" />
        <div className="flex justify-between pt-2">
          <PulseBox className="h-3 rounded w-20" />
          <PulseBox className="h-3 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function HoroscopeSkeleton() {
  return (
    <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center gap-3">
        <PulseBox className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <PulseBox className="h-4 rounded w-24" />
          <PulseBox className="h-3 rounded w-16" />
        </div>
      </div>
      <PulseBox className="h-3 rounded" />
      <PulseBox className="h-3 rounded w-5/6" />
      <PulseBox className="h-3 rounded w-4/5" />
    </div>
  );
}
