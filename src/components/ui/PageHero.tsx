import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, breadcrumb }) => {
  return (
    <section className="relative bg-[#1E3A8A] text-white min-h-[280px] sm:min-h-[300px] flex flex-col justify-center overflow-hidden">
      {/* Background radial accent patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#1e40af] to-[#1E3A8A] opacity-95" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full text-center sm:text-left rtl:sm:text-right">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center sm:justify-start rtl:sm:justify-end space-x-1.5 rtl:space-x-reverse text-xs text-blue-200 mb-3"
          >
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              return (
                <React.Fragment key={item.href}>
                  {index > 0 && (
                    <ChevronRight className="h-3 w-3 text-blue-300 rtl:rotate-180 shrink-0" />
                  )}
                  {isLast ? (
                    <span className="font-semibold text-white tracking-wide">{item.label}</span>
                  ) : (
                    <Link
                      to={item.href}
                      className="hover:text-amber-300 transition-colors opacity-80 hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Wave SVG divider */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#F8FAFC]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
