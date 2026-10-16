import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Sparkles,
  BookOpen,
  FlaskConical,
  Award,
  Layers,
  Languages,
  CheckCircle,
  FileDown,
  ArrowRight,
} from 'lucide-react';

export const Academics: React.FC = () => {
  const { t, dir } = useTranslation();

  const academicDivisions = [
    {
      id: 'early-years',
      title: t('academics.early_years', 'Early Years'),
      range: t('academics.early_range', 'Playgroup, Nursery & Prep (Ages 3–5)'),
      subjects: t(
        'academics.early_subjects',
        'Subjects: Pre-reading, Numeracy, Drawing, Islamiat, Urdu Rhymes'
      ),
      description: t(
        'academics.early_details',
        'An internationally recognized AMI Montessori methodology focusing on sensory perception, fine motor coordination, social empathy, and confident self-expression.'
      ),
      icon: Sparkles,
      tag: 'AMI Montessori',
      accentColor: 'border-l-amber-500',
    },
    {
      id: 'primary',
      title: t('academics.primary', 'Primary Wing'),
      range: t('academics.primary_range', 'Class 1 to Class 5 (Ages 6–10)'),
      subjects: t(
        'academics.primary_subjects',
        'Subjects: English, Math, Science, Urdu, Islamiat, Social Studies, Computer'
      ),
      description: t(
        'academics.primary_details',
        'Emphasis on inquiry-based learning, mathematical logic, linguistic fluency in English and Urdu, and foundational scientific investigations.'
      ),
      icon: BookOpen,
      tag: 'Core Competency',
      accentColor: 'border-l-blue-600',
    },
    {
      id: 'middle',
      title: t('academics.middle', 'Middle School'),
      range: t('academics.middle_range', 'Class 6 to Class 8 (Ages 11–13)'),
      subjects: t(
        'academics.middle_subjects',
        'Subjects: English, Math, Science, Urdu, Islamiat, Social Studies, Computer, Pakistan Studies, Add. Math'
      ),
      description: t(
        'academics.middle_details',
        'Transition into rigorous academic disciplines, laboratory experimentation, digital literacy, and critical analysis in humanities and sciences.'
      ),
      icon: FlaskConical,
      tag: 'STEM & Humanities',
      accentColor: 'border-l-teal-600',
    },
    {
      id: 'secondary',
      title: t('academics.secondary', 'Secondary / Matriculation'),
      range: t('academics.secondary_range', 'Class 9 & 10 (BISE Lahore Board)'),
      subjects: t(
        'academics.secondary_subjects',
        'Subjects: English, Urdu, Math, Physics, Chemistry, Biology/Computer, Islamiat, Pakistan Studies'
      ),
      description: t(
        'academics.secondary_details',
        'Rigorous preparation for Lahore Board matriculation examinations with continuous revision cycles, past paper workshops, and intensive practical lab mastery.'
      ),
      icon: Award,
      tag: 'Board Matriculation',
      accentColor: 'border-l-purple-600',
    },
  ];

  const approaches = [
    {
      id: 'activity',
      icon: Layers,
      title: t('academics.approach_activity_title', 'Activity-Based Learning'),
      desc: t(
        'academics.approach_activity_desc',
        'Students grasp abstract principles through hands-on experiments, interactive workshops, and collaborative team investigations.'
      ),
    },
    {
      id: 'bilingual',
      icon: Languages,
      title: t('academics.approach_bilingual_title', 'Bilingual Instruction'),
      desc: t(
        'academics.approach_bilingual_desc',
        'Equal focus on fluency in English as the global medium of science and commerce, alongside deep appreciation of Urdu heritage.'
      ),
    },
    {
      id: 'assessments',
      icon: CheckCircle,
      title: t('academics.approach_assessments_title', 'Regular Assessments'),
      desc: t(
        'academics.approach_assessments_desc',
        'Continuous diagnostic tests, term examinations, and personalized teacher feedback to guarantee timely academic intervention.'
      ),
    },
  ];

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC]">
      {/* 1. Page Hero */}
      <PageHero
        title={t('academics.hero_title', 'Academics')}
        subtitle={t('academics.hero_subtitle', "A world-class curriculum for every stage of your child's growth")}
        breadcrumb={[
          { label: t('academics.breadcrumb_home', 'Home'), href: '/' },
          { label: t('academics.breadcrumb_academics', 'Academics'), href: '/academics' },
        ]}
      />

      {/* 2. Academic Levels (Detailed Full-Width Cards with Alternating/Structured Layout) */}
      <section aria-label="Academic Divisions and Curriculum" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <SectionHeading
          title={t('academics.programs_heading', 'Academic Divisions')}
          subtitle={t('academics.programs_subheading', 'From Montessori Foundation to Matric Board Success')}
          align="center"
        />

        <div className="space-y-6 sm:space-y-8 mt-10">
          {academicDivisions.map((division, idx) => {
            const Icon = division.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={division.id}
                className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden border-l-4 ${division.accentColor} p-6 sm:p-8`}
              >
                <div
                  className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left (or Right on alternate): Icon, Header & Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-900/10 text-[#1E3A8A] flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                        {division.title}
                      </h2>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {division.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-[#14B8A6]">
                      {division.range}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {division.description}
                    </p>

                    <div className="mt-4 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {division.subjects}
                      </p>
                    </div>
                  </div>

                  {/* Action Link to Apply or Inquire */}
                  <div className="shrink-0 pt-2 lg:pt-0">
                    <Link
                      to="/admissions/apply"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs hover:bg-[#3B82F6] transition-colors shadow-2xs"
                    >
                      <span>Enroll in {division.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Teaching Approach (3-col card grid) */}
      <section aria-label="Our Teaching Approach" className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={t('academics.approach_heading', 'Our Teaching Approach')}
            subtitle={t('academics.approach_subheading', 'Pedagogical Excellence That Delivers Enduring Results')}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {approaches.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="bg-[#F8FAFC] rounded-2xl border border-slate-200/90 p-8 shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 stroke-[1.75]" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-3">
                    {app.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Timetable & Calendar Note (Simple Info Box) */}
      <section aria-label="Timetable and Downloads Notice" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1E3A8A]/5 border-l-4 border-[#1E3A8A] border-y border-r border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">
              <FileDown className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Academic Schedules & Calendars
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                {t(
                  'academics.calendar_note',
                  'Detailed class timetables, examination schedules, and academic calendars are available for download.'
                )}
              </p>
            </div>
          </div>

          <Link
            to="/downloads"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm hover:bg-blue-900 shadow-sm transition-colors shrink-0"
          >
            <span>{t('academics.download_calendar_btn', 'View Student Downloads')}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};
