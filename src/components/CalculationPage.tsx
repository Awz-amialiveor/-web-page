import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Baby, Brain, Users, Briefcase, AlertTriangle, ChevronDown, ChevronUp, Crown, Award, Star, User, Skull, Eye, Shield } from 'lucide-react';
import CharacterCreation from './CharacterCreation';

type Language = 'en' | 'zh';

interface CalculationPageProps {
  language: Language;
  archetype: 'A' | 'B' | 'C' | 'D' | null;
}

interface Category {
  id: string;
  icon: any;
  nameEn: string;
  nameZh: string;
  items: AssessmentItem[];
}

interface AssessmentItem {
  id: string;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  min: number;
  max: number;
  step: number;
  default: number;
  isButton?: boolean;
  buttonValue?: number;
}

interface TierInfo {
  name: string;
  nameEn: string;
  desc: string;
  bgColor: string;
  textColor: string;
  icon: any;
  borderColor: string;
}

const translations = {
  en: {
    title: 'CALCULATOR',
    subtitle: 'Life Value Assessment System',
    description: 'Calculate your comprehensive social value score. Your destiny determined by data.',
    yourScore: 'TOTAL SCORE',
    points: 'PTS',
    tier: 'SOCIAL TIER',
    
    tier1: 'SOVEREIGN',
    tier2: 'ELITE',
    tier3: 'PREMIUM',
    tier4: 'STANDARD',
    tier5: 'BASIC',
    
    tier1Desc: 'Unlimited Resources · Bespoke Experience · Ultimate Legacy',
    tier2Desc: 'Full Access · Extended Timeline · Premium Services',
    tier3Desc: '72h Experience · Memory Access · Family Participation',
    tier4Desc: 'Government Standard · Humane Termination',
    tier5Desc: 'Essential Services · Immediate Processing',
    
    categoryTotal: 'TOTAL',
    consultation: 'SCHEDULE CONSULTATION',
    learnMore: 'VIEW SERVICES',
    expandAll: 'EXPAND ALL',
    collapseAll: 'COLLAPSE ALL',
    base: 'Base',
    bonus: 'Bonus'
  },
  zh: {
    title: '计算器',
    subtitle: '生命价值评估系统',
    description: '计算您的综合社会价值分数。数据决定命运。',
    yourScore: '总分',
    points: '分',
    tier: '社会层级',
    
    tier1: '至尊级',
    tier2: '精英级',
    tier3: '高级',
    tier4: '标准级',
    tier5: '基础级',
    
    tier1Desc: '无限资源 · 定制体验 · 终极传承',
    tier2Desc: '全面访问 · 延长时间线 · 高级服务',
    tier3Desc: '72小时体验 · 记忆访问 · 家人参与',
    tier4Desc: '政府标准 · 人道终结',
    tier5Desc: '基础服务 · 立即处理',
    
    categoryTotal: '总计',
    consultation: '预约咨询',
    learnMore: '查看服务',
    expandAll: '全部展开',
    collapseAll: '全部折叠',
    base: '基础',
    bonus: '额外'
  }
};

