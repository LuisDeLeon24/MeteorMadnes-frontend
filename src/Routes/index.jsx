import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const EnhancedEarthScene = lazy(() => import('../components/Model3D/EarthScene'));
const MapPage = lazy(() => import('../Pages/MapPage'));

const routes = [
  { path: '/', element: <LandingPage/> },
  { path: '/earth', element: <EnhancedEarthScene /> },
  { path: '/map', element: <MapPage /> }
];

export default routes;