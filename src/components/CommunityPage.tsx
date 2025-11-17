import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, ThumbsUp, Users } from 'lucide-react';

type Language = 'en' | 'zh';

interface CommunityPageProps {
  language: Language;
  archetype: 'A' | 'B' | 'C' | 'D' | null;
}

const translations = {
  en: {
    title: 'COMMUNITY',
    subtitle: 'Citizen Voices & Shared Stories',
    description: 'Share your thoughts, experiences, and connect with fellow citizens navigating the Social Value System.',
    feature1: 'Anonymous Posts',
    feature1Desc: 'Share freely without identity constraints',
    feature2: 'Community Votes',
    feature2Desc: 'Let collective wisdom surface the truth',
    feature3: 'Open Dialogue',
    feature3Desc: 'Every voice deserves to be heard',
  },
  zh: {
    title: '社区',
    subtitle: '公民之声与共享故事',
    description: '分享你的想法、经历，与其他在社会价值体系中航行的公民建立联系。',
    feature1: '匿名发布',
    feature1Desc: '不受身份约束，自由分享',
    feature2: '社区投票',
    feature2Desc: '让集体智慧浮现真相',
    feature3: '开放对话',
    feature3Desc: '每个声音都值得被听见',
  }
};

export default function CommunityPage({ language, archetype }: CommunityPageProps) {
  const t = translations[language];
  const livereRef = useRef<HTMLDivElement>(null);
  const [livereLoaded, setLivereLoaded] = useState(false);

  useEffect(() => {
    // Initialize LiveRe with proper cleanup
    const initLivere = () => {
      // Check if LiveRe is already loaded
      // @ts-ignore
      if (typeof LivereTower !== 'undefined') {
        setLivereLoaded(true);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="livere.com"]');
      if (existingScript) {
        setLivereLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn-city.livere.com/js/embed.dist.js';
      script.onload = () => {
        setTimeout(() => setLivereLoaded(true), 500);
      };
      script.onerror = () => {
        console.error('Failed to load LiveRe');
      };
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initLivere, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const heroBg = archetype
    ? "bg-gradient-to-b from-[var(--theme-from)] via-[var(--theme-via)] to-white"
    : "bg-gradient-to-b from-black via-zinc-900 to-white";

  return (
    <div className={heroBg}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-[0.6rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-white/60 mb-6">
              VI. {t.title}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6" style={{ fontWeight: 300 }}>
              {t.subtitle}
            </h1>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-[1px] bg-white/30"></div>
            </div>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MessageSquare, title: t.feature1, desc: t.feature1Desc },
              { icon: ThumbsUp, title: t.feature2, desc: t.feature2Desc },
              { icon: Users, title: t.feature3, desc: t.feature3Desc }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 text-center"
                >
                  <Icon className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2" style={{ fontWeight: 300 }}>{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="pb-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-black/10 p-6 sm:p-8 md:p-12"
          >
            {/* LiveRe Container */}
            <div className="min-h-[400px]">
              <div 
                ref={livereRef}
                id="lv-container" 
                data-id="city" 
                data-uid="MTAyMC82MTAwOC8zNzQ3OA=="
                key="livere-widget"
              >
                {!livereLoaded && (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    <p className="text-sm text-black/60 mt-4">
                      {language === 'zh' ? '加载评论系统...' : 'Loading comments...'}
                    </p>
                  </div>
                )}
                <noscript>
                  <p className="text-sm text-black/60 text-center py-8">
                    {language === 'zh' 
                      ? '为正常使用来必力评论功能请激活JavaScript' 
                      : 'Please enable JavaScript to use LiveRe comments'
                    }
                  </p>
                </noscript>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
