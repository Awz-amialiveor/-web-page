import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Archive, Rocket, Building2, Feather } from 'lucide-react';
import badgeArchiveKeeper from 'figma:asset/cf20e11bcb96cacca4fb2c3901b96ba1051d58bb.png';
import badgeFutureExplorer from 'figma:asset/e90aaa7a336cdce19610153761da109b29fe6510.png';
import badgeLifeArchitect from 'figma:asset/2552b50fd5872bdf919595a9bf9aaf39cb4a3ec6.png';
import badgeRomanticPoet from 'figma:asset/18fdd67451703475d120489d3f332309e2c90e5a.png';
import bgArchiveKeeper from 'figma:asset/e325c805599908742225d351c629507b6353325a.png';
import bgFutureExplorer from 'figma:asset/4001df6d7c7a7fd214d4905368942cfc6e4d4807.png';
import bgLifeArchitect from 'figma:asset/f73b199bdda6597f08ff574d1802089b84653780.png';
import bgRomanticPoet from 'figma:asset/4d9351ebcf84e7cd5483495fbed3e3443fb35f98.png';

type Language = 'en' | 'zh';
type ArchetypeKey = 'A' | 'B' | 'C' | 'D';

interface TestPageProps {
  language: Language;
  onArchetypeSet: (key: ArchetypeKey) => void;
  onArchetypeReset: () => void;
  archetype: ArchetypeKey | null;
}

interface Question {
  id: number;
  textEn: string;
  textZh: string;
  options: {
    label: 'A' | 'B' | 'C' | 'D';
    textEn: string;
    textZh: string;
  }[];
}

interface Archetype {
  key: ArchetypeKey;
  nameEn: string;
  nameZh: string;
  quoteEn: string;
  quoteZh: string;
  descriptionEn: string;
  descriptionZh: string;
  coreDesireEn: string;
  coreDesireZh: string;
  recommendationEn: string;
  recommendationZh: string;
  serviceEn: string;
  serviceZh: string;
  keywordsEn: string[];
  keywordsZh: string[];
  icon: any;
  accentColor: string;
}

const translations = {
  en: {
    title: 'ASSESSMENT',
    subtitle: 'Humanitarian Inclination Calibration',
    description: 'Complete this psychological assessment to discover your inner archetype and receive personalized service recommendations.',
    
    startButton: 'BEGIN ASSESSMENT',
    nextButton: 'NEXT',
    backButton: 'BACK',
    submitButton: 'SUBMIT ASSESSMENT',
    
    progress: 'QUESTION',
    of: 'OF',
    
    resultTitle: 'Homecoming Humanitarian Inclination Calibration Results',
    archetype: 'PSYCHOLOGICAL ARCHETYPE',
    quote: 'YOUR ESSENCE',
    description: 'DESCRIPTION',
    coreDesire: 'CORE DESIRE',
    recommendation: 'HOMECOMING RECOMMENDS',
    keywords: 'KEYWORDS',
    
    retake: 'RETAKE ASSESSMENT',
    viewServices: 'VIEW SERVICES',
    scheduleConsult: 'SCHEDULE CONSULTATION'
  },
  zh: {
    title: '评估',
    subtitle: '人道主义倾向性校准',
    description: '完成此心理评估，发现您的内在原型并获得个性化服务推荐。',
    
    startButton: '开始评估',
    nextButton: '下一题',
    backButton: '上一题',
    submitButton: '提交评估',
    
    progress: '问题',
    of: '/',
    
    resultTitle: '"归乡"人道主义倾向性校准结果',
    archetype: '心理倾向原型',
    quote: '您的本质',
    description: '描述',
    coreDesire: '核心渴望',
    recommendation: '"归乡"为您推荐',
    keywords: '关键词',
    
    retake: '重新评估',
    viewServices: '查看服务',
    scheduleConsult: '预约咨询'
  }
};

