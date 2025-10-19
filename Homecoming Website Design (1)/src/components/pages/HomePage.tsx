import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Hero Section - Pure white with minimal pattern */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#B85C50]/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-[#B85C50]/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Single Swallow Logo */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="mb-12 flex justify-center"
            >
              <img src={swallowLogo} alt="Homecoming Swallow" className="h-32 w-auto" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#1A1816] mb-6 tracking-tight leading-tight">
              {t('home.hero.title').split(':')[0]}:
              <span className="block mt-4 text-[#B85C50]">
                {t('home.hero.title').split(':')[1]}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#8B7E74] mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => onNavigate('test')}
                size="lg"
                className="bg-[#B85C50] text-white hover:bg-[#9A4A3E] px-10 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => onNavigate('service')}
                size="lg"
                variant="outline"
                className="border-2 border-[#1A1816] text-[#1A1816] hover:bg-[#1A1816] hover:text-white px-10 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                {t('home.hero.explore')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-[#8B7E74] rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-2 bg-[#B85C50] rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Core Values - Bold Red Block */}
      <section className="py-24 bg-[#B85C50] relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl text-center text-white mb-4"
          >
            {t('home.selling.title')}
          </motion.h2>
          <p className="text-center text-white/90 text-lg mb-16 max-w-2xl mx-auto">
            {t('home.selling.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Compassion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              <div className="relative text-center p-10 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Heart size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-4">
                  {t('home.compassion.title')}
                </h3>
                <p className="text-[#8B7E74] leading-relaxed">
                  {t('home.compassion.desc')}
                </p>
              </div>
            </motion.div>

            {/* Customization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative text-center p-10 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Sparkles size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-4">
                  {t('home.selling.custom.title')}
                </h3>
                <p className="text-[#8B7E74] leading-relaxed">
                  {t('home.selling.custom.desc')}
                </p>
              </div>
            </motion.div>

            {/* Technology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="relative text-center p-10 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Shield size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-4">
                  {t('home.selling.tech.title')}
                </h3>
                <p className="text-[#8B7E74] leading-relaxed">
                  {t('home.selling.tech.desc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section - Cream Background */}
      <section className="py-24 bg-[#FAF8F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <h3 className="text-4xl md:text-5xl text-[#1A1816] mb-6 leading-tight">
                {t('home.feature.title')}
              </h3>
              <p className="text-lg text-[#8B7E74] leading-relaxed mb-6">
                {t('home.feature.desc1')}
              </p>
              <p className="text-[#8B7E74] leading-relaxed mb-8">
                {t('home.feature.desc2')}
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => onNavigate('service')}
                  className="bg-[#B85C50] text-white hover:bg-[#9A4A3E] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {t('home.feature.button1')}
                </Button>
                <Button
                  onClick={() => onNavigate('about')}
                  variant="outline"
                  className="border-2 border-[#1A1816] text-[#1A1816] hover:bg-[#1A1816] hover:text-white transition-all duration-300"
                >
                  {t('home.feature.button2')}
                </Button>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1641173587142-ce4c1b35e950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjA3MjcwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Every moment matters"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/10 to-transparent" />
                {/* Accent decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#B85C50]" />
              </div>
              {/* Floating decoration - Red bg with white bird */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#B85C50] rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12">
                <img src={swallowLogo} alt="" className="h-12 w-auto brightness-0 invert" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Dark Background */}
      <section className="py-24 bg-[#1A1816] relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.desc')}
            </p>
            <Button
              onClick={() => onNavigate('test')}
              size="lg"
              className="bg-[#B85C50] text-white hover:bg-white hover:text-[#B85C50] px-12 py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-110"
            >
              {t('home.cta.button')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}