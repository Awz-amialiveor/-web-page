import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Wallet, Brain, Heart, Crown as LegacyIcon, Users, Sparkles } from 'lucide-react';

type Language = 'en' | 'zh';

interface CharacterCreationProps {
  language: Language;
  archetype: 'A' | 'B' | 'C' | 'D' | null;
  onComplete: (baseScore: number) => void;
}

interface Attribute {
  id: string;
  icon: any;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  value: number;
}

interface Modifier {
  name: string;
  value: number;
  description: string;
}

const translations = {
  en: {
    sectionTitle: 'I. PROTOTYPE CONSTRUCTION',
    title: 'Citizen Value Prototype Dossier',
    subtitle: 'System Version: HC-TRPG.v2.0',
    step1: 'Step 1: Prototype Construction',
    step1Title: 'Allocate Initial Resources for Your "Future Self"',
    step1Desc: 'Hello, citizen from 2025. Now, you will allocate initial survival resources for your "prototype" 40 years from now. You have 250 "Life Potential Points" to distribute among the six core attributes below. Minimum value for each is 10, maximum is 80.',
    step2: 'Step 2: Core Attribute Allocation',
    
    ast: 'Assets (AST)',
    astDesc: 'Represents your family background, wealth, and resources you can mobilize. In this world, money may not buy immortality, but it can buy "flexibility" and time.',
    
    int: 'Intellect (INT)',
    intDesc: 'Your education, logical thinking, and problem-solving abilities. High intellect is the ticket to becoming a scientist or engineer, the only shortcut to privileged class.',
    
    con: 'Constitution (CON)',
    conDesc: 'Your health level, immunity, and resistance to harsh environments. In an era of strictly controlled medical resources, a healthy body is your most reliable asset.',
    
    lgc: 'Legacy (LGC)',
    lgcDesc: 'Your family background, parents\' social status, and the path they paved for you. High legacy means you are born with connections and resources beyond ordinary people.',
    
    soc: 'Social Capital (SOC)',
    socDesc: 'Your emotional intelligence, network, and "conformity" to social rules. It represents your ability to integrate into the collective and be "favored" by the system.',
    
    lck: 'Luck (LCK)',
    lckDesc: 'Pure, unquantifiable luck. In this cruel world, sometimes a tiny coincidence can change everything.',
    
    pointsRemaining: 'Points Remaining',
    totalPoints: 'Total Points',
    generateButton: 'Generate Prototype Dossier',
    incompleteButton: 'Incomplete Allocation',
    resetButton: 'Reset',
    legacyScoreTitle: 'Generational Legacy Score',
    legacyScoreDesc: 'Inherited from family background (can reroll)',
    rerollButton: 'Reroll',
    rerollsRemaining: 'Rerolls remaining',
    potentialBonuses: 'Active Bonuses & Penalties',
    noBonuses: 'No special modifiers active',
    
    step3: 'Step 3: Prototype Dossier Generated',
    citizenId: 'Citizen ID',
    age: 'Age',
    status: 'Status',
    preAssessment: 'Pre-assessment Stage',
    coreAttributes: 'Core Attributes',
    derivedStats: 'Derived Stats',
    baseScore: 'Base Social Value Score',
    potentialTotal: 'Potential Total',
    systemModifiers: 'System Modifiers',
    synergyBonuses: 'Synergy Bonuses',
    finalScore: 'Final Base Score',
    lifePoints: 'Life Points Pool',
    continueButton: 'Continue to Bonus Calculator',
    
    techElite: 'Tech Elite Weighting',
    techEliteDesc: 'INT > 70: You are the engine of civilization',
    socialInstability: 'Social Instability Factor',
    socialInstabilityDesc: 'SOC < 30: A potential troublemaker',
    healthDrain: 'Health Resource Drain',
    healthDrainDesc: 'CON < 30: A potential medical burden',
    
    eliteBloodline: 'Elite Bloodline',
    eliteBloodlineDesc: 'INT > 60 & LGC > 60: Born in Rome',
    capitalNetwork: 'Capital Network',
    capitalNetworkDesc: 'AST > 60 & SOC > 60: Power through wealth',
    tenaciousLife: 'Tenacious Life Force',
    tenaciousLifeDesc: 'CON > 70 & LCK > 70: Survival itself is value'
  },
  zh: {
    sectionTitle: 'I. 原型建构',
    title: '公民价值原型档案',
    subtitle: '系统版本：HC-TRPG.v2.0',
    step1: '第一步：原型建构',
    step1Title: '为你的"未来自我"分配初始资源',
    step1Desc: '你好，来自2025年的公民。现在，你将为你40年后的"原型"分配初始的生存资源。你拥有 250 点"人生潜能点"，请将它们分配到以下六大核心属性中。每个属性的最低值为 10，最高值为 80。',
    step2: '第二步：核心属性分配',
    
    ast: '资产',
    astDesc: '代表你的家境、财富和可以秘密调动的资源。在这个世界，金钱或许买不到永生，但它能买到"通融"和时间。',
    
    int: '才智',
    intDesc: '你的学识、逻辑思维和解决问题的能力。高才智是成为科学家或工程师的门票，是通往特权阶级的唯一捷径。',
    
    con: '体质',
    conDesc: '你的健康水平、免疫力和对恶劣环境的抵抗力。在医疗资源被严格管制的时代，一副好身体是你最可靠的资本。',
    
    lgc: '传承',
    lgcDesc: '你的家庭背景、父母的社会地位和他们为你铺就的道路。高传承意味着你生来就拥有普通人无法企及的人脉和资源。',
    
    soc: '社会资本',
    socDesc: '你的情商、人脉网络和对社会规则的"顺从度"。它代表了你融入集体、被"系统"所喜爱的程度。',
    
    lck: '幸运',
    lckDesc: '无法被量化的、纯粹的运气。在这个残酷的世界里，有时一个微不足道的巧合，就能改变一切。',
    
    pointsRemaining: '剩余潜能点',
    totalPoints: '总点数',
    generateButton: '生成原型档案',
    incompleteButton: '潜能分配未完成',
    resetButton: '重置',
    legacyScoreTitle: '代际传承指数',
    legacyScoreDesc: '继承自家庭背景（可重投）',
    rerollButton: '重投骰子',
    rerollsRemaining: '剩余重投次数',
    potentialBonuses: '激活的奖励与惩罚',
    noBonuses: '无特殊修正值激活',
    
    step3: '第三步：生成原型档案',
    citizenId: '公民ID',
    age: '年龄',
    status: '状态',
    preAssessment: '预评估阶段',
    coreAttributes: '核心属性',
    derivedStats: '衍生数值',
    baseScore: '社会价值基准分',
    potentialTotal: '潜能点总和',
    systemModifiers: '系统修正值',
    synergyBonuses: '协同奖励',
    finalScore: '最终基准分',
    lifePoints: '生命积分池',
    continueButton: '继续至额外积分计算器',
    
    techElite: '科技精英权重',
    techEliteDesc: '才智 > 70：你是文明的引擎',
    socialInstability: '社会不稳定因素',
    socialInstabilityDesc: '社会资本 < 30：潜在的麻烦制造者',
    healthDrain: '健康资源损耗',
    healthDrainDesc: '体质 < 30：潜在的医疗资源消耗者',
    
    eliteBloodline: '精英血统',
    eliteBloodlineDesc: '才智 > 60 且 传承 > 60：生在罗马',
    capitalNetwork: '资本网络',
    capitalNetworkDesc: '资产 > 60 且 社会资本 > 60：财富与人脉',
    tenaciousLife: '顽强生命力',
    tenaciousLifeDesc: '体质 > 70 且 幸运 > 70：活着本身就是价值'
  }
};

