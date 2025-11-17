import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MainPage from './components/MainPage';
import ServicePage from './components/ServicePage';
import TestPage from './components/TestPage';
import CalculationPage from './components/CalculationPage';
import CommunityPage from './components/CommunityPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

type Language = 'en' | 'zh';
type PageType = 'main' | 'service' | 'test' | 'calculation' | 'community';
type ArchetypeKey = 'A' | 'B' | 'C' | 'D' | null;

// Theme colors for each archetype - using RGB values
const themeColors = {
  A: { from: 'rgb(66, 49, 71)', via: 'rgb(112, 96, 153)', to: 'rgb(214, 212, 221)' }, // Archive Keeper - Purple gradient
  B: { from: 'rgb(162, 45, 56)', via: 'rgb(227, 84, 83)', to: 'rgb(243, 230, 204)' }, // Future Explorer - Red gradient
  C: { from: 'rgb(28, 51, 46)', via: 'rgb(124, 159, 84)', to: 'rgb(210, 219, 200)' }, // Life Architect - Green gradient
  D: { from: 'rgb(14, 61, 71)', via: 'rgb(44, 163, 171)', to: 'rgb(202, 227, 230)' }, // Romantic Poet - Cyan gradient
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [language, setLanguage] = useState<Language>('en');
  const [archetype, setArchetype] = useState<ArchetypeKey>(null);

  // Set html lang attribute based on language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (archetype && themeColors[archetype]) {
      const colors = themeColors[archetype];
      document.documentElement.style.setProperty('--theme-from', colors.from);
      document.documentElement.style.setProperty('--theme-via', colors.via);
      document.documentElement.style.setProperty('--theme-to', colors.to);
    } else {
      // Default black theme
      document.documentElement.style.setProperty('--theme-from', '#000000');
      document.documentElement.style.setProperty('--theme-via', '#18181b');
      document.documentElement.style.setProperty('--theme-to', '#27272a');
    }
  }, [archetype]);

  const handlePageChange = (page: PageType) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleArchetypeSet = (key: ArchetypeKey) => {
    setArchetype(key);
  };

  const handleArchetypeReset = () => {
    setArchetype(null);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        language={language}
        onLanguageChange={setLanguage}
        archetype={archetype}
      />

      <motion.main
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {currentPage === 'main' && <MainPage language={language} archetype={archetype} />}
        {currentPage === 'service' && <ServicePage language={language} onNavigate={handlePageChange} archetype={archetype} />}
        {currentPage === 'test' && <TestPage language={language} onArchetypeSet={handleArchetypeSet} onArchetypeReset={handleArchetypeReset} archetype={archetype} />}
        {currentPage === 'calculation' && <CalculationPage language={language} archetype={archetype} />}
        {currentPage === 'community' && <CommunityPage language={language} archetype={archetype} />}
      </motion.main>

      <Footer language={language} />
      <Toaster />
    </div>
  );
}