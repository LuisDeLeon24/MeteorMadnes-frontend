// Fixed stand-ins for a demo when NASA, JPL Horizons, the MeteorMadnes
// backend, World Bank, Nominatim, or OpenRouter do not answer.
// Physical and country figures below are computed with the same equations
// as MeteorMadnes-backend. They are not live measurements.

const V_ESCAPE_KM_S = 11.2;
const DENSITY_KG_M3 = 3000;

// Radius and a stand-in range-rate (deldot) are inputs. The backend reads
// deldot from a Horizons ephemeris and treats it as km/s.
const ASTEROIDS = [
  {
    keys: ["99942", "apophis"],
    name: "99942 Apophis",
    radiusKm: 0.185,
    deldot: 5.8,
    spectralType: "Sq",
    H: 19.7,
    G: 0.15,
    albedo: 0.23,
    rotation: 30.56,
    hazardous: true,
  },
  {
    keys: ["101955", "bennu"],
    name: "101955 Bennu",
    radiusKm: 0.245,
    deldot: 6.1,
    spectralType: "B",
    H: 20.9,
    G: 0.15,
    albedo: 0.044,
    rotation: 4.3,
    hazardous: true,
  },
  {
    keys: ["65803", "didymos"],
    name: "65803 Didymos",
    radiusKm: 0.39,
    deldot: 7.2,
    spectralType: "S",
    H: 18.16,
    G: 0.15,
    albedo: 0.15,
    rotation: 2.26,
    hazardous: false,
  },
];

// Rounded public-order figures used only as World Bank stand-ins.
const COUNTRIES = {
  GT: { density: 167, beds: 0.6, population: 17600000, gdp: 95000000000, urban: 9200000, gdpPerCapita: 5400 },
  MX: { density: 66, beds: 1.0, population: 128900000, gdp: 1410000000000, urban: 104000000, gdpPerCapita: 10900 },
  US: { density: 36, beds: 2.8, population: 333000000, gdp: 25400000000000, urban: 276000000, gdpPerCapita: 76300 },
  BR: { density: 25, beds: 2.1, population: 215000000, gdp: 1920000000000, urban: 187000000, gdpPerCapita: 8900 },
  JP: { density: 338, beds: 12.8, population: 125000000, gdp: 4400000000000, urban: 115000000, gdpPerCapita: 34000 },
  IN: { density: 470, beds: 0.5, population: 1417000000, gdp: 3350000000000, urban: 508000000, gdpPerCapita: 2400 },
  FR: { density: 123, beds: 5.8, population: 68000000, gdp: 2780000000000, urban: 55000000, gdpPerCapita: 40900 },
  DE: { density: 237, beds: 7.9, population: 84000000, gdp: 4070000000000, urban: 65000000, gdpPerCapita: 48700 },
};

const BOXES = [
  { code: "GT", south: 13.7, north: 17.8, west: -92.3, east: -88.2 },
  { code: "MX", south: 14.5, north: 32.7, west: -118.4, east: -86.7 },
  { code: "US", south: 24.5, north: 49.4, west: -125, east: -66.9 },
  { code: "BR", south: -33.8, north: 5.3, west: -74, east: -34.7 },
  { code: "JP", south: 24, north: 45.6, west: 122.9, east: 153.9 },
  { code: "IN", south: 6.5, north: 35.5, west: 68.1, east: 97.4 },
  { code: "FR", south: 41.3, north: 51.1, west: -5.2, east: 9.6 },
  { code: "DE", south: 47.2, north: 55.1, west: 5.8, east: 15.0 },
];

