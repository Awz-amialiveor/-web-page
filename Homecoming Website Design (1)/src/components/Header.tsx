import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'service', label: t('nav.service') },
    { key: 'test', label: t('nav.test') },
    { key: 'about', label: t('nav.about') },
    { key: 'feedback', label: t('nav.feedback') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F6]/95 backdrop-blur-sm border-b border-[#8B7E74]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <img src={swallowLogo} alt="Homecoming" className="h-7 w-auto transition-transform group-hover:scale-110" />
            <span className="text-[#1A1816] tracking-[0.15em]">HOMECOMING</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative transition-colors ${
                  currentPage === item.key ? 'text-[#B85C50]' : 'text-[#8B7E74] hover:text-[#1A1816]'
                }`}
              >
                {item.label}
                {currentPage === item.key && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B85C50]" />
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#8B7E74]/10 text-[#2A2826] hover:bg-[#8B7E74]/20 border border-[#8B7E74]/20 transition-all"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1A1816] p-1.5"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#8B7E74]/20">
          <nav className="px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded transition-colors ${
                  currentPage === item.key
                    ? 'bg-[#B85C50]/10 text-[#B85C50]'
                    : 'text-[#8B7E74] hover:bg-[#8B7E74]/10 hover:text-[#1A1816]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
