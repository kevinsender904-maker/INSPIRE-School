import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getSiteSettings } from '@/services/settings';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { t } = useTranslation();
  const [tagline, setTagline] = useState('Learn. Lead. Inspire.');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings?.tagline) {
        setTagline(settings.tagline);
      }
    });
  }, []);

  const slides = [
    {
      gradient: 'from-[#1E3A8A] via-[#1e40af] to-[#3B82F6]',
      headline: tagline,
      subheadline: t('home.hero_slide1_subtitle', 'INSPIRE School — Lahore, Pakistan'),
      badge: 'Session 2027-2028',
    },
    {
      gradient: 'from-[#0f172a] via-[#1E3A8A] to-[#2563eb]',
      headline: t('home.hero_slide2_title', 'Excellence in Mind & Character'),
      subheadline: t('home.hero_slide2_subtitle', 'Holistic British-standard & Matric Education in Model Town'),
      badge: 'Academic Distinction',
    },
    {
      gradient: 'from-[#172554] via-[#1E3A8A] to-[#14B8A6]/80',
      headline: t('home.hero_slide3_title', 'Preparing Visionaries for Tomorrow'),
      subheadline: t('home.hero_slide3_subtitle', 'Cultivating Independent Thinkers & Moral Integrity'),
      badge: 'Playgroup to Matric (BISE Lahore)',
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      aria-label="Hero Carousel"
      className="relative w-full min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === activeSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            {/* Subtle overlay decorative mesh */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
          </div>
        );
      })}

      {/* Slide Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center text-white flex flex-col items-center">
        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F59E0B] text-xs sm:text-sm font-semibold tracking-wider mb-6 animate-in fade-in">
          <Sparkles className="h-4 w-4" />
          <span>{slides[activeSlide].badge}</span>
        </div>

        {/* Tagline / Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight sm:leading-none text-white drop-shadow-sm min-h-[1.2em]">
          {slides[activeSlide].headline}
        </h1>

        {/* Sub-headline */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl lg:text-2xl text-blue-100 font-medium max-w-3xl leading-relaxed">
          {slides[activeSlide].subheadline}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/admissions/apply"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#F59E0B] text-slate-950 hover:bg-[#D97706] shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer text-center"
          >
            {t('home.apply_now')}
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base border-2 border-white/80 bg-white/5 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer text-center"
          >
            {t('home.contact_us')}
          </Link>
        </div>
      </div>

      {/* Accessible Prev/Next Controls */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-colors hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-colors hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 rtl:rotate-180" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 z-30 flex items-center space-x-2.5 rtl:space-x-reverse">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlide === idx
                ? 'w-8 h-2.5 bg-[#F59E0B]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={activeSlide === idx ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};
