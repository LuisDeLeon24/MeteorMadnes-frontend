import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const EnhancedEarthScene = lazy(() => import('../components/Model3D/EarthScene'));
const MapPage = lazy(() => import('../Pages/MapPage'));
const QuizPage = lazy(() => import('../Pages/QuizPage'));
const MitigationsPage = lazy(() => import('../Pages/Mitigaciones'));
const FitViewer = lazy(() => import('../Pages/FitPage'));

const routes = [
  { path: '/', element: <LandingPage/> },
  { path: '/earth', element: <EnhancedEarthScene /> },
  { path: '/map', element: <MapPage /> },
  { path: '/quiz', element: <QuizPage /> },
  { path: '/mitigations', element: <MitigationsPage /> },
    { path: '/fits', element: <FitViewer/> },
];

export default routes;