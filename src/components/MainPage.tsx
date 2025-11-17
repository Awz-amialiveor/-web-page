import { motion } from 'motion/react';
import birdLogo from 'figma:asset/cb6ac42902be51a5cc78f7d60921ff44772beaec.png';
import { Clock, AlertCircle, TrendingUp, Award, Users, Skull } from 'lucide-react';

type Language = 'en' | 'zh';

interface MainPageProps {
  language: Language;
  archetype: 'A' | 'B' | 'C' | 'D' | null;
}

const translations = {
  en: {
    heroTitle: 'HOMECOMING',
    heroSubtitle: 'Architects of the Final Moment',
    heroDescription: 'In an era where life is quantified and resources are scarce, we preserve humanity\'s ultimate desire: the right to experience a meaningful end.',
    
    section1Label: 'I. THE CRISIS',
    section1Title: 'Resource Depletion & The 60-Year Threshold',
    section1Text: 'The 24th century faces catastrophic resource scarcity. To ensure civilization\'s survival, the Global Council mandated universal life settlement at age 60. Beyond this threshold, every additional day of life must be earned through measurable social contribution.',
    
    crisisTitle: 'The Three Pillars of Crisis',
    crisis1: 'Medical Resources',
    crisis1Desc: 'Healthcare capacity for elderly population collapsed in 2318',
    crisis2: 'Energy Shortage',
    crisis2Desc: 'Global energy production insufficient for current population',
    crisis3: 'Food Security',
    crisis3Desc: 'Agricultural output declining 3% annually since 2310',
    
    section2Label: 'II. THE SYSTEM',
    section2Title: 'How Life Extension Works',
    systemDesc: 'At age 60, citizens undergo mandatory Social Value Assessment. Your lifetime achievements are converted into Life Extension Points. Every 2 points grant one additional day of life.',
    
    flowTitle: 'Life Extension Process',
    flow1: 'Age 60 Reached',
    flow1Desc: 'Mandatory settlement evaluation',
    flow2: 'Value Assessment',
    flow2Desc: 'Calculate social contribution score',
    flow3: 'Points Conversion',
    flow3Desc: '2 points = 1 day of extended life',
    flow4: 'Choose Your End',
    flow4Desc: 'Spend points on final experience',
    
    section3Label: 'III. THE FORMULA',
    section3Title: 'What Determines Your Value',
    formulaDesc: 'Your social value score is calculated from six core attributes plus lifetime achievements:',
    
    coreAttributes: 'Core Attributes (Age 60)',
    achievements: 'Lifetime Achievements',
    baseScore: 'Base Score',
    bonusScore: 'Bonus Score',
    totalPoints: 'Total Life Points',
    
    scoreExample: 'Example Calculation',
    exampleDesc: 'A scientist with high intellect (75) and significant research contributions:',
    exampleBase: 'Base: 250 + 50 (Tech Elite) + 50 (Elite Bloodline) = 350',
    exampleBonus: 'Bonus: 500 (Research) + 200 (Patents) = 700',
    exampleTotal: 'Total: 1,050 points ÷ 2 = 525 days (~1.4 years) of extended life',
    
    section4Label: 'IV. OUR MISSION',
    section4Title: 'Beyond Mere Survival',
    section4Text: 'We don\'t sell more days. We craft meaningful endings. Whether you have 100 points or 10,000, we transform your remaining time into an unforgettable experience tailored to your deepest desires.',
    
    philosophy1: 'We do not extend life,',
    philosophy2: 'we perfect its conclusion.',
    philosophy3: 'Every ending deserves to be eternal.',
    
    section5Label: 'V. FOUNDING',
    section5Title: 'Established 2025',
    section5Desc: 'Founded by five visionaries who believed that even in a world of scarcity, human dignity must prevail.',
    creativityTitle: 'Innovation',
    businessTitle: 'Operations',
    
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
    heroDescription: '在生命被量化、资源稀缺的时代，我们保留人性最终极的渴望：体验有意义终结的权利。',
    
    section1Label: 'I. 危机',
    section1Title: '资源枯竭与60岁门槛',
    section1Text: '24世纪面临灾难性的资源短缺。为确保文明延续，全球理事会强制要求所有公民在60岁时进行生命清算。超过此门槛后，每多活一天都必须通过可衡量的社会贡献来赚取。',
    
    crisisTitle: '危机的三大支柱',
    crisis1: '医疗资源',
    crisis1Desc: '老年人口医疗承载能力于2318年崩溃',
    crisis2: '能源短缺',
    crisis2Desc: '全球能源产量无法满足当前人口需求',
    crisis3: '粮食安全',
    crisis3Desc: '自2310年起农业产出每年下降3%',
    
    section2Label: 'II. 系统',
    section2Title: '生命延续机制',
    systemDesc: '60岁时，公民接受强制社会价值评估。你的终生成就被转换为生命延续积分。每2积分=1天额外寿命。',
    
    flowTitle: '生命延续流程',
    flow1: '年满60岁',
    flow1Desc: '强制清算评估',
    flow2: '价值评估',
    flow2Desc: '计算社会贡献分数',
    flow3: '积分转换',
    flow3Desc: '2积分=1天延长生命',
    flow4: '选择终结',
    flow4Desc: '消费积分获取终极体验',
    
    section3Label: 'III. 公式',
    section3Title: '什么决定你的价值',
    formulaDesc: '你的社会价值分数由六大核心属性加上终生成就计算得出：',
    
    coreAttributes: '核心属性（60岁时）',
    achievements: '终生成就',
    baseScore: '基础分',
    bonusScore: '额外分',
    totalPoints: '总生命积分',
    
    scoreExample: '计算示例',
    exampleDesc: '一位高才智（75）且有重大研究贡献的科学家：',
    exampleBase: '基础：250 + 50（科技精英）+ 50（精英血统）= 350',
    exampleBonus: '额外：500（研究）+ 200（专利）= 700',
    exampleTotal: '总计：1,050积分 ÷ 2 = 525天（约1.4年）延长生命',
    
    section4Label: 'IV. 使命',
    section4Title: '超越简单的生存',
    section4Text: '我们不出售更多的日子。我们精心打造有意义的终结。无论你有100积分还是10,000积分，我们都将你剩余的时间转化为量身定制的难忘体验。',
    
    philosophy1: '我们不延长生命，',
    philosophy2: '我们完善它的结局。',
    philosophy3: '每个终结都应当是永恒的。',
    
    section5Label: 'V. 创立',
    section5Title: '创立于2025年',
    section5Desc: '由五位远见者创立，他们坚信即使在资源稀缺的世界中，人类尊严也必须得到维护。',
    creativityTitle: '创新',
    businessTitle: '运营',
    
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
      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${heroBg}`}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border-[20px] sm:border-[40px] border-white/20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full border-[15px] sm:border-[30px] border-white/10"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center pt-20 sm:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="mb-4 flex justify-center">
              <img 
                src={birdLogo} 
                alt="Homecoming" 
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain invert opacity-90"
              />
            </div>

            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.9] text-white tracking-[0.2em] sm:tracking-[0.3em]" style={{ fontWeight: 300 }}>
              {t.heroTitle}
            </h1>

            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-20 sm:w-32 h-1 bg-red-600"></div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-6 sm:mb-8 tracking-wide px-4" style={{ fontWeight: 300 }}>
              {t.heroSubtitle}
            </p>
            <p className="text-base sm:text-lg text-white/50 max-w-3xl mx-auto leading-relaxed px-4">
              {t.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section I: The Crisis */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-black/40 mb-6">{t.section1Label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-black mb-8" style={{ fontWeight: 300 }}>
              {t.section1Title}
            </h2>
            <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-4xl mb-12">
              {t.section1Text}
            </p>

            {/* Crisis Cards */}
            <h3 className="text-xl sm:text-2xl text-black mb-8" style={{ fontWeight: 300 }}>{t.crisisTitle}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t.crisis1, desc: t.crisis1Desc, icon: AlertCircle, color: 'bg-red-50 border-red-200' },
                { title: t.crisis2, desc: t.crisis2Desc, icon: TrendingUp, color: 'bg-orange-50 border-orange-200' },
                { title: t.crisis3, desc: t.crisis3Desc, icon: Users, color: 'bg-yellow-50 border-yellow-200' }
              ].map((crisis, idx) => {
                const Icon = crisis.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`border-2 ${crisis.color} p-6`}
                  >
                    <Icon className="w-10 h-10 text-black/60 mb-4" />
                    <h4 className="text-lg text-black mb-3" style={{ fontWeight: 300 }}>{crisis.title}</h4>
                    <p className="text-sm text-black/60 leading-relaxed">{crisis.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section II: The System - Flow Chart */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-zinc-50">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-black/40 mb-6">{t.section2Label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-black mb-8" style={{ fontWeight: 300 }}>
              {t.section2Title}
            </h2>
            <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-4xl mb-12">
              {t.systemDesc}
            </p>

            {/* Flow Chart */}
            <div className="bg-white border-2 border-black p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl text-black mb-8 text-center" style={{ fontWeight: 300 }}>{t.flowTitle}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: t.flow1, desc: t.flow1Desc, icon: Clock },
                  { step: '02', title: t.flow2, desc: t.flow2Desc, icon: Award },
                  { step: '03', title: t.flow3, desc: t.flow3Desc, icon: TrendingUp },
                  { step: '04', title: t.flow4, desc: t.flow4Desc, icon: Skull }
                ].map((flow, idx) => {
                  const Icon = flow.icon;
                  return (
                    <div key={idx} className="relative">
                      <div className="bg-black text-white p-6 mb-4">
                        <p className="text-xs tracking-wider opacity-60 mb-2">{flow.step}</p>
                        <Icon className="w-8 h-8 mb-3" />
                        <h4 className="text-base mb-2" style={{ fontWeight: 300 }}>{flow.title}</h4>
                      </div>
                      <p className="text-sm text-black/60">{flow.desc}</p>
                      {idx < 3 && (
                        <div className="hidden md:block absolute top-12 -right-3 text-2xl text-black/20">→</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section III: The Formula */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-black/40 mb-6">{t.section3Label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-black mb-8" style={{ fontWeight: 300 }}>
              {t.section3Title}
            </h2>
            <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-4xl mb-12">
              {t.formulaDesc}
            </p>

            {/* Formula Visualization */}
            <div className="bg-black text-white p-8 sm:p-12 mb-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-center">
                <div>
                  <p className="text-xs tracking-wider opacity-60 mb-2">{t.coreAttributes}</p>
                  <p className="text-4xl" style={{ fontWeight: 300 }}>{t.baseScore}</p>
                </div>
                <div className="text-3xl opacity-40">+</div>
                <div>
                  <p className="text-xs tracking-wider opacity-60 mb-2">{t.achievements}</p>
                  <p className="text-4xl" style={{ fontWeight: 300 }}>{t.bonusScore}</p>
                </div>
                <div className="text-3xl opacity-40">=</div>
                <div>
                  <p className="text-xs tracking-wider opacity-60 mb-2">{t.totalPoints}</p>
                  <p className="text-5xl text-red-500" style={{ fontWeight: 300 }}>TOTAL</p>
                </div>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-zinc-50 border-2 border-black/10 p-8">
              <h3 className="text-xl sm:text-2xl text-black mb-4" style={{ fontWeight: 300 }}>{t.scoreExample}</h3>
              <p className="text-sm text-black/60 mb-6">{t.exampleDesc}</p>
              <div className="space-y-3 text-sm">
                <p className="text-black/70">{t.exampleBase}</p>
                <p className="text-black/70">{t.exampleBonus}</p>
                <div className="border-t-2 border-black/20 pt-3 mt-3">
                  <p className="text-lg text-black" style={{ fontWeight: 300 }}>{t.exampleTotal}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section IV: Philosophy */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-black text-white">
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/40 mb-6">{t.section4Label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-8" style={{ fontWeight: 300 }}>
              {t.section4Title}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-12">
              {t.section4Text}
            </p>

            <div className="space-y-4">
              {[t.philosophy1, t.philosophy2, t.philosophy3].map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl text-white/90 italic"
                  style={{ fontWeight: 300 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section V: Founders */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-black/40 mb-6">{t.section5Label}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-black mb-4" style={{ fontWeight: 300 }}>
              {t.section5Title}
            </h2>
            <p className="text-base sm:text-lg text-black/60 leading-relaxed mb-12">
              {t.section5Desc}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm tracking-[0.3em] text-black/40 mb-6">{t.creativityTitle}</h3>
                <div className="space-y-6">
                  {[
                    { name: t.founder1Name, title: t.founder1Title },
                    { name: t.founder2Name, title: t.founder2Title }
                  ].map((founder, idx) => (
                    <div key={idx} className="border-l-2 border-black pl-6">
                      <h4 className="text-xl text-black mb-1" style={{ fontWeight: 300 }}>{founder.name}</h4>
                      <p className="text-sm text-black/50">{founder.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.3em] text-black/40 mb-6">{t.businessTitle}</h3>
                <div className="space-y-6">
                  {[
                    { name: t.founder3Name, title: t.founder3Title },
                    { name: t.founder4Name, title: t.founder4Title },
                    { name: t.founder5Name, title: t.founder5Title }
                  ].map((founder, idx) => (
                    <div key={idx} className="border-l-2 border-black pl-6">
                      <h4 className="text-xl text-black mb-1" style={{ fontWeight: 300 }}>{founder.name}</h4>
                      <p className="text-sm text-black/50">{founder.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
