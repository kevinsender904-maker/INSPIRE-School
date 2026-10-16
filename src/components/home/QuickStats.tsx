import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n';

interface StatItem {
  id: string;
  icon: string;
  targetValue: number;
  suffix: string;
  labelKey: string;
  defaultLabel: string;
}

export const QuickStats: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    students: 0,
    teachers: 0,
    years: 0,
    results: 0,
  });

  const stats: StatItem[] = [
    {
      id: 'students',
      icon: '📚',
      targetValue: 1200,
      suffix: '+',
      labelKey: 'home.stats.students_label',
      defaultLabel: 'Enrolled Students',
    },
    {
      id: 'teachers',
      icon: '👩‍🏫',
      targetValue: 45,
      suffix: '+',
      labelKey: 'home.stats.teachers_label',
      defaultLabel: 'Qualified Teachers',
    },
    {
      id: 'years',
      icon: '🏫',
      targetValue: 20,
      suffix: '+',
      labelKey: 'home.stats.years_label',
      defaultLabel: 'Years of Excellence',
    },
    {
      id: 'results',
      icon: '🏆',
      targetValue: 100,
      suffix: '%',
      labelKey: 'home.stats.results_label',
      defaultLabel: 'Top Matric Results',
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1800;
          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);

            setCounts({
              students: Math.round(progress * 1200),
              teachers: Math.round(progress * 45),
              years: Math.round(progress * 20),
              results: Math.round(progress * 100),
            });

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts({
                students: 1200,
                teachers: 45,
                years: 20,
                results: 100,
              });
            }
          }, frameRate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  // Easing function for smooth number slowdown
  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Achievements and Statistics"
      className="bg-[#F8FAFC] py-12 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center"
            >
              <span className="text-3xl sm:text-4xl mb-2" role="img" aria-label={stat.labelKey}>
                {stat.icon}
              </span>
              <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1E3A8A] tracking-tight">
                {counts[stat.id].toLocaleString()}
                <span>{stat.suffix}</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
                {t(stat.labelKey, stat.defaultLabel)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
