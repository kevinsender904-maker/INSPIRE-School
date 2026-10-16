import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, mockLogout } from '@/services/auth';
import { Badge } from '@/components/ui/Badge';
import { LogOut, ExternalLink, Menu } from 'lucide-react';

interface AdminTopBarProps {
  onMobileMenuToggle?: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    await mockLogout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & School Brand */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle admin navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-heading font-bold text-base text-[#1E3A8A]">
            INSPIRE School
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">• Staff Portal</span>
        </div>
      </div>

      {/* Right: Public link + User Details + Role Badge + Logout */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Link
          to="/"
          target="_blank"
          className="text-xs font-semibold text-slate-600 hover:text-[#1E3A8A] flex items-center gap-1.5 transition-colors hidden sm:flex"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View Public Site</span>
        </Link>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center space-x-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser?.full_name || 'Administrator'}
            </p>
            <p className="text-[10px] text-slate-500">{currentUser?.email || 'admin@inspireschool.pk'}</p>
          </div>

          <Badge variant="primary" size="sm" className="capitalize text-[10px] font-mono">
            {currentUser?.role?.replace('_', ' ') || 'admin'}
          </Badge>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
          title="Sign out of portal"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
