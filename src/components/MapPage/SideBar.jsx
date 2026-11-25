import { useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import DataAsset from "./DataExport/DataAsset";
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
  Tooltip,
  Circle,
  HStack,
  Badge,
  Icon,
  Progress,
  Divider,
  useBreakpointValue,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import { QuestionIcon, ChevronRightIcon, ChevronLeftIcon, WarningIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Satellite,
  Target,
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  Database,
  Globe,
  Rocket,
  Eye,
  TrendingUp
} from "lucide-react";
import { AsteroidInfoNASANEOS } from "./NASA_NEOs";
import { HORIZONS } from "./HORIZONS";
import { PNeoInfo } from "./IAU_PNEOS";
import { RandomPNeosList } from "./RandomPNEO";
import { useFormulas, useHORIZONs } from "../../Hooks";
import { estimateImpactAreaFromHORIZONS } from "../../utils/impactEstimation";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

// Componente de partículas de fondo
const BackgroundParticles = () => null;

// Subcomponente SearchBar mejorado
const SearchBar = ({ search, setSearch }) => (
  <MotionBox
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    mb={4}
  >
    <InputGroup size="md">
      <InputLeftElement>
        <Tooltip
          label="Enter the asteroid name or ID and select a location on the map to start the simulation."
          placement="left"
          hasArrow
          bg="#141414"
          color="white"
          borderColor="#2a2a2a"
        >
          <IconButton
            aria-label="Help"
            icon={<QuestionIcon />}
            size="sm"
            variant="ghost"
            color="#9a9a9a"
            _hover={{
              color: "#f4f4f4",
              bg: "#2a2a2a"
            }}
          />
        </Tooltip>
      </InputLeftElement>

      <Input
        placeholder="Search by name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        bg="rgba(3, 7, 18, 0.4)"
        border="1px solid #2a2a2a"
        borderRadius="xl"
        color="white"
        _placeholder={{ color: "#9a9a9a" }}
        _focus={{
          borderColor: "#2a2a2a",
          boxShadow: "none",
          bg: "rgba(3, 7, 18, 0.6)"
        }}
        _hover={{
          borderColor: "#2a2a2a"
        }}
        pl={12}
        height="50px"
        fontSize="sm"
        fontWeight="medium"
      />
    </InputGroup>
  </MotionBox>
);

// Panel de botones mejorado
const ButtonsPanel = ({ selected, setSelected }) => {
  const agencies = [
    {
      id: "agency1",
      src: "/assets/images/NASA_logo.png",
      alt: "NASA",
      name: "NASA NEOS",
      description: "Near Earth Objects",
      icon: Satellite,
      color: "#f4f4f4"
    },
    {
      id: "agency2",
      src: "/assets/images/NASA_JPL_logo.png",
      alt: "NASA JPL",
      name: "JPL HORIZONS",
      description: "Precise Ephemeris",
      icon: Target,
      color: "#f4f4f4"
    },
    {
      id: "agency5",
      src: "/assets/images/IAU_logo.png",
      alt: "IAU",
      name: "IAU NeoCP",
      description: "Minor Planets",
      icon: Globe,
      color: "#f4f4f4"
    },
  ];

  return (
    <VStack spacing={3} mb={6}>
      {agencies.map((agency, index) => (
        <MotionBox
          key={agency.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          width="100%"
        >
          <MotionButton
            onClick={() => setSelected(agency.id)}
            width="100%"
            height="auto"
            p={4}
            bg={selected === agency.id
              ? "#141414"
              : "rgba(3, 7, 18, 0.3)"
            }
            border="1px solid"
            borderColor={selected === agency.id
              ? "#2a2a2a"
              : "#2a2a2a"
            }
            borderRadius="xl"
            position="relative"
            overflow="hidden"
            _hover={{
              bg: "#141414",
              borderColor: "#2a2a2a",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px #2a2a2a"
            }}
            
            
          >
            {/* Efecto de brillo */}
            <Box
              position="absolute"
              top="0"
              left={selected === agency.id ? "0%" : "-100%"}
              width="100%"
              height="100%"
              bg="#141414"
              transition="left 0.5s ease"
              zIndex={1}
            />

            <HStack spacing={4} width="100%" zIndex={2} position="relative">
              <Circle size="50px" bg="#2a2a2a" border="1px solid #2a2a2a">
                <Image src={agency.src} alt={agency.alt} boxSize="30px" objectFit="contain" />
              </Circle>

              <VStack align="flex-start" spacing={1} flex={1}>
                <Text color="white" fontWeight="bold" fontSize="sm" textAlign="left">
                  {agency.name}
                </Text>
                <Text color="#9a9a9a" fontSize="xs" textAlign="left">
                  {agency.description}
                </Text>
              </VStack>

              {selected === agency.id && (
                <Icon as={ChevronRightIcon} color="#f4f4f4" size={20} />
              )}
            </HStack>
          </MotionButton>
        </MotionBox>
      ))}
    </VStack>
  );
};

// Panel de información por defecto mejorado
const DefaultInfo = () => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    p={5}
    bg="#141414"
    borderRadius="xl"
    border="1px solid #2a2a2a"
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      height="2px"
      bg="#141414"
      opacity={0.5}
    />

    <VStack align="flex-start" spacing={4}>
      <HStack spacing={3}>
        <Icon as={Database} color="#f4f4f4" size={24} />
        <Text color="white" fontWeight="bold" fontSize="lg">
          Available Data Sources
        </Text>
      </HStack>

      <Text color="#9a9a9a" fontSize="sm" lineHeight="1.6">
        Consult asteroid and minor body information from multiple specialized sources:
      </Text>

      <VStack align="flex-start" spacing={3} width="100%">
        {[
          {
            icon: Satellite,
            title: "NASA NEOS API",
            desc: "Near Earth Objects, orbits and risk analysis",
            color: "#f4f4f4"
          },
          {
            icon: Target,
            title: "NASA JPL HORIZONS",
            desc: "Precise trajectory and ephemeris data",
            color: "#f4f4f4"
          },
          {
            icon: Globe,
            title: "IAU Minor Planet Center",
            desc: "Pending asteroids and temporary designations",
            color: "#f4f4f4"
          }
        ].map((item, index) => (
          <HStack key={index} spacing={3} width="100%">
            <Circle size="30px" bg={`${item.color}20`} border={`1px solid ${item.color}50`}>
              <Icon as={item.icon} color={item.color} size={16} />
            </Circle>
            <VStack align="flex-start" spacing={0} flex={1}>
              <Text color="white" fontWeight="semibold" fontSize="sm">
                {item.title}
              </Text>
              <Text color="#9a9a9a" fontSize="xs">
                {item.desc}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <Badge
        colorScheme="blue"
        variant="subtle"
        bg="#2a2a2a"
        color="#f4f4f4"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
      >
        More sources coming soon
      </Badge>
    </VStack>
  </MotionBox>
);

// Panel de contenido mejorado
const ContentPanel = ({ selected, search }) => {
  const getContent = () => {
    switch (selected) {
      case "agency1":
        return {
          title: "NASA NEOS API",
          icon: Satellite,
          color: "#f4f4f4",
          component: search ? <AsteroidInfoNASANEOS asteroidId={search} /> : null
        };
      case "agency2":
        return {
          title: "NASA JPL HORIZONS API",
          icon: Target,
          color: "#f4f4f4",
          component: search ? <HORIZONS asteroidId={search} /> : null
        };
      case "agency5":
        return {
          title: "IAU Minor Planet Center NeoCP",
          icon: Globe,
          color: "#f4f4f4",
          component: search ? <PNeoInfo tempDesig={search} /> : <RandomPNeosList />
        };
      default:
        return null;
    }
  };

  const content = getContent();

  if (!content) return <DefaultInfo />;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={5}
      bg="#141414"
      borderRadius="xl"
      border="1px solid #2a2a2a"
    >
      <HStack spacing={3} mb={4}>
        <Circle size="35px" bg={`${content.color}20`} border={`1px solid ${content.color}50`}>
          <Icon as={content.icon} color={content.color} size={18} />
        </Circle>
        <Text color="white" fontWeight="bold" fontSize="md">
          {content.title}
        </Text>
      </HStack>

      {content.component || (
        <Text color="#9a9a9a" fontSize="sm">
          Enter a name or ID to search for specific data
        </Text>
      )}
    </MotionBox>
  );
};

const Sidebar = ({ countryCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [impactData, setImpactData] = useState(null);

 const exportarDatos = () => {
if (!impactData) {
      alert("No results to export");
      return;
    }

    // Crear contenedor temporal
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "-1";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    const root = document.createElement("div");
    root.id = "impact-result-panel";
    container.appendChild(root);

    import("react-dom/client").then(({ createRoot }) => {
      const reactRoot = createRoot(root);
      reactRoot.render(
        <DataAsset
          impactData={impactData}
          countryCode={countryCode}
          search={search}
          horizonsData={horizonsData}
          formulasData={formulasData}
        />
      );

      // Esperar un tick para que renderice
      setTimeout(() => {
        const node = document.getElementById("impact-result-panel");
        if (!node) return;

        toPng(node, { cacheBust: true })
          .then((dataUrl) => {
            download(dataUrl, "asteroid_results.png");
          })
          .catch((err) => {
            console.error("Error generating the image:", err);
            alert("An error occurred while exporting the image");
          })
          .finally(() => {
            reactRoot.unmount();
            document.body.removeChild(container);
          });
      }, 100);
    });
  };

  const sidebarWidth = useBreakpointValue({
    base: isOpen ? "min(100%, 320px)" : "48px",
    md: isOpen ? "380px" : "48px",
    lg: isOpen ? "400px" : "48px"
  });

  const { data: horizonsData, loading: horizonsLoading, error: horizonsError, fetchHORIZONS } = useHORIZONs();
  const { data: formulasData, loading, error, refetch } = useFormulas();

  const handleStartSimulation = async () => {
    console.log(" Starting simulation...");

    if (!countryCode) {
      alert("Select a location");
      return;
    }
    if (!search) {
      alert("Enter an asteroid");
      return;
    }

    try {
      // 1⃣ Obtener datos de HORIZONS
      const freshData = await fetchHORIZONS(search);

      if (!freshData) {
        alert("Could not retrieve asteroid information");
        return;
      }

      console.log("HORIZONS Data:", freshData);

      // 2⃣ Obtener datos físicos
      const payloadFisicas = { id: search };
      const fisicasData = await refetch(payloadFisicas);
      console.log(" Physical Data:", fisicasData);

      // 3⃣ Calcular área de impacto
      const impactEstimation = estimateImpactAreaFromHORIZONS(
        freshData,
        1e6,
        fisicasData?.velocityKmS
      );

      if (!impactEstimation?.areaKm2) {
        alert("Could not calculate impact area");
        return;
      }

      // 4⃣ Llamar a fórmulas demográficas
      const payloadDemograficas = {
        id: search,
        country: countryCode,
        areaAfectadaKm2: impactEstimation.areaKm2
      };

      const combinedData = await refetch(payloadDemograficas);

      // 5⃣ Actualizar estado
      setImpactData({
        ...fisicasData,
        ...impactEstimation,
        ...combinedData,
        countryCode
      });

      console.log(" Simulation complete:", {
        ...fisicasData,
        ...impactEstimation,
        ...combinedData,
        countryCode
      });

    } catch (err) {
      console.error(err);
      alert("Simulation error");
      if (err.message) setImpactData({ error: err.message });
    }
  };

  return (
    <MotionBox
      position="absolute"
      top="0"
      right="0"
      height="100%"
      bg="#141414"
      borderLeft="1px solid #2a2a2a"
      overflow="hidden"
      zIndex={1000}
      initial={{
        width: "60px",
        x: 0,
        boxShadow: "none"
      }}
      animate={{
        width: sidebarWidth,
        boxShadow: isOpen
          ? "none"
          : "none"
      }}
      transition={{
        width: {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        },
        boxShadow: {
          duration: 0.4,
          ease: "easeOut",
          delay: isOpen ? 0.2 : 0
        }
      }}
    >
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        width="2px"
        height="100%"
        bg="#141414"
        initial={{
          boxShadow: "0 0 10px #2a2a2a",
          opacity: 0.6
        }}
        animate={{
          boxShadow: isOpen
            ? "0 0 25px #2a2a2a"
            : "0 0 10px #2a2a2a",
          opacity: isOpen ? 1 : 0.6
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: isOpen ? 0.3 : 0
        }}
      />

      {/* Efecto de expansión de partículas */}
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 0.7 : 0
        }}
        transition={{
          duration: 0.5,
          delay: isOpen ? 0.2 : 0
        }}
      >
        <BackgroundParticles />
      </MotionBox>

      {/* Botón de toggle mejorado con animación */}
      <MotionBox
        position="absolute"
        top="20px"
        zIndex={1001}
        initial={{ left: "10px" }}
        animate={{
          left: isOpen ? "20px" : "10px",
          scale: isOpen ? 1.1 : 1
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.1
        }}
      >
        <MotionButton
          onClick={() => setIsOpen(!isOpen)}
          size="md"
          bg="#141414"
          color="white"
          borderRadius="xl"
          border="2px solid #2a2a2a"
          initial={{
            boxShadow: "0 0 15px #2a2a2a",
            width: "40px",
            height: "40px"
          }}
          animate={{
            boxShadow: isOpen
              ? "0 0 30px #2a2a2a, 0 0 60px #2a2a2a"
              : "0 0 15px #2a2a2a",
            width: isOpen ? "50px" : "40px",
            height: isOpen ? "50px" : "40px"
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          _hover={{
            background: "#141414",
            transform: "translateY(-2px)",
          }}
          
          
          minWidth={isOpen ? "50px" : "40px"}
        >
          <MotionBox
            initial={{ rotate: 0 }}
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1
            }}
          >
            <Icon as={ChevronLeftIcon} size={18} />
          </MotionBox>
        </MotionButton>
      </MotionBox>

      <AnimatePresence mode="wait">
        {isOpen && (
          <Box
            key="sidebar-content"
            height="100%"
            pt="90px"
            pb="20px"
            px="20px"
            overflowY="auto"
            overflowX="hidden"
            position="relative"
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#2a2a2a',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#2a2a2a',
                borderRadius: '10px',
                minHeight: '20px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#2a2a2a',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: '#2a2a2a #2a2a2a',
            }}
          >
            <MotionBox
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              <VStack spacing={6} align="stretch" width="100%">
                <Box>
                  <SearchBar search={search} setSearch={setSearch} />
                </Box>

                {/* Panel de estado mejorado */}
                <Box
                  p={4}
                  bg="rgba(3, 7, 18, 0.6)"
                  borderRadius="xl"
                  border="1px solid #2a2a2a"
                  position="relative"
                  overflow="hidden"
                >
                  <HStack spacing={3} mb={3}>
                    <Icon as={Activity} color="#f4f4f4" size={20} />
                    <Text color="white" fontWeight="bold" fontSize="md">
                      System Status
                    </Text>
                  </HStack>

                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text color="#9a9a9a" fontSize="xs">Selected Country:</Text>
                      <Badge
                        colorScheme={countryCode ? "green" : "red"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {countryCode || "Not selected"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="#9a9a9a" fontSize="xs">Target Asteroid:</Text>
                      <Badge
                        colorScheme={search ? "blue" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {search || "Not defined"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="#9a9a9a" fontSize="xs">HORIZONS Data:</Text>
                      <Badge
                        colorScheme={horizonsData ? "green" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {horizonsData ? " Available" : "No data"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="#9a9a9a" fontSize="xs">Formulas Data:</Text>
                      <Badge
                        colorScheme={formulasData ? "green" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {formulasData ? " Available" : "No data"}
                      </Badge>
                    </HStack>

                    {horizonsData?.basicInfo && (
                      <HStack justify="space-between">
                        <Text color="#9a9a9a" fontSize="xs">Last Asteroid:</Text>
                        <Badge
                          colorScheme={formulasData ? "green" : "gray"}
                          variant="subtle"
                          fontSize="xs"
                        >
{horizonsData.basicInfo.name}
                        </Badge>
                      </HStack>
                    )}

                  </VStack>
                </Box>

                {/* Enhanced simulation button */}
                <Box>
                  <Button
                    onClick={handleStartSimulation}
                    size="lg"
                    width={{ base: "100%", md: "80%", lg: "60%" }}
                    height="44px"
                    bg={!countryCode || !search ? "#1c1c1c" : "#f4f4f4"}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color={!countryCode || !search ? "#6d6d6d" : "#0a0a0a"}
                    fontWeight="500"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor={!countryCode || !search ? "#2a2a2a" : "#f4f4f4"}
                    
                    isLoading={loading}
                    loadingText="Processing simulation…"
                    isDisabled={!countryCode || !search}
                    leftIcon={<Icon as={Rocket} size={{ base: 16, md: 20, lg: 24 }} />}
                    _hover={!countryCode || !search ? {} : { background: "#e4e4e4" }}
                  >
                    {!countryCode ? "Select a location" :
                      !search ? "Enter an asteroid" :
                        "Start simulation"}
                  </Button>
                </Box>

                {error && (
                  <Box
                    p={4}
                    bg="#141414"
                    border="1px solid rgba(220, 38, 38, 0.3)"
                    borderRadius="xl"
                    position="relative"
                  >
                    <HStack spacing={3}>
                      <Icon as={AlertTriangle} color="#ef4444" size={20} />
                      <VStack align="flex-start" spacing={1}>
                        <Text color="#ef4444" fontWeight="bold" fontSize="sm">
                          System Error
                        </Text>
                        <Text color="rgba(239, 68, 68, 0.8)" fontSize="xs">
                          {error}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                )}

                {/* Enhanced results panel with staggered animation */}
                {impactData && (
                  <Box
                    p={5}
                    bg="#141414"
                    border="1px solid rgba(5, 150, 105, 0.3)"
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Visual effects */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      height="3px"
                      bg="#141414"
                    />

                    <VStack spacing={4} align="stretch" p={6} bg="#0a0e1a" minH="100vh">
                      <HStack spacing={3}>
                        <Icon as={TrendingUp} color="#f4f4f4" boxSize={6} />
                        <Text color="white" fontWeight="bold" fontSize="lg">
                          Full impact analysis
                        </Text>
                      </HStack>

                      {/* Asteroid information */}
                      <Box p={3} bg="rgba(3, 7, 18, 0.4)" borderRadius="lg" border="1px solid #2a2a2a">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Eye} color="#f4f4f4" boxSize={5} />
                          <Text color="#f4f4f4" fontWeight="bold" fontSize="sm">Detected Object</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Official designation of the Near-Earth Object detected by astronomical observatories"
                              placement="left"
                              hasArrow
                              bg="#2a2a2a"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Identification:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.name || impactData.id || "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Total mass of the asteroid calculated through spectroscopic analysis and density models"
                              placement="left"
                              hasArrow
                              bg="#2a2a2a"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Estimated Mass:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.massKg ? `${(impactData.massKg / 1000).toLocaleString()} ton` : "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Asteroid radius determined by albedo observations and radar measurements"
                              placement="left"
                              hasArrow
                              bg="#2a2a2a"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Estimated Radius:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.radiusM ? `${impactData.radiusM} m` : "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Object's relative velocity with respect to Earth at the time of atmospheric entry"
                              placement="left"
                              hasArrow
                              bg="#2a2a2a"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Velocity:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.velocityKmS ? `${Math.abs(impactData.velocityKmS).toLocaleString()} km/s` : "N/A"}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Physical impact */}
                      <Box p={3} bg="rgba(220, 38, 38, 0.1)" borderRadius="lg" border="1px solid rgba(220, 38, 38, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Zap} color="#ef4444" boxSize={5} />
                          <Text color="#ef4444" fontWeight="bold" fontSize="sm">Impact Analysis</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Energy equivalent in megatons of TNT. For reference: 1 MT = 1000 Hiroshima atomic bombs"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Energy Released:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.energiaLiberada ? `${impactData.energiaLiberada.toLocaleString()} MT` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Cross-sectional area of the asteroid perpendicular to the entry direction"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Cross-Sectional Area:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.areaTransversal ? `${impactData.areaTransversal.toLocaleString()} m²` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Total kinetic energy calculated as ½mv². Measured in petajoules (PJ)"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Kinetic Energy:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.energiaCinetica ? `${(impactData.energiaCinetica / 1e15).toLocaleString()} PJ` : "N/A"}
                            </Badge>
                          </HStack>
                          <HStack justify="space-between">
                            <Tooltip
                              label="Dynamic pressure exerted by the atmospheric flow on the object during entry"
                              placement="left"
                              hasArrow
                              bg="rgba(168, 85, 247, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Dynamic Pressure:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="purple" fontSize="xs">
                              {impactData.presionDinamica ? `${(impactData.presionDinamica / 1e6).toFixed(1)} MPa` : "N/A"}
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Demographic impact */}
                      <Box p={3} bg="rgba(245, 101, 101, 0.1)" borderRadius="lg" border="1px solid rgba(245, 101, 101, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={AlertTriangle} color="#f56565" boxSize={5} />
                          <Text color="#f56565" fontWeight="bold" fontSize="sm">Population Impact</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Nation where the impact occurs based on calculated trajectory coordinates"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Country:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.country || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Total population of the country according to the latest demographic data"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Total Population:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.poblacionTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Average number of inhabitants per square kilometer in the impact zone"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Population Density:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.densidadHabKm2 ? `${impactData.densidadHabKm2} inhab/km²` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Number of people within the radius of direct impact effects (explosion, thermal wave)"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Affected Population:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.nafHab ? `${impactData.nafHab.toLocaleString()} inhab` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimation of immediate fatalities from shock wave, thermal radiation, and projectiles"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Direct Casualties:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.muertesDirectas || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimation of fatalities from secondary effects: structural collapse, fires, tsunamis, etc."
                              placement="left"
                              hasArrow
                              bg="rgba(251, 146, 60, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Indirect Casualties:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="orange" fontSize="xs">
                              {impactData.muertesIndirectas || "N/A"}
                            </Badge>
                          </HStack>

                          <Divider borderColor="rgba(245, 101, 101, 0.2)" />

                          <HStack justify="space-between">
                            <Tooltip
                              label="Total sum of projected direct and indirect casualties for this impact scenario"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" fontWeight="bold" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Estimated Total:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs" fontWeight="bold">
                              {impactData.muertesTotales || "N/A"}
                            </Badge>
                          </HStack>

                          <Progress
                            value={impactData.sPorcentaje || 0}
                            size="sm"
                            colorScheme="red"
                            bg="rgba(245, 101, 101, 0.1)"
                            borderRadius="full"
/>
                          <Text color="#9a9a9a" fontSize="xs" textAlign="center">
                            {impactData.sPorcentaje || "0"}% of national population
                          </Text>
                        </VStack>
                      </Box>

                      {/* Economic Impact */}
                      <Box p={3} bg="rgba(16, 185, 129, 0.1)" borderRadius="lg" border="1px solid rgba(16, 185, 129, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={TrendingUp} color="#f4f4f4" boxSize={5} />
                          <Text color="#f4f4f4" fontWeight="bold" fontSize="sm">Economic Impact</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Total Gross Domestic Product of the affected country in US dollars"
                              placement="left"
                              hasArrow
                              bg="rgba(16, 185, 129, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                National GDP:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="green" fontSize="xs">
                              ${impactData.GDPtotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="GDP divided by total population, an indicator of the average economic standard of living"
                              placement="left"
                              hasArrow
                              bg="rgba(20, 184, 166, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                GDP per capita:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="teal" fontSize="xs">
                              ${impactData.pibPerCapita || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimated GDP loss due to reduced labor force and productive capacity"
                              placement="left"
                              hasArrow
                              bg="rgba(251, 146, 60, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Total GDP Loss:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="orange" fontSize="xs">
                              ${impactData.perdidaPIBTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Total damage costs: destroyed infrastructure, reconstruction, humanitarian aid, and recovery"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Economic Damage:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              ${impactData.perdidasEconomicasTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Population residing in urban areas within the impact zone"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Urban population:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.poblacionUrbana || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimated value of properties, infrastructure, and urban assets per square kilometer"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Urban value per km²:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              ${impactData.valorUrbanoUsdKm2 || "N/A"}
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Additional technical data */}
                      <Box p={3} bg="rgba(124, 58, 237, 0.1)" borderRadius="lg" border="1px solid rgba(124, 58, 237, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Database} color="#f4f4f4" boxSize={5} />
                          <Text color="#f4f4f4" fontWeight="bold" fontSize="sm">Technical Parameters</Text>
                        </HStack>
                        <SimpleGrid columns={2} spacing={2}>
                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Atmospheric drag force acting on the object during entry. Measured in giganewtons (GN)"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Drag force:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.fuerzaArrastre ? `${(impactData.fuerzaArrastre / 1e9).toFixed(1)} GN` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Luminous intensity of the bolide during atmospheric entry. Measured in terawatts (TW)"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Luminosity:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.luminosidad ? `${(impactData.luminosidad / 1e12).toFixed(1)} TW` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Lethality index based on population density, impact energy, and secondary effects"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Lethality factor:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.factorLetalidad || "N/A"}
                            </Text>
                          </VStack>
                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Momentum transfer coefficient between the object and the atmosphere"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Beta:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.beta || "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Country's hospital capacity: number of available beds per thousand inhabitants"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="#9a9a9a" fontSize="xs" cursor="help" borderBottom="1px dotted #9a9a9a">
                                Beds per thousand:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.camasPorMil || "N/A"}
                            </Text>
                          </VStack>
                        </SimpleGrid>
                      </Box>

                      {/* Mitigation Panel */}
                      <Box
                        p={3}
                        bg="#141414"
                        border="1px solid rgba(255, 223, 107, 0.3)"
                        borderRadius="xl"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          height="2px"
                          bg="#141414"
                        />

                        <VStack spacing={3} align="stretch">
                        {/* Mitigation Panel */}
                        <Box>
                          <HStack spacing={3}>
                            <Icon as={Shield} color="#f4f4f4" boxSize={6} />
                            <Text color="white" fontWeight="bold" fontSize="md">
                              Mitigations
                            </Text>
                          </HStack>

                          <Text color="rgba(255, 223, 107, 0.7)" fontSize="sm">
                            Mitigation strategies based on NASA and USGS data.
                          </Text>

                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={2}>
                            <Box borderWidth="1px" borderRadius="lg" p={3} bg="rgba(255,255,255,0.05)">
                              <Text color="#f4f4f4" fontSize="sm" fontWeight="bold">Consequences</Text>
                              <Text color="rgba(255, 223, 107, 0.7)" fontSize="sm">
                                Air burst, shock wave, fires, tsunamis.
                                Infrastructure destruction and loss of life.

                              </Text>
                            </Box>

                            <Box borderWidth="1px" borderRadius="lg" p={3} bg="rgba(255,255,255,0.05)">
                              <Text color="#f4f4f4" fontSize="sm" fontWeight="bold">Mitigation Strategies</Text>
                              <Text color="rgba(255, 223, 107, 0.7)" fontSize="sm">
                                Preventive evacuation, reinforcement of critical infrastructure.
                                Community education and preparedness programs.
                              </Text>
                            </Box>

                            <Box borderWidth="1px" borderRadius="lg" p={3} bg="rgba(255,255,255,0.05)">
                              <Text color="#f4f4f4" fontSize="sm" fontWeight="bold">Risk Assessment</Text>
                              <Text color="rgba(255, 223, 107, 0.7)" fontSize="sm">
                                Analysis of local vulnerabilities.
                                Identification of high-risk areas and vulnerable populations.
                              </Text>
                            </Box>

                            <Box borderWidth="1px" borderRadius="lg" p={3} bg="rgba(255,255,255,0.05)">
                              <Text color="#f4f4f4" fontSize="sm" fontWeight="bold">Data Sources</Text>
                              <UnorderedList color="rgba(255, 223, 107, 0.7)" fontSize="sm" ml={4}>
                                <ListItem>NASA NEO API</ListItem>
                                <ListItem>USGS NEIC (Earthquakes)</ListItem>
                                <ListItem>USGS DEM (Elevation)</ListItem>
                              </UnorderedList>
                            </Box>
                          </SimpleGrid>
                        </Box>

                        
                      </VStack>

                      </Box>

                      {/* Collateral Environmental Damage Panel */}
                      <Box
                        p={3}
                        bg="#141414"
                        border="1px solid rgba(239, 68, 68, 0.3)"
                        borderRadius="xl"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          height="2px"
                          bg="#141414"
                        />

                        <VStack spacing={3} align="stretch">
                          <HStack spacing={3}>
                            <Icon as={WarningIcon} color="#ef4444" boxSize={6} />
                            <Text color="white" fontWeight="bold" fontSize="md">
                              Collateral Environmental Damage
                            </Text>
                          </HStack>

                          <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                            This module shows the collateral environmental effects due to the impact.
                          </Text>

                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              p={3}
                              bg="rgba(255,255,255,0.05)"
                            >
                              <Text color="#ef4444" fontSize="sm" fontWeight="bold">
                                Gas Emissions
                              </Text>
                              <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                                High amount of harmful gases and particles released into the atmosphere.
                                Extremely dangerous in ranges of up to 100km from the impact zone.
                                Do not go out without proper protection.
                              </Text>
                            </Box>

                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              p={3}
                              bg="rgba(255,255,255,0.05)"
                            >
                              <Text color="#ef4444" fontSize="sm" fontWeight="bold">
                                Deforested Area
                              </Text>
                              <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                                It is estimated that asteroid impacts can wipe out entire forests,
                                causing wildfires and biodiversity loss.
                              </Text>
                            </Box>

                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              p={3}
                              bg="rgba(255,255,255,0.05)"
                            >
                              <Text color="#ef4444" fontSize="sm" fontWeight="bold">
                                Biodiversity Loss
                              </Text>
                              <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                                Total loss of biodiversity is estimated in the impact zone,
                                including terrestrial and aquatic flora and fauna.
                              </Text>
                            </Box>

                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              p={3}
                              bg="rgba(255,255,255,0.05)"
                            >
                              <Text color="#ef4444" fontSize="sm" fontWeight="bold">
                                Water Contamination
                              </Text>
                              <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                                We calculate a major impact on water quality, making it unfit for human consumption
                              </Text>
                            </Box>

                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              p={3}
                              bg="rgba(255,255,255,0.05)"
                            >
                              <Text color="#ef4444" fontSize="sm" fontWeight="bold">
                                Affected Ecosystems
                              </Text>
                              <Text color="rgba(239, 68, 68, 0.7)" fontSize="sm">
                                Total loss of ecosystems
                              </Text>
                            </Box>
                          </SimpleGrid>
                        </VStack>
                      </Box>
      <MotionButton
        size="sm"
        bg="#2a2a2a"
        color="#f4f4f4"
        border="1px solid #2a2a2a"
        borderRadius="lg"
        _hover={{
          bg: "#2a2a2a",
          borderColor: "#2a2a2a"
        }}
        
        
        onClick={() =>
          exportarDatos(impactData, countryCode, search, horizonsData, formulasData)
        }
      >
        Export results
      </MotionButton>




                    </VStack>
                  </Box>
                )}

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <ButtonsPanel selected={selected} setSelected={setSelected} />
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <ContentPanel selected={selected} search={search} />
                </MotionBox>
              </VStack>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default Sidebar;