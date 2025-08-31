import { useState, useEffect } from "react";

export function useHORIZONs() {
  const [data, setData] = useState(null);       // datos de la API
  const [loading, setLoading] = useState(true); // estado de carga
  const [error, setError] = useState(null);     // errores

  // URL original de JPL Horizons (ID de asteroide válido)
  const url = `http://localhost:3000/MeteorMadnes/fetch/horizons`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        // Horizons devuelve texto, no JSON
        const text = await response.text();
        setData(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

