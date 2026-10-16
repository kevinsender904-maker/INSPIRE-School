import React, { InputHTMLAttributes, useState, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      className = '',
      id,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = String(currentValue).length > 0;
    const isFloating = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3.5 rtl:pl-0 rtl:pr-3.5 pointer-events-none text-slate-400 z-10">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className={`peer w-full rounded-lg border bg-white px-3.5 pt-5 pb-2 text-sm text-slate-900 transition-all duration-150 focus:outline-none ${
              leftIcon ? 'pl-10 rtl:pl-3.5 rtl:pr-10' : ''
            } ${rightIcon ? 'pr-10 rtl:pr-3.5 rtl:pl-10' : ''} ${
              error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 hover:border-slate-400 focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100'
            } ${className}`}
            {...rest}
          />

          {label && (
            <label
              htmlFor={inputId}
              className={`absolute transition-all duration-150 pointer-events-none ${
                leftIcon ? 'left-10 rtl:left-auto rtl:right-10' : 'left-3.5 rtl:left-auto rtl:right-3.5'
              } ${
                isFloating
                  ? 'top-1.5 text-xs font-medium text-slate-500'
                  : 'top-3.5 text-sm text-slate-400'
              } ${error ? 'text-red-600' : isFocused ? 'text-[#1E3A8A]' : ''}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1 rtl:mr-1">*</span>}
            </label>
          )}

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
