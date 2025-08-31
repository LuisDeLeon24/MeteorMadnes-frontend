import { lazy } from 'react';

const LandingPage = lazy(() => import('../Pages/LandingPage'))

const routes = [
  { path: '/', element: <LandingPage/> },
  
 
];

export default routes;