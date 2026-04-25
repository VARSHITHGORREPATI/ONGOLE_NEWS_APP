'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Home, Star, Calendar, Compass, ChevronRight, Sunrise, Moon, Palette } from 'lucide-react';
import { horoscopes, vastuTips, spiritualContents, rashiIcons } from '@/data/mockSpiritual';
import { HoroscopeSkeleton } from '@/components/SkeletonLoader';

type TabType = 'horoscope' | 'vastu' | 'devotional';

export default function SpiritualPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('horoscope');
  const [selectedRashi, setSelectedRashi] = useState(horoscopes[0]);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(timer); }, []);

  const tabs = [
    { id: 'horoscope' as TabType, label: 'రాశి ఫలాలు', labelEn: 'Horoscope', icon: Star },
    { id: 'vastu' as TabType, label: 'వాస్తు టిప్స్', labelEn: 'Vastu', icon: Home },
    { id: 'devotional' as TabType, label: 'భక్తి', labelEn: 'Devotional', icon: Sparkles },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" /><span>Back to Home</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--accent-gold))' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>ఆధ్యాత్మికం</h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Spiritual Zone</p>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all"
                style={activeTab === tab.id ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 2px 8px rgba(243, 112, 33, 0.3)' } : { backgroundColor: 'var(--bg-sage)', color: 'var(--text-secondary)' }}>
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'horoscope' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{new Date().toLocaleDateString('te-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sunrise: 6:02 AM</span>
              <Moon className="w-4 h-4 ml-2" style={{ color: 'var(--text-link)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sunset: 6:38 PM</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => <HoroscopeSkeleton key={i} />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {horoscopes.map((rashi) => (
                  <button key={rashi.id} onClick={() => setSelectedRashi(rashi)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all"
                    style={selectedRashi.id === rashi.id ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: 'var(--shadow-elevated)' } : { backgroundColor: 'var(--bg-parchment)', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-card)' }}>
                    <span className="text-2xl">{rashiIcons[rashi.sign]}</span>
                    <span className="text-xs font-medium">{rashi.signTe}</span>
                  </button>
                ))}
              </div>

              <motion.div key={selectedRashi.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--accent-gold))' }}>
                    {rashiIcons[selectedRashi.sign]}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>{selectedRashi.signTe} - {selectedRashi.signEn}</h2>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Daily Horoscope</p>
                  </div>
                </div>
                <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: 'var(--bg-sage)' }}>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{selectedRashi.prediction}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ icon: Star, label: 'Lucky Number', value: selectedRashi.luckyNumber }, { icon: Palette, label: 'Lucky Color', value: selectedRashi.luckyColor }].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-sage)' }}>
                      <item.icon className="w-5 h-5" style={{ color: item.icon === Star ? 'var(--accent-gold)' : 'var(--primary)' }} />
                      <div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                        <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}

      {activeTab === 'vastu' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>వాస్తు శాస్త్ర టిప్స్</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vastuTips.map((tip, i) => (
              <motion.div key={tip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={tip.imageUrl} alt={tip.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                  <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)' }}>{tip.direction} దిశ</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{tip.title}</h3>
                  <p className="text-sm line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{tip.description}</p>
                  <button className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--primary)' }}><span>Read More</span><ChevronRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'devotional' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>భక్తి సమాచారం</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spiritualContents.map((content, i) => (
              <motion.div key={content.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden transition-shadow hover:shadow-elevated" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={content.imageUrl} alt={content.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                  <div className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-bold rounded-full capitalize" style={{ backgroundColor: 'var(--primary)' }}>{content.type}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{content.title}</h3>
                  <p className="text-sm line-clamp-3 mb-3" style={{ color: 'var(--text-secondary)' }}>{content.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{new Date(content.date).toLocaleDateString('te-IN')}</span>
                    <button className="inline-flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--primary)' }}><span>Read More</span><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-6" style={{ background: 'linear-gradient(to bottom right, var(--bg-sage), var(--bg-parchment))', boxShadow: 'var(--shadow-card)' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>ఈ రోజు పంచాంగం</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: 'తిథి', value: 'శుక్ల ద్వాదశి' }, { label: 'నక్షత్రం', value: 'పునర్వసు' }, { label: 'యోగం', value: 'వ్యాఘాత' }, { label: 'కరణం', value: 'బాలవ' }].map((item) => (
                <div key={item.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
