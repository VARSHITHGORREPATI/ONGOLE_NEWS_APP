'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'te' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (teText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('te');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'te' ? 'en' : 'te';
    setLanguage(newLang);
    if (mounted) {
      localStorage.setItem('language', newLang);
    }
  };

  const t = (teText: string, enText: string) => {
    return language === 'te' ? teText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values if context is not available
    return {
      language: 'te' as Language,
      toggleLanguage: () => {},
      t: (teText: string, enText: string) => teText,
    };
  }
  return context;
}
