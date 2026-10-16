import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { FileText, ArrowRight } from 'lucide-react';

export const CTABand: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-label="Admissions Call to Action" className="bg-[#F59E0B] text-slate-950 py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight leading-tight">
          {t('home.cta_heading', 'Admissions Open for 2027')}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-900 font-medium max-w-2xl leading-relaxed">
          {t('home.cta_subtext', 'Apply today and give your child the INSPIRE advantage.')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/admissions/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-[#1E3A8A] text-white hover:bg-blue-900 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
          >
            <span>{t('home.apply_now', 'Apply Now')}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>

          <Link
            to="/downloads"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base border-2 border-slate-950/80 bg-black/5 hover:bg-black/15 text-slate-950 transition-all duration-200 cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            <span>{t('home.download_prospectus', 'Download Prospectus')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
