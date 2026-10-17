import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getAlbumById, getPhotosByAlbum } from '@/services/gallery';
import { GalleryAlbum, GalleryPhoto } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import {
  Image,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  FolderOpen,
} from 'lucide-react';

export const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { t, lang, dir } = useTranslation();

  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    if (albumId) {
      setLoading(true);
      Promise.all([getAlbumById(albumId), getPhotosByAlbum(albumId)]).then(
        ([albumData, photosData]) => {
          if (mounted) {
            setAlbum(albumData);
            setPhotos(photosData);
            setLoading(false);
          }
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [albumId]);

  // Lightbox keyboard controls: ESC, ArrowLeft, ArrowRight
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : null
        );
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }
    },
    [activePhotoIndex, photos.length]
  );

  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      lightboxRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex, handleKeyDown]);

  if (loading) {
    return (
      <div dir={dir} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <Skeleton variant="text" width="40%" height="32px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="card" height="240px" />
          ))}
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div dir={dir} className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="p-10 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
            {t('gallery.album_not_found', 'Album Not Found')}
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            The requested album could not be found or has been relocated.
          </p>
          <Link to="/gallery">
            <Button variant="primary" size="md">
              {t('gallery.back_to_gallery', '← Back to Gallery')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const albumTitle = lang === 'ur' && album.title_ur ? album.title_ur : album.title_en;

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={albumTitle}
        subtitle={`${photos.length} ${t('gallery.photos_count', 'Photos')} • INSPIRE School Archive`}
        breadcrumb={[
          { label: t('gallery.breadcrumb_home', 'Home'), href: '/' },
          { label: t('gallery.breadcrumb_gallery', 'Gallery'), href: '/gallery' },
          { label: albumTitle, href: `/gallery/${album.id}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        {photos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
            <Image className="w-16 h-16 text-slate-300 mx-auto mb-3 stroke-1" />
            <p className="text-slate-600 font-medium">No photos uploaded to this album yet.</p>
          </div>
        ) : (
          /* Photo Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1E3A8A] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Tile Placeholder (fixed 200px height) */}
                <div className="relative h-[200px] w-full bg-[#1E3A8A]/10 border-b border-[#1E3A8A]/15 flex items-center justify-center overflow-hidden">
                  {photo.image_url ? (
                    <img
                      src={photo.image_url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#1E3A8A]/50 group-hover:scale-105 transition-transform duration-300">
                      <Image className="w-14 h-14 stroke-[1.25]" />
                      <span className="text-[11px] font-semibold mt-1">INSPIRE Photo</span>
                    </div>
                  )}

                  {/* Hover Overlay with expand icon */}
                  <div className="absolute inset-0 bg-[#1E3A8A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-xs">
                      <Maximize2 className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Caption below */}
                <div className="p-4">
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-14 pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link to="/gallery">
            <Button variant="outline" size="md">
              {t('gallery.back_to_gallery', '← Back to Gallery')}
            </Button>
          </Link>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 outline-none select-none animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex(null);
            }}
            className="absolute top-6 right-6 rtl:right-auto rtl:left-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev - 1 + photos.length) % photos.length : null
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-8 w-8 rtl:rotate-180" />
          </button>

          {/* Centered Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-[55vh] sm:h-[65vh] rounded-2xl bg-[#1E3A8A]/30 border border-white/20 flex flex-col items-center justify-center overflow-hidden shadow-2xl relative">
              {photos[activePhotoIndex].image_url ? (
                <img
                  src={photos[activePhotoIndex].image_url}
                  alt={photos[activePhotoIndex].caption}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-center text-white/80 p-8">
                  <Image className="w-24 h-24 stroke-[1] mx-auto mb-3 text-white/60" />
                  <p className="font-heading font-bold text-lg text-white">
                    {albumTitle} • Photo #{activePhotoIndex + 1}
                  </p>
                  <p className="text-xs text-blue-200 mt-1">INSPIRE School Lahore Campus</p>
                </div>
              )}
            </div>

            {/* Caption below */}
            <div className="mt-4 text-center px-4 max-w-2xl">
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                {photos[activePhotoIndex].caption}
              </p>
              <span className="text-xs text-white/50 mt-1 block">
                {activePhotoIndex + 1} of {photos.length}
              </span>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="h-8 w-8 rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};
