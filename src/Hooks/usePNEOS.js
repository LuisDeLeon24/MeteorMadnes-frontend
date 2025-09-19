import { useState, useCallback } from "react";
import { searchPneos, randomPneos } from "../Services"; // Asegúrate de que la ruta sea correcta

export const usePNeos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Buscar PNEO por tempDesig
  const fetchPneo = useCallback(async (id) => {
    if (!id) {
      setError("Se requiere un ID del PNEO");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchPneos(id);
      setData(response.data);
      return response.data; // <-- DEVOLVEMOS los datos para que el componente los use
    } catch (err) {
      setError(err.msg || "Error fetching PNEO");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Traer NEOs aleatorios
  const fetchRandomPneos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await randomPneos();
      setData(response.data);
      return response.data; // <-- DEVOLVEMOS los datos para que el componente los use
    } catch (err) {
      setError(err.msg || "Error fetching random PNEOs");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    data,
    error,
    fetchPneo,
    fetchRandomPneos
  };
};