const archetypes: Archetype[] = [
  {
    key: 'A',
    nameEn: 'Archive Keeper',
    nameZh: '档案保管员',
    quoteEn: '"Your heart is a library of moments, and every memory is an irreplaceable treasure."',
    quoteZh: '"你的内心是一座瞬间的图书馆，每一段回忆都是无可替代的珍宝。"',
    descriptionEn: 'You are not one to dwell in the past, but one who holds the deepest reverence for what is real. The foundation of your world is built not upon grand possibilities, but upon the tangible warmth of what has been—the touch of a loved one\'s hand, the color of an afternoon sunbeam, the echo of unrepeatable laughter. For you, the meaning of life is not found in exploring unknown universes, but in validating and cherishing the unique one you already possess. You believe it is these authentic connections and experiences that define who you are.',
    descriptionZh: '你并非沉溺于过去，而是对"真实"怀有最深的敬意。你世界的根基，并非建立在宏大的可能性之上，而是由那些真实发生过的、可触摸的温暖瞬间所构成——爱人指尖的温度,午后阳光的颜色,一次无法复刻的开怀大笑。对你而言,生命的意义不在于探索未知的宇宙,而在于确认并守护好自己所拥有的这个独一无二的宇宙。你相信,正是这些真实的联结与经历,定义了"你"之所以为你。',
    coreDesireEn: 'To know that the life you truly lived was beautiful, complete, and will be remembered.',
    coreDesireZh: '确信你真实活过的一生是美丽的、完整的,且将被永远铭记。',
    recommendationEn: 'Let us, together with you, curate the most precious collection of your life with the reverence of an archivist. We will connect these authentic moments of brilliance, allowing you to make one final warm pilgrimage through the memorial hall you built with your own hands.',
    recommendationZh: '让我们与您一同,以策展人的敬意,整理您生命中最珍贵的馆藏。我们将这些真实的闪光时刻串联,让您在自己亲手建立的记忆殿堂中,进行最后一次温暖的巡礼。',
    serviceEn: 'Corridor of Life',
    serviceZh: '人生回廊',
    keywordsEn: ['Reality', 'Past', 'Memory'],
    keywordsZh: ['真实', '过去', '记忆'],
    icon: Archive,
    accentColor: '#706099'
  },
  {
    key: 'B',
    nameEn: 'Future Explorer',
    nameZh: '未来探险家',
    quoteEn: '"The stars you couldn\'t reach are still your soul\'s true home."',
    quoteZh: '"你未能触及的星辰,依然是你灵魂的故乡。"',
    descriptionEn: 'Your spirit has always lived beyond the horizon. The rules and limitations of the physical world are, to you, merely a temporary starting point to be transcended. Your inner "reality" is a grander, freer universe composed of infinite "what ifs" and "could have beens." You seek not to escape, but to explore; not to forget, but to fulfill. You believe the ultimate meaning of life lies in experiencing the possibilities missed for any reason, in finally breaking free from physical shackles to let your tireless imagination embark on a truly untethered voyage.',
    descriptionZh: '你的精神,永远活在地平线之外。现实世界的规则与束缚,对你而言,只是一个暂时的、有待超越的起点。你内心的"真实",是由无数个"假如"和"本可以"构成的、一个更宏大也更自由的世界。你渴望的不是逃避,而是探索；不是遗忘,而是实现。你相信,生命的终极意义,在于体验那些因各种原因而错过的可能性,在于最终挣脱物理的枷锁,让你那不知疲倦的想象力,进行一次真正无拘无束的远航。',
    coreDesireEn: 'To finally experience the boundless freedom of your own imagination, unchained from reality.',
    coreDesireZh: '最终体验到你想象力的无限自由,不再被现实所束缚。',
    recommendationEn: 'Your ultimate desire is our highest mission. You will become the captain of your final voyage. Whether sailing among the stars or awakening in a world entirely built by your imagination, our "Dream Architects" will chart the most detailed star maps to ensure your soul reaches its true home.',
    recommendationZh: '您的终极渴望,是我们的最高使命。您将成为自己最终航程的船长。无论是驰骋于星辰大海,还是在一个完全由您想象力构筑的世界里醒来,我们的"造梦师"都将为您绘制最详尽的星图,确保您的灵魂抵达它真正的故乡。',
    serviceEn: 'Utopia',
    serviceZh: '理想乡',
    keywordsEn: ['Possibility', 'Future', 'Dream'],
    keywordsZh: ['可能', '未来', '���想'],
    icon: Rocket,
    accentColor: '#E35453'
  },
  {
    key: 'C',
    nameEn: 'The Life Architect',
    nameZh: '人生建筑师',
    quoteEn: '"Your life is not a story that happened to you; it is a monument you built with your own hands."',
    quoteZh: '"你的人生不是一个发生在你身上的故事,而是一座你亲手建造的丰碑。"',
    descriptionEn: 'For you, life is a project to be meticulously planned, executed, and completed. Chaos and randomness bring you unease, while order, logic, and achievement provide the deepest satisfaction. Every decision you\'ve made was a blueprint; every accomplishment, a cornerstone. You are proud of the monument you have built, and you wish for every detail of it to be accurately understood and recorded. Your farewell should not be a casual curtain fall, but the final, perfect closing statement of your life\'s work—a solemn topping-out ceremony for the structure you have built.',
    descriptionZh: '对你而言,生命是一项需要被精心规划、执行和���成的工程。混乱与随机让你感到不安,而秩序、逻辑与成就则能给你带来最深的满足感。你的每一个决定都是一张蓝图,每一个成就都是一块基石。你为自己建造的这座人生丰碑感到骄傲,并希望它的每一个细节都能被准确地理解和记录。你的告别,不应是一场随意的落幕,而应是你一生事业的最终、也是最完美的总结陈词,是你为自己这座建筑举行的、庄重的封顶仪式。',
    coreDesireEn: 'To have the final say on your own story, ensuring your legacy is recorded with the precision and dignity it deserves.',
    coreDesireZh: '为自己的故事写下最终的、完美的定论,确保你的传奇被精准且有尊严地记录下来。',
    recommendationEn: 'You will serve as the "Executive Producer" of your life\'s film. Together with our memory engineers, you will personally select, arrange, and approve every highlight of your lifetime. We provide not a passive replay of memories, but a fully equipped editing suite that puts you in control of your final narrative.',
    recommendationZh: '您将作为自己人生电影的"总监制"。与我们的记忆工程师一起,您将亲自筛选、编排并审定您一生的每一个高光时刻。我们提供的不是一场被动的回忆,而是一个让您掌控自己最终叙事的、设备齐全的剪辑室。',
    serviceEn: 'Corridor of Life',
    serviceZh: '人生回廊',
    keywordsEn: ['Control', 'Order', 'Achievement'],
    keywordsZh: ['掌控', '秩序', '成就'],
    icon: Building2,
    accentColor: '#7C9F54'
  },
  {
    key: 'D',
    nameEn: 'Romantic Poet',
    nameZh: '浪漫主义诗人',
    quoteEn: '"You did not just live life; you felt its texture, its music, its beautiful sorrow."',
    quoteZh: '"你不仅是活过,你感受过生命的纹理、它的音乐、和它那美丽的哀愁。"',
    descriptionEn: 'You experience the world with the eyes of an artist and the soul of a poet. To you, an event itself is far less important than the "feeling" it evokes and the "meaning" behind it. You find poetry in the mundane, taste the transience in joy, and can even perceive a profound and sublime beauty in sorrow. You seek not happiness, but the intensity and depth of "experience." You believe the final chapter of life is not a "problem" to be solved, but the grandest "mystery" to be lived. Your farewell, by right, should be a work of art.',
    descriptionZh: '你用艺术家的眼睛和诗人的灵魂来体验世界。对你而言,事件本身远不如它所带来的"感觉"和它背后的"意义"重要。你能在平凡中发现诗意,在喜悦中品味其短暂,甚至在悲伤中,也能感受到一种深刻而崇高的美。你追求的不是幸福,而是"体验"的强度与深度。你相信,生命的最终章不应是一个需要被解决的"问题",而是一个需要被体验的、最宏大的"谜题"。你的告别,理应是一件艺术品。',
    coreDesireEn: 'To transform your final moment into a work of art, a final, beautiful stanza in the poem of your existence.',
    coreDesireZh: '将你的最终时刻转化为一件艺术品,成为你存在之诗的、最后一个美丽的篇章。',
    recommendationEn: 'Your soul is the canvas, and our technology is the brush. We will collaborate with you to create your ultimate masterpiece. Whether becoming a butterfly dissolving in Monet\'s garden or merging your consciousness into an endless symphony, our cutting-edge dream technology will ensure your farewell is a unique, breathtaking, purely aesthetic experience.',
    recommendationZh: '您的灵魂是画布,我们的技术是画笔。我们将与您共同创作您的最终杰作。无论是化作蝴蝶在莫奈的花园中消散,还是将意识融入一首永不终结的交响乐,我们顶尖的造梦技术将确保您的告别是一次独一无二的、令人叹为观止的、纯粹的美学体验。',
    serviceEn: 'Utopia',
    serviceZh: '理想乡',
    keywordsEn: ['Beauty', 'Meaning', 'Experience'],
    keywordsZh: ['美感', '意义', '体验'],
    icon: Feather,
    accentColor: '#2CA3AB'
  }
];

