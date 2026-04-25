'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { promoBanners } from '@/data/mockBusinesses';

export default function AdCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (promoBanners.length <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % promoBanners.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-4 md:mx-8">
      <div className="relative aspect-[16/6] md:aspect-[16/4] rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {promoBanners.map((banner, i) => (
          <motion.div key={banner.id} initial={false} animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }} transition={{ duration: 0.5 }} className="absolute inset-0">
            <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-5 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-gold)' }}>Special Offer</span>
              </div>
              <h3 className="text-white font-bold text-lg md:text-2xl mb-1" style={{ fontFamily: 'Ramabhadra, sans-serif' }}>{banner.title}</h3>
              <p className="text-white/80 text-sm md:text-base max-w-md">{banner.description}</p>
              <button className="mt-3 px-5 py-2 text-white text-sm font-medium rounded-full w-fit transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>View Deals</button>
            </div>
          </motion.div>
        ))}

        {promoBanners.length > 1 && (
          <>
            <button onClick={() => setCurrent((prev) => (prev === 0 ? promoBanners.length - 1 : prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors" aria-label="Previous"><ChevronLeft className="w-4 h-4 text-white" /></button>
            <button onClick={() => setCurrent((prev) => (prev + 1) % promoBanners.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors" aria-label="Next"><ChevronRight className="w-4 h-4 text-white" /></button>
          </>
        )}
      </div>

      {promoBanners.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {promoBanners.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="h-1.5 rounded-full transition-all" style={{ width: i === current ? 24 : 6, backgroundColor: i === current ? 'var(--primary)' : 'rgba(136, 136, 136, 0.3)' }} aria-label={`Go to banner ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
