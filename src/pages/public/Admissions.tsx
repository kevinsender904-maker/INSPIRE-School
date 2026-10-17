import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { getFeeStructure } from '@/services/fees';
import { FeeStructure } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Table, Column } from '@/components/ui/Table';
import {
  FileText,
  Hash,
  PenTool,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Admissions: React.FC = () => {
  const { t, dir } = useTranslation();
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getFeeStructure().then((data) => {
      if (mounted) {
        setFees(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const steps = [
    {
      num: 1,
      title: t('admissions.step1_title', 'Fill Online Form'),
      desc: t(
        'admissions.step1_desc',
        'Submit student and guardian information through our online portal.'
      ),
      icon: FileText,
    },
    {
      num: 2,
      title: t('admissions.step2_title', 'Receive Reference Number'),
      desc: t(
        'admissions.step2_desc',
        'Get your instant tracking code and application confirmation SMS.'
      ),
      icon: Hash,
    },
    {
      num: 3,
      title: t('admissions.step3_title', 'Admission Test'),
      desc: t(
        'admissions.step3_desc',
        'Age-appropriate written assessment and interactive interview.'
      ),
      icon: PenTool,
    },
    {
      num: 4,
      title: t('admissions.step4_title', 'Enrollment'),
      desc: t(
        'admissions.step4_desc',
        'Document verification and fee payment to secure student seat.'
      ),
      icon: CheckCircle,
    },
  ];

  const eligibilityList = [
    {
      group: 'Playgroup',
      criteria: t('admissions.elig_playgroup', 'Playgroup: Age 2.5–3.5 years'),
      badge: 'Montessori I',
    },
    {
      group: 'Nursery',
      criteria: t('admissions.elig_nursery', 'Nursery: Age 3.5–4.5 years'),
      badge: 'Montessori II',
    },
    {
      group: 'Prep',
      criteria: t('admissions.elig_prep', 'Prep: Age 4.5–5.5 years'),
      badge: 'Montessori Advanced',
    },
    {
      group: 'Class 1–10',
      criteria: t(
        'admissions.elig_classes',
        'Class 1–10: Age-appropriate + previous school leaving certificate & report card'
      ),
      badge: 'Primary / Secondary',
    },
  ];

  const importantDates = [
    {
      label: t('admissions.date1_title', 'Application Deadline'),
      date: t('admissions.date1_val', 'March 31, 2027'),
    },
    {
      label: t('admissions.date2_title', 'Admission Test'),
      date: t('admissions.date2_val', 'April 11, 2027'),
    },
    {
      label: t('admissions.date3_title', 'Results Announced'),
      date: t('admissions.date3_val', 'April 18, 2027'),
    },
  ];

  const feeColumns: Column<FeeStructure>[] = [
    {
      key: 'class_group',
      header: t('admissions.col_class', 'Class Group'),
      render: (item) => (
        <span className="font-heading font-bold text-slate-900">{item.class_group}</span>
      ),
    },
    {
      key: 'admission_fee',
      header: t('admissions.col_admission_fee', 'Admission Fee (PKR)'),
      render: (item) => (
        <span className="font-semibold text-slate-800">
          Rs. {item.admission_fee.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'monthly_fee',
      header: t('admissions.col_monthly_fee', 'Monthly Tuition (PKR)'),
      render: (item) => (
        <span className="font-bold text-[#1E3A8A]">Rs. {item.monthly_fee.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC]">
      {/* 1. Page Hero */}
      <PageHero
        title={t('admissions.hero_title', 'Admissions')}
        subtitle={t('admissions.hero_subtitle', 'Join the INSPIRE family — Session 2027')}
        breadcrumb={[
          { label: t('admissions.breadcrumb_home', 'Home'), href: '/' },
          { label: t('admissions.breadcrumb_admissions', 'Admissions'), href: '/admissions' },
        ]}
      />

      {/* 2. Admission Process Steps */}
      <section
        aria-label="Admission Steps"
        className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full"
      >
        <SectionHeading
          title={t('admissions.process_heading', 'Admission Process')}
          subtitle={t('admissions.process_subheading', 'Four Simple Steps to Join INSPIRE School')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative mt-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:border-[#1E3A8A] hover:shadow-md transition-all duration-200"
              >
                {/* Number Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-[#F59E0B] text-slate-950 font-heading font-extrabold text-xl flex items-center justify-center shadow-md mb-4 shrink-0">
                  {step.num}
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-900/10 text-[#1E3A8A] flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Eligibility Criteria */}
      <section
        aria-label="Eligibility Requirements"
        className="py-16 bg-white border-y border-slate-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={t('admissions.eligibility_heading', 'Eligibility Criteria')}
            subtitle={t('admissions.eligibility_subheading', 'Age Requirements by Class Level')}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {eligibilityList.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-start space-x-3.5 rtl:space-x-reverse"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#14B8A6] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {item.badge}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {item.criteria}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start space-x-3 rtl:space-x-reverse text-amber-900">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {t(
                'admissions.docs_note',
                'All new admissions require original documents (B-Form, birth certificate, parent CNIC) on interview day.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fee Structure Table */}
      <section
        aria-label="Fee Structure"
        className="py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 w-full"
      >
        <SectionHeading
          title={t('admissions.fees_heading', 'Fee Structure')}
          subtitle={t(
            'admissions.fees_subheading',
            'Tuition & Admission Charges for Session 2027'
          )}
          align="center"
        />

        <div className="mt-8">
          <Table
            columns={feeColumns as unknown as Column<Record<string, unknown>>[]}
            data={fees as unknown as Record<string, unknown>[]}
            loading={loading}
            emptyMessage="No fee structure records available."
          />
        </div>

        <p className="mt-4 text-xs text-slate-500 italic text-center sm:text-left rtl:sm:text-right">
          {t(
            'admissions.fees_note',
            'Fees are subject to annual review. A 15% sibling discount applies on tuition fees for 2nd and subsequent siblings.'
          )}
        </p>
      </section>

      {/* 5. Important Dates */}
      <section
        aria-label="Important Dates"
        className="py-16 bg-white border-t border-slate-200 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={t('admissions.dates_heading', 'Important Admissions Dates')}
            subtitle={t(
              'admissions.dates_subheading',
              'Mark Your Calendar for Key Admissions Milestones'
            )}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {importantDates.map((d, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border-t-4 border-t-[#14B8A6] border-x border-b border-slate-200 p-6 sm:p-8 text-center shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-1">
                  {d.date}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  {d.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA — Ready to Apply? Band */}
      <section
        aria-label="Apply CTA"
        className="bg-[#F59E0B] text-slate-950 py-16 px-4 sm:px-6 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            {t('admissions.cta_ready', 'Ready to Apply?')}
          </h2>

          <p className="text-sm sm:text-base text-slate-900 font-medium">
            {t(
              'admissions.cta_desc',
              'Start your online registration now or contact our admissions desk for further inquiries.'
            )}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admissions/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-blue-900 shadow-xl transition-all cursor-pointer"
            >
              <span>{t('admissions.cta_apply_btn', 'Apply Now')}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-950 font-bold text-sm text-slate-950 hover:bg-black/10 transition-colors"
            >
              <span>{t('admissions.cta_contact_link', 'Contact Us for queries')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
