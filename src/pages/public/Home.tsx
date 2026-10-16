import React from 'react';
import { useTranslation } from '@/i18n';
import {
  HeroSlider,
  QuickStats,
  AboutSnippet,
  AcademicsLevels,
  PrincipalMessage,
  LatestNewsEvents,
  GalleryPreview,
  QuoteStrip,
  CTABand,
} from '@/components/home';

export const Home: React.FC = () => {
  const { dir } = useTranslation();

  return (
    <div dir={dir} className="flex flex-col w-full">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Quick Stats */}
      <QuickStats />

      {/* 3. About Snippet */}
      <AboutSnippet />

      {/* 4. Academic Programs */}
      <AcademicsLevels />

      {/* 5. Principal's Message */}
      <PrincipalMessage />

      {/* 6. Latest News & Upcoming Events */}
      <LatestNewsEvents />

      {/* 7. Gallery Preview */}
      <GalleryPreview />

      {/* 8. Inspirational Quote Strip */}
      <QuoteStrip />

      {/* 9. Admissions Call to Action */}
      <CTABand />
    </div>
  );
};