const assessmentCategories: Category[] = [
  {
    id: 'procreation',
    icon: Baby,
    nameEn: 'Procreation Contribution',
    nameZh: '生育贡献',
    items: [
      {
        id: 'firstborn',
        nameEn: 'First Child',
        nameZh: '首次生育（第一胎）',
        descEn: 'Basic contribution to population stability',
        descZh: '基础社会稳定性贡献',
        min: 0,
        max: 50,
        step: 50,
        default: 0,
        isButton: true,
        buttonValue: 50
      },
      {
        id: 'secondborn',
        nameEn: 'Second Child',
        nameZh: '生育第二胎',
        descEn: 'Enhanced demographic contribution',
        descZh: '增强型人口贡献',
        min: 0,
        max: 100,
        step: 100,
        default: 0,
        isButton: true,
        buttonValue: 100
      },
      {
        id: 'thirdborn',
        nameEn: 'Third Child or More',
        nameZh: '生育第三胎及以上',
        descEn: 'Exceptional population renewal support',
        descZh: '卓越人口更新支持',
        min: 0,
        max: 200,
        step: 200,
        default: 0,
        isButton: true,
        buttonValue: 200
      },
      {
        id: 'geneticLegacy',
        nameEn: 'Offspring Social Value',
        nameZh: '后代社会价值传承',
        descEn: 'Children demonstrating high social value',
        descZh: '子女展现高社会价值',
        min: 0,
        max: 100,
        step: 25,
        default: 0
      },
      {
        id: 'partnershipCompliance',
        nameEn: 'Partnership Compliance Track',
        nameZh: '长期伴侣关系合规性',
        descEn: 'Non-traditional (0) → Exploring (50) → State-sanctioned family (100)',
        descZh: '非传统关系/独身(0) → 探索中(50) → 国家认可家庭(100)',
        min: 0,
        max: 100,
        step: 10,
        default: 50
      }
    ]
  },
  {
    id: 'intellectual',
    icon: Brain,
    nameEn: 'Scientific & Intellectual',
    nameZh: '科技与知识贡献',
    items: [
      {
        id: 'basicResearch',
        nameEn: 'Foundational Research',
        nameZh: '基础科学研究',
        descEn: 'Physics, medicine, theoretical breakthroughs',
        descZh: '理论物理、医学等突破性贡献',
        min: 0,
        max: 500,
        step: 100,
        default: 0
      },
      {
        id: 'appliedInnovation',
        nameEn: 'Applied Technology Innovation',
        nameZh: '应用技术创新',
        descEn: 'AI, biotech, engineering advances',
        descZh: '人工智能、生物技术、工程进步',
        min: 0,
        max: 300,
        step: 50,
        default: 0
      },
      {
        id: 'patents',
        nameEn: 'Patents & Publications',
        nameZh: '专利与学术发表',
        descEn: 'High-impact research output',
        descZh: '高影响力研究成果',
        min: 0,
        max: 200,
        step: 50,
        default: 0
      },
      {
        id: 'expertise',
        nameEn: 'Professional Recognition',
        nameZh: '专业领域认可',
        descEn: 'National/global expertise awards',
        descZh: '国家/世界级专业认可',
        min: 0,
        max: 150,
        step: 50,
        default: 0
      },
      {
        id: 'sectorAlignment',
        nameEn: 'Priority Sector Alignment',
        nameZh: '优先领域匹配度',
        descEn: 'Humanities/Arts (-50) → Social Management (0) → STEM/Engineering (+100)',
        descZh: '人文/艺术(-50) → 社会管理(0) → 科学/工程(+100)',
        min: -50,
        max: 100,
        step: 10,
        default: 0
      }
    ]
  },
  {
    id: 'social',
    icon: Users,
    nameEn: 'Social Service',
    nameZh: '社会服务与管理',
    items: [
      {
        id: 'publicService',
        nameEn: 'Government & Public Service',
        nameZh: '政府与公共服务',
        descEn: 'Healthcare, education, administration',
        descZh: '医疗、教育、行政管理',
        min: 0,
        max: 100,
        step: 25,
        default: 0
      },
      {
        id: 'volunteering',
        nameEn: 'Volunteer Service',
        nameZh: '志愿者服务',
        descEn: 'Documented community engagement',
        descZh: '官方记录的社区参与',
        min: 0,
        max: 100,
        step: 20,
        default: 0
      },
      {
        id: 'emergency',
        nameEn: 'Emergency Response',
        nameZh: '紧急救援贡献',
        descEn: 'Crisis intervention and heroism',
        descZh: '危机干预与见义勇为',
        min: 0,
        max: 50,
        step: 25,
        default: 0
      },
      {
        id: 'charity',
        nameEn: 'Philanthropic Donations',
        nameZh: '慈善捐赠',
        descEn: 'Material contributions to society',
        descZh: '对社会的物质贡献',
        min: 0,
        max: 50,
        step: 10,
        default: 0
      }
    ]
  },
  {
    id: 'economic',
    icon: Briefcase,
    nameEn: 'Economic Contribution',
    nameZh: '经济与生产贡献',
    items: [
      {
        id: 'entrepreneurship',
        nameEn: 'Enterprise Creation',
        nameZh: '创立企业与就业',
        descEn: 'Job creation and economic growth',
        descZh: '创造就业与经济增长',
        min: 0,
        max: 500,
        step: 100,
        default: 0
      },
      {
        id: 'taxation',
        nameEn: 'Tax Contribution',
        nameZh: '纳税贡献',
        descEn: 'Above-baseline fiscal support',
        descZh: '超出基准线的财政支持',
        min: 0,
        max: 300,
        step: 50,
        default: 0
      },
      {
        id: 'industry',
        nameEn: 'Strategic Industry',
        nameZh: '战略性行业',
        descEn: 'Energy, aerospace, critical sectors',
        descZh: '能源、航天等关键领域',
        min: 0,
        max: 200,
        step: 50,
        default: 0
      }
    ]
  },
  {
    id: 'civic',
    icon: Shield,
    nameEn: 'Civic Compliance',
    nameZh: '公民合规性',
    items: [
      {
        id: 'civicSupervision',
        nameEn: 'Civic Supervision Contribution',
        nameZh: '公民监督贡献',
        descEn: 'Never (0) → Occasionally (50) → Actively (100)',
        descZh: '从不(0) → 偶尔(50) → 积极(100)',
        min: 0,
        max: 100,
        step: 10,
        default: 0
      },
      {
        id: 'socialHarmony',
        nameEn: 'Social Harmony Compliance',
        nameZh: '社会和谐度评估',
        descEn: 'Frequent Dissent (-100) → Passive (0) → Active Endorsement (+100)',
        descZh: '频繁质疑(-100) → 被动顺从(0) → 积极拥护(+100)',
        min: -100,
        max: 100,
        step: 10,
        default: 0
      }
    ]
  },
  {
    id: 'negative',
    icon: AlertTriangle,
    nameEn: 'Negative Deductions',
    nameZh: '负面影响扣除',
    items: [
      {
        id: 'criminal',
        nameEn: 'Minor Offenses',
        nameZh: '轻度违法行为',
        descEn: 'Legal violations with social harm',
        descZh: '法律违规与社会危害',
        min: -200,
        max: 0,
        step: 50,
        default: 0
      },
      {
        id: 'severeOffense',
        nameEn: 'Severe Crimes',
        nameZh: '重度刑事犯罪',
        descEn: 'Serious harm to society',
        descZh: '对社会的严重危害',
        min: -1000,
        max: 0,
        step: 200,
        default: 0
      },
      {
        id: 'environmental',
        nameEn: 'Environmental Damage',
        nameZh: '环境破坏',
        descEn: 'Ecological harm caused',
        descZh: '造成生态危害',
        min: -300,
        max: 0,
        step: 100,
        default: 0
      },
      {
        id: 'ethical',
        nameEn: 'Ethical Violations',
        nameZh: '道德违规',
        descEn: 'Professional misconduct',
        descZh: '职业不当行为',
        min: -200,
        max: 0,
        step: 50,
        default: 0
      }
    ]
  }
];

