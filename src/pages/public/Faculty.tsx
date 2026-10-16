import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getFacultyList } from '@/services/faculty';
import { Faculty as FacultyType } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FacultyCard } from '@/components/ui/FacultyCard';
import { Mail, ArrowRight } from 'lucide-react';

export const Faculty: React.FC = () => {
  const { t, dir } = useTranslation();
  const [faculty, setFaculty] = useState<FacultyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getFacultyList().then((data) => {
      if (mounted) {
        setFaculty(data.filter((f) => f.is_active));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC]">
      {/* 1. Page Hero */}
      <PageHero
        title={t('faculty.hero_title', 'Our Faculty')}
        subtitle={t('faculty.hero_subtitle', 'Meet the dedicated educators behind INSPIRE')}
        breadcrumb={[
          { label: t('faculty.breadcrumb_home', 'Home'), href: '/' },
          { label: t('faculty.breadcrumb_faculty', 'Faculty'), href: '/faculty' },
        ]}
      />

      {/* 2. Faculty Grid */}
      <section aria-label="Teaching Faculty Members" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <SectionHeading
          title={t('faculty.heading', 'Inspiring Teachers & Mentors')}
          subtitle={t('faculty.subheading', 'Passionate educators cultivating excellence across every classroom')}
          align="center"
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col items-center justify-center animate-pulse"
              >
                <div className="w-24 h-24 rounded-full bg-slate-200 mb-4" />
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-200 rounded mb-4" />
                <div className="h-6 w-20 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {faculty.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Join Our Team CTA */}
      <section aria-label="Careers and Job Opportunities" className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center mx-auto mb-6">
            <Mail className="h-7 w-7" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('faculty.join_heading', 'Interested in Teaching at INSPIRE School?')}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t(
              'faculty.join_subtext',
              'We are always looking for passionate, certified educators who wish to make a meaningful difference.'
            )}
          </p>

          <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-700">
            {t('faculty.join_email', 'Send your CV & cover letter to')}:{' '}
            <a
              href="mailto:info@inspireschool.example"
              className="text-[#1E3A8A] hover:underline font-mono"
            >
              info@inspireschool.example
            </a>
          </p>

          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#3B82F6] shadow-sm transition-all duration-200"
            >
              <span>{t('faculty.contact_btn', 'Contact Us')}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
