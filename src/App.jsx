import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import routes from './Routes';
import AstroSpinner from './components/Commond/Loading';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<AstroSpinner/>}>
        {element}
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;