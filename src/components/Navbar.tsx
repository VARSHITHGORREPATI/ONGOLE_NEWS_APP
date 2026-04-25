'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, X, Sun, Moon, Cloud, Languages } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'హోమ్', labelEn: 'Home' },
  { href: '/category/local', label: 'స్థానిక', labelEn: 'Local' },
  { href: '/category/state', label: 'రాష్ట్రం', labelEn: 'State' },
  { href: '/category/national', label: 'జాతీయం', labelEn: 'National' },
  { href: '/spiritual', label: 'ఆధ్యాత్మికం', labelEn: 'Spiritual' },
  { href: '/business', label: 'వ్యాపారం', labelEn: 'Business' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Cloud className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          <span>32°C</span>
          <span className="text-xs">Ongole</span>
        </div>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
            <span className="text-white font-bold text-lg tracking-tight">🐂</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
              {t('ఒంగోలు కనెక్ట్', 'Ongole Connect')}
            </span>
            <span className="text-[10px] leading-tight uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              {t('ప్రకాశం జిల్లా వార్తలు', 'Prakasam District News')}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                pathname === link.href
                  ? 'text-white'
                  : 'hover:bg-opacity-10'
              }`}
              style={pathname === link.href ? { backgroundColor: 'var(--primary)' } : { color: 'var(--text-secondary)' }}
            >
              {language === 'te' ? link.label : link.labelEn}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full transition-colors hover:bg-opacity-10 flex items-center gap-1"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle language"
            title={language === 'te' ? 'Switch to English' : 'తెలుగులోకి మార్చండి'}
          >
            <Languages className="w-5 h-5" />
            <span className="text-xs font-medium hidden md:inline">{language === 'te' ? 'EN' : 'తె'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-opacity-10"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-full transition-colors relative"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-2xl p-4 z-50"
                  style={{ 
                    backgroundColor: 'var(--bg-parchment)', 
                    boxShadow: 'var(--shadow-elevated)',
                    border: '1px solid rgba(243, 112, 33, 0.1)'
                  }}
                >
                  <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                    {t('నోటిఫికేషన్లు', 'Notifications')}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { te: 'తాజా వార్త: ఒంగోలులో కొత్త పార్క్ ప్రారంభం', en: 'Latest: New park inaugurated in Ongole' },
                      { te: 'బ్రేకింగ్: IPL మ్యాచ్ రద్దు', en: 'Breaking: IPL match cancelled' },
                      { te: 'వాతావరణ హెచ్చరిక: ఈ రోజు భారీ వర్షం సాధ్యం', en: 'Weather alert: Heavy rain expected today' },
                    ].map((notif, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm pb-2" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid rgba(243, 112, 33, 0.05)' }}>
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }} />
                        <span>{language === 'te' ? notif.te : notif.en}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass"
            style={{ borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                    pathname === link.href ? 'text-white' : ''
                  }`}
                  style={pathname === link.href ? { backgroundColor: 'var(--primary)' } : { color: 'var(--text-secondary)' }}
                >
                  {language === 'te' ? link.label : link.labelEn}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
