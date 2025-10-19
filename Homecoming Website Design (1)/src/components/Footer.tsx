import { Phone, Globe, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#8B7E74]/20 mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={swallowLogo} alt="Homecoming" className="h-6 w-auto" />
              <span className="text-[#1A1816] tracking-[0.1em] text-sm">HOMECOMING</span>
            </div>
            <p className="text-[#8B7E74] text-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex items-start gap-2 text-[#8B7E74] text-xs">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#B85C50]" />
            <div>
              <p className="text-[#1A1816] mb-1">{t('footer.headquarters')}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[#8B7E74] text-xs">
            <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#B85C50]" />
            <div>
              <p className="text-[#1A1816] mb-1">{t('footer.hotline')}</p>
              <p>400-068-2025</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[#8B7E74] text-xs">
            <Globe size={14} className="mt-0.5 flex-shrink-0 text-[#B85C50]" />
            <div>
              <p className="text-[#1A1816] mb-1">{t('footer.website')}</p>
              <p>www.homecoming.life</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-[#8B7E74]/20 flex items-center justify-between">
          <p className="text-[#8B7E74] text-xs">
            {t('footer.copyright')}
          </p>
          <img src={swallowLogo} alt="" className="h-4 w-auto opacity-30" />
        </div>
      </div>
    </footer>
  );
}
