import React from 'react';
import { useTranslation } from '@/i18n';
import { Quote } from 'lucide-react';

export const QuoteStrip: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-label="Inspirational Quote" className="bg-[#3B82F6] text-white py-14 sm:py-18 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Large Background Watermark SVG */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <Quote className="w-56 h-56 stroke-[1]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
          <Quote className="w-5 h-5" />
        </div>

        <blockquote className="font-heading font-medium text-lg sm:text-2xl lg:text-3xl leading-snug tracking-tight text-white drop-shadow-xs italic">
          &ldquo;{t('home.quote_text', 'Education is the most powerful weapon which you can use to change the world.')}&rdquo;
        </blockquote>

        <p className="mt-4 text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-widest">
          {t('home.quote_author', '— Nelson Mandela')}
        </p>
      </div>
    </section>
  );
};
