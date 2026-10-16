import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'card' | 'table-row' | 'circle';
  className?: string;
  count?: number;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  className = '',
  count = 1,
  width,
  height,
}) => {
  const renderItem = (index: number) => {
    switch (variant) {
      case 'circle':
        return (
          <div
            key={index}
            className={`rounded-full bg-slate-200 animate-pulse ${className}`}
            style={{ width: width || '48px', height: height || '48px' }}
            aria-hidden="true"
          />
        );

      case 'card':
        return (
          <div
            key={index}
            className={`rounded-xl border border-slate-200 bg-white p-5 shadow-xs ${className}`}
            aria-hidden="true"
          >
            <div className="h-36 w-full rounded-lg bg-slate-200 animate-pulse mb-4" />
            <div className="h-5 w-3/4 rounded bg-slate-200 animate-pulse mb-2" />
            <div className="h-4 w-1/2 rounded bg-slate-200 animate-pulse" />
          </div>
        );

      case 'table-row':
        return (
          <tr key={index} className="border-b border-slate-100" aria-hidden="true">
            <td className="p-4" colSpan={10}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-44 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
            </td>
          </tr>
        );

      case 'text':
      default:
        return (
          <div
            key={index}
            className={`h-4 w-full rounded bg-slate-200 animate-pulse ${className}`}
            style={{ width, height }}
            aria-hidden="true"
          />
        );
    }
  };

  if (count > 1 && variant !== 'table-row') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => renderItem(i))}
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </>
  );
};
