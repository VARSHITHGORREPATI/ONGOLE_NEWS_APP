'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types';
import { getImageProps } from '@/lib/sanitizeImageUrl';

interface HeroSliderProps {
  articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection === 1) return prev === articles.length - 1 ? 0 : prev + 1;
      return prev === 0 ? articles.length - 1 : prev - 1;
    });
  }, [articles.length]);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate, articles.length]);

  if (articles.length === 0) return null;

  const article = articles[current];
  const imgProps = getImageProps(article.imageUrl);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1.5 text-xs font-bold rounded-full shadow-lg text-white" style={{ backgroundColor: 'var(--primary)' }}>తాజా వార్త</span>
      </div>

      {articles.length > 1 && (
        <>
          <button onClick={() => paginate(-1)} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center shadow-lg hover:bg-white transition-colors" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </button>
          <button onClick={() => paginate(1)} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center shadow-lg hover:bg-white transition-colors" aria-label="Next slide">
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </button>
        </>
      )}

      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-none md:rounded-3xl overflow-hidden mx-0 md:mx-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute inset-0">
            <Link href={`/article/${article.id}`} className="block w-full h-full">
              <Image src={imgProps.src} alt={article.title} fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full mb-3">{article.category.toUpperCase()}</span>
                <h2 className="text-white font-bold text-xl md:text-3xl leading-tight max-w-3xl" style={{ fontFamily: 'Ramabhadra, sans-serif' }}>{article.title}</h2>
                <p className="text-white/70 text-sm mt-2 max-w-xl hidden md:block">{article.summary}</p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {articles.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {articles.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className="h-2 rounded-full transition-all" style={{ width: i === current ? 32 : 8, backgroundColor: i === current ? 'var(--primary)' : 'rgba(136, 136, 136, 0.3)' }} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
