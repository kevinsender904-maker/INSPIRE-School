import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { Menu, X, Globe, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, lang, dir, toggleLang } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/academics', label: t('nav.academics') },
    { to: '/admissions', label: t('nav.admissions') },
    { to: '/faculty', label: t('nav.faculty') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/news', label: t('nav.news') },
    { to: '/events', label: t('nav.events') },
    { to: '/downloads', label: t('nav.downloads') },
    { to: '/results', label: t('nav.results') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      dir={dir}
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled ? 'shadow-md border-b border-slate-200/80' : 'border-b border-slate-100'
      }`}
    >
      {/* Top Banner Bar */}
      <div className="bg-[#1E3A8A] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="font-medium tracking-wide">
            Lahore, Pakistan • Admissions Open 2027 (Playgroup to Class 10)
          </p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              to="/admin/login"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 opacity-90 hover:opacity-100"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{t('nav.admin_portal')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="font-heading font-extrabold text-xl tracking-tight">I</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl text-[#1E3A8A] tracking-tight leading-tight">
                INSPIRE School
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Learn. Lead. Inspire.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1E3A8A] bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Language Switcher + Apply Now */}
          <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle language between English and Urdu"
            >
              <Globe className="h-3.5 w-3.5 text-[#1E3A8A]" />
              <span className="font-bold">{lang === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Apply Now Button */}
            <Link
              to="/admissions/apply"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-[#F59E0B] text-slate-950 hover:bg-[#D97706] shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer"
            >
              {t('nav.apply_now')}
            </Link>
          </div>

          {/* Mobile Right Controls: Language Switch + Hamburger */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse xl:hidden">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5 text-[#1E3A8A]" />
              <span>{lang === 'en' ? 'اردو' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Full-screen overlay/drawer) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[110px] z-50 bg-white border-t border-slate-200 p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200 xl:hidden flex flex-col justify-between"
          style={{ height: 'calc(100vh - 110px)' }}
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#1E3A8A] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <Link
              to="/admissions/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 rounded-xl text-base font-bold bg-[#F59E0B] text-slate-950 shadow-md text-center"
            >
              {t('nav.apply_now')}
            </Link>

            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 text-center hover:bg-slate-50"
            >
              {t('nav.admin_portal')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
