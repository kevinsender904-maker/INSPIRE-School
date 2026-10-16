import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'bordered';

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-200 shadow-xs',
  elevated: 'bg-white border border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-200',
  bordered: 'bg-white border-2 border-slate-200 shadow-none',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden transition-all duration-150 ${variantStyles[variant]} ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
