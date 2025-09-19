import { useState, useCallback, useEffect } from "react";

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
        const response = await fetch(`${baseUrl}/neo/browse?page=1&size=10&api_key=${apiKey}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        setNeoList(json);
      } catch (err) {
        setError(err.message);
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
      const response = await fetch(`${baseUrl}/neo/${asteroidId}?api_key=${apiKey}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const json = await response.json();
      setSelectedAsteroid(json); // ✅ actualizar solo el asteroide seleccionado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("NEOs Hook Data:", selectedAsteroid);

  return { data: selectedAsteroid, loading, error, searchNEO, neoList };
}
