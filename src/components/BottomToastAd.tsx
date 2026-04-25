'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function BottomToastAd() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 2 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 z-40 md:left-auto md:right-6 md:w-96"
        >
          <div className="rounded-2xl p-4 shadow-lg relative overflow-hidden text-white" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))', boxShadow: 'var(--shadow-elevated)' }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-white/10" />
            <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors z-10" aria-label="Close"><X className="w-4 h-4 text-white" /></button>
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm">ఒంగోలు కనెక్ట్ ప్రీమియం</h4>
                <p className="text-white/80 text-xs mt-0.5">వార్తలు ముందుగా చదవండి. యాడ్-ఫ్రీ అనుభవం.</p>
                <button className="mt-2 px-4 py-1.5 bg-white text-xs font-semibold rounded-full hover:bg-white/90 transition-colors" style={{ color: 'var(--primary)' }}>Subscribe Now</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
