import { motion } from 'motion/react';
import birdLogo from 'figma:asset/cb6ac42902be51a5cc78f7d60921ff44772beaec.png';

type Language = 'en' | 'zh';
type PageType = 'main' | 'service' | 'calculation' | 'test';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const translations = {
  en: {
    main: 'HOME',
    service: 'SERVICES',
    calculation: 'CALCULATOR',
    test: 'ASSESSMENT'
  },
  zh: {
    main: '首页',
    service: '服务',
    calculation: '计算器',
    test: '评估'
  }
};

export default function Navigation({ currentPage, onPageChange, language, onLanguageChange }: NavigationProps) {
  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-[1800px] mx-auto px-12 py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <button 
          onClick={() => onPageChange('main')}
          className="flex items-center gap-4 hover:opacity-60 transition-opacity group"
        >
          <img src={birdLogo} alt="Homecoming" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform invert" />
          <span className="text-white tracking-[0.5em] text-xs">HOMECOMING</span>
        </button>

        {/* Center: Navigation */}
        <div className="flex items-center gap-1">
          {(['main', 'service', 'calculation', 'test'] as PageType[]).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative px-5 py-3 transition-all text-xs tracking-[0.2em] ${
                currentPage === page 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t[page]}
              {currentPage === page && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right: Language Switcher */}
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
          className="px-5 py-2 border border-white/20 hover:bg-white/10 transition-all text-xs tracking-[0.2em] text-white"
        >
          {language === 'en' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  );
}