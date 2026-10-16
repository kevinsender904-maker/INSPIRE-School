import React from 'react';
import { useParams } from 'react-router-dom';

export const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="p-8 bg-white rounded-2xl border border-slate-200">
        <h1 className="text-2xl font-bold font-heading text-slate-900">Album: {albumId}</h1>
        <p className="text-sm text-slate-500 mt-2">Full resolution album photo viewer with lightbox (Phase A4)</p>
      </div>
    </div>
  );
};
