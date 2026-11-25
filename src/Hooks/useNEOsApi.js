import { useState, useCallback, useEffect } from "react";
import { withDemoFallback } from "../demo/fallback";
import { demoNeo, demoNeoBrowse } from "../demo/demoData";

export function useNEOsApi() {
  const [neoList, setNeoList] = useState(null); // lista inicial
  const [selectedAsteroid, setSelectedAsteroid] = useState(null); // asteroide buscado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "zv9B9fcMmDXPnPO97hEdq4Y2mss7g8LgBBRKygPh";
  const baseUrl = "https://api.nasa.gov/neo/rest/v1";

  // 🔹 Cargar lista inicial
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await withDemoFallback(async (signal) => {
          const res = await fetch(`${baseUrl}/neo/browse?page=1&size=10&api_key=${apiKey}`, { signal });
          if (!res.ok) return { error: true };
          return { data: await res.json() };
        }, demoNeoBrowse);
        setNeoList(response.data);
        setError(null);
      } catch {
        setNeoList(demoNeoBrowse());
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Buscar asteroide por ID
  const searchNEO = useCallback(async (asteroidId) => {
    if (!asteroidId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await withDemoFallback(async (signal) => {
        const res = await fetch(`${baseUrl}/neo/${encodeURIComponent(asteroidId)}?api_key=${apiKey}`, { signal });
        if (!res.ok) return { error: true };
        return { data: await res.json() };
      }, () => demoNeo(asteroidId));
      setSelectedAsteroid(response.data);
      setError(null);
    } catch {
      setSelectedAsteroid(demoNeo(asteroidId));
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("NEOs Hook Data:", selectedAsteroid);

  return { data: selectedAsteroid, loading, error, searchNEO, neoList };
}
