import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getDownloadsList } from '@/services/downloads';
import { Download as DownloadType, DownloadCategory } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  FileText,
  Download as DownloadIcon,
  HelpCircle,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';

export const Downloads: React.FC = () => {
  const { t, dir } = useTranslation();
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | DownloadCategory>('all');

  useEffect(() => {
    let mounted = true;
    getDownloadsList().then((data) => {
      if (mounted) {
        setDownloads(data.filter((d) => d.status === 'published'));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const tabs: { key: 'all' | DownloadCategory; labelKey: string; defaultLabel: string }[] = [
    { key: 'all', labelKey: 'downloads.tab_all', defaultLabel: 'All' },
    {
      key: 'date_sheet',
      labelKey: 'downloads.tab_date_sheet',
      defaultLabel: 'Date Sheets',
    },
    { key: 'syllabus', labelKey: 'downloads.tab_syllabus', defaultLabel: 'Syllabus' },
    { key: 'form', labelKey: 'downloads.tab_form', defaultLabel: 'Forms' },
    { key: 'other', labelKey: 'downloads.tab_other', defaultLabel: 'Other' },
  ];

  const filteredDownloads =
    activeTab === 'all'
      ? downloads
      : downloads.filter((d) => d.category === activeTab);

  const formatFileSize = (kb: number) => {
    if (kb >= 1024) {
      return `${(kb / 1024).toFixed(1)} MB`;
    }
    return `${kb} KB`;
  };

  const getCategoryBadgeClass = (category: DownloadCategory) => {
    switch (category) {
      case 'date_sheet':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'syllabus':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'form':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={t('downloads.hero_title', 'Downloads')}
        subtitle={t(
          'downloads.hero_subtitle',
          'Syllabi, date sheets, academic handbooks, and registration forms'
        )}
        breadcrumb={[
          { label: t('downloads.breadcrumb_home', 'Home'), href: '/' },
          { label: t('downloads.breadcrumb_downloads', 'Downloads'), href: '/downloads' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        {/* 2. Filter Tabs */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-slate-200 pb-3 overflow-x-auto scrollbar-none mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t(tab.labelKey, tab.defaultLabel)}
              </button>
            );
          })}
        </div>

        {/* 3. Downloads Table / List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse w-2/3">
                    <Skeleton variant="circle" width="40px" height="40px" />
                    <div className="w-full space-y-2">
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="30%" />
                    </div>
                  </div>
                  <Skeleton variant="text" width="100px" height="36px" />
                </div>
              ))}
            </div>
          ) : filteredDownloads.length === 0 ? (
            /* Empty state */
            <div className="text-center py-16 px-4">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-1" />
              <p className="text-sm font-semibold text-slate-700">
                {t('downloads.empty_category', 'No files in this category.')}
              </p>
            </div>
          ) : (
            /* Table Rows */
            <div className="divide-y divide-slate-100">
              {filteredDownloads.map((file) => {
                const isAvailable = file.file_url && file.file_url !== '#';

                return (
                  <div
                    key={file.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Left: Icon, Title, and Meta */}
                    <div className="flex items-start sm:items-center space-x-4 rtl:space-x-reverse min-w-0">
                      {/* Red PDF Icon */}
                      <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 stroke-[1.75]" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {file.title}
                        </h3>

                        <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-slate-500">
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold capitalize ${getCategoryBadgeClass(
                              file.category
                            )}`}
                          >
                            {file.category.replace('_', ' ')}
                          </span>
                          <span>•</span>
                          <span className="font-mono">{formatFileSize(file.file_size_kb)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Download Action */}
                    <div className="shrink-0 flex sm:justify-end">
                      {isAvailable ? (
                        <a
                          href={file.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#3B82F6] transition-colors shadow-2xs cursor-pointer"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          <span>{t('downloads.download_btn', 'Download')}</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title={t('downloads.coming_soon', 'Coming soon')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed border border-slate-200"
                        >
                          <DownloadIcon className="h-4 w-4 opacity-50" />
                          <span>{t('downloads.coming_soon', 'Coming soon')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Note Box at Bottom */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right shadow-2xs">
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {t(
                  'downloads.office_note',
                  "Can't find what you need? Contact the school office."
                )}
              </p>
              <p className="text-xs text-slate-500">
                Our administration desk is happy to provide printed copies and official syllabi.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-xs hover:bg-[#1E3A8A] hover:text-white transition-colors shrink-0"
          >
            <span>{t('downloads.contact_link', 'Contact Us')}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};
