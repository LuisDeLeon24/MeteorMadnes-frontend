import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const EnhancedEarthScene = lazy(() => import('../components/Model3D/EarthScene'));
const MapPage = lazy(() => import('../Pages/MapPage'));
const QuizPage = lazy(() => import('../Pages/QuizPage'));
const HowItWorksPage = lazy(() => import('../Pages/HowItWorksPage'));
const FitViewer = lazy(() => import('../Pages/FitPage'));

const routes = [
  { path: '/', element: <LandingPage/> },
  { path: '/earth', element: <EnhancedEarthScene /> },
  { path: '/map', element: <MapPage /> },
  { path: '/quiz', element: <QuizPage /> },
  { path: '/how-it-works', element: <HowItWorksPage /> },
    { path: '/fits', element: <FitViewer/> },
];

export default routes;