import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const EnhancedEarthScene = lazy(() => import('../components/Model3D/EarthScene'));
const MapPage = lazy(() => import('../Pages/MapPage'));
const QuizPage = lazy(() => import('../Pages/QuizPage'));
const PBadge = lazy(() => import('../ImagesViews/BadgeView'));

const routes = [
  { path: '/', element: <LandingPage/> },
  { path: '/earth', element: <EnhancedEarthScene /> },
  { path: '/map', element: <MapPage /> },
  { path: '/quiz', element: <QuizPage /> },
  { path: '/badge', element: <PBadge score={10} /> },
  
];

export default routes;