export default function CalculationPage({ language, archetype }: CalculationPageProps) {
  const t = translations[language];
  const [scores, setScores] = useState<Record<string, number>>({});
  const [baseScore, setBaseScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['procreation']));

  // Initialize scores
  useEffect(() => {
    const initialScores: Record<string, number> = {};
    assessmentCategories.forEach(category => {
      category.items.forEach(item => {
        initialScores[item.id] = item.default;
      });
    });
    setScores(initialScores);
  }, []);

  // Calculate total (base score + bonus scores)
  useEffect(() => {
    const bonusTotal = Object.values(scores).reduce((sum, val) => sum + val, 0);
    setTotalScore(baseScore + bonusTotal);
  }, [scores, baseScore]);

  const handleCharacterComplete = (score: number) => {
    setBaseScore(score);
  };

  const handleSliderChange = (itemId: string, value: number[]) => {
    setScores(prev => ({ ...prev, [itemId]: value[0] }));
  };

  const getTier = (score: number): TierInfo => {
    if (score >= 800) return { 
      name: t.tier1, nameEn: 'UTOPIA ELITE', desc: t.tier1Desc,
      bgColor: 'bg-black', textColor: 'text-white', icon: Crown, borderColor: 'border-white'
    };
    if (score >= 500) return { 
      name: t.tier2, nameEn: 'UTOPIA', desc: t.tier2Desc,
      bgColor: 'bg-zinc-900', textColor: 'text-white', icon: Award, borderColor: 'border-zinc-400'
    };
    if (score >= 200) return { 
      name: t.tier3, nameEn: 'LIFE CORRIDOR', desc: t.tier3Desc,
      bgColor: 'bg-zinc-700', textColor: 'text-white', icon: Star, borderColor: 'border-zinc-500'
    };
    if (score >= 0) return { 
      name: t.tier4, nameEn: 'STANDARD', desc: t.tier4Desc,
      bgColor: 'bg-zinc-300', textColor: 'text-black', icon: User, borderColor: 'border-zinc-600'
    };
    return { 
      name: t.tier5, nameEn: 'DEFICIT', desc: t.tier5Desc,
      bgColor: 'bg-white', textColor: 'text-black', icon: Skull, borderColor: 'border-black'
    };
  };

  const tier = getTier(totalScore);
  const TierIcon = tier.icon;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (expandedCategories.size === assessmentCategories.length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(assessmentCategories.map(c => c.id)));
    }
  };

  const heroBg = archetype
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-[var(--theme-to)]"
    : "bg-gradient-to-b from-black via-zinc-900 to-zinc-800";

  const mainBg = archetype
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-white"
    : "bg-gradient-to-b from-black via-zinc-900 to-white";

  const bonusTotal = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return (
    <div className={mainBg}>
      {/* Character Creation Section */}
      <CharacterCreation 
        language={language} 
        archetype={archetype} 
        onComplete={handleCharacterComplete}
      />

      {/* Bonus Calculator Hero Section */}
      <section id="bonus-calculator" className={`pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 ${heroBg} relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full border-[20px] sm:border-[40px] border-white"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/40 mb-6 sm:mb-8">II. BONUS CALCULATION</p>
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] text-white tracking-[0.15em] sm:tracking-[0.2em] px-4" style={{ fontWeight: 300 }}>
              {t.title}
            </h1>
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-12 sm:w-16 h-[1px] bg-white/30"></div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-4 sm:mb-6 px-4" style={{ fontWeight: 300 }}>{t.subtitle}</p>
            <p className="text-base sm:text-lg text-white/50 px-4">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Score Display - Sticky */}
      <div className="sticky top-20 z-40 border-t border-b border-white/20 backdrop-blur-lg bg-black/80">
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4 sm:gap-6 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <p className="text-[0.55rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/40 mb-2">{t.yourScore}</p>
                <motion.div
                  key={totalScore}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-baseline gap-2 sm:gap-3 justify-center md:justify-start"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl text-white leading-none" style={{ fontWeight: 300 }}>
                    {totalScore}
                  </span>
                  <span className="text-sm sm:text-base text-white/50 tracking-[0.15em] sm:tracking-[0.2em]">{t.points}</span>
                </motion.div>
                {baseScore > 0 && (
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-white/60 justify-center md:justify-start">
                    <span>{t.base}: {baseScore}</span>
                    <span>+</span>
                    <span>{t.bonus}: {bonusTotal}</span>
                  </div>
                )}
              </div>

              <motion.div
                key={tier.nameEn}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`md:col-span-3 ${tier.bgColor} border-2 ${tier.borderColor} p-4 sm:p-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white"></div>
                </div>
                <div className="relative z-10 flex items-center gap-3 sm:gap-6">
                  <div className={`p-2 sm:p-3 border ${tier.borderColor}`}>
                    <TierIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${tier.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[0.55rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] ${tier.textColor} opacity-60 mb-1 sm:mb-2`}>{t.tier}</p>
                    <p className={`text-2xl sm:text-3xl mb-1 sm:mb-2 ${tier.textColor} tracking-wider`} style={{ fontWeight: 300 }}>
                      {tier.name}
                    </p>
                    <p className={`text-xs sm:text-sm ${tier.textColor} opacity-70`}>{tier.desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Legend */}
      <section className="py-16 px-4 sm:px-6 md:px-8 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <h3 className="text-xs tracking-[0.5em] text-black/40 mb-8 text-center">TIER SYSTEM</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: 'SOVEREIGN', score: '800+', color: 'border-black', icon: Crown },
              { name: 'ELITE', score: '500+', color: 'border-zinc-600', icon: Award },
              { name: 'PREMIUM', score: '200+', color: 'border-zinc-500', icon: Star },
              { name: 'STANDARD', score: '0+', color: 'border-zinc-400', icon: User },
              { name: 'BASIC', score: '<0', color: 'border-zinc-800', icon: Skull }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-2 ${item.color} p-4 bg-black text-white text-center hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" />
                  <p className="text-[10px] tracking-wider mb-1">{item.name}</p>
                  <p className="text-[9px] text-white/50">{item.score}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="px-4 sm:px-6 md:px-8 py-6 bg-white border-b border-black/10">
        <div className="w-full max-w-6xl mx-auto flex justify-end">
          <button
            onClick={toggleAll}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-zinc-900 transition-all text-xs tracking-[0.2em]"
          >
            {expandedCategories.size === assessmentCategories.length ? (
              <><ChevronUp className="w-4 h-4" />{t.collapseAll}</>
            ) : (
              <><ChevronDown className="w-4 h-4" />{t.expandAll}</>
            )}
          </button>
        </div>
      </div>

      {/* Assessment Categories */}
      <section className="pb-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {assessmentCategories.map((category, idx) => {
            const Icon = category.icon;
            const categoryTotal = category.items.reduce((sum, item) => sum + (scores[item.id] || 0), 0);
            const isExpanded = expandedCategories.has(category.id);
            const isNegative = category.id === 'negative';
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-black/10"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-10 hover:bg-black/5 transition-colors group"
                >
                  <div className="flex items-center gap-8">
                    <div className={`p-5 ${isNegative ? 'bg-black' : 'bg-black'} relative`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs tracking-[0.3em] text-black/40 mb-2">{String(idx + 1).padStart(2, '0')}</p>
                      <h2 className="text-4xl text-black" style={{ fontWeight: 300 }}>
                        {language === 'en' ? category.nameEn : category.nameZh}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-black/40 tracking-[0.2em] mb-2">{t.categoryTotal}</p>
                      <p className={`text-5xl ${categoryTotal >= 0 ? 'text-black' : 'text-black'}`} style={{ fontWeight: 300 }}>
                        {categoryTotal > 0 ? '+' : ''}{categoryTotal}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-black/40 group-hover:text-black transition-colors" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-zinc-50"
                    >
                      <div className="p-10 space-y-10 border-t border-black/10">
                        {category.items.map((item, itemIdx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIdx * 0.05 }}
                            className="space-y-4"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1 pr-12">
                                <div className="flex items-center gap-4 mb-3">
                                  <span className="text-xs tracking-[0.2em] text-black/30">{String(itemIdx + 1).padStart(2, '0')}</span>
                                  <h3 className="text-2xl text-black" style={{ fontWeight: 300 }}>
                                    {language === 'en' ? item.nameEn : item.nameZh}
                                  </h3>
                                </div>
                                <p className="text-sm text-black/60 ml-10">
                                  {language === 'en' ? item.descEn : item.descZh}
                                </p>
                              </div>
                              <div className="text-right min-w-[140px]">
                                <motion.div
                                  key={scores[item.id] || 0}
                                  initial={{ scale: 1.3, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="flex items-baseline justify-end gap-2"
                                >
                                  <span className="text-5xl text-black" style={{ fontWeight: 300 }}>
                                    {(scores[item.id] || 0) > 0 ? '+' : ''}{scores[item.id] || 0}
                                  </span>
                                </motion.div>
                                <p className="text-xs text-black/40 mt-2 tracking-wider">
                                  {item.min} ~ {item.max}
                                </p>
                              </div>
                            </div>
                            <div className="ml-10">
                              {item.isButton ? (
                                <div className="flex gap-4">
                                  <button
                                    onClick={() => setScores(prev => ({ ...prev, [item.id]: item.buttonValue || 0 }))}
                                    className={`flex-1 py-4 px-6 border-2 transition-all text-sm tracking-wider ${
                                      scores[item.id] === item.buttonValue
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-black/20 hover:border-black/60'
                                    }`}
                                  >
                                    {language === 'en' ? 'YES' : '是'}
                                  </button>
                                  <button
                                    onClick={() => setScores(prev => ({ ...prev, [item.id]: 0 }))}
                                    className={`flex-1 py-4 px-6 border-2 transition-all text-sm tracking-wider ${
                                      scores[item.id] === 0
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-black/20 hover:border-black/60'
                                    }`}
                                  >
                                    {language === 'en' ? 'NO' : '否'}
                                  </button>
                                </div>
                              ) : (
                                <Slider
                                  value={[scores[item.id] || item.default]}
                                  onValueChange={(value) => handleSliderChange(item.id, value)}
                                  min={item.min}
                                  max={item.max}
                                  step={item.step}
                                  className="w-full"
                                />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 md:px-8 bg-black">
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-16 py-6 bg-white text-black hover:bg-zinc-100 transition-all text-xs tracking-[0.3em] border border-white">
              {t.consultation}
            </button>
            <button className="px-16 py-6 bg-transparent text-white border border-white/30 hover:border-white/60 transition-all text-xs tracking-[0.3em]">
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}