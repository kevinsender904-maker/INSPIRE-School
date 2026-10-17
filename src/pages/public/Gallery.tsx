import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getAlbumsList } from '@/services/gallery';
import { GalleryAlbum } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/Skeleton';
import { Image, FolderOpen, ArrowRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { t, lang, dir } = useTranslation();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAlbumsList().then((data) => {
      if (mounted) {
        setAlbums(data.filter((a) => a.status === 'published'));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={t('gallery.hero_title', 'Photo Gallery')}
        subtitle={t('gallery.hero_subtitle', 'Explore campus activities, sports gala, and celebrations')}
        breadcrumb={[
          { label: t('gallery.breadcrumb_home', 'Home'), href: '/' },
          { label: t('gallery.breadcrumb_gallery', 'Gallery'), href: '/gallery' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        {loading ? (
          /* Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
                <Skeleton variant="card" className="h-[200px] w-full" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : albums.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 shadow-xs">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
            <p className="font-heading font-bold text-slate-700">
              {t('gallery.empty', 'No albums yet.')}
            </p>
          </div>
        ) : (
          /* Albums Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => {
              const title = lang === 'ur' && album.title_ur ? album.title_ur : album.title_en;

              return (
                <Link
                  key={album.id}
                  to={`/gallery/${album.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#1E3A8A] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Thumbnail: Fixed 200px height with gradient and overlay title */}
                  <div className="relative h-[200px] w-full bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center overflow-hidden">
                    {/* Background Icon Watermark */}
                    <Image className="w-20 h-20 text-white/20 absolute group-hover:scale-110 transition-transform duration-500 stroke-[1.25]" />

                    {/* Centered White Title Overlay */}
                    <div className="relative z-10 p-4 text-center">
                      <h3 className="font-heading font-extrabold text-xl text-white tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-200">
                        {title}
                      </h3>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-white backdrop-blur-xs">
                        View Photos
                      </span>
                    </div>
                  </div>

                  {/* Below Content */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                        {title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">INSPIRE School Lahore</p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors shrink-0">
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
