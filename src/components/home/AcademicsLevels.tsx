import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

interface AcademicLevel {
  id: string;
  icon: string;
  titleKey: string;
  defaultTitle: string;
  classes: string;
  descKey: string;
  defaultDesc: string;
  badge: string;
}

export const AcademicsLevels: React.FC = () => {
  const { t } = useTranslation();

  const levels: AcademicLevel[] = [
    {
      id: 'early-years',
      icon: '🌱',
      titleKey: 'home.level_early_title',
      defaultTitle: 'Early Years',
      classes: 'Playgroup, Nursery, Prep',
      descKey: 'home.level_early_desc',
      defaultDesc: 'Playgroup, Nursery & Prep based on sensory AMI Montessori methods.',
      badge: 'Ages 3–5',
    },
    {
      id: 'primary',
      icon: '📖',
      titleKey: 'home.level_primary_title',
      defaultTitle: 'Primary Wing',
      classes: 'Class 1–5',
      descKey: 'home.level_primary_desc',
      defaultDesc: 'Classes 1–5 building foundational literacy, numeracy, and scientific curiosity.',
      badge: 'Ages 6–10',
    },
    {
      id: 'middle',
      icon: '🔬',
      titleKey: 'home.level_middle_title',
      defaultTitle: 'Middle School',
      classes: 'Class 6–8',
      descKey: 'home.level_middle_desc',
      defaultDesc: 'Classes 6–8 developing analytical reasoning, computer skills, and lab experiments.',
      badge: 'Ages 11–13',
    },
    {
      id: 'matric',
      icon: '🎓',
      titleKey: 'home.level_matric_title',
      defaultTitle: 'Secondary (Matric)',
      classes: 'Class 9–10',
      descKey: 'home.level_matric_desc',
      defaultDesc: 'Classes 9–10 specialized BISE Lahore Board preparation in Science stream.',
      badge: 'BISE Lahore',
    },
  ];

  return (
    <section aria-label="Academic Programs and Curriculum Levels" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t('home.academics_heading', 'Our Academic Programs')}
          subtitle={t('home.academics_subheading', 'Comprehensive Education for Every Stage')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:bg-white hover:border-[#1E3A8A] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" role="img" aria-label={level.defaultTitle}>
                    {level.icon}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-100/70 text-[#1E3A8A]">
                    {level.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                  {t(level.titleKey, level.defaultTitle)}
                </h3>
                <p className="text-xs font-semibold text-[#14B8A6] mt-0.5 mb-2">
                  {level.classes}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(level.descKey, level.defaultDesc)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] group-hover:text-[#3B82F6] hover:underline cursor-pointer"
                >
                  <span>{t('home.view_details', 'View Details')}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
