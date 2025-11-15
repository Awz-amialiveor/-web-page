import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import birdLogo from 'figma:asset/cb6ac42902be51a5cc78f7d60921ff44772beaec.png';

type Language = 'en' | 'zh';
type PageType = 'main' | 'service' | 'calculation' | 'test';
type ArchetypeKey = 'A' | 'B' | 'C' | 'D' | null;

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  archetype: ArchetypeKey;
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

export default function Navigation({ currentPage, onPageChange, language, onLanguageChange, archetype }: NavigationProps) {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const bgColor = 'bg-black'; // Always keep navigation black

  const handlePageChange = (page: PageType) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgColor} border-b border-white/10`}>
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <button 
          onClick={() => handlePageChange('main')}
          className="flex items-center gap-2 sm:gap-4 hover:opacity-60 transition-opacity group"
        >
          <img src={birdLogo} alt="Homecoming" className="w-6 h-6 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform invert" />
          <span className="text-white tracking-[0.3em] sm:tracking-[0.5em] text-[0.65rem] sm:text-xs">HOMECOMING</span>
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-1">
          {(['main', 'service', 'calculation', 'test'] as PageType[]).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative px-4 xl:px-5 py-3 transition-all text-[0.65rem] xl:text-xs tracking-[0.2em] ${
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

        {/* Right: Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
            className="px-3 sm:px-5 py-2 border border-white/20 hover:bg-white/10 transition-all text-[0.65rem] sm:text-xs tracking-[0.2em] text-white"
          >
            {language === 'en' ? 'EN' : '中文'}
          </button>
          
          {/* Mobile Menu Button - Hidden on desktop */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {(['main', 'service', 'calculation', 'test'] as PageType[]).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-full text-left px-4 py-3 transition-all text-sm tracking-[0.2em] ${
                    currentPage === page 
                      ? 'text-white bg-white/10 border-l-2 border-red-600' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t[page]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
