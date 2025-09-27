import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  useColorModeValue,
  Image,
  SimpleGrid,
  IconButton,
  InputGroup,
  InputLeftElement,
  Tooltip
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AsteroidInfoNASANEOS } from "./NASA_NEOs";
import { HORIZONS } from "./HORIZONS";
import { PNeoInfo } from "./IAU_PNEOS";
import { RandomPNeosList } from "./RandomPNEO";
import { useFormulas, useHORIZONs } from "../../Hooks";
import { estimateImpactAreaFromHORIZONS } from "../../utils/impactEstimation";

// Subcomponentes SIN HOOKS
const SearchBar = ({ search, setSearch }) => (
  <InputGroup size="sm" mb={3}>
    <InputLeftElement>
      <Tooltip
        label="Ingresa el nombre o ID del asteroide y selecciona un lugar en el mapa para iniciar la simulación."
        placement="top"
        hasArrow
        openDelay={200}
        isInteractive
        bg="black"
        color="white"
        portalProps={{ appendToParentPortal: true }}
      >
        <IconButton
          aria-label="Ayuda"
          icon={<QuestionIcon />}
          size="xs"
          variant="ghost"
        />
      </Tooltip>
    </InputLeftElement>

    <Input
      placeholder="Nombre o ID del asteroide"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      bg="gray.100"
      _placeholder={{ color: "gray.500" }}
      pl={10}
      _dark={{
        bg: "gray.700",
        _placeholder: { color: "gray.300" }
      }}
    />
  </InputGroup>
);

const ButtonsPanel = ({ selected, setSelected }) => {
  const logos = [
    { id: "agency1", src: "src/assets/images/NASA_logo.png", alt: "NASA" },
    { id: "agency2", src: "src/assets/images/NASA_JPL_logo.png", alt: "NASA JPL" },
    { id: "agency5", src: "src/assets/images/IAU_logo.png", alt: "IAU" },
  ];

  return (
    <SimpleGrid columns={3} spacing={10} mb={3}>
      {logos.map((logo) => (
        <Button
          key={logo.id}
          onClick={() => setSelected(logo.id)}
          p={10}
          variant={selected === logo.id ? "solid" : "ghost"}
          colorScheme={selected === logo.id ? "teal" : "gray"}
        >
          <Image src={logo.src} alt={logo.alt} boxSize="100px" objectFit="contain" />
        </Button>
      ))}
    </SimpleGrid>
  );
};

const DefaultInfo = () => (
  <Box>
    <Text fontWeight="bold" mb={2}>Fuentes de datos disponibles</Text>
    <Text mb={2}>
      Actualmente puedes consultar información de asteroides y cuerpos menores desde varias fuentes:
    </Text>
    <Text mb={1}>• <b>NASA NEOS API:</b> Información general de Near Earth Objects, órbitas, magnitudes y riesgo de impacto.</Text>
    <Text mb={1}>• <b>NASA JPL HORIZONS API:</b> Datos precisos de posiciones, trayectorias y efemérides de asteroides y cometas.</Text>
    <Text mb={1}>• <b>IAU Minor Planet Center:</b> Listas de asteroides pendientes de confirmación y designaciones temporales.</Text>
    <Text mb={1}>• Próximamente agregaremos más fuentes</Text>
    <Text mt={2} color="gray.500">
      Selecciona una fuente arriba para consultar información específica de un asteroide.
    </Text>
  </Box>
);

const ContentPanel = ({ selected, search }) => {
  switch (selected) {
    case "agency1":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>NASA NEOS API</Text>
          {search ? <AsteroidInfoNASANEOS asteroidId={search} /> : <Text color="gray.500">Ingrese un nombre o ID para buscar</Text>}
        </Box>
      );
    case "agency2":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>NASA JPL HORIZONS API</Text>
          {search ? <HORIZONS asteroidId={search} /> : <Text color="gray.500">Ingrese un nombre o ID para buscar</Text>}
        </Box>
      );
    case "agency5":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>IAU Minor Planet Center NeoCP</Text>
          {search ? <PNeoInfo tempDesig={search} /> : <RandomPNeosList />}
        </Box>
      );
    default:
      return <DefaultInfo />;
  }
};

