import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getEventsList } from '@/services/events';
import { Event as EventType } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/Skeleton';
import { MapPin, Calendar, Images, ArrowRight } from 'lucide-react';

export const Events: React.FC = () => {
  const { t, lang, dir } = useTranslation();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getEventsList().then((data) => {
      if (mounted) {
        const sorted = data
          .filter((e) => e.status === 'published')
          .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        setEvents(sorted);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const formatEventDateBlock = (startDateStr: string, endDateStr?: string) => {
    const s = new Date(startDateStr);
    const sMonth = s.toLocaleString('en-US', { month: 'short' });
    const sDay = s.getDate();
    const sYear = s.getFullYear();

    if (!endDateStr) {
      return {
        isMultiDay: false,
        day: sDay,
        month: sMonth,
        year: sYear,
        displayRange: `${sMonth} ${sDay}, ${sYear}`,
      };
    }

    const e = new Date(endDateStr);
    const eMonth = e.toLocaleString('en-US', { month: 'short' });
    const eDay = e.getDate();
    const eYear = e.getFullYear();

    // Check if dates are distinct days
    if (s.toDateString() === e.toDateString()) {
      return {
        isMultiDay: false,
        day: sDay,
        month: sMonth,
        year: sYear,
        displayRange: `${sMonth} ${sDay}, ${sYear}`,
      };
    }

    return {
      isMultiDay: true,
      day: sDay,
      month: sMonth,
      year: sYear,
      displayRange: `${sMonth} ${sDay} – ${eMonth} ${eDay}`,
    };
  };

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={t('events.hero_title', 'Events & Calendar')}
        subtitle={t('events.hero_subtitle', 'Key academic dates, sports meets, functions, and holidays')}
        breadcrumb={[
          { label: t('events.breadcrumb_home', 'Home'), href: '/' },
          { label: t('events.breadcrumb_events', 'Events'), href: '/events' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        {loading ? (
          /* Skeletons */
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 animate-pulse"
              >
                <div className="w-24 h-24 bg-slate-200 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton variant="text" width="50%" height="24px" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="30%" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
            <p className="font-heading font-bold text-slate-700">
              {t('events.empty', 'No upcoming events. Check back soon.')}
            </p>
          </div>
        ) : (
          /* Upcoming Events List */
          <div className="space-y-6">
            {events.map((event) => {
              const { isMultiDay, day, month, year, displayRange } = formatEventDateBlock(
                event.start_date,
                event.end_date
              );
              const title =
                lang === 'ur' && event.title_ur ? event.title_ur : event.title_en;
              const desc =
                lang === 'ur' && event.description_ur
                  ? event.description_ur
                  : event.description_en;

              return (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-[#1E3A8A] hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  {/* LEFT: Date Block */}
                  <div className="flex sm:flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200/70 w-full sm:w-28 text-center shrink-0">
                    {isMultiDay ? (
                      <span className="font-heading font-extrabold text-sm sm:text-base text-[#F59E0B] leading-tight">
                        {displayRange}
                      </span>
                    ) : (
                      <>
                        <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F59E0B] leading-none">
                          {day}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mt-1">
                          {month}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{year}</span>
                      </>
                    )}
                  </div>

                  {/* MIDDLE: Title, Description, Location */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <MapPin className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* RIGHT: Category Badge */}
                  <div className="shrink-0 w-full sm:w-auto flex justify-end">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#14B8A6]/15 text-[#0D9488]">
                      {event.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Past Events Note */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right shadow-2xs">
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0">
              <Images className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {t(
                  'events.past_note',
                  'Looking for past event photos and memorable highlights?'
                )}
              </p>
              <p className="text-xs text-slate-500">Browse albums from sports galas and annual functions.</p>
            </div>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs hover:bg-[#3B82F6] transition-colors shrink-0"
          >
            <span>{t('events.visit_gallery', 'Visit our Photo Gallery')}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};
