import { useState, useEffect } from "react";
import { Horizons } from "../Services"; // ajusta la ruta según tu estructura

export function useHORIZONs(id) {
  const [data, setData] = useState(null);       // datos de la API
  const [loading, setLoading] = useState(true); // estado de carga
  const [error, setError] = useState(null);     // errores

  useEffect(() => {
    if (!id) {
      setError("Se requiere un ID de asteroide");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await Horizons(id);

        if (response.error) {
          throw new Error(response.msg);
        }

        // Ahora esperamos JSON desde el back-end
        setData(response.data);

      } catch (err) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}