const Sidebar = ({ countryCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [impactData, setImpactData] = useState(null);

  const { data: horizonsData, loading: horizonsLoading, error: horizonsError, fetchHORIZONS } = useHORIZONs();
  const { data: formulasData, loading, error, refetch } = useFormulas();

  // ✅ TODOS los hooks AL PRINCIPIO
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");
  const debugBg = useColorModeValue("blue.50", "blue.900");
  const resultBg = useColorModeValue("green.100", "green.900");

  const handleStartSimulation = async () => {
    console.log("🚀 Iniciando simulación...");
    setImpactData(null);

    if (!countryCode) { alert("Selecciona una ubicación"); return; }
    if (!search) { alert("Ingresa un asteroide"); return; }

    try {
      const freshData = await fetchHORIZONS(search);
      const dataToUse = freshData || horizonsData;

      if (!dataToUse) {
        alert("No se pudo obtener información del asteroide");
        return;
      }

      const impactEstimation = estimateImpactAreaFromHORIZONS(dataToUse);
      if (!impactEstimation?.areaKm2) {
        alert("No se pudo calcular el área de impacto");
        return;
      }

      const payloadData = {
        country: "GT",
        areaAfectadaKm2: 200,
        id: "99942",
      };

      const simulationResponse = await refetch(payloadData);
      const resultData = simulationResponse?.data ?? simulationResponse;

      setImpactData({ ...resultData, ...impactEstimation, countryCode });

    } catch (err) {
      console.error(err);
      alert("Error en la simulación");
    }
  };

  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      height="100%"
      w={isOpen ? "33%" : "40px"}
      bg={bg}
      borderLeft="1px solid"
      borderColor={border}
      boxShadow="md"
      transition="width 0.3s"
      overflow="hidden"
      zIndex={1000}
      p={isOpen ? 4 : 1}
      display="flex"
      flexDirection="column"
    >
      <Button size="sm" onClick={() => setIsOpen(!isOpen)} mb={4}>
        {isOpen ? "→" : "←"}
      </Button>

      {isOpen && (
        <Box flex="1" overflowY="auto" pr={2}>
          <SearchBar search={search} setSearch={setSearch} />

          <Box mb={3} p={2} bg={debugBg} borderRadius="md" fontSize="sm">
            <Text><strong>Estado actual:</strong></Text>
            <Text>País: {countryCode || "No seleccionado"}</Text>
            <Text>Asteroide: {search || "No ingresado"}</Text>
            <Text>Hook HORIZONS: {horizonsData ? "Datos disponibles" : "Sin datos"}</Text>
            <Text>Hook Fórmulas: {formulasData ? "Datos disponibles" : "Sin datos"}</Text>
            {horizonsData?.basicInfo && (
              <Text>Último asteroide: {horizonsData.basicInfo.name}</Text>
            )}
          </Box>

          <Button
            colorScheme="teal"
            size="sm"
            mb={4}
            py={6}
            width="100%"
            onClick={handleStartSimulation}
            isLoading={loading}
            loadingText="Procesando simulación..."
            isDisabled={!countryCode || !search}
          >
            {!countryCode ? "Selecciona ubicación" : 
             !search ? "Ingresa asteroide" : 
             "🚀 Iniciar Simulación"}
          </Button>

          {error && (
            <Box mt={2} p={3} bg="red.100" color="red.800" borderRadius="md" fontSize="sm">
              <Text fontWeight="bold">Error:</Text>
              <Text>{error}</Text>
            </Box>
          )}
{impactData && (
  <Box mt={4} p={3} bg={resultBg} borderRadius="md">
    <Text fontWeight="bold" color="green.800" fontSize="lg" mb={3}>
      📊 Resultados de Simulación Completa
    </Text>
    
    {/* Información del Asteroide */}
    <Box mb={3} p={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md">
      <Text fontWeight="bold" color="blue.700">☄️ Información del Asteroide</Text>
      <Text fontSize="sm"><strong>Nombre:</strong> {impactData.name || "N/A"}</Text>
      <Text fontSize="sm"><strong>ID:</strong> {impactData.id || "N/A"}</Text>
      <Text fontSize="sm"><strong>Masa:</strong> {impactData.massKg ? `${(impactData.massKg / 1000).toLocaleString()} toneladas` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Radio:</strong> {impactData.radiusM ? `${impactData.radiusM} m` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Velocidad:</strong> {impactData.velocityKmS ? `${Math.abs(impactData.velocityKmS).toLocaleString()} km/s` : "N/A"}</Text>
    </Box>

    {/* Impacto Físico */}
    <Box mb={3} p={2} bg={useColorModeValue("blue.50", "blue.900")} borderRadius="md">
      <Text fontWeight="bold" color="blue.700">💥 Impacto Físico</Text>
      <Text fontSize="sm"><strong>Energía de impacto:</strong> {impactData.energyMt ? `${impactData.energyMt.toLocaleString()} MT` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Área transversal:</strong> {impactData.areaTransversal ? `${impactData.areaTransversal.toLocaleString()} m²` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Energía cinética:</strong> {impactData.energiaCinetica ? `${(impactData.energiaCinetica / 1e15).toLocaleString()} PJ` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Altura fragmentación:</strong> {impactData.alturaFragmentacion ? `${impactData.alturaFragmentacion.toFixed(2)} km` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Presión dinámica:</strong> {impactData.presionDinamica ? `${(impactData.presionDinamica / 1e6).toLocaleString()} MPa` : "N/A"}</Text>
    </Box>

    {/* Impacto Demográfico */}
    <Box mb={3} p={2} bg={useColorModeValue("red.50", "red.900")} borderRadius="md">
      <Text fontWeight="bold" color="red.700">👥 Impacto Demográfico</Text>
      <Text fontSize="sm"><strong>País:</strong> {impactData.country || "N/A"}</Text>
      <Text fontSize="sm"><strong>Población total:</strong> {impactData.poblacionTotal || "N/A"}</Text>
      <Text fontSize="sm"><strong>Densidad poblacional:</strong> {impactData.densidadHabKm2 ? `${impactData.densidadHabKm2} hab/km²` : "N/A"}</Text>
      <Text fontSize="sm"><strong>Población afectada:</strong> {impactData.nafHab || "N/A"} habitantes</Text>
      <Text fontSize="sm"><strong>Muertes directas:</strong> {impactData.muertesDirectas || "N/A"}</Text>
      <Text fontSize="sm"><strong>Muertes indirectas:</strong> {impactData.muertesIndirectas || "N/A"}</Text>
      <Text fontSize="sm"><strong>Total muertes:</strong> {impactData.muertesTotales || "N/A"}</Text>
      <Text fontSize="sm"><strong>Severidad:</strong> {impactData.sPorcentaje || "N/A"}% de población</Text>
    </Box>

    {/* Impacto Económico */}
    <Box mb={3} p={2} bg={useColorModeValue("green.50", "green.900")} borderRadius="md">
      <Text fontWeight="bold" color="green.700">💰 Impacto Económico</Text>
      <Text fontSize="sm"><strong>PIB total:</strong> ${impactData.GDPtotal || "N/A"}</Text>
      <Text fontSize="sm"><strong>PIB per cápita:</strong> ${impactData.pibPerCapita || "N/A"}</Text>
      <Text fontSize="sm"><strong>Pérdida PIB total:</strong> ${impactData.perdidaPIBTotal || "N/A"}</Text>
      <Text fontSize="sm"><strong>Pérdidas económicas:</strong> ${impactData.perdidasEconomicasTotal || "N/A"}</Text>
      <Text fontSize="sm"><strong>Población urbana:</strong> {impactData.poblacionUrbana || "N/A"}</Text>
      <Text fontSize="sm"><strong>Valor urbano por km²:</strong> ${impactData.valorUrbanoUsdKm2 || "N/A"}</Text>
    </Box>

    {/* Datos Técnicos Adicionales */}
    <Box p={2} bg={useColorModeValue("purple.50", "purple.900")} borderRadius="md">
      <Text fontWeight="bold" color="purple.700">📈 Datos Técnicos</Text>
      <Text fontSize="xs"><strong>Energía sísmica:</strong> {impactData.energiaSismica ? `${(impactData.energiaSismica / 1e12).toLocaleString()} TJ` : "N/A"}</Text>
      <Text fontSize="xs"><strong>Fuerza de arrastre:</strong> {impactData.fuerzaArrastre ? `${(impactData.fuerzaArrastre / 1e9).toLocaleString()} GN` : "N/A"}</Text>
      <Text fontSize="xs"><strong>Luminosidad:</strong> {impactData.luminosidad ? `${(impactData.luminosidad / 1e12).toLocaleString()} TW` : "N/A"}</Text>
      <Text fontSize="xs"><strong>Pérdida de masa:</strong> {impactData.perdida ? `${impactData.perdida.toLocaleString()} kg/s` : "N/A"}</Text>
      <Text fontSize="xs"><strong>Factor de letalidad:</strong> {impactData.factorLetalidad || "N/A"}</Text>
      <Text fontSize="xs"><strong>Beta:</strong> {impactData.beta || "N/A"}</Text>
      <Text fontSize="xs"><strong>Camas por mil:</strong> {impactData.camasPorMil || "N/A"}</Text>
    </Box>
  </Box>
)}

          <ButtonsPanel selected={selected} setSelected={setSelected} />
          <ContentPanel selected={selected} search={search} />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;