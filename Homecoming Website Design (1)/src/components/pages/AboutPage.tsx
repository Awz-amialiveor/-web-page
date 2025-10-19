import { motion } from 'motion/react';
import { Quote, Users, Lightbulb, TrendingUp, Heart, Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

export function AboutPage() {
  const { t } = useLanguage();

  const founders = [
    {
      name: t('about.founders.name1'),
      group: 0,
    },
    {
      name: t('about.founders.name2'),
      group: 0,
    },
    {
      name: t('about.founders.name3'),
      group: 1,
    },
    {
      name: t('about.founders.name4'),
      group: 1,
    },
    {
      name: t('about.founders.name5'),
      group: 1,
    },
  ];

  const groups = [
    {
      title: t('about.founders.group1'),
      icon: Lightbulb,
      members: founders.filter(f => f.group === 0),
    },
    {
      title: t('about.founders.group2'),
      icon: TrendingUp,
      members: founders.filter(f => f.group === 1),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Hero Section - White */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <img src={swallowLogo} alt="Homecoming" className="h-32 w-auto" />
            </div>

            <h1 className="text-5xl md:text-7xl text-[#1A1816] mb-6 tracking-tight">
              {t('about.hero.title')}
            </h1>

            <p className="text-xl text-[#8B7E74] mb-10 max-w-2xl mx-auto">
              {t('about.hero.subtitle')}
            </p>

            {/* Philosophy Quote */}
            <div className="relative max-w-2xl mx-auto bg-[#FAF8F6] p-10 rounded-3xl border-2 border-[#B85C50]/30 shadow-xl">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#B85C50] rounded-2xl flex items-center justify-center shadow-lg">
                <Quote size={24} className="text-white" />
              </div>
              <p className="text-lg text-[#1A1816] italic leading-relaxed pt-6">
                {t('about.philosophy')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company History Section - Cream */}
      <section className="py-24 bg-[#FAF8F6] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Left: Image */}
            <div className="relative order-2 md:order-1 group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560922604-d08a31f8f7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDczMzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Company headquarters"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/20 via-transparent to-transparent" />
                
                {/* Year overlay */}
                <div className="absolute bottom-8 left-8 text-8xl text-white/30">
                  2025
                </div>

                {/* Accent decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#B85C50]" />
              </div>

              {/* Floating decoration - Red bg with white bird */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#B85C50] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12">
                <img src={swallowLogo} alt="" className="h-12 w-auto brightness-0 invert" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B85C50]/10 rounded-full text-[#B85C50] border-2 border-[#B85C50]/30">
                <Building size={16} />
                <span>{t('about.story.badge')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl text-[#1A1816]">
                {t('about.history.title')}
              </h2>

              <p className="text-lg text-[#8B7E74] leading-relaxed">
                {t('about.history.desc')}
              </p>

              <div className="flex items-center gap-3 pt-4">
                <div className="h-1 bg-[#B85C50] w-20 rounded-full" />
                <img src={swallowLogo} alt="" className="h-5 w-auto opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section - Bold Red */}
      <section className="py-24 bg-[#B85C50] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              {t('about.principles.title')}
            </h2>
            <div className="w-24 h-1 bg-white/80 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white p-10 rounded-3xl hover:shadow-2xl text-center transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Heart size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-3">{t('about.compassion.title')}</h3>
                <p className="text-[#8B7E74]">
                  {t('about.compassion.desc')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="relative bg-white p-10 rounded-3xl hover:shadow-2xl text-center transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Lightbulb size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-3">{t('about.innovation.title')}</h3>
                <p className="text-[#8B7E74]">
                  {t('about.innovation.desc')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="relative bg-white p-10 rounded-3xl hover:shadow-2xl text-center transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-2xl mb-6 shadow-lg">
                  <Users size={36} className="text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1816] mb-3">{t('about.community.title')}</h3>
                <p className="text-[#8B7E74]">
                  {t('about.community.desc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founding Members Section - White */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#1A1816] mb-4">
              {t('about.founders.title')}
            </h2>
            <div className="w-24 h-1 bg-[#B85C50] mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-20">
            {groups.map((group, groupIndex) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Group Title */}
                  <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-[#B85C50] rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl text-[#1A1816]">
                      {group.title}
                    </h3>
                  </div>

                  {/* Members Grid - Text only, no images */}
                  <div className="flex flex-wrap justify-center gap-6">
                    {group.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="flex flex-col items-center group">
                        <div className="relative">
                          {/* Square Badge */}
                          <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#FAF8F6] border-2 border-[#B85C50]/30 transition-all duration-300 hover:border-[#B85C50] hover:shadow-2xl hover:scale-110 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl text-[#B85C50] mb-2">
                                {groupIndex * 2 + memberIndex + 1}
                              </div>
                              <div className="w-8 h-1 bg-[#B85C50] mx-auto rounded-full" />
                            </div>
                          </div>
                        </div>

                        {/* Name below */}
                        <p className="mt-4 text-[#1A1816]">
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Statement Section - Dark */}
      <section className="py-24 bg-[#1A1816] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B85C50] rounded-3xl mb-8 shadow-xl">
              <Quote size={36} className="text-white" />
            </div>

            <blockquote className="text-3xl md:text-4xl text-white mb-8 italic leading-relaxed">
              "{t('about.philosophy')}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-white/50 rounded-full" />
              <img src={swallowLogo} alt="" className="h-6 w-auto brightness-0 invert opacity-70" />
              <div className="w-16 h-1 bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
