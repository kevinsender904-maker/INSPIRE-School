import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getNewsBySlug } from '@/services/news';
import { News as NewsType } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { School, Calendar, ArrowLeft, ChevronRight, UserCheck } from 'lucide-react';

export const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang, dir } = useTranslation();
  const [article, setArticle] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (slug) {
      setLoading(true);
      getNewsBySlug(slug).then((data) => {
        if (mounted) {
          setArticle(data);
          setLoading(false);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div dir={dir} className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <Skeleton variant="text" width="30%" height="20px" />
        <Skeleton variant="card" height="320px" />
        <Skeleton variant="text" width="80%" height="36px" />
        <Skeleton variant="text" width="40%" height="20px" />
        <div className="space-y-3 pt-4">
          <Skeleton variant="text" count={6} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div dir={dir} className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="p-10 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
            {t('news.not_found_title', 'Article Not Found')}
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            {t(
              'news.not_found_desc',
              'The requested news announcement could not be found or has been moved.'
            )}
          </p>
          <Link to="/news">
            <Button variant="primary" size="md">
              {t('news.back_btn', '← Back to News')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'ur' && article.title_ur ? article.title_ur : article.title_en;
  const body = lang === 'ur' && article.body_ur ? article.body_ur : article.body_en;
  const formattedDate = new Date(article.publish_at).toLocaleDateString(
    lang === 'ur' ? 'ur-PK' : 'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  return (
    <div dir={dir} className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-slate-500 mb-6"
        >
          <Link to="/" className="hover:text-[#1E3A8A]">
            {t('news.breadcrumb_home', 'Home')}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400 rtl:rotate-180 shrink-0" />
          <Link to="/news" className="hover:text-[#1E3A8A]">
            {t('news.breadcrumb_news', 'News')}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400 rtl:rotate-180 shrink-0" />
          <span className="font-semibold text-slate-800 truncate max-w-xs">{title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Cover Placeholder */}
          <div className="w-full h-[260px] sm:h-[320px] bg-[#1E3A8A]/10 border-b border-[#1E3A8A]/15 flex items-center justify-center relative">
            <School className="w-24 h-24 text-[#1E3A8A]/40 stroke-[1.25]" />
            <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#1E3A8A] shadow-xs">
              INSPIRE Bulletin
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-1.5 text-[#1E3A8A]">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <UserCheck className="h-4 w-4 text-[#14B8A6]" />
                <span>{article.created_by || t('news.published_by', 'Published by INSPIRE School')}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-snug mb-8">
              {title}
            </h1>

            {/* Prose Body */}
            <div className="prose max-w-none text-slate-700 text-base leading-[1.8] space-y-4">
              {body.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
              <Link to="/news">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<ArrowLeft className="h-4 w-4 rtl:rotate-180" />}
                >
                  {t('news.back_btn', '← Back to News')}
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
