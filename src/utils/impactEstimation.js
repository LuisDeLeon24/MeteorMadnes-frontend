export function estimateImpactAreaFromHORIZONS(horizonsData, paisSuperficieKm2 , velocityOverride ) {
  if (!horizonsData || !horizonsData.basicInfo) return null;

  const { radius, type, density: densityFromAPI } = horizonsData.basicInfo;
  if (!radius || radius <= 0) return null;

  // 🔹 Usar velocityOverride si viene, sino calcular desde ephemeris
  let velocityKmS = velocityOverride ?? 20; // valor por defecto
  if (!velocityOverride && horizonsData.ephemeris?.[0]) {
    const eph = horizonsData.ephemeris[0];
    if (eph.velocity) {
      velocityKmS = eph.velocity;
    } else if (eph.vx !== undefined && eph.vy !== undefined && eph.vz !== undefined) {
      velocityKmS = Math.sqrt(eph.vx ** 2 + eph.vy ** 2 + eph.vz ** 2);
    }
  }
  const velocityMS = velocityKmS * 1000; // m/s

  // 2️⃣ Masa del asteroide
  const density = densityFromAPI || (type === "metallic" ? 7800 : 3000); // kg/m³
  const radiusM = radius * 1000; // km -> m
  const mass = (4 / 3) * Math.PI * Math.pow(radiusM, 3) * density; // kg

  // 3️⃣ Energía de impacto
  const energy = 0.5 * mass * velocityMS ** 2; // Joules
  const energyMt = energy / 4.184e15; // Megatones TNT

  // 4️⃣ Determinar diámetro del cráter según tamaño
  const GRANDE_RADIUS_M = 500;
  let craterDiameterKm;
  if (radiusM > GRANDE_RADIUS_M) {
    craterDiameterKm = 0.02 * Math.pow(energy / 1e12, 1 / 3.0);
  } else {
    craterDiameterKm = 0.07 * Math.pow(energy / 1e12, 1 / 3.4);
  }

  // 5️⃣ Área del cráter (km²) y límite al país
  let areaKm2 = Math.PI * Math.pow(craterDiameterKm / 2, 2);
  areaKm2 = Math.min(areaKm2, paisSuperficieKm2);

  // 6️⃣ Fecha del impacto (si existe)
  const impactDate = horizonsData.ephemeris?.[0]?.date || null;

  console.log(`Estimación de impacto para ${horizonsData.basicInfo.name || "Desconocido"}:`);
  console.log(`- Velocidad: ${velocityKmS.toFixed(2)} km/s`);
  console.log(`- Energía: ${energyMt.toFixed(2)} Mt`);
  console.log(`- Diámetro del cráter: ${craterDiameterKm.toFixed(2)} km`);
  console.log(`- Área afectada: ${areaKm2.toFixed(2)} km²`);

  return {
    asteroidName: horizonsData.basicInfo.name || "Unknown",
    impactDate,
    velocityKmS: Number(velocityKmS.toFixed(2)),
    velocityMS: Number(velocityMS.toFixed(2)),
    energyMt: Number(energyMt.toFixed(2)),
    craterDiameterKm: Number(craterDiameterKm.toFixed(2)),
    areaKm2: Number(areaKm2.toFixed(2))
  };
}