export const demoPlaces = [
  { place_id: "demo-gt", display_name: "Guatemala City, Guatemala", lat: "14.6349", lon: "-90.5069", country: "GT" },
  { place_id: "demo-mx", display_name: "Mexico City, Mexico", lat: "19.4326", lon: "-99.1332", country: "MX" },
  { place_id: "demo-us", display_name: "Houston, United States", lat: "29.7604", lon: "-95.3698", country: "US" },
  { place_id: "demo-br", display_name: "São Paulo, Brazil", lat: "-23.5558", lon: "-46.6396", country: "BR" },
  { place_id: "demo-jp", display_name: "Tokyo, Japan", lat: "35.6762", lon: "139.6503", country: "JP" },
  { place_id: "demo-in", display_name: "New Delhi, India", lat: "28.6139", lon: "77.2090", country: "IN" },
  { place_id: "demo-fr", display_name: "Paris, France", lat: "48.8566", lon: "2.3522", country: "FR" },
  { place_id: "demo-de", display_name: "Berlin, Germany", lat: "52.5200", lon: "13.4050", country: "DE" },
];

export function findAsteroid(query) {
  const q = String(query || "").trim().toLowerCase();
  return (
    ASTEROIDS.find((asteroid) => asteroid.keys.some((key) => key === q)) || {
      keys: [q || "demo"],
      name: String(query || "Demo asteroid"),
      radiusKm: 0.2,
      deldot: 5.5,
      spectralType: "S",
      H: 20,
      G: 0.15,
      albedo: 0.14,
      rotation: 5,
      hazardous: false,
    }
  );
}

export function demoCountryCode(lat, lon) {
  const match = BOXES.find(
    (box) => lat >= box.south && lat <= box.north && lon >= box.west && lon <= box.east
  );
  return match ? match.code : "GT";
}

export function filterDemoPlaces(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  return demoPlaces.filter((place) => place.display_name.toLowerCase().includes(q));
}

function physicalBody(asteroid, id) {
  const radiusM = asteroid.radiusKm * 1000;
  const volume = (4 / 3) * Math.PI * Math.pow(radiusM, 3);
  const massKg = volume * DENSITY_KG_M3;
  const areaTransversal = Math.PI * Math.pow(radiusM, 2);
  const velocityKmS = Math.sqrt(asteroid.deldot ** 2 + V_ESCAPE_KM_S ** 2);
  const velocityMS = velocityKmS * 1000;
  const energiaCinetica = 0.5 * massKg * velocityMS ** 2;
  const perdidaMasa = massKg * 0.01;
  const densidadAire = 0.001225;
  return {
    id: id || asteroid.keys[0],
    name: asteroid.name,
    massKg,
    radiusM,
    velRel: asteroid.deldot,
    vEscape: V_ESCAPE_KM_S,
    velocityKmS,
    velocityMS,
    areaTransversal,
    energiaCinetica,
    energiaLiberada: energiaCinetica / 4.184e15,
    luminosidad: 0.5 * 0.1 * perdidaMasa * velocityMS ** 2,
    fuerzaArrastre: 0.5 * 1.3 * densidadAire * velocityMS ** 2 * areaTransversal,
    presionDinamica: 0.5 * densidadAire * velocityMS ** 2,
  };
}

export function demoPhysical(id) {
  return { ...physicalBody(findAsteroid(id), id), demo: true };
}

export function demoHorizons(id) {
  const asteroid = findAsteroid(id);
  return {
    demo: true,
    basicInfo: {
      name: asteroid.name,
      radius: asteroid.radiusKm,
      rotation: asteroid.rotation,
      H: asteroid.H,
      G: asteroid.G,
      BV: "0.80",
      albedo: asteroid.albedo,
      spectralType: asteroid.spectralType,
    },
    orbitalElements: {},
    nonGravitationalForces: {},
    nonStandardModel: {},
    ephemeris: [
      {
        date: "2026-Nov-25",
        time: "00:00",
        RA: "12 10 00.0",
        DEC: "-04 20 00",
        delta: 0.18,
        deldot: asteroid.deldot,
        solarElongation: 110,
        STO: 22,
      },
    ],
  };
}

