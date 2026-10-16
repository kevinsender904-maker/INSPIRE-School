import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="p-12 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto shadow-sm">
        <h1 className="text-6xl font-bold font-heading text-[#1E3A8A]">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mt-3">Page Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white font-semibold text-xs hover:bg-blue-900 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
