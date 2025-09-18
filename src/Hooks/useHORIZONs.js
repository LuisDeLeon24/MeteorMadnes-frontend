import { useState, useCallback } from "react";
import { Horizons } from "../Services"; // ajusta la ruta según tu estructura

export function useHORIZONs() {
  const [data, setData] = useState(null);       // datos de la API
  const [loading, setLoading] = useState(false); // estado de carga
  const [error, setError] = useState(null);     // errores

  // Función para traer datos del asteroide
  const fetchHORIZONS = useCallback(async (id) => {
    if (!id) {
      setError("Se requiere un ID de asteroide");
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await Horizons(id);

      if (!response?.data) {
        setData(null);
        setError("Asteroide no encontrado");
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);
  console.log("HORIZONS Hook Data:", data);
  return { data, loading, error, fetchHORIZONS };
}
