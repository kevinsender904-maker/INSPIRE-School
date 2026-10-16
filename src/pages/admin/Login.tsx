import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mockLogin } from '@/services/auth';
import { UserRole } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Lock, Mail, ShieldAlert, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['super_admin', 'office_staff', 'content_editor', 'teacher']),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@inspireschool.pk',
      password: 'password123',
      role: 'super_admin',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    try {
      await mockLogin(values.email, values.password, values.role as UserRole);
      success('Logged in successfully!');
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch {
      setAuthError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to School Website</span>
        </Link>

        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/50">
            I
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">
              INSPIRE School
            </h1>
            <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold">
              Staff & Administration Portal
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Sign In to Dashboard</h2>
          <p className="text-xs text-slate-500 mb-6">
            Enter your institutional credentials or choose a role to inspect permission scopes.
          </p>

          {authError && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center space-x-2.5 text-xs text-red-700 font-medium animate-in fade-in">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Role Switcher */}
            <div>
              <label
                htmlFor="role-select"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                [DEMO] Role override — removed at Stage C
              </label>
              <select
                id="role-select"
                {...register('role')}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-800 transition-colors focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="super_admin">Super Admin (Principal / Full Access)</option>
                <option value="office_staff">Office Staff (Admissions, Messages, Results)</option>
                <option value="content_editor">Content Editor (News, Events, Gallery, Faculty)</option>
                <option value="teacher">Teacher (Exam Results Only)</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={isSubmitting}
              className="mt-2 py-3"
            >
              Sign In to Portal
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              INSPIRE School Administrative Security System • Lahore, Pakistan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