// Calculate base score according to V2.0 rules (includes legacy score)
function calculateBaseScore(attributes: Attribute[], legacyScore: number): { 
  total: number, 
  potentialSum: number,
  legacyScore: number,
  modifiers: Modifier[], 
  synergies: Modifier[] 
} {
  const attrMap: Record<string, number> = {};
  attributes.forEach(attr => {
    attrMap[attr.id] = attr.value;
  });

  const potentialSum = 250; // Total potential points
  const modifiers: Modifier[] = [];
  const synergies: Modifier[] = [];

  // System Modifiers
  if (attrMap.int > 70) {
    modifiers.push({ name: 'techElite', value: 50, description: 'INT > 70' });
  }
  if (attrMap.soc < 30) {
    modifiers.push({ name: 'socialInstability', value: -40, description: 'SOC < 30' });
  }
  if (attrMap.con < 30) {
    modifiers.push({ name: 'healthDrain', value: -40, description: 'CON < 30' });
  }

  // Synergy Bonuses
  if (attrMap.int > 60 && attrMap.lgc > 60) {
    synergies.push({ name: 'eliteBloodline', value: 50, description: 'INT > 60 & LGC > 60' });
  }
  if (attrMap.ast > 60 && attrMap.soc > 60) {
    synergies.push({ name: 'capitalNetwork', value: 40, description: 'AST > 60 & SOC > 60' });
  }
  if (attrMap.con > 70 && attrMap.lck > 70) {
    synergies.push({ name: 'tenaciousLife', value: 20, description: 'CON > 70 & LCK > 70' });
  }

  const modifierTotal = modifiers.reduce((sum, m) => sum + m.value, 0);
  const synergyTotal = synergies.reduce((sum, s) => sum + s.value, 0);
  
  return {
    total: potentialSum + legacyScore + modifierTotal + synergyTotal,
    potentialSum,
    legacyScore,
    modifiers,
    synergies
  };
}

