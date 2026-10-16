import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getNewsList } from '@/services/news';
import { getEventsList } from '@/services/events';
import { News, Event } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Calendar, MapPin, ArrowRight, Newspaper } from 'lucide-react';

export const LatestNewsEvents: React.FC = () => {
  const { t, lang } = useTranslation();
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([getNewsList(), getEventsList()]).then(([allNews, allEvents]) => {
      if (mounted) {
        setNews(allNews.filter((n) => n.status === 'published').slice(0, 3));
        setEvents(allEvents.filter((e) => e.status === 'published').slice(0, 3));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const formatEventDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return {
        day: d.getDate(),
        month: d.toLocaleString('en-US', { month: 'short' }),
      };
    } catch {
      return { day: '15', month: 'Nov' };
    }
  };

  return (
    <section aria-label="Latest News and Upcoming Events" className="bg-[#F8FAFC] py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t('home.news_events_heading', 'Latest News & Upcoming Events')}
          subtitle={t('home.news_events_subheading', 'Stay Informed with School Life')}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column: Latest News (3 cards) */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-[#1E3A8A]" />
                  <span>{t('home.latest_news', 'Latest News & Notices')}</span>
                </h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 bg-slate-200/70 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((item) => {
                    const title = lang === 'ur' && item.title_ur ? item.title_ur : item.title_en;
                    const summary =
                      lang === 'ur' && item.summary_ur ? item.summary_ur : item.summary_en;

                    return (
                      <article
                        key={item.id}
                        className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-4"
                      >
                        {/* Cover Placeholder */}
                        <div className="w-full sm:w-28 h-24 sm:h-auto rounded-lg bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 flex items-center justify-center shrink-0">
                          <Newspaper className="h-8 w-8 text-[#1E3A8A]/60" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                              {new Date(item.publish_at).toLocaleDateString()}
                            </span>
                            <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-1 hover:text-[#1E3A8A] transition-colors">
                              {title}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                              {summary}
                            </p>
                          </div>

                          <div className="mt-3">
                            <Link
                              to={`/news/${item.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer"
                            >
                              <span>{t('common.read_more', 'Read More')}</span>
                              <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 text-center sm:text-left rtl:sm:text-right">
              <Link
                to="/news"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-xs hover:bg-[#1E3A8A] hover:text-white transition-colors"
              >
                {t('home.view_all_news', 'View All News')}
              </Link>
            </div>
          </div>

          {/* Right Column: Upcoming Events (3 items) */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#F59E0B]" />
                  <span>{t('home.upcoming_events', 'Upcoming Events')}</span>
                </h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 bg-slate-200/70 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => {
                    const { day, month } = formatEventDate(event.start_date);
                    const title =
                      lang === 'ur' && event.title_ur ? event.title_ur : event.title_en;
                    const desc =
                      lang === 'ur' && event.description_ur
                        ? event.description_ur
                        : event.description_en;

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-[#F59E0B] hover:shadow-md transition-all duration-200 flex items-start gap-4"
                      >
                        {/* Date Badge */}
                        <div className="w-16 h-18 rounded-xl bg-[#F59E0B] text-slate-950 flex flex-col items-center justify-center shrink-0 shadow-xs">
                          <span className="text-xl font-extrabold font-heading leading-none">
                            {day}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider mt-0.5">
                            {month}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                              {event.category}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-1">
                            {title}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {desc}
                          </p>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
                            <MapPin className="h-3 w-3 text-[#14B8A6] shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 text-center sm:text-left rtl:sm:text-right">
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-xs hover:border-slate-400 hover:bg-slate-100 transition-colors"
              >
                {t('home.view_all_events', 'View All Events')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
