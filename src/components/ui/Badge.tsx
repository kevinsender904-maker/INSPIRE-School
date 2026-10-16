import React from 'react';

export type BadgeVariant =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'unread'
  | 'read'
  | 'replied'
  | 'archived'
  | 'draft'
  | 'published'
  | 'primary'
  | 'accent';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  unread: 'bg-blue-100 text-blue-800 border-blue-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  replied: 'bg-purple-100 text-purple-800 border-purple-200',
  archived: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  published: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  primary: 'bg-blue-900 text-white border-transparent',
  accent: 'bg-amber-500 text-slate-900 border-transparent font-semibold',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'draft',
  size = 'sm',
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full border transition-colors ${
        variantStyles[variant] || variantStyles.draft
      } ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
