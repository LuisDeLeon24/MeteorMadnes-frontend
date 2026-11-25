import { useState } from 'react';
import { formulasDemograficas, formulasFisicas } from '../Services/api';
import { withDemoFallback } from '../demo/fallback';
import { demoDemographic, demoPhysical } from '../demo/demoData';

const withoutDemoFlag = (value) => {
  if (!value || typeof value !== 'object') return {};
  const rest = { ...value };
  delete rest.demo;
  return rest;
};

export const useFormulas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async (payloadData) => {
    setLoading(true);
    setError(null);

    try {
      const payloadFisicas = {
        id: payloadData.id || payloadData.asteroidName,
      };

      const payloadDemograficas = {
        country: payloadData.country,
        areaAfectadaKm2: payloadData.areaAfectadaKm2,
      };

      const hasCountry = Boolean(payloadDemograficas.country) && payloadDemograficas.areaAfectadaKm2 != null;

      const [fisicasResponse, demograficasResponse] = await Promise.all([
        withDemoFallback(
          (signal) => formulasFisicas(payloadFisicas, { signal }),
          () => demoPhysical(payloadFisicas.id)
        ),
        hasCountry
          ? withDemoFallback(
              (signal) => formulasDemograficas(payloadDemograficas, { signal }),
              () => demoDemographic(payloadDemograficas)
            )
          : Promise.resolve(null),
      ]);

      const physicalSource = fisicasResponse?.demo
        ? fisicasResponse.data
        : fisicasResponse?.data || demoPhysical(payloadFisicas.id);
      const physicalIsDemo = Boolean(fisicasResponse?.demo || !fisicasResponse?.data);

      const demographicSource = !hasCountry
        ? {}
        : demograficasResponse?.demo
          ? demograficasResponse.data
          : demograficasResponse?.data || demoDemographic(payloadDemograficas);
      const demographicIsDemo = hasCountry && Boolean(demograficasResponse?.demo || !demograficasResponse?.data);

      const combinedData = {
        ...withoutDemoFlag(demographicSource),
        ...withoutDemoFlag(physicalSource),
        demo: physicalIsDemo || demographicIsDemo,
      };

      setData(combinedData);
      setError(null);
      return combinedData;

    } catch (err) {
      console.error("Error en useFormulas:", err);
      const combinedData = {
        ...withoutDemoFlag(demoDemographic(payloadData)),
        ...withoutDemoFlag(demoPhysical(payloadData.id || payloadData.asteroidName)),
        demo: true,
      };
      setData(combinedData);
      setError(null);
      return combinedData;

    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
