import { motion } from 'motion/react';
import birdLogo from 'figma:asset/cb6ac42902be51a5cc78f7d60921ff44772beaec.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'zh';

interface MainPageProps {
  language: Language;
  archetype: 'A' | 'B' | 'C' | 'D' | null;
}

const translations = {
  en: {
    heroTitle: 'HOMECOMING',
    heroSubtitle: 'Architects of the Final Moment',
    heroYear: '',
    heroDescription: 'In an era where life is quantified, we preserve humanity\'s ultimate desire: the right to experience.',
    
    section1Label: 'I. CONTEXT',
    section1Title: 'Our Era',
    section1Text: 'The 24th century faces irreversible resource depletion. The Global Council established the Social Value Points System in 2322 - a necessary choice for civilization\'s survival. When survival becomes calculated, we offer something beyond survival: meaning.',
    
    section2Label: 'II. MISSION',
    section2Title: 'Our Purpose',
    section2Text: 'We fill the emotional void of programmatic end-of-life management. Technology can measure value, but it cannot create worth. We bridge the gap between systematic necessity and human dignity.',
    
    section3Label: 'III. METHODOLOGY',
    section3Title: 'Our Approach',
    neuroTitle: 'Neuro-Aesthetics',
    neuroText: 'Non-invasive brain-computer interfaces reconstruct profound memories with the highest fidelity.',
    engineeringTitle: 'Engineering Sentiment',
    engineeringText: 'Real-time brainwave monitoring creates emotion-synchronized virtual worlds.',
    
    technology1: 'Neural Memory Extraction',
    technology2: 'Quantum-Rendered Environments',
    technology3: 'Emotional Continuity Preservation',
    technology4: 'Reality-Dream Synchronization',
    
    section4Label: 'IV. PHILOSOPHY',
    philosophy1: 'We do not create life,',
    philosophy2: 'nor do we prolong it.',
    philosophy3: 'We build eternal, perfect endings.',
    
    section5Label: 'V. FOUNDING VISION',
    section5Title: 'Established 2325 by five visionaries',
    creativityTitle: 'Creativity & Innovation',
    businessTitle: 'Business & Enterprise',
    
    founder1Name: 'Li Sixian',
    founder1Title: 'Chief Neuro-Architect',
    founder2Name: 'Zhou Wei',
    founder2Title: 'Director of Experience Design',
    founder3Name: 'Wu Zixuan',
    founder3Title: 'CEO & Strategy',
    founder4Name: 'Shen Tiantian',
    founder4Title: 'Chief Operations Officer',
    founder5Name: 'Wu Ziyou',
    founder5Title: 'Chief Financial Officer'
  },
  zh: {
    heroTitle: 'HOMECOMING',
    heroSubtitle: '终章的建筑师',
    heroYear: '',
    heroDescription: '在生命被量化的时代，我们保留人性最终极的渴望：体验的权利。',
    
    section1Label: 'I. 背景',
    section1Title: '我们的时代',
    section1Text: '24世纪面临不可逆转的资源枯竭。全球理事会于2322年建立社会价值积分系统——文明延续的必然选择。当生存成为计算，我们提供超越生存的东西：意义。',
    
    section2Label: 'II. 使命',
    section2Title: '我们的目标',
    section2Text: '我们填补程序化生命终章管理的情感真空。技术可以衡量价值，但它无法创造意义。我们架起系统性需求与人类尊严之间的桥梁。',
    
    section3Label: 'III. 方法论',
    section3Title: '我们的方法',
    neuroTitle: '神经美学',
    neuroText: '非侵入式脑机接口以最高保真度重构深刻记忆。',
    engineeringTitle: '工程化情感',
    engineeringText: '实时脑波监测创造情绪同步的虚拟世界。',
    
    technology1: '神经记忆提取',
    technology2: '量子渲染环境',
    technology3: '情感连续性保存',
    technology4: '现实-梦境同步',
    
    section4Label: 'IV. 哲学',
    philosophy1: '我们不创造生命，',
    philosophy2: '也不延长生命。',
    philosophy3: '我们建造永恒而完美的结局。',
    
    section5Label: 'V. 创立愿景',
    section5Title: '2325年由五位远见者创立',
    creativityTitle: '创意与创新',
    businessTitle: '商业与企业',
    
    founder1Name: '李思娴',
    founder1Title: '首席神经建筑师',
    founder2Name: '周围',
    founder2Title: '体验设计总监',
    founder3Name: '巫子璇',
    founder3Title: '首席执行官与战略',
    founder4Name: '沈田田',
    founder4Title: '首席运营官',
    founder5Name: '吴紫悠',
    founder5Title: '首席财务官'
  }
};

