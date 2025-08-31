import { useState, useEffect } from "react";

export function useNEOsApi() {
  const [data, setData] = useState(null);      // datos de la API
  const [loading, setLoading] = useState(true); // estado de carga
  const [error, setError] = useState(null);     // errores

  const apiKey = "zv9B9fcMmDXPnPO97hEdq4Y2mss7g8LgBBRKygPh"; 
  const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=100&api_key=${apiKey}`;


  useEffect(() => {
    const fetchData = async () => {
        console.log("Api Key:", apiKey); // ✅ Verifica que la API key se está leyendo correctamente
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // se ejecuta cada vez que cambia la URL

  return { data, loading, error };
}