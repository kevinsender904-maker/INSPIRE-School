import React from 'react';
import { useTranslation } from '@/i18n';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Trophy, ShieldCheck, Heart } from 'lucide-react';

export const Home: React.FC = () => {
  const { t, dir } = useTranslation();

  return (
    <div dir={dir} className="flex flex-col w-full">
      {/* 1. Hero Slider — Phase A2 */}
      <section
        aria-label="Hero Section"
        className="relative min-h-[520px] bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#0f172a] text-white flex flex-col items-center justify-center p-6 sm:p-12 text-center overflow-hidden border-b border-blue-900"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admissions Open for Session 2027</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
            {t('home.hero_title')}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {t('home.hero_subtitle')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/admissions/apply"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F59E0B] text-slate-950 font-bold hover:bg-[#D97706] shadow-lg transition-transform active:scale-95 text-sm"
            >
              {t('nav.apply_now')}
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold transition-colors text-sm"
            >
              {t('nav.about')}
            </Link>
          </div>

          <div className="pt-8">
            <span className="inline-block px-4 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs font-mono text-slate-300 tracking-wide">
              {t('home.sec_hero')}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Quick Stats — Phase A2 */}
      <section
        aria-label="Quick Stats"
        className="min-h-[160px] bg-white border-b border-slate-200 py-10 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1E3A8A]">1,200+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Enrolled Students</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F59E0B]">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Matric Pass Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#14B8A6]">45+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Qualified Faculty</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-purple-600">18+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Years of Excellence</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block px-3 py-1 rounded bg-slate-100 text-xs font-mono text-slate-500">
              {t('home.sec_stats')}
            </span>
          </div>
        </div>
      </section>

      {/* 3. About Snippet — Phase A2 */}
      <section
        aria-label="About Snippet"
        className="min-h-[280px] bg-[#F8FAFC] border-b border-slate-200 py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">
            Excellence In Education
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
            A Legacy of Balanced Learning in Lahore
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founded with the conviction that education must foster both intellect and character,
            INSPIRE School combines contemporary STEM curricula with traditional moral grounding.
          </p>
          <div className="pt-4">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-mono text-slate-600 shadow-2xs">
              {t('home.sec_about')}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Academics Levels — Phase A2 */}
      <section
        aria-label="Academics Levels"
        className="min-h-[300px] bg-white border-b border-slate-200 py-16 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">
              Curriculum & Programs
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Academic Divisions (Playgroup to Matric)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Pre-School</h3>
              <p className="text-xs text-slate-500 mt-1">Playgroup, Nursery & Prep AMI Montessori</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Primary Wing</h3>
              <p className="text-xs text-slate-500 mt-1">Classes 1 through 5 with core foundational literacy</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Middle School</h3>
              <p className="text-xs text-slate-500 mt-1">Classes 6 to 8 with STEM laboratories & computing</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Matriculation</h3>
              <p className="text-xs text-slate-500 mt-1">Classes 9 & 10 (BISE Lahore Board Science stream)</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-slate-100 text-xs font-mono text-slate-600">
              {t('home.sec_academics')}
            </span>
          </div>
        </div>
      </section>

      {/* 5. Principal Message — Phase A2 */}
      <section
        aria-label="Principal Message"
        className="min-h-[260px] bg-blue-50/60 border-b border-blue-100 py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">
            Leadership Perspective
          </span>
          <h2 className="font-heading font-bold text-2xl text-slate-900">
            Principal&apos;s Welcome Message
          </h2>
          <blockquote className="text-sm italic text-slate-700 leading-relaxed">
            &ldquo;At INSPIRE School, our mission is to awaken the latent spark of brilliance in every
            child, instilling critical thought and ethical resolve.&rdquo;
          </blockquote>
          <p className="text-xs font-bold text-[#1E3A8A] pt-2">
            Mrs. Ayesha Khan — Principal, M.Ed (18 Years Experience)
          </p>
          <div className="pt-3">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-white border border-blue-200 text-xs font-mono text-blue-700 shadow-2xs">
              {t('home.sec_principal')}
            </span>
          </div>
        </div>
      </section>

      {/* 6. Latest News & Events — Phase A2 */}
      <section
        aria-label="Latest News and Events"
        className="min-h-[280px] bg-white border-b border-slate-200 py-16 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">
                Updates & Calendar
              </span>
              <h2 className="font-heading font-bold text-2xl text-slate-900">
                Latest News & Upcoming Events
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/news" className="text-xs font-bold text-[#1E3A8A] hover:underline">
                View All News →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm mb-2">School Announcements</h3>
              <p className="text-xs text-slate-500">Admissions Open 2027 • Sports Day Highlights • Winter Notice</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm mb-2">Academic Calendar</h3>
              <p className="text-xs text-slate-500">Parent-Teacher Meeting • Annual Function • Admission Test</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-slate-100 text-xs font-mono text-slate-600">
              {t('home.sec_news_events')}
            </span>
          </div>
        </div>
      </section>

      {/* 7. Gallery Preview — Phase A2 */}
      <section
        aria-label="Gallery Preview"
        className="min-h-[240px] bg-[#F8FAFC] border-b border-slate-200 py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">
            Life at INSPIRE
          </span>
          <h2 className="font-heading font-bold text-2xl text-slate-900">
            Campus Life & Photo Galleries
          </h2>
          <p className="text-xs text-slate-500">
            Sports Gala, Science Exhibitions, Annual Functions, and State-of-the-Art Learning Spaces.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-mono text-slate-600 shadow-2xs">
              {t('home.sec_gallery')}
            </span>
          </div>
        </div>
      </section>

      {/* 8. Quote Strip — Phase A2 */}
      <section
        aria-label="Quote Strip"
        className="min-h-[140px] bg-[#1E3A8A] text-white py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="font-heading font-medium text-lg sm:text-xl text-amber-300 italic">
            &ldquo;The purpose of education is to turn mirrors into windows.&rdquo;
          </p>
          <p className="text-xs text-slate-300 tracking-wider uppercase font-semibold">
            {t('common.learn_lead_inspire')}
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded bg-white/10 text-xs font-mono text-slate-300">
              {t('home.sec_quote')}
            </span>
          </div>
        </div>
      </section>

      {/* 9. CTA Band — Phase A2 */}
      <section
        aria-label="Call to Action"
        className="min-h-[180px] bg-amber-500 text-slate-950 py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
            Begin Your Child&apos;s Journey to Success
          </h2>
          <p className="text-xs sm:text-sm text-slate-900 font-medium">
            Registrations are open for all grades. Schedule a campus visit or submit an online application today.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/admissions/apply"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-md"
            >
              <span>{t('nav.apply_now')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="pt-3">
            <span className="inline-block px-3 py-1 rounded bg-black/10 text-xs font-mono text-slate-950">
              {t('home.sec_cta')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
