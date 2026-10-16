import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n';
import { ToastProvider } from '@/components/ui/Toast';
import { publicRoutes } from '@/routes/publicRoutes';
import { adminRoutes } from '@/routes/adminRoutes';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([...publicRoutes, ...adminRoutes]);
  return routes;
};

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
}
