import { useState } from 'react';
import { formulasDemograficas, formulasFisicas } from '../Services/api';

export const useFormulas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async (payloadData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("📤 useFormulas refetch llamado con:", payloadData);

      // ✅ PAYLOAD CORRECTO para fórmulas FÍSICAS
      const payloadFisicas = {
        id: payloadData.id || payloadData.asteroidName, // ← ¡ESTE CAMPO SÍ EXISTE!
      };

      // ✅ PAYLOAD CORRECTO para fórmulas DEMOGRÁFICAS
      const payloadDemograficas = {
        country: payloadData.country,        // 'GT'
        areaAfectadaKm2: payloadData.areaAfectadaKm2, // 200
      };

      console.log("➡️ Payload Físicas:", payloadFisicas);
      console.log("➡️ Payload Demográficas:", payloadDemograficas);

      // Llamar a AMBAS APIs en paralelo
      const [fisicasResponse, demograficasResponse] = await Promise.all([
        formulasFisicas(payloadFisicas),
        formulasDemograficas(payloadDemograficas)
      ]);

      console.log("📥 Respuesta físicas:", fisicasResponse);
      console.log("📥 Respuesta demográficas:", demograficasResponse);

      // Verificar errores
      if (fisicasResponse?.error) {
        throw new Error(`Físicas: ${fisicasResponse.msg}`);
      }
      if (demograficasResponse?.error) {
        throw new Error(`Demográficas: ${demograficasResponse.msg}`);
      }

      // Combinar resultados
      const combinedData = {
        ...demograficasResponse.data,
        ...fisicasResponse.data
      };

      console.log("✅ Datos combinados:", combinedData);
      setData(combinedData);
      return combinedData;

    } catch (err) {
      console.error("💥 Error en useFormulas:", err);
      const errorMsg = err.message || 'Error desconocido';
      setError(errorMsg);
      throw new Error(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
