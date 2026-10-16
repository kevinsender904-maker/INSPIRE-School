import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { School, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutSnippet: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-label="About INSPIRE School Overview" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left rtl:text-right">
            <SectionHeading
              title={t('home.about_heading', 'About INSPIRE School')}
              subtitle={t('home.about_subheading', 'Nurturing Potential Since 2004')}
              align="left"
              className="mb-6!"
            />

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {t(
                'home.about_body',
                'INSPIRE School is committed to delivering holistic education that blends academic excellence with strong moral values. From early childhood Montessori through BISE Lahore Matriculation, we cultivate independent thinkers and compassionate leaders equipped for tomorrow.'
              )}
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0" />
                <span>BISE Lahore Affiliated</span>
              </div>
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0" />
                <span>Modern Science & IT Labs</span>
              </div>
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0" />
                <span>AMI Montessori Certified</span>
              </div>
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0" />
                <span>Sports & Moral Guidance</span>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-sm hover:bg-[#1E3A8A] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <span>{t('home.learn_more')}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Right Column: Image Placeholder */}
          <div className="relative">
            <div className="w-full aspect-4/3 rounded-3xl bg-[#1E3A8A]/10 border-2 border-dashed border-[#1E3A8A]/30 flex flex-col items-center justify-center p-8 text-center shadow-inner overflow-hidden group">
              {/* Decorative Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#1E3A8A]/40 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#1E3A8A]/40 rounded-br-lg" />

              <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#1E3A8A] mb-4 group-hover:scale-110 transition-transform duration-300">
                <School className="w-10 h-10 stroke-[1.75]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1E3A8A]">
                INSPIRE School Main Campus
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Plot 12, Model Town, Lahore • Purpose-built academic building, science centers, and athletic grounds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
