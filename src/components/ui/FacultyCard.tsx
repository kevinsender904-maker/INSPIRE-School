import React from 'react';
import { Faculty } from '@/types';
import { useTranslation } from '@/i18n';
import { User } from 'lucide-react';

export interface FacultyCardProps {
  member: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ member }) => {
  const { t } = useTranslation();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-[#1E3A8A] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
      {/* Circle Photo Placeholder */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full bg-blue-900/10 border-2 border-blue-900/20 flex items-center justify-center text-[#1E3A8A] group-hover:scale-105 group-hover:bg-blue-900/15 transition-transform duration-200">
          {member.photo_url ? (
            <img
              src={member.photo_url}
              alt={member.full_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 stroke-[1.5]" />
          )}
        </div>
      </div>

      {/* Name & Designation */}
      <h3 className="font-heading font-bold text-lg text-[#1E3A8A] group-hover:text-[#3B82F6] transition-colors leading-snug">
        {member.full_name}
      </h3>
      <p className="text-sm font-semibold text-slate-500 mt-1">{member.designation}</p>

      {/* Qualification */}
      <p className="text-xs text-slate-600 mt-1 font-medium">{member.qualification}</p>

      {/* Bio snippet if available */}
      {member.bio && (
        <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
          {member.bio}
        </p>
      )}

      {/* Experience Badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 w-full flex justify-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#14B8A6]/15 text-[#0D9488]">
          {member.experience_years} {t('faculty.years_exp')}
        </span>
      </div>
    </div>
  );
};