const questions: Question[] = [
  {
    id: 1,
    textEn: 'What is more attractive to you?',
    textZh: '更吸引你的是？',
    options: [
      { label: 'A', textEn: 'Real memories', textZh: '真实的回忆' },
      { label: 'B', textEn: 'Unlimited imagination', textZh: '无限的想象' },
      { label: 'C', textEn: 'Clear logic', textZh: '清晰的逻辑' },
      { label: 'D', textEn: 'Strong emotions', textZh: '强烈的情感' }
    ]
  },
  {
    id: 2,
    textEn: 'Your life story is more like a?',
    textZh: '你的生命故事更像一部？',
    options: [
      { label: 'A', textEn: 'Family photo album', textZh: '家庭相册' },
      { label: 'B', textEn: 'Science fiction novel', textZh: '科幻小说' },
      { label: 'C', textEn: 'Autobiography', textZh: '个人自传' },
      { label: 'D', textEn: 'Art film', textZh: '艺术电影' }
    ]
  },
  {
    id: 3,
    textEn: 'Which would you rather relive?',
    textZh: '你宁愿重温？',
    options: [
      { label: 'A', textEn: 'The moment of your first love', textZh: '第一次爱恋的瞬间' },
      { label: 'B', textEn: 'An unfulfilled ambition', textZh: '一个从未实现过的野心' },
      { label: 'C', textEn: 'A great success in your career', textZh: '一次事业上的巨大成功' },
      { label: 'D', textEn: 'The most beautiful sunset you\'ve ever seen', textZh: '看过最美的一次日落' }
    ]
  },
  {
    id: 4,
    textEn: 'What is the most cherished item of clothing in your closet?',
    textZh: '你衣柜里最珍视的衣服是？',
    options: [
      { label: 'A', textEn: 'An old sweater with special sentimental value', textZh: '有特殊纪念意义的旧毛衣' },
      { label: 'B', textEn: 'A dream outfit you\'ve never worn', textZh: '一套从未穿过的梦想服装' },
      { label: 'C', textEn: 'A perfect custom-made suit/formal dress', textZh: '一套完美的定制西装/礼服' },
      { label: 'D', textEn: 'A unique, artistic piece of clothing', textZh: '一件设计感独特的艺术品' }
    ]
  },
  {
    id: 5,
    textEn: 'What sound is more calming to you?',
    textZh: '更让你感到安宁的声音是？',
    options: [
      { label: 'A', textEn: 'The laughter of loved ones', textZh: '亲人的笑声' },
      { label: 'B', textEn: 'The silence of outer space', textZh: '太空中的寂静' },
      { label: 'C', textEn: 'The applause of a crowd', textZh: '人群的掌声' },
      { label: 'D', textEn: 'The sound of waves crashing on the shore', textZh: '海浪拍岸的声音' }
    ]
  },
  {
    id: 6,
    textEn: 'If life is a book, what do you care about more?',
    textZh: '如果生命是一本书,你更在意？',
    options: [
      { label: 'A', textEn: 'The heartwarming illustrations in the book', textZh: '书中温馨的插图' },
      { label: 'B', textEn: 'The unwritten sequel to the book', textZh: '书中未写的续集' },
      { label: 'C', textEn: 'Whether the book\'s conclusion is well-structured', textZh: '书的结尾总结是否工整' },
      { label: 'D', textEn: 'Whether the book\'s cover design is exquisite', textZh: '书的封面设计是否精美' }
    ]
  },
  {
    id: 7,
    textEn: 'A perfect room must have?',
    textZh: '一个完美的房间,必须有？',
    options: [
      { label: 'A', textEn: 'Old photos full of memories', textZh: '充满回忆的旧照片' },
      { label: 'B', textEn: 'A window with a view of the starry sky', textZh: '一扇能看到星空的窗' },
      { label: 'C', textEn: 'A neat and orderly desk', textZh: '一张整洁有序的书桌' },
      { label: 'D', textEn: 'A sculpture of extraordinary taste', textZh: '一件品味不凡的雕塑' }
    ]
  },
  {
    id: 8,
    textEn: 'Your "regret" is more inclined to be?',
    textZh: '你的"遗憾"更倾向于是？',
    options: [
      { label: 'A', textEn: 'Not being able to spend more time with someone', textZh: '没能和某人多待一会儿' },
      { label: 'B', textEn: 'Not being able to explore the unknown world', textZh: '没能去探索未知的世界' },
      { label: 'C', textEn: 'A certain project could have been more perfect', textZh: '某个项目本可以更完美' },
      { label: 'D', textEn: 'Not being able to experience a certain kind of ultimate beauty', textZh: '没能体验某种极致的美' }
    ]
  },
  {
    id: 9,
    textEn: 'How would you prefer to be described?',
    textZh: '你更愿意被评价为？',
    options: [
      { label: 'A', textEn: 'A warm person', textZh: '一个温暖的人' },
      { label: 'B', textEn: 'A person with dreams', textZh: '一个有梦想的人' },
      { label: 'C', textEn: 'An accomplished person', textZh: '一个有成就的人' },
      { label: 'D', textEn: 'An interesting person', textZh: '一个有趣的人' }
    ]
  },
  {
    id: 10,
    textEn: 'What feeling do you hope to have at the last moment?',
    textZh: '你希望最后一刻的感觉是？',
    options: [
      { label: 'A', textEn: 'Nostalgia', textZh: '怀旧' },
      { label: 'B', textEn: 'Freedom', textZh: '自由' },
      { label: 'C', textEn: 'Fulfillment', textZh: '圆满' },
      { label: 'D', textEn: 'Sublimation', textZh: '升华' }
    ]
  },
  {
    id: 11,
    textEn: 'If you had to choose a color to represent your farewell?',
    textZh: '如果选择一种颜色代表你的告别？',
    options: [
      { label: 'A', textEn: 'Warm beige', textZh: '温暖的米色' },
      { label: 'B', textEn: 'Deep blue', textZh: '深邃的蓝色' },
      { label: 'C', textEn: 'Solemn black', textZh: '庄重的黑色' },
      { label: 'D', textEn: 'Dreamy purple', textZh: '梦幻的紫色' }
    ]
  },
  {
    id: 12,
    textEn: 'What do you believe in more?',
    textZh: '你更相信？',
    options: [
      { label: 'A', textEn: 'Experience', textZh: '经历' },
      { label: 'B', textEn: 'Possibility', textZh: '可能性' },
      { label: 'C', textEn: 'Facts', textZh: '事实' },
      { label: 'D', textEn: 'Intuition', textZh: '直觉' }
    ]
  },
  {
    id: 13,
    textEn: 'How do you handle old belongings?',
    textZh: '你会如何处理旧物？',
    options: [
      { label: 'A', textEn: 'Treasure them carefully', textZh: '小心翼翼地珍藏起来' },
      { label: 'B', textEn: 'Imagine new uses for them', textZh: '想象它们新的用途' },
      { label: 'C', textEn: 'Categorize and file them neatly', textZh: '分类归档,井井有条' },
      { label: 'D', textEn: 'They are a part of me and cannot be discarded', textZh: '它们是我的一部分,无法割舍' }
    ]
  },
  {
    id: 14,
    textEn: 'For an ideal afternoon, you would choose to?',
    textZh: '一个理想的下午,你会选择？',
    options: [
      { label: 'A', textEn: 'Look through old photos with family', textZh: '和家人翻看老照片' },
      { label: 'B', textEn: 'Read a novel about the future', textZh: '读一本关于未来的小说' },
      { label: 'C', textEn: 'Plan the next ten years of your life', textZh: '规划接下来的十年人生' },
      { label: 'D', textEn: 'Go to an art exhibition', textZh: '去看一场艺术展览' }
    ]
  },
  {
    id: 15,
    textEn: 'What makes you feel more "alive"?',
    textZh: '让你感到"活着"的,更多是？',
    options: [
      { label: 'A', textEn: 'To love and be loved', textZh: '爱与被爱' },
      { label: 'B', textEn: 'Exploration and discovery', textZh: '探索与发现' },
      { label: 'C', textEn: 'Building and completing', textZh: '建造与完成' },
      { label: 'D', textEn: 'Feeling and creating', textZh: '感受与创造' }
    ]
  },
  {
    id: 16,
    textEn: 'What "legacy" do you hope to leave behind?',
    textZh: '你希望留下的"遗产"是？',
    options: [
      { label: 'A', textEn: 'Fond memories in the hearts of your family', textZh: '家人心中美好的回忆' },
      { label: 'B', textEn: 'An unfinished idea that inspires future generations', textZh: '一个未完成但激励后人的想法' },
      { label: 'C', textEn: 'A clear and respected life record', textZh: '一份清晰的、受人尊敬的生平记录' },
      { label: 'D', textEn: 'A beautiful and mysterious legend', textZh: '一个美丽而神秘的传说' }
    ]
  },
  {
    id: 17,
    textEn: 'What is your attitude towards the "unknown"?',
    textZh: '对于"未知",你的态度是？',
    options: [
      { label: 'A', textEn: 'I prefer the sense of security that comes from the known', textZh: '我更喜欢已知带来的安全感' },
      { label: 'B', textEn: 'It is the ultimate destination of adventure', textZh: '那是冒险的最终目的地' },
      { label: 'C', textEn: 'It needs to be analyzed and understood', textZh: '需要被分析和理解' },
      { label: 'D', textEn: 'It is another form of beauty', textZh: '它是美的另一种形式' }
    ]
  },
  {
    id: 18,
    textEn: 'Where does your "perfect day" end?',
    textZh: '你的"完美一天"在哪里结束？',
    options: [
      { label: 'A', textEn: 'On your favorite sofa in your familiar home', textZh: '在熟悉的家中最爱的沙发上' },
      { label: 'B', textEn: 'Under the dome of a moon base', textZh: '在月球基地的穹顶下' },
      { label: 'C', textEn: 'At a celebration dinner held in your honor', textZh: '在一场为你举办的庆功晚宴上' },
      { label: 'D', textEn: 'At a concert that never ends', textZh: '在一场永不落幕的音乐会中' }
    ]
  },
  {
    id: 19,
    textEn: 'What does "control" mean to you?',
    textZh: '你认为"控制"意味着？',
    options: [
      { label: 'A', textEn: 'Being able to choose which memory to relive', textZh: '能选择重温哪段记忆' },
      { label: 'B', textEn: 'Being able to break free from the constraints of reality', textZh: '能摆脱现实的束缚' },
      { label: 'C', textEn: 'Being able to decide the ending of your own story', textZh: '能决定自己故事的结局' },
      { label: 'D', textEn: 'It\'s not important; I prefer to let things be', textZh: '并不重要,我更喜欢顺其自然' }
    ]
  },
  {
    id: 20,
    textEn: 'Finally, how do you wish your farewell to be described?',
    textZh: '最后,你希望你的告别被如何描述？',
    options: [
      { label: 'A', textEn: '"He/She has gone home."', textZh: '"他/她回家了。"' },
      { label: 'B', textEn: '"He/She has begun a new adventure."', textZh: '"他/她开始了新的冒险。"' },
      { label: 'C', textEn: '"An era has ended."', textZh: '"一个时代结束了。"' },
      { label: 'D', textEn: '"He/She became a poem."', textZh: '"他/她变成了一首诗。"' }
    ]
  }
];

