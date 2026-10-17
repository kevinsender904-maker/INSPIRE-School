import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/i18n';
import { submitApplication } from '@/services/admissions';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  Building2,
  ClipboardCheck,
} from 'lucide-react';

const admissionSchema = z.object({
  // Step 1: Student
  student_name: z.string().min(3, 'Student name must be at least 3 characters'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const d = new Date(val);
      return !isNaN(d.getTime()) && d < new Date();
    }, 'Date of birth must be a valid past date'),
  gender: z.enum(['male', 'female'] as const),
  class_applying: z.string().min(1, 'Please select a class'),
  website: z.string().optional(), // Honeypot

  // Step 2: Parent / Guardian
  father_name: z.string().min(3, "Father's name must be at least 3 characters"),
  mother_name: z.string().min(3, "Mother's name must be at least 3 characters"),
  guardian_phone: z
    .string()
    .regex(/^03[0-9]{9}$/, 'Phone must be an 11-digit Pakistani number (e.g. 03001234567)'),
  guardian_email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      'Please enter a valid email address'
    ),
  cnic_bform: z
    .string()
    .regex(
      /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      'CNIC/B-Form must match format: XXXXX-XXXXXXX-X (15 characters)'
    ),
  address: z.string().min(10, 'Home address must be at least 10 characters'),

  // Step 3: Previous School (Optional)
  previous_school: z.string().optional(),
  previous_class: z.string().optional(),
  leave_reason: z.string().optional(),

  // Step 4: Confirm
  confirm_accurate: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that all information is accurate',
  }),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

