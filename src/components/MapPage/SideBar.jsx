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
  Tooltip,
  Circle,
  HStack,
  Badge,
  Icon,
  Progress,
  Divider,
  useBreakpointValue
} from "@chakra-ui/react";
import { QuestionIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
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
const BackgroundParticles = () => (
  <>
    {[...Array(12)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width="2px"
        height="2px"
        bg="rgba(96, 165, 250, 0.6)"
        borderRadius="full"
        top={`${10 + Math.random() * 80}%`}
        left={`${10 + Math.random() * 80}%`}
        animation={`twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`}
        zIndex={1}
      />
    ))}
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }
    `}</style>
  </>
);

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
          label="Ingresa el nombre o ID del asteroide y selecciona un lugar en el mapa para iniciar la simulación."
          placement="left"
          hasArrow
          bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
          color="white"
          borderColor="rgba(59, 130, 246, 0.3)"
          boxShadow="0 8px 25px rgba(59, 130, 246, 0.2)"
        >
          <IconButton
            aria-label="Ayuda"
            icon={<QuestionIcon />}
            size="sm"
            variant="ghost"
            color="rgba(96, 165, 250, 0.8)"
            _hover={{
              color: "#60a5fa",
              bg: "rgba(59, 130, 246, 0.1)"
            }}
          />
        </Tooltip>
      </InputLeftElement>

      <Input
        placeholder="🔍 Buscar asteroide por nombre o ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        bg="rgba(3, 7, 18, 0.4)"
        border="1px solid rgba(59, 130, 246, 0.2)"
        borderRadius="xl"
        color="white"
        _placeholder={{ color: "rgba(147, 197, 253, 0.5)" }}
        _focus={{
          borderColor: "rgba(59, 130, 246, 0.6)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          bg: "rgba(3, 7, 18, 0.6)"
        }}
        _hover={{
          borderColor: "rgba(59, 130, 246, 0.4)"
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
      color: "#e11d48"
    },
    {
      id: "agency2",
      src: "/assets/images/NASA_JPL_logo.png",
      alt: "NASA JPL",
      name: "JPL HORIZONS",
      description: "Precise Ephemeris",
      icon: Target,
      color: "#7c3aed"
    },
    {
      id: "agency5",
      src: "/assets/images/IAU_logo.png",
      alt: "IAU",
      name: "IAU NeoCP",
      description: "Minor Planets",
      icon: Globe,
      color: "#059669"
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
              ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)"
              : "rgba(3, 7, 18, 0.3)"
            }
            border="1px solid"
            borderColor={selected === agency.id
              ? "rgba(59, 130, 246, 0.5)"
              : "rgba(59, 130, 246, 0.1)"
            }
            borderRadius="xl"
            position="relative"
            overflow="hidden"
            _hover={{
              bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(30, 58, 138, 0.15) 100%)",
              borderColor: "rgba(59, 130, 246, 0.4)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Efecto de brillo */}
            <Box
              position="absolute"
              top="0"
              left={selected === agency.id ? "0%" : "-100%"}
              width="100%"
              height="100%"
              bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
              transition="left 0.5s ease"
              zIndex={1}
            />

            <HStack spacing={4} width="100%" zIndex={2} position="relative">
              <Circle size="50px" bg="rgba(59, 130, 246, 0.1)" border="1px solid rgba(59, 130, 246, 0.2)">
                <Image src={agency.src} alt={agency.alt} boxSize="30px" objectFit="contain" />
              </Circle>

              <VStack align="flex-start" spacing={1} flex={1}>
                <Text color="white" fontWeight="bold" fontSize="sm" textAlign="left">
                  {agency.name}
                </Text>
                <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" textAlign="left">
                  {agency.description}
                </Text>
              </VStack>

              {selected === agency.id && (
                <Icon as={ChevronRightIcon} color="#60a5fa" size={20} />
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
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    borderRadius="xl"
    border="1px solid rgba(59, 130, 246, 0.1)"
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      height="2px"
      bg="linear-gradient(90deg, transparent, #3b82f6, transparent)"
      opacity={0.5}
    />

    <VStack align="flex-start" spacing={4}>
      <HStack spacing={3}>
        <Icon as={Database} color="#60a5fa" size={24} />
        <Text color="white" fontWeight="bold" fontSize="lg">
          Fuentes de Datos Disponibles
        </Text>
      </HStack>

      <Text color="rgba(147, 197, 253, 0.8)" fontSize="sm" lineHeight="1.6">
        Consulta información de asteroides y cuerpos menores desde múltiples fuentes especializadas:
      </Text>

      <VStack align="flex-start" spacing={3} width="100%">
        {[
          {
            icon: Satellite,
            title: "NASA NEOS API",
            desc: "Near Earth Objects, órbitas y análisis de riesgo",
            color: "#e11d48"
          },
          {
            icon: Target,
            title: "NASA JPL HORIZONS",
            desc: "Datos precisos de trayectorias y efemérides",
            color: "#7c3aed"
          },
          {
            icon: Globe,
            title: "IAU Minor Planet Center",
            desc: "Asteroides pendientes y designaciones temporales",
            color: "#059669"
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
              <Text color="rgba(147, 197, 253, 0.6)" fontSize="xs">
                {item.desc}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <Badge
        colorScheme="blue"
        variant="subtle"
        bg="rgba(59, 130, 246, 0.1)"
        color="#60a5fa"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
      >
        🚀 Más fuentes próximamente
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
          color: "#e11d48",
          component: search ? <AsteroidInfoNASANEOS asteroidId={search} /> : null
        };
      case "agency2":
        return {
          title: "NASA JPL HORIZONS API",
          icon: Target,
          color: "#7c3aed",
          component: search ? <HORIZONS asteroidId={search} /> : null
        };
      case "agency5":
        return {
          title: "IAU Minor Planet Center NeoCP",
          icon: Globe,
          color: "#059669",
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
      bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
      borderRadius="xl"
      border="1px solid rgba(59, 130, 246, 0.1)"
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
        <Text color="rgba(147, 197, 253, 0.6)" fontSize="sm">
          Ingrese un nombre o ID para buscar datos específicos
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

  const sidebarWidth = useBreakpointValue({
    base: isOpen ? "320px" : "50px",
    md: isOpen ? "400px" : "60px",
    lg: isOpen ? "700px" : "70px"
  });

  const { data: horizonsData, loading: horizonsLoading, error: horizonsError, fetchHORIZONS } = useHORIZONs();
  const { data: formulasData, loading, error, refetch } = useFormulas();

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
    <MotionBox
      position="absolute"
      top="0"
      right="0"
      height="100%"
      bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
      backdropFilter="blur(20px)"
      borderLeft="1px solid rgba(59, 130, 246, 0.2)"
      overflow="hidden"
      zIndex={1000}
      initial={{
        width: "60px",
        x: 0,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)"
      }}
      animate={{
        width: sidebarWidth,
        boxShadow: isOpen
          ? "0 0 80px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)"
          : "0 0 20px rgba(59, 130, 246, 0.05)"
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
        bg="linear-gradient(180deg, transparent, #1e40af, #3b82f6, #60a5fa, transparent)"
        initial={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
          opacity: 0.6
        }}
        animate={{
          boxShadow: isOpen
            ? "0 0 25px rgba(59, 130, 246, 0.8)"
            : "0 0 10px rgba(59, 130, 246, 0.3)",
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
          bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
          color="white"
          borderRadius="xl"
          border="2px solid rgba(59, 130, 246, 0.3)"
          initial={{
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
            width: "40px",
            height: "40px"
          }}
          animate={{
            boxShadow: isOpen
              ? "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)"
              : "0 0 15px rgba(59, 130, 246, 0.2)",
            width: isOpen ? "50px" : "40px",
            height: isOpen ? "50px" : "40px"
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          _hover={{
            background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
            transform: "translateY(-2px)",
          }}
          whileHover={{
            scale: isOpen ? 1.15 : 1.1,
            boxShadow: "0 8px 30px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
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
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(59, 130, 246, 0.4)',
                borderRadius: '10px',
                minHeight: '20px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(59, 130, 246, 0.6)',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(59, 130, 246, 0.4) rgba(59, 130, 246, 0.05)',
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
                  border="1px solid rgba(59, 130, 246, 0.2)"
                  position="relative"
                  overflow="hidden"
                >
                  <HStack spacing={3} mb={3}>
                    <Icon as={Activity} color="#60a5fa" size={20} />
                    <Text color="white" fontWeight="bold" fontSize="md">
                      Estado del Sistema
                    </Text>
                  </HStack>

                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">País seleccionado:</Text>
                      <Badge
                        colorScheme={countryCode ? "green" : "red"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {countryCode || "No seleccionado"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Asteroide objetivo:</Text>
                      <Badge
                        colorScheme={search ? "blue" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {search || "No definido"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Datos HORIZONS:</Text>
                      <Badge
                        colorScheme={horizonsData ? "green" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {horizonsData ? "✓ Disponibles" : "Sin datos"}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Datos Fórmulas:</Text>
                      <Badge
                        colorScheme={formulasData ? "green" : "gray"}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {formulasData ? "✓ Disponibles" : "Sin datos"}
                      </Badge>
                    </HStack>

                    {horizonsData?.basicInfo && (
                      <HStack justify="space-between">
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Ultimo Asteoroide:</Text>
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

                {/* Botón de simulación mejorado */}
                <Box>
                  <Button
                    onClick={handleStartSimulation}
                    size="lg"
                    width={{ base: "100%", md: "80%", lg: "60%" }}
                    height={{ base: "50px", md: "60px", lg: "70px" }}
                    bg={!countryCode || !search
                      ? "rgba(75, 85, 99, 0.5)"
                      : "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
                    }
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color="white"
                    fontWeight="bold"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor={!countryCode || !search
                      ? "rgba(75, 85, 99, 0.3)"
                      : "rgba(220, 38, 38, 0.5)"
                    }
                    boxShadow={!countryCode || !search
                      ? "none"
                      : "0 0 25px rgba(220, 38, 38, 0.3)"
                    }
                    isLoading={loading}
                    loadingText="Procesando simulación..."
                    isDisabled={!countryCode || !search}
                    leftIcon={<Icon as={Rocket} size={{ base: 16, md: 20, lg: 24 }} />}
                    _hover={!countryCode || !search ? {} : {
                      background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 30px rgba(220, 38, 38, 0.5)"
                    }}
                  >
                    {!countryCode ? "🗺️ Selecciona ubicación" :
                      !search ? "🔍 Ingresa asteroide" :
                        "🚀 INICIAR SIMULACIÓN"}
                  </Button>
                </Box>

                {error && (
                  <Box
                    p={4}
                    bg="linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)"
                    border="1px solid rgba(220, 38, 38, 0.3)"
                    borderRadius="xl"
                    position="relative"
                  >
                    <HStack spacing={3}>
                      <Icon as={AlertTriangle} color="#ef4444" size={20} />
                      <VStack align="flex-start" spacing={1}>
                        <Text color="#ef4444" fontWeight="bold" fontSize="sm">
                          Error del Sistema
                        </Text>
                        <Text color="rgba(239, 68, 68, 0.8)" fontSize="xs">
                          {error}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                )}

                {/* Panel de resultados mejorado con animación escalonada */}
                {impactData && (
                  <Box
                    p={5}
                    bg="linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(4, 120, 87, 0.1) 100%)"
                    border="1px solid rgba(5, 150, 105, 0.3)"
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Efectos visuales */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      height="3px"
                      bg="linear-gradient(90deg, transparent, #10b981, #059669, transparent)"
                    />

                    <VStack spacing={4} align="stretch" p={6} bg="#0a0e1a" minH="100vh">
                      <HStack spacing={3}>
                        <Icon as={TrendingUp} color="#10b981" boxSize={6} />
                        <Text color="white" fontWeight="bold" fontSize="lg">
                          📊 Análisis de Impacto Completo
                        </Text>
                      </HStack>

                      {/* Información del asteroide */}
                      <Box p={3} bg="rgba(3, 7, 18, 0.4)" borderRadius="lg" border="1px solid rgba(59, 130, 246, 0.1)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Eye} color="#60a5fa" boxSize={5} />
                          <Text color="#60a5fa" fontWeight="bold" fontSize="sm">Objeto Detectado</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Designación oficial del objeto cercano a la Tierra detectado por observatorios astronómicos"
                              placement="left"
                              hasArrow
                              bg="rgba(59, 130, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Identificación:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.name || impactData.id || "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Masa total del asteroide calculada mediante análisis espectroscópico y modelos de densidad"
                              placement="left"
                              hasArrow
                              bg="rgba(59, 130, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Masa estimada:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.massKg ? `${(impactData.massKg / 1000).toLocaleString()} ton` : "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Radio del asteroide determinado por observaciones de albedo y mediciones de radar"
                              placement="left"
                              hasArrow
                              bg="rgba(59, 130, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Radio estimada:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.radiusM ? `${impactData.radiusM} m` : "N/A"}
                            </Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Velocidad relativa del objeto respecto a la Tierra al momento del impacto atmosférico"
                              placement="left"
                              hasArrow
                              bg="rgba(59, 130, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Velocidad:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.velocityKmS ? `${Math.abs(impactData.velocityKmS).toLocaleString()} km/s` : "N/A"}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Impacto físico */}
                      <Box p={3} bg="rgba(220, 38, 38, 0.1)" borderRadius="lg" border="1px solid rgba(220, 38, 38, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Zap} color="#ef4444" boxSize={5} />
                          <Text color="#ef4444" fontWeight="bold" fontSize="sm">Análisis de Impacto</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Energía equivalente en megatones de TNT. Para referencia: 1 MT = 1000 bombas atómicas de Hiroshima"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Energía liberada:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.energyMt ? `${impactData.energyMt.toLocaleString()} MT` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Área de la sección transversal del asteroide perpendicular a la dirección de entrada"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Área Transversal:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.areaTransversal ? `${impactData.areaTransversal.toLocaleString()} m²` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Energía cinética total calculada como ½mv². Medida en petajoules (PJ)"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Energía cinética:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.energiaCinetica ? `${(impactData.energiaCinetica / 1e15).toLocaleString()} PJ` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Altitud en la atmósfera donde el asteroide comienza a desintegrarse debido a presión aerodinámica"
                              placement="left"
                              hasArrow
                              bg="rgba(251, 146, 60, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Altura fragmentación:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="orange" fontSize="xs">
                              {impactData.alturaFragmentacion ? `${impactData.alturaFragmentacion.toFixed(1)} km` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Presión dinámica ejercida por el flujo atmosférico sobre el objeto durante la entrada"
                              placement="left"
                              hasArrow
                              bg="rgba(168, 85, 247, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Presión dinámica:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="purple" fontSize="xs">
                              {impactData.presionDinamica ? `${(impactData.presionDinamica / 1e6).toFixed(1)} MPa` : "N/A"}
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Impacto demográfico */}
                      <Box p={3} bg="rgba(245, 101, 101, 0.1)" borderRadius="lg" border="1px solid rgba(245, 101, 101, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={AlertTriangle} color="#f56565" boxSize={5} />
                          <Text color="#f56565" fontWeight="bold" fontSize="sm">Impacto Poblacional</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Nación donde ocurre el impacto según coordenadas de trayectoria calculadas"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                País:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.country || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Población total del país según datos demográficos más recientes"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Población total:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.poblacionTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Número promedio de habitantes por kilómetro cuadrado en la zona de impacto"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Densidad poblacional:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.densidadHabKm2 ? `${impactData.densidadHabKm2} hab/km²` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Número de personas dentro del radio de efectos directos del impacto (explosión, onda térmica)"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Población afectada:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.nafHab ? `${impactData.nafHab.toLocaleString()} hab` : "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimación de fatalidades inmediatas por onda de choque, radiación térmica y proyectiles"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Víctimas directas:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.muertesDirectas || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Estimación de fatalidades por efectos secundarios: colapso de estructuras, incendios, tsunamis, etc."
                              placement="left"
                              hasArrow
                              bg="rgba(251, 146, 60, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Víctimas indirectas:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="orange" fontSize="xs">
                              {impactData.muertesIndirectas || "N/A"}
                            </Badge>
                          </HStack>

                          <Divider borderColor="rgba(245, 101, 101, 0.2)" />

                          <HStack justify="space-between">
                            <Tooltip
                              label="Suma total de víctimas directas e indirectas proyectadas para este escenario de impacto"
                              placement="left"
                              hasArrow
                              bg="rgba(245, 101, 101, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" fontWeight="bold" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Total estimado:
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
                          <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" textAlign="center">
                            {impactData.sPorcentaje || "0"}% de la población nacional
                          </Text>
                        </VStack>
                      </Box>

                      {/* Impacto económico */}
                      <Box p={3} bg="rgba(16, 185, 129, 0.1)" borderRadius="lg" border="1px solid rgba(16, 185, 129, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={TrendingUp} color="#10b981" boxSize={5} />
                          <Text color="#10b981" fontWeight="bold" fontSize="sm">Impacto Económico</Text>
                        </HStack>
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Tooltip
                              label="Producto Interno Bruto total del país afectado en dólares estadounidenses"
                              placement="left"
                              hasArrow
                              bg="rgba(16, 185, 129, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                PIB nacional:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="green" fontSize="xs">
                              ${impactData.GDPtotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="PIB dividido entre la población total, indicador del nivel de vida económico promedio"
                              placement="left"
                              hasArrow
                              bg="rgba(20, 184, 166, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                PIB per cápita:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="teal" fontSize="xs">
                              ${impactData.pibPerCapita || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Pérdida estimada del PIB debido a la reducción de fuerza laboral y capacidad productiva"
                              placement="left"
                              hasArrow
                              bg="rgba(251, 146, 60, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Pérdida PIB total:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="orange" fontSize="xs">
                              ${impactData.perdidaPIBTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Costos totales de daños: infraestructura destruida, reconstrucción, ayuda humanitaria y recuperación"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Daños económicos:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              ${impactData.perdidasEconomicasTotal || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Población que reside en áreas urbanas dentro de la zona de impacto"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Población urbana:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              {impactData.poblacionUrbana || "N/A"}
                            </Badge>
                          </HStack>

                          <HStack justify="space-between">
                            <Tooltip
                              label="Valor estimado de propiedades, infraestructura y activos urbanos por kilómetro cuadrado"
                              placement="left"
                              hasArrow
                              bg="rgba(239, 68, 68, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.5)">
                                Valor urbano por km²:
                              </Text>
                            </Tooltip>
                            <Badge colorScheme="red" fontSize="xs">
                              ${impactData.valorUrbanoUsdKm2 || "N/A"}
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Datos técnicos adicionales */}
                      <Box p={3} bg="rgba(124, 58, 237, 0.1)" borderRadius="lg" border="1px solid rgba(124, 58, 237, 0.2)">
                        <HStack spacing={2} mb={2}>
                          <Icon as={Database} color="#8b5cf6" boxSize={5} />
                          <Text color="#8b5cf6" fontWeight="bold" fontSize="sm">Parámetros Técnicos</Text>
                        </HStack>
                        <SimpleGrid columns={2} spacing={2}>
                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Energía sísmica generada equivalente a un terremoto. Medida en terajoules (TJ)"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Energía sísmica:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.energiaSismica ? `${(impactData.energiaSismica / 1e12).toFixed(1)} TJ` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Fuerza de arrastre atmosférico que actúa sobre el objeto durante la entrada. Medida en giganewtons (GN)"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Fuerza arrastre:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.fuerzaArrastre ? `${(impactData.fuerzaArrastre / 1e9).toFixed(1)} GN` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Intensidad luminosa del bólido durante la entrada atmosférica. Medida en terawatts (TW)"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Luminosidad:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.luminosidad ? `${(impactData.luminosidad / 1e12).toFixed(1)} TW` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Índice de letalidad basado en densidad poblacional, energía del impacto y efectos secundarios"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Factor letalidad:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.factorLetalidad || "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Tasa de ablación: masa perdida por segundo debido a calentamiento y fricción atmosférica"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Pérdida de masa:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.perdida ? `${impactData.perdida.toLocaleString()} kg/s` : "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Coeficiente de transferencia de momento entre el objeto y la atmósfera"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Beta:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.beta || "N/A"}
                            </Text>
                          </VStack>

                          <VStack align="flex-start" spacing={1}>
                            <Tooltip
                              label="Capacidad hospitalaria del país: número de camas disponibles por cada mil habitantes"
                              hasArrow
                              bg="rgba(139, 92, 246, 0.95)"
                              color="white"
                              fontSize="xs"
                            >
                              <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs" cursor="help" borderBottom="1px dotted rgba(147, 197, 253, 0.3)">
                                Camas por mil:
                              </Text>
                            </Tooltip>
                            <Text color="white" fontSize="xs" fontWeight="medium">
                              {impactData.camasPorMil || "N/A"}
                            </Text>
                          </VStack>
                        </SimpleGrid>
                      </Box>

                      {/* Botón de descarga/exportación */}
                      <MotionButton
                        size="sm"
                        bg="rgba(59, 130, 246, 0.1)"
                        color="#60a5fa"
                        border="1px solid rgba(59, 130, 246, 0.3)"
                        borderRadius="lg"
                        _hover={{
                          bg: "rgba(59, 130, 246, 0.2)",
                          borderColor: "rgba(59, 130, 246, 0.5)"
                        }}
                        leftIcon={<Text>📥</Text>}
                      >
                        Exportar Resultados
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