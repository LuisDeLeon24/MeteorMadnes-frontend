import { useState, useCallback } from "react";
import { Horizons } from "../Services";
import { withDemoFallback } from "../demo/fallback";
import { demoHorizons } from "../demo/demoData";

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
      const response = await withDemoFallback(
        (signal) => Horizons(id, { signal }),
        () => demoHorizons(id)
      );
      const payload = response?.data;

      if (!payload) {
        const demo = demoHorizons(id);
        setData(demo);
        setError(null);
        return demo;
      }

      setData(payload);
      setError(null);
      return payload;
    } catch {
      const demo = demoHorizons(id);
      setError(null);
      setData(demo);
      return demo;
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("HORIZONS Hook Data:", data);
  return { data, loading, error, fetchHORIZONS };
}