import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getNewsList } from '@/services/news';
import { News as NewsType } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/Skeleton';
import { School, ArrowRight, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

export const News: React.FC = () => {
  const { t, lang, dir } = useTranslation();
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    let mounted = true;
    getNewsList().then((data) => {
      if (mounted) {
        setNews(data.filter((n) => n.status === 'published'));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage) || 1;
  const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatPublishDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={t('news.hero_title', 'News & Notices')}
        subtitle={t('news.hero_subtitle', 'Official announcements, circulars, and campus updates')}
        breadcrumb={[
          { label: t('news.breadcrumb_home', 'Home'), href: '/' },
          { label: t('news.breadcrumb_news', 'News'), href: '/news' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        {loading ? (
          /* Skeletons while loading */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-4 space-y-4"
              >
                <Skeleton variant="card" className="h-44 w-full" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : paginatedNews.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 shadow-xs">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
            <h3 className="font-heading font-bold text-lg text-slate-800">
              {t('news.empty', 'No news published yet.')}
            </h3>
          </div>
        ) : (
          /* News Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item) => {
                const title = lang === 'ur' && item.title_ur ? item.title_ur : item.title_en;
                const summary =
                  lang === 'ur' && item.summary_ur ? item.summary_ur : item.summary_en;

                return (
                  <article
                    key={item.id}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#1E3A8A] transition-all duration-200 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Cover Placeholder with Date Badge */}
                      <div className="relative h-[180px] w-full bg-[#1E3A8A]/10 border-b border-[#1E3A8A]/15 flex items-center justify-center group-hover:bg-[#1E3A8A]/15 transition-colors">
                        <School className="w-16 h-16 text-[#1E3A8A]/40 stroke-[1.25] group-hover:scale-110 transition-transform duration-300" />

                        {/* Top-left Overlay Date Badge */}
                        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#1E3A8A] shadow-xs">
                          {formatPublishDate(item.publish_at)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h2 className="font-heading font-bold text-lg text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-2 leading-snug mb-2.5">
                          {title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {summary}
                        </p>
                      </div>
                    </div>

                    {/* Read More footer */}
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/news/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] group-hover:text-[#3B82F6] hover:underline"
                      >
                        <span>{t('news.read_more', 'Read More')}</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="mt-14 flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                <span>{t('news.prev_page', 'Prev')}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  currentPage === 1
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                1
              </button>

              {totalPages > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    currentPage === 2
                      ? 'bg-[#1E3A8A] text-white shadow-xs'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  2
                </button>
              )}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{t('news.next_page', 'Next')}</span>
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
