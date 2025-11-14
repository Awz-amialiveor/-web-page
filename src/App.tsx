import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MainPage from './components/MainPage';
import ServicePage from './components/ServicePage';
import TestPage from './components/TestPage';
import CalculationPage from './components/CalculationPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

type Language = 'en' | 'zh';
type PageType = 'main' | 'service' | 'test' | 'calculation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [language, setLanguage] = useState<Language>('en');

  // Set html lang attribute based on language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handlePageChange = (page: PageType) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        language={language}
        onLanguageChange={setLanguage}
      />

      <motion.main
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {currentPage === 'main' && <MainPage language={language} />}
        {currentPage === 'service' && <ServicePage language={language} onNavigate={handlePageChange} />}
        {currentPage === 'test' && <TestPage language={language} />}
        {currentPage === 'calculation' && <CalculationPage language={language} />}
      </motion.main>

      <Footer language={language} />
      <Toaster />
    </div>
  );
}