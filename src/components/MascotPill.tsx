'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X, MessageCircle } from 'lucide-react';

export default function MascotPill() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [activeHeadline, setActiveHeadline] = useState(0);

  const headlines = [
    'ఒంగోలులో పండుగ వాతావరణం',
    'AP బడ్జెట్ 2026: రైతులకు గుడ్ న్యూస్',
    'శ్రీశైలం బ్రహ్మోత్సవాలు ప్రారంభం',
  ];

  useEffect(() => {
    const bubbleTimer = setTimeout(() => { if (!isExpanded) setShowBubble(true); }, 3000);
    const hideTimer = setTimeout(() => setShowBubble(false), 8000);
    return () => { clearTimeout(bubbleTimer); clearTimeout(hideTimer); };
  }, [isExpanded]);

  return (
    <>
      <AnimatePresence>
        {showBubble && !isExpanded && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-4 py-3 shadow-lg max-w-[280px]"
            style={{ backgroundColor: 'var(--bg-parchment)', border: '1px solid rgba(243, 112, 33, 0.1)' }}>
            <p className="text-sm text-center" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>ఏం వినాలనుకుంటున్నారు? 🎧</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45" style={{ backgroundColor: 'var(--bg-parchment)', borderRight: '1px solid rgba(243, 112, 33, 0.1)', borderBottom: '1px solid rgba(243, 112, 33, 0.1)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20 }} className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button onClick={() => { setIsExpanded(!isExpanded); setShowBubble(false); }} className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))', boxShadow: 'var(--shadow-elevated)' }}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">🦌</div>
          <span className="text-sm font-medium hidden sm:inline" style={{ fontFamily: 'Ramabhadra, sans-serif' }}>గిద్ద</span>
          <MessageCircle className="w-4 h-4 text-white/80" />
        </button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsExpanded(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg rounded-t-3xl p-6" style={{ backgroundColor: 'var(--bg-parchment)' }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl text-white" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))' }}>🦌</div>
                  <div>
                    <h3 className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>గిద్ద - మీ సహాయకుడు</h3>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Listen to top headlines</p>
                  </div>
                </div>
                <button onClick={() => setIsExpanded(false)} className="p-2 rounded-full transition-colors hover:bg-opacity-10" style={{ color: 'var(--text-secondary)' }}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 mb-6">
                {headlines.map((headline, i) => (
                  <button key={i} onClick={() => setActiveHeadline(i)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                    style={activeHeadline === i ? { backgroundColor: 'rgba(243, 112, 33, 0.1)', border: '1px solid rgba(243, 112, 33, 0.2)' } : { backgroundColor: 'var(--bg-sage)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={activeHeadline === i ? { backgroundColor: 'var(--primary)', color: 'white' } : { backgroundColor: 'rgba(243, 112, 33, 0.1)', color: 'var(--primary)' }}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{headline}</span>
                  </button>
                ))}
              </div>
              <button className="w-full py-3 text-white rounded-full font-medium transition-colors hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--primary)' }}>
                <Volume2 className="w-4 h-4" /><span>Listen to Headlines</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
