import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
// import Loading from './components/common/Loading'; // ❌ coméntalo por ahora
import routes from './Routes';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        {element}
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;