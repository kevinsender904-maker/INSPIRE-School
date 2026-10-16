import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getAlbumsList } from '@/services/gallery';
import { GalleryAlbum } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Image, ArrowRight } from 'lucide-react';

export const GalleryPreview: React.FC = () => {
  const { t, lang } = useTranslation();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  // Gradient presets for aesthetic placeholder tiles
  const gradientPresets = [
    'from-blue-900 to-indigo-950',
    'from-emerald-800 to-teal-950',
    'from-amber-700 to-amber-950',
    'from-purple-900 to-slate-900',
    'from-cyan-900 to-blue-950',
    'from-rose-900 to-slate-950',
  ];

  useEffect(() => {
    let mounted = true;
    getAlbumsList().then((data) => {
      if (mounted) {
        setAlbums(data.filter((a) => a.status === 'published').slice(0, 6));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section aria-label="Campus Photo Gallery Highlights" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t('home.gallery_heading', 'Photo Gallery')}
          subtitle={t('home.gallery_subheading', 'Moments of Joy, Achievement & Campus Life')}
          align="center"
        />

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[200px] rounded-2xl bg-slate-200/70 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {albums.map((album, index) => {
              const title = lang === 'ur' && album.title_ur ? album.title_ur : album.title_en;
              const grad = gradientPresets[index % gradientPresets.length];

              return (
                <Link
                  key={album.id}
                  to={`/gallery/${album.id}`}
                  className="group relative h-[200px] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${grad} opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500`}
                  />

                  {/* Icon & Pattern Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-white pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    <Image className="w-16 h-16 stroke-[1.25]" />
                  </div>

                  {/* Foreground Title Overlay */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mb-1">
                      Album
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-sm hover:bg-[#1E3A8A] hover:text-white transition-all duration-200 shadow-2xs"
          >
            <span>{t('home.view_full_gallery', 'View Full Gallery')}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
};
