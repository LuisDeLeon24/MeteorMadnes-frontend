// utils/impactEstimation.js
export function estimateImpactAreaFromHORIZONS(horizonsData) {
  if (!horizonsData || !horizonsData.basicInfo) return null;

  const { radius } = horizonsData.basicInfo; // km
  if (!radius || radius <= 0) return null;

  const density = 3000; // kg/m3 promedio
  const velocity = 20000; // m/s promedio impacto

  const radiusM = radius * 1000; // convertir km -> m
  const mass = (4 / 3) * Math.PI * radiusM ** 3 * density; // kg
  const energy = 0.5 * mass * velocity ** 2; // Joules
  const energyMt = energy / 4.184e15; // Megatones TNT

  const craterDiameterKm = 0.07 * Math.pow(energy / 1e12, 1 / 3.4);
  const areaKm2 = Math.PI * Math.pow(craterDiameterKm / 2, 2);

  const impactDate = horizonsData.ephemeris?.[0]?.date || null;

  return {
    asteroidName: horizonsData.basicInfo.name || "Desconocido",
    impactDate,
    energyMt: Number(energyMt.toFixed(2)),
    craterDiameterKm: Number(craterDiameterKm.toFixed(2)),
    areaKm2: Number(areaKm2.toFixed(2))
  };
}