export const Apply: React.FC = () => {
  const { t, dir } = useTranslation();
  const { error: toastError, success: toastSuccess } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedRefNo, setSubmittedRefNo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    mode: 'onTouched',
    defaultValues: {
      student_name: '',
      dob: '',
      gender: 'male',
      class_applying: 'Playgroup',
      website: '',
      father_name: '',
      mother_name: '',
      guardian_phone: '',
      guardian_email: '',
      cnic_bform: '',
      address: '',
      previous_school: '',
      previous_class: '',
      leave_reason: '',
      confirm_accurate: false,
    },
  });

  const formValues = watch();

  const classOptions = [
    'Playgroup',
    'Nursery',
    'Prep',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
  ];

  // Step validate before advancing
  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['student_name', 'dob', 'gender', 'class_applying']);
    } else if (currentStep === 2) {
      isValid = await trigger([
        'father_name',
        'mother_name',
        'guardian_phone',
        'guardian_email',
        'cnic_bform',
        'address',
      ]);
    } else if (currentStep === 3) {
      isValid = true; // Step 3 is optional
    }

    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 2 | 3 | 4);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: AdmissionFormValues) => {
    // Silent check on honeypot
    if (data.website && data.website.trim().length > 0) {
      return;
    }

    try {
      const response = await submitApplication({
        student_name: data.student_name,
        dob: data.dob,
        gender: data.gender,
        class_applying: data.class_applying,
        father_name: data.father_name,
        mother_name: data.mother_name,
        guardian_phone: data.guardian_phone,
        guardian_email: data.guardian_email || '',
        cnic_bform: data.cnic_bform,
        address: data.address,
        previous_school: data.previous_school || '',
        previous_class: data.previous_class || '',
      });

      setSubmittedRefNo(response.reference_no);
      toastSuccess(t('toast.action_success', 'Application submitted successfully!'));
    } catch {
      toastError(t('common.error', 'An error occurred while submitting. Please try again.'));
    }
  };

  const handleApplyAnother = () => {
    reset();
    setSubmittedRefNo(null);
    setCurrentStep(1);
  };

  return (
    <div dir={dir} className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* 1. Page Hero */}
      <PageHero
        title={t('apply.hero_title', 'Online Admission Application')}
        subtitle={t('apply.hero_subtitle', 'Session 2027-2028 Student Registration')}
        breadcrumb={[
          { label: t('admissions.breadcrumb_home', 'Home'), href: '/' },
          { label: t('admissions.breadcrumb_admissions', 'Admissions'), href: '/admissions' },
          { label: t('apply.hero_title', 'Apply Online'), href: '/admissions/apply' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {submittedRefNo ? (
          /* SUCCESS SCREEN (inline replacement) */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center shadow-xl animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 stroke-[2]" />
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {t('apply.success_title', 'Application Submitted Successfully!')}
            </h2>

            <div className="my-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 max-w-md mx-auto">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-1">
                {t('apply.success_ref_label', 'Your Reference Number:')}
              </span>
              <p className="font-mono font-extrabold text-3xl sm:text-4xl text-[#F59E0B] tracking-wider select-all">
                {submittedRefNo}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
              {t(
                'apply.success_msg',
                'Keep this reference number safe. Our admissions coordinator will contact you on your registered phone for test scheduling.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" size="md" onClick={handleApplyAnother}>
                {t('apply.btn_another', 'Apply for Another Student')}
              </Button>

              <Link to="/">
                <Button variant="primary" size="md">
                  {t('apply.btn_home', 'Go to Home')}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI-STEP FORM */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Progress Bar Header */}
            <div className="border-b border-slate-200 bg-slate-50/80 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Step {currentStep} of 4
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {currentStep === 1 && t('apply.step1_tab', '1. Student Info')}
                  {currentStep === 2 && t('apply.step2_tab', '2. Parent / Guardian')}
                  {currentStep === 3 && t('apply.step3_tab', '3. Previous School')}
                  {currentStep === 4 && t('apply.step4_tab', '4. Review & Submit')}
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A8A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>

              {/* Step Badges (Desktop) */}
              <div className="hidden sm:grid grid-cols-4 gap-2 mt-4 text-center">
                <div
                  className={`text-xs font-semibold py-1.5 rounded-lg ${
                    currentStep === 1
                      ? 'bg-blue-100 text-[#1E3A8A]'
                      : currentStep > 1
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  1. Student
                </div>
                <div
                  className={`text-xs font-semibold py-1.5 rounded-lg ${
                    currentStep === 2
                      ? 'bg-blue-100 text-[#1E3A8A]'
                      : currentStep > 2
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  2. Parents
                </div>
                <div
                  className={`text-xs font-semibold py-1.5 rounded-lg ${
                    currentStep === 3
                      ? 'bg-blue-100 text-[#1E3A8A]'
                      : currentStep > 3
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  3. History
                </div>
                <div
                  className={`text-xs font-semibold py-1.5 rounded-lg ${
                    currentStep === 4 ? 'bg-blue-100 text-[#1E3A8A]' : 'text-slate-400'
                  }`}
                >
                  4. Review
                </div>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-6">
              {/* Hidden Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register('website')}
              />

              {/* STEP 1: Student Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-slate-100">
                    <User className="h-5 w-5 text-[#1E3A8A]" />
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {t('apply.step1_tab', '1. Student Information')}
                    </h3>
                  </div>

                  <Input
                    label={t('apply.student_name', 'Student Full Name')}
                    required
                    error={errors.student_name?.message}
                    {...register('student_name')}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={t('apply.dob', 'Date of Birth')}
                      type="date"
                      required
                      error={errors.dob?.message}
                      {...register('dob')}
                    />

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        {t('apply.gender', 'Gender')} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center space-x-6 rtl:space-x-reverse pt-2">
                        <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-sm font-medium text-slate-700">
                          <input
                            type="radio"
                            value="male"
                            className="w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                            {...register('gender')}
                          />
                          <span>{t('apply.gender_male', 'Male')}</span>
                        </label>
                        <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-sm font-medium text-slate-700">
                          <input
                            type="radio"
                            value="female"
                            className="w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                            {...register('gender')}
                          />
                          <span>{t('apply.gender_female', 'Female')}</span>
                        </label>
                      </div>
                      {errors.gender && (
                        <p className="text-xs text-red-600 mt-1.5">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="class-select"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t('apply.class_applying', 'Class Applying For')}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="class-select"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 transition-colors focus:border-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register('class_applying')}
                    >
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.class_applying && (
                      <p className="text-xs text-red-600 mt-1.5">
                        {errors.class_applying.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Parent / Guardian Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-slate-100">
                    <Users className="h-5 w-5 text-[#1E3A8A]" />
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {t('apply.step2_tab', '2. Parent / Guardian Information')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={t('apply.father_name', "Father's Full Name")}
                      required
                      error={errors.father_name?.message}
                      {...register('father_name')}
                    />

                    <Input
                      label={t('apply.mother_name', "Mother's Full Name")}
                      required
                      error={errors.mother_name?.message}
                      {...register('mother_name')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={t('apply.phone', 'Guardian Phone (e.g. 03001234567)')}
                      placeholder="03XXXXXXXXX"
                      required
                      error={errors.guardian_phone?.message}
                      {...register('guardian_phone')}
                    />

                    <Input
                      label={t('apply.email', 'Guardian Email (Optional)')}
                      type="email"
                      error={errors.guardian_email?.message}
                      {...register('guardian_email')}
                    />
                  </div>

                  <Input
                    label={t('apply.cnic', 'CNIC / B-Form Number (XXXXX-XXXXXXX-X)')}
                    placeholder="35201-1234567-1"
                    required
                    error={errors.cnic_bform?.message}
                    {...register('cnic_bform')}
                  />

                  <div>
                    <label
                      htmlFor="address-input"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t('apply.address', 'Home Address')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address-input"
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 p-3.5 text-sm text-slate-900 focus:border-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="House No, Street, Sector / Area, City"
                      {...register('address')}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: Previous School Information */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-slate-100">
                    <Building2 className="h-5 w-5 text-[#1E3A8A]" />
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {t('apply.step3_tab', '3. Previous School Information')}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 italic bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                    {t(
                      'apply.prev_school_note',
                      'If applying for Playgroup or Nursery, leave these fields blank.'
                    )}
                  </p>

                  <Input
                    label={t('apply.prev_school', 'Previous School Name (Optional)')}
                    {...register('previous_school')}
                  />

                  <Input
                    label={t('apply.prev_class', 'Previous Class Attended (Optional)')}
                    {...register('previous_class')}
                  />

                  <div>
                    <label
                      htmlFor="leave-reason"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t('apply.leave_reason', 'Reason for Leaving (Optional)')}
                    </label>
                    <textarea
                      id="leave-reason"
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 p-3.5 text-sm text-slate-900 focus:border-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Relocation, academic advancement, etc."
                      {...register('leave_reason')}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-slate-100">
                    <ClipboardCheck className="h-5 w-5 text-[#1E3A8A]" />
                    <div>
                      <h3 className="font-heading font-bold text-lg text-slate-900">
                        {t('apply.review_title', 'Review Application Details')}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t(
                          'apply.review_subtitle',
                          'Please verify all entered details before final submission.'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="space-y-5">
                    {/* Student Info */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2.5">
                        {t('apply.section_student', 'Student Information')}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Name:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.student_name}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Class:</span>
                          <span className="font-semibold text-[#1E3A8A]">
                            {formValues.class_applying}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Gender:</span>
                          <span className="font-semibold capitalize text-slate-800">
                            {formValues.gender}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Date of Birth:</span>
                          <span className="font-semibold text-slate-800">{formValues.dob}</span>
                        </div>
                      </div>
                    </div>

                    {/* Parent Info */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2.5">
                        {t('apply.section_parent', 'Parent / Guardian Information')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Father:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.father_name}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Mother:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.mother_name}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Phone:</span>
                          <span className="font-semibold text-slate-800 font-mono">
                            {formValues.guardian_phone}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">CNIC / B-Form:</span>
                          <span className="font-semibold text-slate-800 font-mono">
                            {formValues.cnic_bform}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 block">Address:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* School Info */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2.5">
                        {t('apply.section_school', 'Previous Schooling')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">School:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.previous_school || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Previous Class:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.previous_class || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Reason for Leaving:</span>
                          <span className="font-semibold text-slate-800">
                            {formValues.leave_reason || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 rtl:space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-1 rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        {...register('confirm_accurate')}
                      />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                        {t(
                          'apply.confirm_checkbox',
                          'I confirm all information provided is accurate and verifiable.'
                        )}
                      </span>
                    </label>
                    {errors.confirm_accurate && (
                      <p className="text-xs text-red-600 mt-1.5 ml-7 rtl:mr-7">
                        {errors.confirm_accurate.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handlePrevStep}
                    leftIcon={<ArrowLeft className="h-4 w-4 rtl:rotate-180" />}
                  >
                    {t('apply.btn_back', 'Back')}
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    rightIcon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
                  >
                    {t('apply.btn_next', 'Next Step')}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    loading={isSubmitting}
                    rightIcon={<CheckCircle2 className="h-4 w-4" />}
                  >
                    {t('apply.btn_submit', 'Submit Application')}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
