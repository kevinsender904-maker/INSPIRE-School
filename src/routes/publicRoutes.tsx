import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@/pages/public/PublicLayout';
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { Academics } from '@/pages/public/Academics';
import { Admissions } from '@/pages/public/Admissions';
import { Apply } from '@/pages/public/Apply';
import { Faculty } from '@/pages/public/Faculty';
import { Gallery } from '@/pages/public/Gallery';
import { AlbumDetail } from '@/pages/public/AlbumDetail';
import { News } from '@/pages/public/News';
import { NewsDetail } from '@/pages/public/NewsDetail';
import { Events } from '@/pages/public/Events';
import { Downloads } from '@/pages/public/Downloads';
import { Results } from '@/pages/public/Results';
import { Contact } from '@/pages/public/Contact';
import { NotFound } from '@/pages/public/NotFound';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'academics',
        element: <Academics />,
      },
      {
        path: 'admissions',
        element: <Admissions />,
      },
      {
        path: 'admissions/apply',
        element: <Apply />,
      },
      {
        path: 'faculty',
        element: <Faculty />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'gallery/:albumId',
        element: <AlbumDetail />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'news/:slug',
        element: <NewsDetail />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'downloads',
        element: <Downloads />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
