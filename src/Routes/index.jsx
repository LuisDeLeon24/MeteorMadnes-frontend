import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const EnhancedEarthScene = lazy(() => import('../components/Model3D/EarthScene'));

const routes = [
  { path: '/', element: <LandingPage/> },
  { path: '/earth', element: <EnhancedEarthScene /> }
];

export default routes;