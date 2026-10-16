import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { UserRole } from '@/types';
import {
  LayoutDashboard,
  GraduationCap,
  Mail,
  Newspaper,
  Calendar,
  Image,
  Users,
  FileDown,
  Award,
  CreditCard,
  Settings,
  ShieldCheck,
  History,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    roles: ['super_admin', 'office_staff', 'content_editor', 'teacher'],
  },
  {
    title: 'Admissions',
    path: '/admin/admissions',
    icon: GraduationCap,
    roles: ['super_admin', 'office_staff'],
  },
  {
    title: 'Messages',
    path: '/admin/messages',
    icon: Mail,
    roles: ['super_admin', 'office_staff'],
  },
  {
    title: 'News & Notices',
    path: '/admin/news',
    icon: Newspaper,
    roles: ['super_admin', 'content_editor'],
  },
  {
    title: 'Events',
    path: '/admin/events',
    icon: Calendar,
    roles: ['super_admin', 'content_editor'],
  },
  {
    title: 'Gallery Albums',
    path: '/admin/gallery',
    icon: Image,
    roles: ['super_admin', 'content_editor'],
  },
  {
    title: 'Faculty & Staff',
    path: '/admin/faculty',
    icon: Users,
    roles: ['super_admin', 'content_editor'],
  },
  {
    title: 'Downloads',
    path: '/admin/downloads',
    icon: FileDown,
    roles: ['super_admin', 'office_staff', 'content_editor'],
  },
  {
    title: 'Exam Results',
    path: '/admin/results',
    icon: Award,
    roles: ['super_admin', 'office_staff', 'teacher'],
  },
  {
    title: 'Fee Structure',
    path: '/admin/fees',
    icon: CreditCard,
    roles: ['super_admin'],
  },
  {
    title: 'User Management',
    path: '/admin/users',
    icon: ShieldCheck,
    roles: ['super_admin'],
  },
  {
    title: 'Activity Log',
    path: '/admin/activity-log',
    icon: History,
    roles: ['super_admin'],
  },
  {
    title: 'Site Settings',
    path: '/admin/settings',
    icon: Settings,
    roles: ['super_admin'],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const currentUser = getCurrentUser();
  const userRole = currentUser?.role || 'super_admin';

  const accessibleItems = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    <aside
      className={`fixed md:sticky top-0 h-screen z-30 flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        {!collapsed ? (
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm shrink-0">
              I
            </div>
            <div className="flex flex-col truncate">
              <span className="font-heading font-bold text-sm text-white truncate">
                INSPIRE Admin
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Lahore Campus
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm">
            I
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {accessibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                } ${collapsed ? 'justify-center' : 'space-x-3'}`
              }
              title={collapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* User Info / Role Badge */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        {!collapsed ? (
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
              {currentUser?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">
                {currentUser?.full_name || 'Administrator'}
              </p>
              <p className="text-[10px] text-amber-400/90 font-mono capitalize">
                {userRole.replace('_', ' ')}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-8 h-8 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400"
            title={`${currentUser?.full_name} (${userRole})`}
          >
            {currentUser?.full_name?.charAt(0) || 'A'}
          </div>
        )}
      </div>
    </aside>
  );
};
