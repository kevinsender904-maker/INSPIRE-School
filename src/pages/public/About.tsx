import React from 'react';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Compass,
  Target,
  FlaskConical,
  Laptop,
  BookOpen,
  Trophy,
  Coffee,
  HeartHandshake,
  CheckCircle2,
  User,
  Quote,
} from 'lucide-react';

export const About: React.FC = () => {
  const { t, dir } = useTranslation();

  const facilities = [
    {
      id: 'science',
      icon: FlaskConical,
      title: t('about.facility_science', 'Science Labs'),
      desc: t(
        'about.facility_science_desc',
        'State-of-the-art physics, chemistry, and biology experimental apparatus.'
      ),
    },
    {
      id: 'computer',
      icon: Laptop,
      title: t('about.facility_computer', 'Computer Labs'),
      desc: t(
        'about.facility_computer_desc',
        'Modern workstations with supervised high-speed internet and coding tools.'
      ),
    },
    {
      id: 'library',
      icon: BookOpen,
      title: t('about.facility_library', 'Library'),
      desc: t(
        'about.facility_library_desc',
        'Curated collection of academic references, world literature, and quiet study bays.'
      ),
    },
    {
      id: 'sports',
      icon: Trophy,
      title: t('about.facility_sports', 'Sports Ground'),
      desc: t(
        'about.facility_sports_desc',
        'Lush grassy fields for cricket, football, athletic meets, and physical drills.'
      ),
    },
    {
      id: 'cafeteria',
      icon: Coffee,
      title: t('about.facility_cafeteria', 'Cafeteria'),
      desc: t(
        'about.facility_cafeteria_desc',
        'Clean, hygienic dining facility providing wholesome meals and snacks.'
      ),
    },
    {
      id: 'prayer',
      icon: HeartHandshake,
      title: t('about.facility_prayer', 'Prayer Room'),
      desc: t(
        'about.facility_prayer_desc',
        'Peaceful dedicated hall for daily prayers and spiritual reflection.'
      ),
    },
  ];

  const whyChooseItems = [
    t('about.why_1', 'Qualified & experienced faculty with ongoing professional training'),
    t('about.why_2', 'Safe, secure, and nurturing campus environment with CCTV monitoring'),
    t('about.why_3', 'Bilingual curriculum excellence balancing English mastery and Urdu culture'),
    t('about.why_4', 'Transparent and regular parent-teacher collaboration and portals'),
  ];

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC]">
      {/* 1. Page Hero */}
      <PageHero
        title={t('about.hero_title', 'About Us')}
        subtitle={t('about.hero_subtitle', 'Building strong foundations for lifelong achievement')}
        breadcrumb={[
          { label: t('about.breadcrumb_home', 'Home'), href: '/' },
          { label: t('about.breadcrumb_about', 'About'), href: '/about' },
        ]}
      />

      {/* 2. Vision & Mission Cards */}
      <section aria-label="Vision and Mission" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card (Teal Accent) */}
          <div className="bg-white rounded-2xl border-t-4 border-t-[#14B8A6] border-x border-b border-slate-200/80 p-8 sm:p-10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center mb-6">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-4">
              {t('about.vision_title', 'Our Vision')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                'about.vision_desc',
                'To be a premier center of foundational and secondary learning in Pakistan, recognized for intellectual depth, ethical stewardship, and community impact.'
              )}
            </p>
          </div>

          {/* Mission Card (Primary Accent) */}
          <div className="bg-white rounded-2xl border-t-4 border-t-[#1E3A8A] border-x border-b border-slate-200/80 p-8 sm:p-10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-900/10 text-[#1E3A8A] flex items-center justify-center mb-6">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-4">
              {t('about.mission_title', 'Our Mission')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                'about.mission_desc',
                'To provide an enriching and inclusive academic environment that fosters rigorous inquiry, character building, bilingual proficiency, and civic responsibility.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Principal's Message (Horizontal Card Layout) */}
      <section aria-label="Principal's Message" className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Photo Placeholder (Circle) */}
              <div className="shrink-0 text-center">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-blue-900/10 border-4 border-[#1E3A8A]/20 flex items-center justify-center text-[#1E3A8A] shadow-md">
                  <User className="w-20 h-20 stroke-[1.25]" />
                </div>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#F59E0B] text-slate-950 uppercase tracking-wider">
                  Principal
                </span>
              </div>

              {/* Quote & Name */}
              <div className="flex-1 text-center md:text-left rtl:md:text-right">
                <Quote className="h-8 w-8 text-[#1E3A8A]/40 mb-3 mx-auto md:mx-0 rtl:md:ml-auto rtl:md:mr-0" />
                <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;
                  {t(
                    'home.principal_quote',
                    'At INSPIRE School we believe every child carries a spark of brilliance waiting to be discovered. Our dedicated team of mentors is committed to nurturing each student\'s intellect, character, and creative curiosity in a supportive and disciplined atmosphere.'
                  )}
                  &rdquo;
                </blockquote>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-[#1E3A8A]">
                    {t('home.principal_name', 'Mrs. Ayesha Khan')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {t('home.principal_designation', 'Principal, M.Ed (18 Years Experience)')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Facilities (Icon Grid) */}
      <section aria-label="Our Facilities" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <SectionHeading
          title={t('about.facilities_heading', 'Our Facilities')}
          subtitle={t('about.facilities_subheading', 'Modern Infrastructure Designed for Comprehensive Growth')}
          align="center"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 stroke-[1.75]" />
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2">
                  {fac.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Why Choose INSPIRE? */}
      <section aria-label="Why Choose INSPIRE School" className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={t('about.why_choose_heading', 'Why Choose INSPIRE?')}
            subtitle={t('about.why_choose_subheading', 'What Sets Our Educational Experience Apart')}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {whyChooseItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex items-start space-x-4 rtl:space-x-reverse shadow-2xs hover:border-[#1E3A8A] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
