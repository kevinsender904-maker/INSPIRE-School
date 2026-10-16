import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-10 sm:mb-12 ${
        isCenter ? 'text-center mx-auto' : 'text-left rtl:text-right'
      } ${className}`}
    >
      {subtitle && (
        <span className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-widest mb-1.5 font-heading">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight">
        {title}
      </h2>
      <div
        className={`mt-3 h-[3px] w-10 bg-[#F59E0B] rounded-full ${
          isCenter ? 'mx-auto' : 'mr-auto rtl:mr-0 rtl:ml-auto'
        }`}
      />
    </div>
  );
};
