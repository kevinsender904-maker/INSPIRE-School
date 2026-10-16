import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminTopBar } from '@/components/layout/AdminTopBar';
import { LayoutDashboard, GraduationCap, Mail, Newspaper, Calendar } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="flex flex-1">
        {/* Desktop / Tablet Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </div>

        {/* Mobile Slide-over Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-64 h-full bg-slate-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
          <AdminTopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around py-2 px-2 shadow-lg">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded-lg ${
              isActive ? 'text-[#1E3A8A]' : 'text-slate-500'
            }`
          }
        >
          <LayoutDashboard className="h-4 w-4 mb-0.5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/admissions"
          className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded-lg ${
              isActive ? 'text-[#1E3A8A]' : 'text-slate-500'
            }`
          }
        >
          <GraduationCap className="h-4 w-4 mb-0.5" />
          <span>Admissions</span>
        </NavLink>
        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded-lg ${
              isActive ? 'text-[#1E3A8A]' : 'text-slate-500'
            }`
          }
        >
          <Mail className="h-4 w-4 mb-0.5" />
          <span>Messages</span>
        </NavLink>
        <NavLink
          to="/admin/news"
          className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded-lg ${
              isActive ? 'text-[#1E3A8A]' : 'text-slate-500'
            }`
          }
        >
          <Newspaper className="h-4 w-4 mb-0.5" />
          <span>News</span>
        </NavLink>
        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded-lg ${
              isActive ? 'text-[#1E3A8A]' : 'text-slate-500'
            }`
          }
        >
          <Calendar className="h-4 w-4 mb-0.5" />
          <span>Events</span>
        </NavLink>
      </nav>
    </div>
  );
};