export default function MainPage({ language, archetype }: MainPageProps) {
  const t = translations[language];

  const heroBg = archetype
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-white"
    : "bg-gradient-to-b from-black via-zinc-800 to-white";

  return (
    <div className="bg-black">
      {/* Hero Section - Dramatic Gradient */}
      <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${heroBg}`}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border-[20px] sm:border-[40px] border-white/20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full border-[15px] sm:border-[30px] border-white/10"></div>
        </div>
        
        {/* Subtle red accent line */}
        <div className="absolute top-32 sm:top-40 left-0 w-32 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-accent)]/30 to-transparent"></div>
        <div className="absolute bottom-32 sm:bottom-40 right-0 w-32 sm:w-64 h-[1px] bg-gradient-to-l from-transparent via-[var(--theme-accent)]/30 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 text-center pt-20 sm:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Logo - positioned above title */}
            <div className="mb-4 flex justify-center">
              <img 
                src={birdLogo} 
                alt="Homecoming" 
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain invert opacity-90"
              />
            </div>

            {/* Title */}
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.9] text-white tracking-[0.2em] sm:tracking-[0.3em]" style={{ fontWeight: 300 }}>
              {t.heroTitle}
            </h1>

            {/* Minimalist Accent */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-20 sm:w-32 h-1 bg-red-600"></div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-6 sm:mb-8 tracking-wide px-4" style={{ fontWeight: 300 }}>
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-white/50 max-w-3xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Era Section - White Background */}
      <section className="py-32 px-8 bg-white relative overflow-hidden">
        {/* Geometric Decorations - Circles */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full border-[50px] border-black/5 z-0"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full border-[30px] border-red-600/10 z-0"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Asymmetric Layout */}
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column - Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32">
                <p className="text-xs tracking-[0.5em] text-black/40 mb-6">{t.section1Label}</p>
                <h2 className="text-7xl text-black mb-8 leading-none" style={{ fontWeight: 200 }}>
                  {t.section1Title}
                </h2>
                <div className="w-16 h-1 bg-red-600"></div>
              </div>
            </motion.div>

            {/* Right 2 Columns - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-12"
            >
              <p className="text-3xl text-black/80 leading-relaxed" style={{ fontWeight: 300 }}>
                {t.section1Text}
              </p>
              
              {/* Stats Grid - Breaking symmetry */}
              <div className="grid grid-cols-2 gap-8 pt-12">
                <div className="border-l-4 border-black pl-6">
                  <p className="text-6xl text-black mb-2" style={{ fontWeight: 200 }}>2322</p>
                  <p className="text-sm text-black/50 tracking-wide">SYSTEM ESTABLISHED</p>
                </div>
                <div className="border-l-4 border-red-600 pl-6 mt-12">
                  <p className="text-6xl text-black mb-2" style={{ fontWeight: 200 }}>68</p>
                  <p className="text-sm text-black/50 tracking-wide">EVALUATION AGE</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section - Black to White Gradient */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-white relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group order-2 lg:order-1"
            >
              <div className="relative h-[700px] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1656582117510-3a177bf866c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbW90aW9uYWwlMjBwb3J0cmFpdCUyMGZhbWlseXxlbnwxfHx8fDE3NjI5MzU1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Human"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-12">
                <p className="text-xs tracking-[0.5em] text-white/60 mb-6">{t.section2Label}</p>
                <h2 className="text-7xl text-white mb-8 leading-none" style={{ fontWeight: 300 }}>
                  {t.section2Title}
                </h2>
                <div className="w-12 h-[2px] bg-red-600 mb-8"></div>
              </div>
              <p className="text-xl text-white/80 leading-relaxed">
                {t.section2Text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section - White */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.5em] text-black/40 mb-6">{t.section3Label}</p>
            <h2 className="text-7xl text-black leading-none" style={{ fontWeight: 300 }}>
              {t.section3Title}
            </h2>
            <div className="flex justify-center mt-8">
              <div className="w-12 h-[2px] bg-red-600"></div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-black overflow-hidden relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606206873764-fd15e242df52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI4Nzk5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Neural"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-12 bg-black text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-xs tracking-[0.3em] text-white/60">01</span>
                </div>
                <h3 className="text-4xl mb-6" style={{ fontWeight: 300 }}>{t.neuroTitle}</h3>
                <p className="text-white/70 leading-relaxed">{t.neuroText}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-black overflow-hidden relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1725858776178-cf35926c496d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGxpZ2h0JTIwYXJ0fGVufDF8fHx8MTc2MjkzNTUwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Engineering"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-12 bg-black text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-xs tracking-[0.3em] text-white/60">02</span>
                </div>
                <h3 className="text-4xl mb-6" style={{ fontWeight: 300 }}>{t.engineeringTitle}</h3>
                <p className="text-white/70 leading-relaxed">{t.engineeringText}</p>
              </div>
            </motion.div>
          </div>

          {/* Technology Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[t.technology1, t.technology2, t.technology3, t.technology4].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black p-8 hover:bg-zinc-900 transition-all group"
              >
                <div className="text-xs tracking-[0.3em] text-white/40 mb-4">0{i + 1}</div>
                <p className="text-white/90 text-sm leading-relaxed">{tech}</p>
                <div className="w-6 h-[1px] bg-red-600 mt-6 group-hover:w-12 transition-all"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Black */}
      <section className="py-40 px-8 bg-black relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[60px] border-white"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <p className="text-xs tracking-[0.5em] text-white/40 mb-12">{t.section4Label}</p>
          
          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl text-white/50 leading-relaxed" style={{ fontWeight: 300 }}
            >
              {t.philosophy1}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-4xl text-white/60 leading-relaxed" style={{ fontWeight: 300 }}
            >
              {t.philosophy2}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-5xl text-white leading-relaxed pt-8" style={{ fontWeight: 300 }}
            >
              {t.philosophy3}
            </motion.p>
          </div>

          {/* Red Accent */}
          <div className="flex justify-center mt-16">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Founding Vision Section - White */}
      <section className="py-40 px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Label */}
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.5em] text-black/40 mb-8">{t.section5Label}</p>
            <h2 className="text-6xl text-black mb-4" style={{ fontWeight: 200 }}>
              Founding Vision
            </h2>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                <div className="w-16 h-[1px] bg-black/20"></div>
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-black/50">{t.section5Title}</p>
          </div>

          {/* Two Columns */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Left: Creativity & Innovation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xs tracking-[0.4em] text-black/40 mb-2">
                  {t.creativityTitle}
                </h3>
              </div>

              {/* Founder 1 */}
              <div className="bg-zinc-50 border border-black/10 p-10 hover:border-red-600/50 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-red-600 transition-all"></div>
                  <div>
                    <h4 className="text-2xl text-black mb-2" style={{ fontWeight: 300 }}>
                      {t.founder1Name}
                    </h4>
                    <p className="text-sm text-black/50 tracking-wide">{t.founder1Title}</p>
                  </div>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="bg-zinc-50 border border-black/10 p-10 hover:border-red-600/50 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-red-600 transition-all"></div>
                  <div>
                    <h4 className="text-2xl text-black mb-2" style={{ fontWeight: 300 }}>
                      {t.founder2Name}
                    </h4>
                    <p className="text-sm text-black/50 tracking-wide">{t.founder2Title}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Business & Enterprise */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xs tracking-[0.4em] text-black/40 mb-2">
                  {t.businessTitle}
                </h3>
              </div>

              {/* Founder 3 */}
              <div className="bg-zinc-50 border border-black/10 p-10 hover:border-red-600/50 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-red-600 transition-all"></div>
                  <div>
                    <h4 className="text-2xl text-black mb-2" style={{ fontWeight: 300 }}>
                      {t.founder3Name}
                    </h4>
                    <p className="text-sm text-black/50 tracking-wide">{t.founder3Title}</p>
                  </div>
                </div>
              </div>

              {/* Founder 4 */}
              <div className="bg-zinc-50 border border-black/10 p-10 hover:border-red-600/50 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-red-600 transition-all"></div>
                  <div>
                    <h4 className="text-2xl text-black mb-2" style={{ fontWeight: 300 }}>
                      {t.founder4Name}
                    </h4>
                    <p className="text-sm text-black/50 tracking-wide">{t.founder4Title}</p>
                  </div>
                </div>
              </div>

              {/* Founder 5 */}
              <div className="bg-zinc-50 border border-black/10 p-10 hover:border-red-600/50 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-red-600 transition-all"></div>
                  <div>
                    <h4 className="text-2xl text-black mb-2" style={{ fontWeight: 300 }}>
                      {t.founder5Name}
                    </h4>
                    <p className="text-sm text-black/50 tracking-wide">{t.founder5Title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}