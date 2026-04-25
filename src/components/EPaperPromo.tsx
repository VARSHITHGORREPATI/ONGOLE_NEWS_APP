'use client';

import { motion } from 'framer-motion';
import { Download, BookOpen } from 'lucide-react';

export default function EPaperPromo() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-4 md:mx-8">
      <div className="relative rounded-3xl p-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-sage)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--primary) 0px, var(--primary) 2px, transparent 2px, transparent 10px)' }} />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)' }}>
            <BookOpen className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--primary)' }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>ఈరోజు పత్రిక</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Read today&apos;s digital newspaper</p>
            <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>
              <Download className="w-4 h-4" /><span>Download E-Paper</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
