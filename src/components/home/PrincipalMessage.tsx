import React from 'react';
import { useTranslation } from '@/i18n';
import { Quote, User } from 'lucide-react';

export const PrincipalMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-label="Message from the School Principal" className="bg-[#1E3A8A] text-white py-16 lg:py-24 border-b border-blue-900 relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (8 cols): Quote & Attribution */}
          <div className="lg:col-span-8 flex flex-col items-start text-left rtl:text-right">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F59E0B] mb-6">
              <Quote className="h-6 w-6" />
            </div>

            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-2 font-heading">
              {t('home.principal_title', "Principal's Message")}
            </span>

            <blockquote className="text-base sm:text-xl lg:text-2xl text-slate-100 font-medium leading-relaxed italic mb-6">
              &ldquo;
              {t(
                'home.principal_quote',
                'At INSPIRE School we believe every child carries a spark of brilliance waiting to be discovered. Our dedicated team of mentors is committed to nurturing each student\'s intellect, character, and creative curiosity in a supportive and disciplined atmosphere.'
              )}
              &rdquo;
            </blockquote>

            <div className="pt-2 border-t border-white/20 w-full sm:w-auto">
              <h3 className="font-heading font-extrabold text-lg text-white">
                {t('home.principal_name', 'Mrs. Ayesha Khan')}
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                {t('home.principal_designation', 'Principal, M.Ed (18 Years Experience)')}
              </p>
            </div>
          </div>

          {/* Right Column (4 cols): Photo Placeholder */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center text-white shadow-2xl backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
                <User className="w-24 h-24 sm:w-28 sm:h-28 stroke-[1.25] text-white/90" />
              </div>

              {/* Decorative Badge */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full bg-[#F59E0B] text-slate-950 font-bold text-xs shadow-lg uppercase tracking-wider text-center">
                Leadership
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