export function demoDemographic({ country, areaAfectadaKm2 }) {
  const code = String(country || "GT").toUpperCase();
  const stats = COUNTRIES[code] || COUNTRIES.GT;
  const area = Number(areaAfectadaKm2) || 0;
  const nafHab = stats.density * area;
  const factorLetalidad = Math.min(0.05 * (10 / stats.beds), 0.3);
  const beta = Math.min(0.2 * (10 / stats.beds), 0.25);
  const muertesDirectas = nafHab * factorLetalidad;
  const muertesIndirectas = nafHab * beta;
  const muertesTotales = muertesDirectas + muertesIndirectas;
  const valorUrbanoUsdKm2 = (stats.gdpPerCapita * stats.urban) / (stats.urban / 1000);
  return {
    demo: true,
    country: code,
    densidadHabKm2: stats.density,
    nafHab,
    camasPorMil: stats.beds,
    factorLetalidad,
    muertesDirectas,
    beta,
    muertesIndirectas,
    poblacionTotal: stats.population,
    GDPtotal: stats.gdp,
    perdidaPIBTotal: stats.gdp * Math.min(nafHab / stats.population, 1),
    poblacionUrbana: stats.urban,
    pibPerCapita: stats.gdpPerCapita,
    valorUrbanoUsdKm2,
    perdidasEconomicasTotal: 0.3 * area * valorUrbanoUsdKm2,
    muertesTotales,
    sPorcentaje: (muertesTotales / stats.population) * 100,
  };
}

function neoRecord(asteroid) {
  const id = asteroid.keys[0];
  const min = asteroid.radiusKm * 2 * 0.9;
  const max = asteroid.radiusKm * 2 * 1.1;
  return {
    demo: true,
    id,
    name: asteroid.name,
    designation: id,
    absolute_magnitude_h: asteroid.H,
    is_potentially_hazardous_asteroid: asteroid.hazardous,
    nasa_jpl_url: `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${id}`,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: min,
        estimated_diameter_max: max,
      },
    },
    orbital_data: {
      orbit_id: "demo",
      orbit_determination_date: "2024-01-01",
      first_observation_date: "2004-06-19",
      last_observation_date: "2024-12-01",
      observations_used: 1000,
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Apollo-class near-Earth orbit (demo record)",
      },
    },
  };
}

export function demoNeo(id) {
  return neoRecord(findAsteroid(id));
}

export function demoNeoBrowse() {
  return {
    demo: true,
    near_earth_objects: ASTEROIDS.map(neoRecord),
  };
}

const PNEOS = [
  { tempDesig: "C34B21", score: 92, vMagnitude: 19.4, hMagnitude: 21.1, nObs: 8, arc: 2.4, notSeenDays: 1 },
  { tempDesig: "A12K07", score: 74, vMagnitude: 20.8, hMagnitude: 22.4, nObs: 5, arc: 1.1, notSeenDays: 3 },
  { tempDesig: "P09M44", score: 61, vMagnitude: 21.2, hMagnitude: 23.0, nObs: 4, arc: 0.8, notSeenDays: 2 },
  { tempDesig: "Z18Q03", score: 48, vMagnitude: 21.9, hMagnitude: 24.2, nObs: 3, arc: 0.4, notSeenDays: 6 },
  { tempDesig: "M02T15", score: 33, vMagnitude: 22.4, hMagnitude: 25.0, nObs: 2, arc: 0.2, notSeenDays: 9 },
];

function pneoRecord(seed, index) {
  const base = PNEOS[index % PNEOS.length];
  return {
    demo: true,
    _id: `demo-${base.tempDesig}`,
    tempDesig: seed || base.tempDesig,
    score: base.score,
    vMagnitude: base.vMagnitude,
    hMagnitude: base.hMagnitude,
    nObs: base.nObs,
    arc: base.arc,
    notSeenDays: base.notSeenDays,
    updated: "2026-11-01",
    discoveryDate: { year: 2026, month: 10, day: 12 + index },
    position: { ra: 120 + index, dec: -8 - index },
    status: "demo",
    source: "demo",
  };
}

export function demoPneo(tempDesig) {
  return pneoRecord(String(tempDesig || "C34B21"), 0);
}

export function demoPneoList() {
  return PNEOS.map((row, index) => pneoRecord(row.tempDesig, index));
}

export function demoAssistantReply() {
  return "Demo reply. The assistant service did not answer, so this text is stored in the app. Impact figures come from a Horizons ephemeris, the backend physical calculation, and a country summary that applies World Bank indicators to the crater area estimated in the browser.";
}
