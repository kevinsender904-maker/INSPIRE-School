import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, TranslationKey } from './en';
import { ur } from './ur';

export type Language = 'en' | 'ur';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: Direction;
  t: (key: TranslationKey | string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('inspire_lang') as Language;
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const dir: Direction = lang === 'ur' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    try {
      localStorage.setItem('inspire_lang', lang);
    } catch {
      // ignore
    }
  }, [lang, dir]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const t = (key: TranslationKey | string, fallback?: string): string => {
    const dict = lang === 'ur' ? ur : en;
    const val = (dict as Record<string, string>)[key];
    if (val) return val;
    // Fallback to English if Urdu missing
    if (lang === 'ur' && (en as Record<string, string>)[key]) {
      return (en as Record<string, string>)[key];
    }
    return fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
