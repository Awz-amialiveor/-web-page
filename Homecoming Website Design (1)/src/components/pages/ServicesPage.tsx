import { motion } from 'motion/react';
import { Check, X, Star, Package, Sparkles, Crown, Heart, Users, Brain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

export function ServicesPage() {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t('services.tier1.name'),
      price: t('services.tier1.price'),
      description: t('services.tier1.desc'),
      button: t('services.tier1.button'),
      badge: null,
      icon: Package,
      features: [
        { text: t('services.tier1.feature1'), included: true },
        { text: t('services.tier1.feature2'), included: true },
        { text: t('services.tier1.feature3'), included: false },
        { text: t('services.tier1.feature4'), included: false },
      ],
      highlight: false,
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwcm9vbXxlbnwxfHx8fDE3NjA4MDI2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: t('services.tier2.name'),
      price: t('services.tier2.price'),
      description: t('services.tier2.desc'),
      button: t('services.tier2.button'),
      badge: t('services.tier2.badge'),
      icon: Sparkles,
      features: [
        { text: t('services.tier2.feature1'), included: true },
        { text: t('services.tier2.feature2'), included: true },
        { text: t('services.tier2.feature3'), included: true },
        { text: t('services.tier2.feature4'), included: true },
      ],
      highlight: true,
      image: 'https://images.unsplash.com/photo-1759390304699-5c389476ca80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmUlMjBnYXJkZW4lMjBwYXRofGVufDF8fHx8MTc2MDcyNzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: t('services.tier3.name'),
      price: t('services.tier3.price'),
      description: t('services.tier3.desc'),
      button: t('services.tier3.button'),
      badge: null,
      icon: Crown,
      features: [
        { text: t('services.tier3.feature1'), included: true },
        { text: t('services.tier3.feature2'), included: true },
        { text: t('services.tier3.feature3'), included: true },
        { text: t('services.tier3.feature4'), included: true },
        { text: t('services.tier3.feature5'), included: true },
      ],
      highlight: false,
      image: 'https://images.unsplash.com/photo-1638454795595-0a0abf68614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBzcGFjZXxlbnwxfHx8fDE3NjA4MDI2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Hero Section - White */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-white">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <img src={swallowLogo} alt="Homecoming" className="h-24 w-auto" />
            </div>

            <h1 className="text-4xl md:text-6xl text-[#1A1816] mb-5">
              {t('services.hero.title')}
            </h1>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto">
              {t('services.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers - Cream Background */}
      <section className="py-20 relative bg-[#FAF8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <Card 
                    className={`
                      relative overflow-hidden border-2 h-full flex flex-col
                      ${tier.highlight 
                        ? 'border-[#B85C50] bg-white lg:scale-105 shadow-2xl' 
                        : 'border-[#8B7E74]/30 bg-white'
                      }
                      transition-all duration-300 hover:border-[#B85C50] hover:shadow-xl rounded-3xl
                    `}
                  >
                    {/* Image Header */}
                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                      <ImageWithFallback
                        src={tier.image}
                        alt={tier.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                      
                      {/* Popular Badge */}
                      {tier.badge && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-[#B85C50] text-white px-4 py-1.5 shadow-lg border-0">
                            <Star size={14} className="mr-1 inline" fill="white" />
                            {tier.badge}
                          </Badge>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-14 h-14 bg-[#B85C50] rounded-2xl flex items-center justify-center shadow-xl">
                          <IconComponent size={28} className="text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl text-[#1A1816] mb-3">
                          {tier.name}
                        </h3>
                        <div className="text-3xl text-[#B85C50] mb-4">
                          {tier.price}
                        </div>
                        <p className="text-[#8B7E74] leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-6 flex-grow">
                        {tier.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-start gap-3"
                          >
                            <div className={`
                              mt-0.5 flex-shrink-0 p-1 rounded-full
                              ${feature.included ? 'bg-[#B85C50]' : 'bg-[#8B7E74]/20'}
                            `}>
                              {feature.included ? (
                                <Check size={14} className="text-white" />
                              ) : (
                                <X size={14} className="text-[#8B7E74]" />
                              )}
                            </div>
                            <span className={`text-sm ${
                              feature.included ? 'text-[#1A1816]' : 'text-[#8B7E74]'
                            }`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`
                          w-full transition-all duration-300 shadow-md rounded-xl py-6
                          ${tier.highlight 
                            ? 'bg-[#B85C50] text-white hover:bg-[#9A4A3E]' 
                            : 'bg-white text-[#1A1816] hover:bg-[#1A1816] hover:text-white border-2 border-[#1A1816]'
                          }
                        `}
                      >
                        {tier.button}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section - White */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#1A1816] mb-4">
              {t('services.additional.title')}
            </h2>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto">
              {t('services.additional.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#FAF8F6] p-8 rounded-3xl border-2 border-[#8B7E74]/20 hover:border-[#B85C50] transition-all hover:shadow-2xl group"
            >
              <div className="w-14 h-14 bg-[#B85C50] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain size={28} className="text-white" />
              </div>
              <h3 className="text-xl text-[#1A1816] mb-3">{t('services.memory.title')}</h3>
              <p className="text-[#8B7E74]">
                {t('services.memory.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#FAF8F6] p-8 rounded-3xl border-2 border-[#8B7E74]/20 hover:border-[#B85C50] transition-all hover:shadow-2xl group"
            >
              <div className="w-14 h-14 bg-[#B85C50] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart size={28} className="text-white" />
              </div>
              <h3 className="text-xl text-[#1A1816] mb-3">{t('services.legacy.title')}</h3>
              <p className="text-[#8B7E74]">
                {t('services.legacy.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#FAF8F6] p-8 rounded-3xl border-2 border-[#8B7E74]/20 hover:border-[#B85C50] transition-all hover:shadow-2xl group"
            >
              <div className="w-14 h-14 bg-[#B85C50] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-xl text-[#1A1816] mb-3">{t('services.family.title')}</h3>
              <p className="text-[#8B7E74]">
                {t('services.family.desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section - Red Bold */}
      <section className="py-24 relative overflow-hidden bg-[#B85C50]">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              {t('services.cta.desc')}
            </p>
            <Button
              size="lg"
              className="bg-white text-[#B85C50] hover:bg-[#1A1816] hover:text-white px-12 py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-110"
            >
              {t('services.cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
