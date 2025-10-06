import { useState, useCallback } from "react";
import { Horizons } from "../Services";

export function useHORIZONs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHORIZONS = useCallback(async (id) => {
    if (!id) {
      setError("Se requiere un ID de asteroide");
      setData(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await Horizons(id);

      if (!response?.data) {
        setData(null);
        setError("Asteroide no encontrado");
        return null;
      } else {
        setData(response.data);
        return response.data;
      }
    } catch (err) {
      const errorMsg = err.message || "Error inesperado";
      setError(errorMsg);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("HORIZONS Hook Data:", data);
  return { data, loading, error, fetchHORIZONS };
}