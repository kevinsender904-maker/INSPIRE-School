import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { Login } from '@/pages/admin/Login';
import { Dashboard } from '@/pages/admin/Dashboard';
import { AdminAdmissions } from '@/pages/admin/Admissions';
import { AdminMessages } from '@/pages/admin/Messages';
import { AdminNews } from '@/pages/admin/News';
import { AdminEvents } from '@/pages/admin/Events';
import { AdminGallery } from '@/pages/admin/Gallery';
import { AdminFaculty } from '@/pages/admin/Faculty';
import { AdminDownloads } from '@/pages/admin/Downloads';
import { AdminResults } from '@/pages/admin/Results';
import { AdminFees } from '@/pages/admin/Fees';
import { AdminSettings } from '@/pages/admin/Settings';
import { AdminUsers } from '@/pages/admin/Users';
import { AdminActivityLog } from '@/pages/admin/ActivityLog';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'admissions',
        element: <AdminAdmissions />,
      },
      {
        path: 'messages',
        element: <AdminMessages />,
      },
      {
        path: 'news',
        element: <AdminNews />,
      },
      {
        path: 'events',
        element: <AdminEvents />,
      },
      {
        path: 'gallery',
        element: <AdminGallery />,
      },
      {
        path: 'faculty',
        element: <AdminFaculty />,
      },
      {
        path: 'downloads',
        element: <AdminDownloads />,
      },
      {
        path: 'results',
        element: <AdminResults />,
      },
      {
        path: 'fees',
        element: <AdminFees />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'activity-log',
        element: <AdminActivityLog />,
      },
    ],
  },
];
