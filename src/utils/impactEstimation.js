// utils/impactEstimation.js
export function estimateImpactAreaFromHORIZONS(horizonsData) {
  if (!horizonsData || !horizonsData.basicInfo) return null;

  const { radius, type, density: densityFromAPI, velocity: velocityFromAPI } = horizonsData.basicInfo; // km, tipo, opcional
  if (!radius || radius <= 0) return null;

  // Valores predeterminados según tipo de asteroide
  const density = densityFromAPI || (type === "metallic" ? 7800 : 3000); // kg/m³
  const velocity = velocityFromAPI || 20000; // m/s, promedio

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
