import { motion } from 'motion/react';
import { Check, ArrowRight, Calculator, Shield, Clock, Infinity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'zh';
type PageType = 'main' | 'service' | 'test' | 'community' | 'calculation';

interface ServicePageProps {
  language: Language;
  onNavigate: (page: PageType) => void;
}

const translations = {
  en: {
    heroTitle: 'SERVICES',
    heroSubtitle: 'Your Journey to Eternity',
    heroDescription: 'Three pathways. One perfect ending.',
    
    calculateCTA: 'Calculate Your Social Value',
    calculateButton: 'CALCULATOR',
    
    plan1: {
      badge: 'BASELINE',
      title: 'Government Standard',
      subtitle: 'Dignity in Departure',
      price: '0',
      priceUnit: 'POINTS',
      description: 'The foundation of humane termination. Every citizen\'s right under the Global Resource Optimization Protocol.',
      features: [
        'Programmed Humane Termination',
        'Medical Comfort Support',
        'Standardized Facility',
        '24-Hour Processing'
      ],
      notIncluded: [
        'Personalized Experience',
        'Memory Reconstruction',
        'Family Presence'
      ],
      cta: 'LEARN MORE'
    },
    
    plan2: {
      badge: 'POPULAR',
      title: 'Life Corridor',
      subtitle: 'Relive Your Truth',
      price: '150',
      priceUnit: 'POINTS',
      description: 'Walk through the moments that defined you. Memory reconstruction with neural precision.',
      features: [
        'All Standard Services',
        'Dedicated Memory Engineer',
        '5-10 Key Memory Reconstructions',
        'Family Participation Option',
        '72-Hour Experience Window',
        'Custom Environmental Design',
        'Sensory Fidelity Guarantee'
      ],
      cta: 'SELECT'
    },
    
    plan3: {
      badge: 'PREMIUM',
      title: 'Utopia',
      subtitle: 'Build Your Forever',
      price: '500+',
      priceUnit: 'POINTS',
      description: 'Transcend reality itself. Elite architects construct flawless worlds where dreams become eternal truth.',
      features: [
        'All Corridor Services',
        'Elite Dream Architects Team',
        'Unlimited World Construction',
        'Fulfill Unrealized Dreams',
        'Infinite Timeline Experience',
        'Absolute Privacy Guarantee',
        'Legacy Documentation',
        'Reality-Dream Fusion'
      ],
      cta: 'DESIGN'
    }
  },
  zh: {
    heroTitle: '服务',
    heroSubtitle: '通往永恒的旅程',
    heroDescription: '三条道路。一个完美结局。',
    
    calculateCTA: '计算您的社会价值',
    calculateButton: '计算器',
    
    plan1: {
      badge: '基准',
      title: '政府标准方案',
      subtitle: '尊严离世',
      price: '0',
      priceUnit: '积分',
      description: '人道终结的基础。全球资源优化协议下每位公民的权利。',
      features: [
        '程序化人道终结',
        '医疗舒缓支持',
        '标准化设施',
        '24小时处理'
      ],
      notIncluded: [
        '个性化体验',
        '记忆重构',
        '家人陪伴'
      ],
      cta: '了解更多'
    },
    
    plan2: {
      badge: '热门',
      title: '生命走廊',
      subtitle: '重温你的真实',
      price: '150',
      priceUnit: '积分',
      description: '穿行于定义你的时刻。以神经级精度重构记忆。',
      features: [
        '所有标准服务',
        '专属记忆工程师',
        '5-10个关键记忆重构',
        '家人参与选项',
        '72小时体验窗口',
        '定制环境设计',
        '感官保真保证'
      ],
      cta: '选择'
    },
    
    plan3: {
      badge: '尊享',
      title: '理想国',
      subtitle: '构建你的永恒',
      price: '500+',
      priceUnit: '积分',
      description: '超越现实本身。精英建筑师构建完美世界，让梦想成为永恒真相。',
      features: [
        '所有走廊服务',
        '顶尖造梦师团队',
        '无限世界构造',
        '实现未竟之梦',
        '无限时间线体验',
        '绝对隐私保障',
        '遗产文档记录',
        '现实-梦境融合'
      ],
      cta: '设计'
    }
  }
};

export default function ServicePage({ language, onNavigate }: ServicePageProps) {
  const t = translations[language];

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-24 px-8 bg-black relative overflow-hidden">
        {/* Geometric Circles Background */}
        <div className="absolute top-0 left-20 w-80 h-80 rounded-full border-[40px] border-white/5 z-0"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full border-[30px] border-red-600/10 z-0"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.5em] text-white/40 mb-8">III. SERVICES</p>
            <h1 className="mb-8 text-[6rem] leading-[0.9] text-white tracking-[0.2em]" style={{ fontWeight: 300 }}>
              {t.heroTitle}
            </h1>
            <div className="flex justify-center mb-8">
              <div className="w-12 h-1 bg-red-600"></div>
            </div>
            <p className="text-2xl text-white/60 mb-6" style={{ fontWeight: 300 }}>{t.heroSubtitle}</p>
            <p className="text-lg text-white/50">{t.heroDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black p-16 relative overflow-hidden group"
          >
            {/* Red accent corner */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-red-600"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-600"></div>
            
            <p className="text-black/60 text-lg mb-8 tracking-wide">{t.calculateCTA}</p>
            <motion.button
              onClick={() => onNavigate('calculation')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white hover:bg-red-600 transition-all text-xs tracking-[0.3em]"
            >
              <Calculator className="w-5 h-5" />
              {t.calculateButton}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers - Black Background */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white"
            >
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593689217914-19621b0eac82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBzcGFjZXxlbnwxfHx8fDE3NjI5MTkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Standard"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-black text-white text-xs tracking-[0.2em]">
                  {t.plan1.badge}
                </div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white flex items-center justify-center">
                  <Shield className="w-6 h-6 text-black" />
                </div>
              </div>

              <div className="p-12">
                <div className="mb-8">
                  <h3 className="text-3xl text-black mb-3" style={{ fontWeight: 300 }}>{t.plan1.title}</h3>
                  <p className="text-black/50 mb-6">{t.plan1.subtitle}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-6xl text-black" style={{ fontWeight: 300 }}>{t.plan1.price}</span>
                    <span className="text-black/40 text-xs tracking-[0.2em]">{t.plan1.priceUnit}</span>
                  </div>
                  <div className="w-8 h-[1px] bg-black mb-6"></div>
                  <p className="text-black/70 leading-relaxed text-sm">
                    {t.plan1.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {t.plan1.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                      <span className="text-black/70 text-sm">{feature}</span>
                    </div>
                  ))}
                  {t.plan1.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-30">
                      <div className="w-4 h-4 flex-shrink-0 mt-1 border border-black/30"></div>
                      <span className="text-black/50 text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-black text-white hover:bg-zinc-900 transition-all text-xs tracking-[0.2em] text-center">
                  SELECT
                </button>
              </div>
            </motion.div>

            {/* Plan 2 - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="group bg-white border-4 border-red-600 lg:-mt-8"
            >
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjI4NDQ5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Corridor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-6 right-6 px-5 py-2.5 bg-red-600 text-white text-xs tracking-[0.2em] flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t.plan2.badge}
                </div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white flex items-center justify-center">
                  <Clock className="w-6 h-6 text-black" />
                </div>
              </div>

              <div className="p-12 bg-black text-white">
                <div className="mb-8 text-left">
                  <h3 className="text-3xl text-white mb-3" style={{ fontWeight: 300 }}>{t.plan2.title}</h3>
                  <p className="text-white/50 mb-6">{t.plan2.subtitle}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-6xl text-white" style={{ fontWeight: 300 }}>{t.plan2.price}</span>
                    <span className="text-white/40 text-xs tracking-[0.2em]">{t.plan2.priceUnit}</span>
                  </div>
                  <div className="w-8 h-[1px] bg-red-600 mb-6"></div>
                  <p className="text-white/70 leading-relaxed text-sm text-left">
                    {t.plan2.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {t.plan2.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-white text-black hover:bg-zinc-100 transition-all text-xs tracking-[0.2em] text-center">
                  SELECT
                </button>
              </div>
            </motion.div>

            {/* Plan 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-white"
            >
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1665043548178-8e606eca11eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc2Mjg5MzY0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Utopia"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-black text-white text-xs tracking-[0.2em]">
                  {t.plan3.badge}
                </div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white flex items-center justify-center">
                  <Infinity className="w-6 h-6 text-black" />
                </div>
              </div>

              <div className="p-12">
                <div className="mb-8">
                  <h3 className="text-3xl text-black mb-3" style={{ fontWeight: 300 }}>{t.plan3.title}</h3>
                  <p className="text-black/50 mb-6">{t.plan3.subtitle}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-6xl text-black" style={{ fontWeight: 300 }}>{t.plan3.price}</span>
                    <span className="text-black/40 text-xs tracking-[0.2em]">{t.plan3.priceUnit}</span>
                  </div>
                  <div className="w-8 h-[1px] bg-black mb-6"></div>
                  <p className="text-black/70 leading-relaxed text-sm">
                    {t.plan3.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {t.plan3.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                      <span className="text-black/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-black text-white hover:bg-zinc-900 transition-all text-xs tracking-[0.2em] text-center">
                  SELECT
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}