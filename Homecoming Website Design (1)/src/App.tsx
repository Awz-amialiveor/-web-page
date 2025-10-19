import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { TestPage } from './components/pages/TestPage';
import { AboutPage } from './components/pages/AboutPage';
import { FeedbackPage } from './components/pages/FeedbackPage';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

type Page = 'home' | 'service' | 'test' | 'about' | 'feedback';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'service':
        return <ServicesPage />;
      case 'test':
        return <TestPage />;
      case 'about':
        return <AboutPage />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAF8F6] text-[#1A1816]">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="relative">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}