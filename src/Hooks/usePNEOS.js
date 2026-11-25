import { useState, useCallback } from "react";
import { searchPneos, randomPneos } from "../Services";
import { withDemoFallback } from "../demo/fallback";
import { demoPneo, demoPneoList } from "../demo/demoData";

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
      const response = await withDemoFallback(
        (signal) => searchPneos(id, { signal }),
        () => demoPneo(id)
      );
      if (response?.demo) {
        setData(response.data);
        setError(null);
        return response.data;
      }
      setData(response.data);
      return response.data;
    } catch {
      const demo = demoPneo(id);
      setData(demo);
      setError(null);
      return demo;
    } finally {
      setLoading(false);
    }
  }, []);

  // Traer NEOs aleatorios
  const fetchRandomPneos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await withDemoFallback(
        (signal) => randomPneos({ signal }),
        demoPneoList
      );
      const list = Array.isArray(response?.data) ? response.data : demoPneoList();
      if (!Array.isArray(response?.data)) list.demo = true;
      if (response?.demo) {
        response.data.demo = true;
      }
      setData(list);
      setError(null);
      return list;
    } catch {
      const list = demoPneoList();
      setData(list);
      setError(null);
      return list;
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
