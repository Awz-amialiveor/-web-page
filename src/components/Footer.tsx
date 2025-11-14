type Language = 'en' | 'zh';

interface FooterProps {
  language: Language;
}

const translations = {
  en: {
    contact: 'CONTACT',
    tel: '(Tel) +999 428 004 444',
    address: '(Add) Tower A, Central Life Sciences Park, District 1',
    web: '(Web) https://awz-amialiveor.github.io/-web-page/',
    copyright: '© 2325 Homecoming Inc. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  },
  zh: {
    contact: '联系方式',
    tel: '(电话) +999 428 004 444',
    address: '(地址) 1区中央生命科学园A座',
    web: '(网站) https://awz-amialiveor.github.io/-web-page/',
    copyright: '© 2325 归乡公司 版权所有',
    privacy: '隐私政策',
    terms: '服务条款'
  }
};

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-[1800px] mx-auto px-12 py-20">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-xs tracking-[0.5em] text-white mb-8">
              HOMECOMING
            </h3>
            <div className="w-12 h-[1px] bg-red-600 mb-6"></div>
            <p className="text-sm text-white/40 leading-relaxed">
              {language === 'en' 
                ? 'Architects of the Final Moment' 
                : '终章的建筑师'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.5em] text-white/40 mb-8">
              {t.contact}
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <p>{t.tel}</p>
              <p>{t.address}</p>
              <p>{t.web}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs tracking-[0.5em] text-white/40 mb-8">
              {language === 'en' ? 'LEGAL' : '法律'}
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  {t.privacy}
                </a>
              </p>
              <p>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  {t.terms}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 tracking-wider">
            {t.copyright}
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em]">
              INSTAGRAM
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em]">
              LINKEDIN
            </a>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 flex justify-center">
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
}