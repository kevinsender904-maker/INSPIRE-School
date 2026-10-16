import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getSiteSettings } from '@/services/settings';
import { SiteSettings } from '@/types';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, dir } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    let mounted = true;
    getSiteSettings().then((data) => {
      if (mounted) setSettings(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer dir={dir} className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Quick Links */}
          <div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white font-bold">
                I
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                INSPIRE School
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Empowering students from Playgroup to Matriculation with academic rigor, Islamic values,
              and holistic co-curricular leadership.
            </p>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {t('footer.quick_links')}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-amber-400 transition-colors">
                  {t('nav.academics')}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-400 transition-colors">
                  {t('nav.admissions')}
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-amber-400 transition-colors">
                  {t('nav.faculty')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-amber-400 transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-amber-400 transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-amber-400 transition-colors">
                  {t('nav.downloads')}
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-amber-400 transition-colors">
                  {t('nav.results')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t('footer.contact_info')}
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings?.address || 'Plot 12, Model Town, Lahore, Pakistan'}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`tel:${settings?.phone || '+923000000000'}`}
                  className="hover:text-white transition-colors"
                >
                  {settings?.phone || '+92 300 0000000'}
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'info@inspireschool.example'}`}
                  className="hover:text-white transition-colors"
                >
                  {settings?.email || 'info@inspireschool.example'}
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>
                  {t('footer.office_hours')}: {settings?.office_hours || 'Mon–Sat 8:00–2:00'}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Socials & Affiliation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t('footer.socials')}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Stay connected with our vibrant community for latest school updates, event galleries, and
              academic announcements.
            </p>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <a
                href={settings?.facebook_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#3B82F6] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={settings?.instagram_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={settings?.youtube_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-amber-400 block mb-1 uppercase tracking-wider">
                Lahore Board Registered
              </span>
              <p className="text-[11px] text-slate-400">
                Registered with Board of Intermediate & Secondary Education (BISE) Lahore.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2027 INSPIRE School. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium text-slate-400">
            Learn. Lead. Inspire.
          </p>
        </div>
      </div>
    </footer>
  );
};