// Check potential modifiers and synergies based on current attributes
function checkPotentialBonuses(attributes: Attribute[], language: Language): string[] {
  const attrMap: Record<string, number> = {};
  attributes.forEach(attr => {
    attrMap[attr.id] = attr.value;
  });

  const hints: string[] = [];

  if (attrMap.int > 70) {
    hints.push(language === 'zh' ? '✓ 科技精英权重 +50' : '✓ Tech Elite +50');
  }
  if (attrMap.soc < 30) {
    hints.push(language === 'zh' ? '⚠ 社会不稳定 -40' : '⚠ Social Instability -40');
  }
  if (attrMap.con < 30) {
    hints.push(language === 'zh' ? '⚠ 健康资源损耗 -40' : '⚠ Health Drain -40');
  }
  if (attrMap.int > 60 && attrMap.lgc > 60) {
    hints.push(language === 'zh' ? '★ 精英血统 +50' : '★ Elite Bloodline +50');
  }
  if (attrMap.ast > 60 && attrMap.soc > 60) {
    hints.push(language === 'zh' ? '★ 资本网络 +40' : '★ Capital Network +40');
  }
  if (attrMap.con > 70 && attrMap.lck > 70) {
    hints.push(language === 'zh' ? '★ 顽强生命力 +20' : '★ Tenacious Life +20');
  }

  return hints;
}

