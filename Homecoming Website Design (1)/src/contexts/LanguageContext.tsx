import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.service': { en: 'Service', zh: '服务' },
  'nav.test': { en: 'Register', zh: '登记' },
  'nav.about': { en: 'About', zh: '关于' },
  'nav.feedback': { en: 'Community', zh: '社区' },

  // Home Page
  'home.hero.title': { en: 'Homecoming: Carrying the Weight of Your Soul', zh: '返乡：承载灵魂之重' },
  'home.hero.subtitle': { en: 'Every departure is great, and every great sacrifice deserves a dignified farewell.', zh: '每一次离开都伟大，每一次伟大的牺牲都值得体面的告别。' },
  'home.hero.cta': { en: 'Start Assessment', zh: '开始评估' },
  'home.hero.explore': { en: 'Explore Services', zh: '探索服务' },
  'home.selling.title': { en: 'Our Promise', zh: '我们的承诺' },
  'home.selling.subtitle': { en: 'We believe every ending should be as unique as the life that preceded it', zh: '我们相信每个结局都应该像之前的生命一样独特' },
  'home.compassion.title': { en: 'Compassionate Care', zh: '充满同情的关怀' },
  'home.compassion.desc': { en: 'Every decision is guided by empathy, respect, and understanding of your unique journey', zh: '每个决定都以同理心、尊重和理解您独特旅程为指导' },
  'home.selling.custom.title': { en: 'Professional Customization', zh: '专业定制' },
  'home.selling.custom.desc': { en: '"Memory Engineers" and "Narrative Therapists" will work with you to trace your ideal blueprint.', zh: '"记忆工程师"与"叙事疗愈师"将与您一起，描摹您的理想蓝图。' },
  'home.selling.tech.title': { en: 'Proven Technologies', zh: '成熟技术' },
  'home.selling.tech.desc': { en: 'Non-invasive Brain-Computer Interface + AI Algorithms + Generative Adversarial Network Technology', zh: '非侵入式脑机接口 + AI算法 + 生成对抗网络技术' },
  'home.feature.badge': { en: 'Your Story, Your Way', zh: '您的故事，您的方式' },
  'home.feature.title': { en: 'Every moment matters', zh: '每一刻都很重要' },
  'home.feature.desc1': { en: 'In a world where time has become the ultimate currency, we understand the profound weight of every remaining moment. Our mission is to ensure that when the system determines an end, the individual controls how that story concludes.', zh: '在时间成为终极货币的世界里，我们理解每个剩余时刻的深刻意义。我们的使命是确保当系统确定结束时，个人能控制故事的结局。' },
  'home.feature.desc2': { en: 'Through advanced memory preservation, personalized environments, and compassionate support, we help you craft a final chapter that truly reflects who you are.', zh: '通过先进的记忆保存、个性化环境和充满同情的支持，我们帮助您打造真正反映您自己的最后一章。' },
  'home.feature.button1': { en: 'Explore Our Services', zh: '探索我们的服务' },
  'home.feature.button2': { en: 'Our Story', zh: '我们的故事' },
  'home.cta.title': { en: 'Ready to Begin Your Journey?', zh: '准备开始您的旅程了吗？' },
  'home.cta.desc': { en: 'Take the first step towards creating a meaningful final chapter. Our assessment helps us understand your unique needs and preferences.', zh: '迈出创造有意义的最后一章的第一步。我们的评估帮助我们了解您的独特需求和偏好。' },
  'home.cta.button': { en: 'Start Your Assessment', zh: '开始您的评估' },

  // Services Page
  'services.hero.title': { en: 'Choose Your Farewell Journey', zh: '选择您的告别之旅' },
  'services.hero.subtitle': { en: 'Three pathways, each honoring your unique life and choices', zh: '三条路径，每一条都尊重您独特的生命与选择' },
  'services.additional.title': { en: 'Complementary Services', zh: '补充服务' },
  'services.additional.subtitle': { en: 'Enhance your journey with our additional offerings', zh: '通过我们的附加服务增强您的旅程' },
  'services.memory.title': { en: 'Memory Preservation', zh: '记忆保存' },
  'services.memory.desc': { en: 'Digital archiving of your life\'s most precious moments and stories', zh: '您生命中最珍贵时刻和故事的数字存档' },
  'services.legacy.title': { en: 'Legacy Planning', zh: '遗产规划' },
  'services.legacy.desc': { en: 'Create meaningful farewell messages and legacy projects for loved ones', zh: '为亲人创建有意义的告别信息和遗产项目' },
  'services.family.title': { en: 'Family Support', zh: '家庭支持' },
  'services.family.desc': { en: 'Counseling and guidance for families throughout the journey', zh: '在整个旅程中为家庭提供咨询和指导' },
  'services.cta.title': { en: 'Need guidance choosing?', zh: '需要选择指导？' },
  'services.cta.desc': { en: 'Take our assessment to find the perfect plan for your journey', zh: '参加我们的评估，为您的旅程找到完美的计划' },
  'services.cta.button': { en: 'Begin Assessment', zh: '开始评估' },

  'services.tier1.name': { en: 'Government Standard Plan', zh: '政府标准方案' },
  'services.tier1.price': { en: '0 points/asset', zh: '0 积分/资产' },
  'services.tier1.desc': { en: 'Available to all citizens who have completed their social contributions and are about to enter their final chapter.', zh: '适用于所有已完成社会贡献，即将进入最终章节的公民。' },
  'services.tier1.button': { en: 'Your Specific Plan', zh: '您的具体方案' },
  'services.tier1.feature1': { en: 'Programmed End of Life', zh: '程序化生命终结' },
  'services.tier1.feature2': { en: 'Basic Medical Support', zh: '基础医疗支持' },
  'services.tier1.feature3': { en: 'No Personalized Experience', zh: '无个性化体验' },
  'services.tier1.feature4': { en: 'No Memory/Dream Simulation', zh: '无记忆/梦境模拟' },

  'services.tier2.name': { en: 'Life Corridor', zh: '生命走廊' },
  'services.tier2.badge': { en: 'Popular', zh: '热门' },
  'services.tier2.price': { en: '150 points or equivalent in assets', zh: '150 积分或等值资产' },
  'services.tier2.desc': { en: 'Relive the best, authentic moments of your life for a respectful farewell.', zh: '重温您生命中最美好、真实的时刻，体面告别。' },
  'services.tier2.button': { en: 'Select Life Corridor', zh: '选择生命走廊' },
  'services.tier2.feature1': { en: 'Includes all basic citizen services', zh: '包含所有基础公民服务' },
  'services.tier2.feature2': { en: 'One-on-one communication with a senior "Memory Engineer"', zh: '与资深"记忆工程师"一对一沟通' },
  'services.tier2.feature3': { en: 'Extraction and reconstruction of 5-10 key positive memories', zh: '提取并重建5-10个关键正向记忆' },
  'services.tier2.feature4': { en: 'Family members can participate in the memory screening process', zh: '家人可参与记忆筛选过程' },

  'services.tier3.name': { en: 'Utopia', zh: '理想国' },
  'services.tier3.price': { en: '500+ points or negotiable', zh: '500+ 积分或面议' },
  'services.tier3.desc': { en: 'Define your ultimate meaning, transcend memory, and create a perfect, timeless moment.', zh: '定义您的终极意义，超越记忆，创造完美永恒的时刻。' },
  'services.tier3.button': { en: 'Customize Utopia', zh: '定制理想国' },
  'services.tier3.feature1': { en: 'Includes all "Life Corridor" services', zh: '包含所有"生命走廊"服务' },
  'services.tier3.feature2': { en: 'Managed by a team of leading "dream makers"', zh: '由顶尖"造梦师"团队管理' },
  'services.tier3.feature3': { en: 'Unlimited virtual world creation', zh: '无限制虚拟世界创造' },
  'services.tier3.feature4': { en: 'Fulfilling unfulfilled dreams', zh: '实现未竟之梦' },
  'services.tier3.feature5': { en: 'Absolute privacy', zh: '绝对隐私' },

  // Test/Register Page
  'test.hero.title': { en: 'Interactive Assessment Portal', zh: '互动评估门户' },
  'test.hero.subtitle': { en: 'Explore your options through our comprehensive tools and assessments', zh: '通过我们全面的工具和评估探索您的选择' },
  'test.tab.calculator': { en: 'Social Value', zh: '社会价值' },
  'test.tab.assessment': { en: 'Assessment', zh: '评估' },
  'test.tab.booking': { en: 'Book Consultation', zh: '预约咨询' },
  'test.calculator.title': { en: 'Calculate Your Social Value', zh: '计算您的社会价值' },
  'test.calculator.desc': { en: 'Adjust the factors below to see your estimated social value score in our system.', zh: '调整下面的因素以查看您在我们系统中的估计社会价值分数。' },
  'test.calculator.age': { en: 'Age', zh: '年龄' },
  'test.calculator.occupation': { en: 'Occupation Impact', zh: '职业影响' },
  'test.calculator.community': { en: 'Community Contribution', zh: '社区贡献' },
  'test.calculator.health': { en: 'Health Status', zh: '健康状况' },
  'test.calculator.creativity': { en: 'Creativity & Innovation', zh: '创造力与创新' },
  'test.calculator.family': { en: 'Family Connections', zh: '家庭联系' },
  'test.calculator.score': { en: 'Your Social Value Score', zh: '您的社会价值分数' },
  'test.calculator.elite': { en: 'Elite', zh: '精英' },
  'test.calculator.high': { en: 'High', zh: '高' },
  'test.calculator.standard': { en: 'Standard', zh: '标准' },
  'test.calculator.basic': { en: 'Basic', zh: '基础' },
  'test.calculator.tier': { en: 'Tier', zh: '等级' },
  'test.calculator.access': { en: 'Service Access', zh: '服务访问' },
  'test.calculator.full': { en: 'Full', zh: '完全' },
  'test.calculator.limited': { en: 'Limited', zh: '有限' },
  'test.calculator.priority': { en: 'Priority Level', zh: '优先级' },
  'test.calculator.customization': { en: 'Customization Options', zh: '定制选项' },
  'test.calculator.premium': { en: 'Premium', zh: '高级' },
  'test.calculator.note': { en: 'Note', zh: '注意' },
  'test.calculator.noteText': { en: 'This is an estimate. Your actual assessment will consider additional factors and personal circumstances.', zh: '这是一个估计。您的实际评估将考虑其他因素和个人情况。' },
  'test.calculator.recalculate': { en: 'Click to Recalculate', zh: '点击重新计算' },

  // Assessment Intro
  'test.assessment.title': { en: 'End-of-Life Tendency Assessment', zh: '生命终章倾向性测试' },
  'test.assessment.producer': { en: 'Produced by Homecoming', zh: '返乡公司出品' },
  'test.assessment.intro': { en: 'This assessment aims to provide humanitarian tendency calibration. Please respond according to your first instinct, selecting the option that best matches your inner preferences across 20 questions. This will help us better understand your life narrative and provide you with the most accurate personalized support.', zh: '本测试旨在进行人道主义倾向性校准。请根据您的第一反应，在20个问题中选择最符合您内心偏好的选项。这将帮助我们更好地理解您的生命叙事，并为您提供最精准的个性化支持。' },
  'test.assessment.button': { en: 'Begin Assessment', zh: '开始测试' },
  'test.assessment.note': { en: 'The assessment takes approximately 5-8 minutes to complete', zh: '测试大约需要 5-8 分钟完成' },
  'test.form.title': { en: 'Service Registration', zh: '服务登记' },
  'test.form.name': { en: 'Full Name', zh: '姓名' },
  'test.form.age': { en: 'Age', zh: '年龄' },
  'test.form.score': { en: 'Final Social Value Score', zh: '最终社会价值分数' },
  'test.form.occupation': { en: 'Current/Final Occupation', zh: '当前/最终职业' },
  'test.form.service': { en: 'Intended Service', zh: '意向服务' },
  'test.form.service.corridor': { en: 'Life Corridor', zh: '生命走廊' },
  'test.form.service.utopia': { en: 'Utopia', zh: '理想国' },
  'test.form.payment': { en: 'Payment Method', zh: '支付方式' },
  'test.form.payment.points': { en: 'Social Value Points', zh: '社会价值积分' },
  'test.form.payment.assets': { en: 'Asset Collateral', zh: '资产抵押' },
  'test.form.submit': { en: 'Submit', zh: '提交' },
  'test.form.success': { en: 'Thank you. Your interest has been recorded. We will contact you soon.', zh: '感谢您。您的意向已被记录。我们将尽快与您联系。' },
  'test.booking.title': { en: 'Book a Consultation', zh: '预约咨询' },
  'test.booking.desc': { en: 'Schedule a personalized consultation with our compassionate specialists to discuss your journey and explore customization options.', zh: '与我们富有同情心的专家安排个性化咨询，讨论您的旅程并探索定制选项。' },
  'test.booking.session': { en: 'One-on-One Session', zh: '一对一咨询' },
  'test.booking.sessionDesc': { en: 'Private, confidential discussion tailored to your needs', zh: '根据您的需求量身定制的私密、保密讨论' },
  'test.booking.guidance': { en: 'Compassionate Guidance', zh: '富有同情心的指导' },
  'test.booking.guidanceDesc': { en: 'Empathetic specialists trained in end-of-life care', zh: '接受过临终关怀培训的富有同情心的专家' },
  'test.booking.flexible': { en: 'Flexible Options', zh: '灵活选项' },
  'test.booking.flexibleDesc': { en: 'Choose virtual or in-person consultations', zh: '选择虚拟或面对面咨询' },
  'test.booking.name': { en: 'Full Name', zh: '姓名' },
  'test.booking.namePlaceholder': { en: 'Enter your full name', zh: '输入您的全名' },
  'test.booking.email': { en: 'Email Address', zh: '电子邮件地址' },
  'test.booking.emailPlaceholder': { en: 'your.email@example.com', zh: 'your.email@example.com' },
  'test.booking.date': { en: 'Preferred Date', zh: '首选日期' },
  'test.booking.time': { en: 'Preferred Time', zh: '首选时间' },
  'test.booking.type': { en: 'Consultation Type', zh: '咨询类型' },
  'test.booking.virtual': { en: 'Virtual', zh: '虚拟' },
  'test.booking.inPerson': { en: 'In-Person', zh: '面对面' },
  'test.booking.submit': { en: 'Confirm Booking', zh: '确认预约' },
  'test.booking.terms': { en: 'By booking, you agree to our consultation terms and privacy policy', zh: '通过预约，您同意我们的咨询条款和隐私政策' },
  'test.booking.success': { en: 'Consultation Booked Successfully!', zh: '咨询预约成功！' },
  'test.booking.successDesc': { en: 'We\'ll contact you shortly to confirm your appointment.', zh: '我们将很快与您联系以确认您的预约。' },

  // About Page
  'about.hero.title': { en: 'Homecoming', zh: '返乡' },
  'about.hero.subtitle': { en: 'We are in a great era that requires courage and wisdom.', zh: '我们身处一个需要勇气与智慧的伟大时代。' },
  'about.philosophy': { en: 'We firmly believe that every departure is great, and every great sacrifice deserves a dignified farewell.', zh: '我们坚信，每一次离开都伟大，每一次伟大的牺牲都值得体面的告别。' },
  'about.principles.title': { en: 'Our Guiding Principles', zh: '我们的指导原则' },
  'about.compassion.title': { en: 'Compassion', zh: '同情心' },
  'about.compassion.desc': { en: 'Every decision guided by empathy, understanding, and profound respect for human dignity', zh: '每一个决定都以同理心、理解和对人类尊严的深刻尊重为指导' },
  'about.innovation.title': { en: 'Innovation', zh: '创新' },
  'about.innovation.desc': { en: 'Pioneering compassionate technology that honors the individual journey', zh: '开创尊重个人旅程的富有同情心的技术' },
  'about.community.title': { en: 'Community', zh: '社区' },
  'about.community.desc': { en: 'Supporting families and loved ones throughout every step of the journey', zh: '在旅程的每一步都支持家庭和亲人' },
  'about.history.title': { en: 'Company History', zh: '公司历史' },
  'about.history.desc': { en: 'The original company was established in 2025 by five talented and visionary designers and entrepreneurs.', zh: '公司成立于2025年，由五位才华横溢、富有远见的设计师和企业家创立。' },
  'about.story.badge': { en: 'Our Story', zh: '我们的故事' },
  'about.founders.title': { en: 'Founding Members', zh: '创始成员' },
  'about.founders.group1': { en: 'Creativity & Innovation', zh: '创意与创新' },
  'about.founders.group2': { en: 'Business & Enterprise', zh: '商业与企业' },
  'about.founders.name1': { en: 'Li Sixian', zh: 'Li Sixian' },
  'about.founders.name2': { en: 'Zhou Wei', zh: 'Zhou Wei' },
  'about.founders.name3': { en: 'Shen Tiantian', zh: 'Shen Tiantian' },
  'about.founders.name4': { en: 'Wu Ziyou', zh: 'Wu Ziyou' },
  'about.founders.name5': { en: 'Wu Zixuan', zh: 'Wu Zixuan' },

  // Footer
  'footer.tagline': { en: 'Compassionate end-of-life services for a meaningful final chapter', zh: '充满同情心的临终服务，为有意义的最后一章' },
  'footer.headquarters': { en: 'Headquarters Address: Building A, Central Life Science Park, District 1', zh: '总部地址：1区中央生命科学园A座' },
  'footer.hotline': { en: 'Hotline', zh: '热线' },
  'footer.website': { en: 'Official Website', zh: '官方网站' },
  'footer.copyright': { en: 'Copyright © 2025 Homecoming Company. All rights reserved.', zh: '版权所有 © 2025 返乡公司。保留所有权利。' },

  // Feedback Page
  'feedback.hero.title': { en: 'Community Stories', zh: '社区故事' },
  'feedback.hero.subtitle': { en: 'Share your thoughts, experiences, and memories with our community', zh: '与我们的社区分享您的想法、经历和回忆' },
  'feedback.share.title': { en: 'Share Your Story', zh: '分享您的故事' },
  'feedback.form.name': { en: 'Your Name', zh: '您的姓名' },
  'feedback.form.message': { en: 'Your Message', zh: '您的留言' },
  'feedback.form.photo': { en: 'Upload Photo (Optional)', zh: '上传照片（可选）' },
  'feedback.form.submit': { en: 'Share Your Story', zh: '分享您的故事' },
  'feedback.form.success': { en: 'Thank you for sharing your story', zh: '感谢您分享您的故事' },
  'feedback.stories.title': { en: 'Community Voices', zh: '社区心声' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
