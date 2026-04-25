'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, Calendar } from 'lucide-react';

export default function EPaperPage() {
  const today = new Date().toLocaleDateString('te-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft className="w-4 h-4" /><span>Back to Home</span>
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)' }}>
          <BookOpen className="w-10 h-10" style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>E-పేపర్</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Digital Newspaper</p>
      </motion.div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
        <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{today}</span>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="rounded-3xl p-8 text-center" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
        <div className="aspect-[3/4] max-w-md mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 overflow-hidden">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--primary)' }}>
              <span className="text-white font-bold text-2xl">OC</span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>ఒంగోలు కనెక్ట్</h2>
            <p style={{ color: 'var(--text-tertiary)' }}>E-Paper Coming Soon</p>
            <div className="mt-6 w-32 h-1 rounded-full mx-auto" style={{ backgroundColor: 'rgba(243, 112, 33, 0.2)' }} />
            <div className="mt-2 w-20 h-1 rounded-full mx-auto" style={{ backgroundColor: 'rgba(243, 112, 33, 0.2)' }} />
            <div className="mt-2 w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: 'rgba(243, 112, 33, 0.2)' }} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>
            <Download className="w-5 h-5" /><span>Download PDF</span>
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-opacity-10" style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-primary)' }}>
            <BookOpen className="w-5 h-5" /><span>Read Online</span>
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>ఆర్కైవ్</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return (
              <button key={i} className="p-3 rounded-xl text-center transition-all"
                style={i === 0 ? { backgroundColor: 'var(--primary)', color: 'white' } : { backgroundColor: 'var(--bg-parchment)', color: 'var(--text-secondary)' }}>
                <p className="text-xs opacity-70">{date.toLocaleDateString('te-IN', { weekday: 'short' })}</p>
                <p className="text-lg font-bold">{date.getDate()}</p>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