// Badge and background images mapping
const badgeImages = {
  'A': badgeArchiveKeeper,
  'B': badgeFutureExplorer,
  'C': badgeLifeArchitect,
  'D': badgeRomanticPoet
};

const backgroundImages = {
  'A': bgArchiveKeeper,
  'B': bgFutureExplorer,
  'C': bgLifeArchitect,
  'D': bgRomanticPoet
};

export default function TestPage({ language, onArchetypeSet, onArchetypeReset, archetype }: TestPageProps) {
  const t = translations[language];
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ArchetypeKey>>({});
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<Archetype | null>(null);

  const handleAnswer = (answer: ArchetypeKey) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    const counts: Record<ArchetypeKey, number> = { A: 0, B: 0, C: 0, D: 0 };
    
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });

    const dominantType = (Object.keys(counts) as ArchetypeKey[]).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    );

    const selectedArchetype = archetypes.find(arch => arch.key === dominantType);
    setResult(selectedArchetype || archetypes[0]);
    setCompleted(true);
    onArchetypeSet(dominantType);
  };

  const handleRetake = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setResult(null);
    onArchetypeReset();
  };

  // Start Screen
  if (!started) {
    const bgGradient = archetype 
      ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-[var(--theme-to)]"
      : "bg-gradient-to-b from-black via-zinc-900 to-zinc-800";
      
    return (
      <div className={bgGradient}>
        <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full border-[20px] sm:border-[40px] border-white"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/40 mb-4 sm:mb-8">III. CALIBRATION</p>
              <h1 className="mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] text-white tracking-[0.15em] sm:tracking-[0.2em] px-4" style={{ fontWeight: 300 }}>
                {t.title}
              </h1>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-12 sm:w-16 h-[1px] bg-white/30"></div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-4 sm:mb-6 px-4" style={{ fontWeight: 300 }}>
                {t.subtitle}
              </p>
              <p className="text-sm sm:text-base text-white/50 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
                {t.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="px-12 sm:px-20 py-5 sm:py-7 bg-red-600 text-white hover:bg-red-700 transition-all text-[0.65rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]"
              >
                {t.startButton}
              </motion.button>
              
              {/* Archetype Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                {archetypes.map((arch, idx) => {
                  const Icon = arch.icon;
                  return (
                    <motion.div
                      key={arch.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all"
                    >
                      <Icon className="w-8 h-8 text-white/60 mx-auto mb-3" />
                      <p className="text-xs text-white/80 mb-1">{language === 'en' ? arch.nameEn : arch.nameZh}</p>
                      <p className="text-[9px] text-white/40 tracking-wider">
                        {language === 'en' ? arch.keywordsEn.join(' · ') : arch.keywordsZh.join(' · ')}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Result Screen
  if (completed && result) {
    const badgeImage = badgeImages[result.key];
    const bgImage = backgroundImages[result.key];
    const accentColor = result.accentColor;
    
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(to bottom, var(--theme-from), var(--theme-via), white)',
          backgroundColor: bgImage ? 'transparent' : undefined
        }}
      >
        <section className="pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-12"
            >
              <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/80 mb-4 sm:mb-6 px-4">
                {t.resultTitle}
              </p>
              <div className="flex justify-center mb-6">
                <div className="w-12 sm:w-16 h-[1px] bg-white/30"></div>
              </div>
            </motion.div>

            {/* Mobile Badge - Centered above card */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-8 md:hidden"
            >
              {badgeImage && (
                <img 
                  src={badgeImage} 
                  alt={language === 'en' ? result.nameEn : result.nameZh}
                  className="w-64 h-64 rounded-full shadow-2xl object-cover"
                />
              )}
            </motion.div>

            {/* Content with Badge */}
            <div className="relative">
              {/* White Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 mb-8 sm:mb-12 relative z-10 md:mr-32 lg:mr-40 xl:mr-48"
              >
                <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-black/10">
                  <p className="text-[0.6rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-black/40 mb-3">
                    {t.archetype}
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-4" style={{ fontWeight: 300 }}>
                    {language === 'en' ? result.nameEn : result.nameZh}
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                    {(language === 'en' ? result.keywordsEn : result.keywordsZh).map((keyword, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-white text-[0.6rem] sm:text-xs tracking-wider"
                        style={{ backgroundColor: accentColor }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-8 sm:mb-10">
                  <p className="text-[0.6rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-black/40 mb-3 sm:mb-4">{t.quote}</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-black/80 italic leading-relaxed" style={{ fontWeight: 300 }}>
                    {language === 'en' ? result.quoteEn : result.quoteZh}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8 sm:mb-10">
                  <p className="text-[0.6rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-black/40 mb-3 sm:mb-4">{t.description}</p>
                  <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                    {language === 'en' ? result.descriptionEn : result.descriptionZh}
                  </p>
                </div>

                {/* Core Desire */}
                <div className="mb-8 sm:mb-10 bg-black/5 p-5 sm:p-8">
                  <p className="text-[0.6rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-black/40 mb-3 sm:mb-4">{t.coreDesire}</p>
                  <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed" style={{ fontWeight: 300 }}>
                    {language === 'en' ? result.coreDesireEn : result.coreDesireZh}
                  </p>
                </div>

                {/* Recommendation */}
                <div 
                  className="text-white p-6 sm:p-10"
                  style={{ backgroundColor: accentColor }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <p className="text-[0.6rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-white/80">{t.recommendation}</p>
                    <div className="hidden sm:block flex-1 h-[1px] bg-white/30"></div>
                    <p className="text-lg sm:text-xl tracking-wider" style={{ fontWeight: 300 }}>
                      {language === 'en' ? result.serviceEn : result.serviceZh}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {language === 'en' ? result.recommendationEn : result.recommendationZh}
                  </p>
                </div>
              </motion.div>

              {/* Large Badge - Desktop - Positioned at top right */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                className="hidden lg:block absolute top-0 -right-20 xl:-right-24 z-20"
              >
                {badgeImage && (
                  <img 
                    src={badgeImage} 
                    alt={language === 'en' ? result.nameEn : result.nameZh}
                    className="w-96 h-96 xl:w-[28rem] xl:h-[28rem] rounded-full shadow-2xl object-cover"
                  />
                )}
              </motion.div>

              {/* Medium Badge - Tablet - Positioned at top right */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                className="hidden md:block lg:hidden absolute top-0 -right-12 z-20"
              >
                {badgeImage && (
                  <img 
                    src={badgeImage} 
                    alt={language === 'en' ? result.nameEn : result.nameZh}
                    className="w-72 h-72 rounded-full shadow-2xl object-cover"
                  />
                )}
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 mt-8">
              <button
                onClick={handleRetake}
                className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-black border border-white hover:bg-zinc-100 transition-all text-[0.65rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]"
              >
                {t.retake}
              </button>
              <button 
                className="px-8 sm:px-12 py-4 sm:py-5 text-white hover:opacity-80 transition-all text-[0.65rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]"
                style={{ backgroundColor: accentColor }}
              >
                {t.scheduleConsult}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Question Screen
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const bgGradient = archetype 
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-[var(--theme-to)]"
    : "bg-gradient-to-b from-black via-zinc-900 to-zinc-800";

  return (
    <div className={`${bgGradient} min-h-screen`}>
      {/* Progress Bar */}
      <div className="fixed top-14 sm:top-20 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="px-4 sm:px-8 py-3 sm:py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-[0.6rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/60">
                {t.progress} {currentQuestion + 1} {t.of} {questions.length}
              </p>
              <p className="text-[0.6rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/60">{Math.round(progress)}%</p>
            </div>
            <div className="w-full h-[2px] bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-white"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="pt-36 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div className="mb-8 sm:mb-12">
                <p className="text-[0.6rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/40 mb-4 sm:mb-6">{String(question.id).padStart(2, '0')}</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 leading-tight" style={{ fontWeight: 300 }}>
                  {language === 'en' ? question.textEn : question.textZh}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2 sm:space-y-3 mb-8 sm:mb-12">
                {question.options.map((option) => (
                  <motion.button
                    key={option.label}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.label)}
                    className={`w-full text-left p-4 sm:p-6 border transition-all ${
                      currentAnswer === option.label
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-xs sm:text-sm ${
                        currentAnswer === option.label
                          ? 'border-black bg-black text-white'
                          : 'border-white/40'
                      }`}>
                        {option.label}
                      </span>
                      <span className="text-sm sm:text-base">{language === 'en' ? option.textEn : option.textZh}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 sm:gap-4">
                {currentQuestion > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em]"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t.backButton}
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 transition-all text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] ${
                    currentAnswer
                      ? 'bg-white text-black hover:bg-zinc-100'
                      : 'bg-white/20 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? t.submitButton : t.nextButton}
                  {currentQuestion < questions.length - 1 && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