export default function CharacterCreation({ language, archetype, onComplete }: CharacterCreationProps) {
  const t = translations[language];
  const TOTAL_POINTS = 250;
  const MIN_VALUE = 10;
  const MAX_VALUE = 80;
  
  const [generated, setGenerated] = useState(false);
  const [citizenId, setCitizenId] = useState('');
  const [scoreBreakdown, setScoreBreakdown] = useState<ReturnType<typeof calculateBaseScore> | null>(null);
  
  // Legacy score with reroll functionality
  const [legacyScore, setLegacyScore] = useState(() => Math.floor(Math.random() * 401) - 200);
  const [rerollsLeft, setRerollsLeft] = useState(2);
  
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: 'ast',
      icon: Wallet,
      nameEn: 'Assets',
      nameZh: '资产',
      descEn: 'Represents your family background, wealth, and resources you can mobilize. In this world, money may not buy immortality, but it can buy "flexibility" and time.',
      descZh: '代表你的家境、财富和可以秘密调动的资源。在这个世界，金钱或许买不到永生，但它能买到"通融"和时间。',
      value: MIN_VALUE
    },
    {
      id: 'int',
      icon: Brain,
      nameEn: 'Intellect',
      nameZh: '才智',
      descEn: 'Your education, logical thinking, and problem-solving abilities. High intellect is the ticket to becoming a scientist or engineer, the only shortcut to privileged class.',
      descZh: '你的学识、逻辑思维和解决问题的能力。高才智是成为科学家或工程师的门票，是通往特权阶级的唯一捷径。',
      value: MIN_VALUE
    },
    {
      id: 'con',
      icon: Heart,
      nameEn: 'Constitution',
      nameZh: '体质',
      descEn: 'Your health level, immunity, and resistance to harsh environments. In an era of strictly controlled medical resources, a healthy body is your most reliable asset.',
      descZh: '你的健康水平、免疫力和对恶劣环境的抵抗力。在医疗资源被严格管制的时代，一副好身体是你最可靠的资本。',
      value: MIN_VALUE
    },
    {
      id: 'lgc',
      icon: LegacyIcon,
      nameEn: 'Legacy',
      nameZh: '传承',
      descEn: 'Your family background, parents\' social status, and the path they paved for you. High legacy means you are born with connections and resources beyond ordinary people.',
      descZh: '你的家庭背景、父母的社会地位和他们为你铺就的道路。高传承意味着你生来就拥有普通人无法企及的人脉和资源。',
      value: MIN_VALUE
    },
    {
      id: 'soc',
      icon: Users,
      nameEn: 'Social Capital',
      nameZh: '社会资本',
      descEn: 'Your emotional intelligence, network, and "conformity" to social rules. It represents your ability to integrate into the collective and be "favored" by the system.',
      descZh: '你的情商、人脉网络和对社会规则的"顺从度"。它代表了你融入集体、被"系统"所喜爱的程度。',
      value: MIN_VALUE
    },
    {
      id: 'lck',
      icon: Sparkles,
      nameEn: 'Luck',
      nameZh: '幸运',
      descEn: 'Pure, unquantifiable luck. In this cruel world, sometimes a tiny coincidence can change everything.',
      descZh: '无法被量化的、纯粹的运气。在这个残酷的世界里，有时一个微不足道的巧合，就能改变一切。',
      value: MIN_VALUE
    }
  ]);

  const usedPoints = attributes.reduce((sum, attr) => sum + attr.value, 0);
  const remainingPoints = TOTAL_POINTS - usedPoints;
  
  const potentialBonuses = checkPotentialBonuses(attributes, language);

  const handleRerollLegacy = () => {
    if (rerollsLeft > 0) {
      const newScore = Math.floor(Math.random() * 401) - 200;
      setLegacyScore(newScore);
      setRerollsLeft(prev => prev - 1);
    }
  };

  const handleSliderChange = (attrId: string, value: number[]) => {
    setAttributes(prev => prev.map(attr => {
      if (attr.id === attrId) {
        let newValue = value[0];
        // Round to nearest 5
        newValue = Math.round(newValue / 5) * 5;
        // Ensure within bounds
        newValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, newValue));
        
        const currentUsed = prev.reduce((sum, a) => sum + a.value, 0) - attr.value;
        const available = TOTAL_POINTS - currentUsed;
        
        // Don't allow exceeding total points
        if (newValue > available + attr.value) {
          return attr;
        }
        
        return { ...attr, value: newValue };
      }
      return attr;
    }));
  };

  const handleGenerate = () => {
    if (remainingPoints !== 0) {
      return; // Must use all points
    }
    
    // Generate random citizen ID
    const id = `#2025-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    setCitizenId(id);
    
    // Calculate base score with V2.0 rules including legacy
    const breakdown = calculateBaseScore(attributes, legacyScore);
    setScoreBreakdown(breakdown);
    setGenerated(true);
    
    onComplete(breakdown.total);
  };

  const handleReset = () => {
    setAttributes(prev => prev.map(attr => ({ ...attr, value: MIN_VALUE })));
    setGenerated(false);
    setCitizenId('');
    setScoreBreakdown(null);
    setLegacyScore(Math.floor(Math.random() * 401) - 200);
    setRerollsLeft(2);
  };

  const heroBg = archetype
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-white"
    : "bg-gradient-to-b from-black via-zinc-900 to-white";

  if (generated && scoreBreakdown) {
    const modifierTotal = scoreBreakdown.modifiers.reduce((sum, m) => sum + m.value, 0);
    const synergyTotal = scoreBreakdown.synergies.reduce((sum, s) => sum + s.value, 0);
    
    return (
      <div className={heroBg}>
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/60 mb-6">{t.sectionTitle}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 300 }}>
                {t.step3}
              </h2>
            </motion.div>

            {/* Dossier Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-black p-8 sm:p-12"
            >
              {/* Title */}
              <div className="border-b-2 border-black pb-6 mb-8">
                <h3 className="text-2xl sm:text-3xl text-black mb-2" style={{ fontWeight: 300 }}>
                  {t.title}
                </h3>
                <p className="text-xs tracking-wider text-black/60">{t.subtitle}</p>
              </div>

              {/* Basic Info */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-black/20">
                <div>
                  <p className="text-xs tracking-wider text-black/40 mb-2">{t.citizenId}</p>
                  <p className="text-xl text-black tracking-wider" style={{ fontWeight: 300 }}>{citizenId}</p>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-black/40 mb-2">{t.age}</p>
                  <p className="text-xl text-black" style={{ fontWeight: 300 }}>--</p>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-black/40 mb-2">{t.status}</p>
                  <p className="text-xl text-black" style={{ fontWeight: 300 }}>{t.preAssessment}</p>
                </div>
              </div>

              {/* Core Attributes */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.3em] text-black/40 mb-6">{t.coreAttributes}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {attributes.map((attr) => (
                    <div key={attr.id} className="flex items-center justify-between bg-black/5 p-4">
                      <span className="text-sm tracking-wider text-black">
                        {language === 'en' ? `${attr.nameEn} (${attr.id.toUpperCase()})` : `${attr.nameZh} (${attr.id.toUpperCase()})`}
                      </span>
                      <span className="text-2xl text-black" style={{ fontWeight: 300 }}>{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-black/5 p-6 mb-8">
                <p className="text-xs tracking-[0.3em] text-black/40 mb-6">{t.derivedStats}</p>
                
                {/* Potential Total */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/10">
                  <span className="text-sm text-black/70">{t.potentialTotal}</span>
                  <span className="text-2xl text-black" style={{ fontWeight: 300 }}>{scoreBreakdown.potentialSum}</span>
                </div>

                {/* Legacy Score */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/10">
                  <div>
                    <span className="text-sm text-black/70">{t.legacyScoreTitle}</span>
                    <p className="text-xs text-black/50 mt-1">{language === 'zh' ? '代际传承' : 'Inherited'}</p>
                  </div>
                  <span className={`text-2xl ${scoreBreakdown.legacyScore >= 0 ? 'text-green-600' : 'text-red-600'}`} style={{ fontWeight: 300 }}>
                    {scoreBreakdown.legacyScore > 0 ? '+' : ''}{scoreBreakdown.legacyScore}
                  </span>
                </div>

                {/* System Modifiers */}
                {scoreBreakdown.modifiers.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-black/10">
                    <p className="text-xs tracking-wider text-black/60 mb-3">{t.systemModifiers}</p>
                    {scoreBreakdown.modifiers.map((mod, idx) => (
                      <div key={idx} className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-sm text-black/80">{t[mod.name as keyof typeof t]}</p>
                          <p className="text-xs text-black/50">{language === 'en' ? mod.description : t[`${mod.name}Desc` as keyof typeof t]}</p>
                        </div>
                        <span className={`text-xl ${mod.value > 0 ? 'text-green-600' : 'text-red-600'}`} style={{ fontWeight: 300 }}>
                          {mod.value > 0 ? '+' : ''}{mod.value}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-black/10">
                      <span className="text-sm text-black/70">{language === 'en' ? 'Subtotal' : '小计'}</span>
                      <span className={`text-xl ${modifierTotal >= 0 ? 'text-green-600' : 'text-red-600'}`} style={{ fontWeight: 300 }}>
                        {modifierTotal > 0 ? '+' : ''}{modifierTotal}
                      </span>
                    </div>
                  </div>
                )}

                {/* Synergy Bonuses */}
                {scoreBreakdown.synergies.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs tracking-wider text-black/60 mb-3">{t.synergyBonuses}</p>
                    {scoreBreakdown.synergies.map((syn, idx) => (
                      <div key={idx} className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-sm text-black/80">{t[syn.name as keyof typeof t]}</p>
                          <p className="text-xs text-black/50">{language === 'en' ? syn.description : t[`${syn.name}Desc` as keyof typeof t]}</p>
                        </div>
                        <span className="text-xl text-blue-600" style={{ fontWeight: 300 }}>
                          +{syn.value}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-black/10">
                      <span className="text-sm text-black/70">{language === 'en' ? 'Subtotal' : '小计'}</span>
                      <span className="text-xl text-blue-600" style={{ fontWeight: 300 }}>
                        +{synergyTotal}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Final Score */}
              <div className="bg-black text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs tracking-wider text-white/60 mb-2">{t.finalScore}</p>
                    <p className="text-sm text-white/80 mt-2">
                      {scoreBreakdown.potentialSum} 
                      {scoreBreakdown.legacyScore !== 0 && ` ${scoreBreakdown.legacyScore > 0 ? '+' : ''}${scoreBreakdown.legacyScore}`}
                      {modifierTotal !== 0 && ` ${modifierTotal > 0 ? '+' : ''}${modifierTotal}`}
                      {synergyTotal > 0 && ` +${synergyTotal}`}
                    </p>
                  </div>
                  <p className="text-5xl text-white" style={{ fontWeight: 300 }}>{scoreBreakdown.total}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleReset}
                  className="flex-1 px-8 py-4 bg-white text-black border-2 border-black/20 hover:border-black transition-all text-xs tracking-[0.2em]"
                >
                  {t.resetButton}
                </button>
                <button
                  onClick={() => {
                    const calcSection = document.getElementById('bonus-calculator');
                    if (calcSection) {
                      calcSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 px-8 py-4 bg-black text-white hover:bg-zinc-900 transition-all text-xs tracking-[0.2em]"
                >
                  {t.continueButton}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={heroBg}>
      <section className="pt-24 sm:pt-32 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/60 mb-6">{t.sectionTitle}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6" style={{ fontWeight: 300 }}>
              {t.title}
            </h1>
            <p className="text-xs tracking-wider text-white/40 mb-8 sm:mb-12">{t.subtitle}</p>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>
          </motion.div>

          {/* Step 2 Title */}
          <div className="mb-6 text-center">
            <p className="text-xs tracking-[0.3em] text-white/60">{t.step2}</p>
          </div>
        </div>
      </section>

      {/* Sticky Points Display */}
      <div className="sticky top-20 z-40 border-b border-white/20 backdrop-blur-lg bg-black/80">
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6"
            >
              <div className="text-center sm:text-left">
                <p className="text-[0.55rem] sm:text-xs tracking-wider text-white/60 mb-1 sm:mb-2">{t.totalPoints}</p>
                <p className="text-2xl sm:text-3xl text-white" style={{ fontWeight: 300 }}>{usedPoints} / {TOTAL_POINTS}</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-[0.55rem] sm:text-xs tracking-wider text-white/60 mb-1 sm:mb-2">{t.pointsRemaining}</p>
                <motion.p
                  key={remainingPoints}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-3xl sm:text-4xl ${remainingPoints === 0 ? 'text-green-400' : remainingPoints < 0 ? 'text-red-400' : 'text-white'}`}
                  style={{ fontWeight: 300 }}
                >
                  {remainingPoints}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Legacy Score & Potential Bonuses */}
      <section className="py-8 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Legacy Score with Reroll */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs tracking-wider text-white/60 mb-2">{t.legacyScoreTitle}</p>
                <p className="text-xs text-white/40">{t.legacyScoreDesc}</p>
              </div>
              <motion.p
                key={legacyScore}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-4xl ${legacyScore >= 0 ? 'text-green-400' : 'text-red-400'}`}
                style={{ fontWeight: 300 }}
              >
                {legacyScore > 0 ? '+' : ''}{legacyScore}
              </motion.p>
            </div>
            <button
              onClick={handleRerollLegacy}
              disabled={rerollsLeft === 0}
              className={`w-full px-4 py-3 text-xs tracking-wider transition-all ${
                rerollsLeft > 0
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
              }`}
            >
              {t.rerollButton} ({t.rerollsRemaining}: {rerollsLeft})
            </button>
          </motion.div>

          {/* Potential Bonuses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/20 p-6"
          >
            <p className="text-xs tracking-wider text-white/60 mb-4">{t.potentialBonuses}</p>
            {potentialBonuses.length > 0 ? (
              <div className="space-y-2">
                {potentialBonuses.map((bonus, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-sm text-white/80 font-mono"
                  >
                    {bonus}
                  </motion.p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40 italic">{t.noBonuses}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Attributes Section */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="space-y-6 mb-8">
            {attributes.map((attr, idx) => {
              const Icon = attr.icon;
              return (
                <motion.div
                  key={attr.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/20 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/10 border border-white/20">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl text-white mb-2" style={{ fontWeight: 300 }}>
                        {language === 'en' ? `${attr.nameEn} (${attr.id.toUpperCase()})` : attr.nameZh}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {language === 'en' ? attr.descEn : attr.descZh}
                      </p>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <motion.p
                        key={attr.value}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl text-white"
                        style={{ fontWeight: 300 }}
                      >
                        {attr.value}
                      </motion.p>
                      <p className="text-xs text-white/40 mt-1">{MIN_VALUE}-{MAX_VALUE}</p>
                    </div>
                  </div>
                  {/* Custom Slider with inverted colors */}
                  <div className="relative">
                    <div className="h-2 bg-white/90 rounded-full relative overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-black/80 transition-all duration-200 rounded-full"
                        style={{ width: `${((attr.value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={MIN_VALUE}
                      max={MAX_VALUE}
                      step={5}
                      value={attr.value}
                      onChange={(e) => handleSliderChange(attr.id, [parseInt(e.target.value)])}
                      className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg pointer-events-none transition-all duration-200"
                      style={{ left: `calc(${((attr.value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100}% - 10px)` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={remainingPoints !== 0}
              className={`px-12 sm:px-16 py-5 sm:py-6 transition-all text-xs tracking-[0.3em] ${
                remainingPoints === 0
                  ? 'bg-white text-black hover:bg-zinc-100'
                  : 'bg-transparent text-black border-2 border-black cursor-not-allowed'
              }`}
            >
              {remainingPoints === 0 ? t.generateButton : t.incompleteButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
