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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#141414",
            color: "#f4f4f4",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            boxShadow: "none",
            fontFamily: '"Geist", sans-serif',
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;