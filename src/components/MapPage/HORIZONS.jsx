import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Badge,
  Icon,
  Circle,
  Divider,
  Progress,
  Collapse,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Calendar,
  Eye,
  MapPin,
  Activity,
  Star,
  Clock,
  Orbit,
  TrendingUp,
  Zap,
  Telescope,
  AlertTriangle,
  Database,
  Globe,
  Satellite,
  Calculator,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Ruler,
  Palette,
  RotateCcw,
  Sun
} from "lucide-react";
import { useHORIZONs } from "../../Hooks/useHORIZONs";
import React, { useEffect, useState } from "react";

const MotionBox = motion.create(Box);
const MotionTr = motion.create(Tr);

// Componente de partículas de fondo
const BackgroundParticles = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width="1.5px"
        height="1.5px"
        bg="rgba(124, 58, 237, 0.4)"
        borderRadius="full"
        top={`${15 + Math.random() * 70}%`}
        left={`${15 + Math.random() * 70}%`}
        animation={`twinkle ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`}
        zIndex={1}
      />
    ))}
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
    `}</style>
  </>
);

// Componente de encabezado
const Header = () => (
  <MotionBox
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    p={5}
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.6) 0%, rgba(10, 14, 26, 0.6) 100%)"
    borderRadius="xl"
    border="1px solid rgba(124, 58, 237, 0.2)"
    position="relative"
    overflow="hidden"
    mb={6}
  >
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      height="2px"
      bg="linear-gradient(90deg, transparent, #7c3aed, #8b5cf6, transparent)"
      opacity={0.8}
    />

    <BackgroundParticles />

    <VStack spacing={2} position="relative" zIndex={2}>
      <HStack spacing={3}>
        <Circle size="45px" bg="rgba(124, 58, 237, 0.15)" border="1px solid rgba(124, 58, 237, 0.3)">
          <Icon as={Target} color="#8b5cf6" size={22} />
        </Circle>
        <VStack align="flex-start" spacing={0}>
          <Text color="white" fontWeight="bold" fontSize="lg">
            NASA JPL HORIZONS
          </Text>
          <Text color="rgba(139, 92, 246, 0.8)" fontSize="sm" fontWeight="medium">
            Precise Ephemeris & Orbital Data
          </Text>
        </VStack>
      </HStack>

      <Badge
        colorScheme="purple"
        variant="subtle"
        bg="rgba(124, 58, 237, 0.1)"
        color="#8b5cf6"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="medium"
      >
        🎯 Datos Precisos de Trayectoria
      </Badge>
    </VStack>
  </MotionBox>
);

// Componente de métrica individual
const MetricCard = ({ icon, title, value, color = "#8b5cf6", delay = 0, subtitle = null, isHighlight = false }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.5,
      delay: delay,
      ease: [0.4, 0, 0.2, 1]
    }}
    p={4}
    bg={isHighlight
      ? "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)"
      : "linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    }
    borderRadius="lg"
    border={isHighlight
      ? "1px solid rgba(124, 58, 237, 0.3)"
      : "1px solid rgba(59, 130, 246, 0.1)"
    }
    position="relative"
    overflow="hidden"
    _hover={{
      borderColor: isHighlight ? "rgba(124, 58, 237, 0.5)" : "rgba(59, 130, 246, 0.3)",
      transform: "translateY(-2px)",
      boxShadow: isHighlight
        ? "0 8px 25px rgba(124, 58, 237, 0.2)"
        : "0 8px 25px rgba(59, 130, 246, 0.1)"
    }}
  >
    <Box
      position="absolute"
      top="0"
      left="-100%"
      width="100%"
      height="100%"
      bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)"
      animation="shimmer 3s ease-in-out infinite"
      sx={{
        '@keyframes shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        }
      }}
    />

    <VStack spacing={3} align="flex-start" position="relative" zIndex={2}>
      <HStack spacing={3} width="100%">
        <Circle size="35px" bg={`${color}15`} border={`1px solid ${color}30`}>
          <Icon as={icon} color={color} size={18} />
        </Circle>
        <VStack align="flex-start" spacing={0} flex={1}>
          <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" fontWeight="medium">
            {title}
          </Text>
          <Text color="white" fontSize="sm" fontWeight="bold" lineHeight="1.2">
            {value || "N/A"}
          </Text>
          {subtitle && (
            <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs">
              {subtitle}
            </Text>
          )}
        </VStack>
      </HStack>
    </VStack>
  </MotionBox>
);

// Componente de estado de carga
const LoadingState = () => (
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    p={8}
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    borderRadius="xl"
    border="1px solid rgba(124, 58, 237, 0.1)"
    position="relative"
    overflow="hidden"
  >
    <BackgroundParticles />

    <VStack spacing={4} position="relative" zIndex={2}>
      <Circle size="60px" bg="rgba(124, 58, 237, 0.1)" border="1px solid rgba(124, 58, 237, 0.2)">
        <Spinner size="lg" color="#8b5cf6" thickness="3px" speed="0.8s" />
      </Circle>

      <VStack spacing={2}>
        <Text color="white" fontWeight="bold" fontSize="md">
          Consultando JPL HORIZONS
        </Text>
        <Text color="rgba(147, 197, 253, 0.7)" fontSize="sm" textAlign="center">
          Obteniendo efemérides y elementos orbitales...
        </Text>
      </VStack>

      <Progress
        size="sm"
        colorScheme="purple"
        isIndeterminate
        bg="rgba(124, 58, 237, 0.1)"
        borderRadius="full"
        width="200px"
      />
    </VStack>
  </MotionBox>
);

// Componente de error
const ErrorState = ({ error }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    p={5}
    bg="linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)"
    border="1px solid rgba(220, 38, 38, 0.3)"
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
      bg="linear-gradient(90deg, transparent, #ef4444, transparent)"
      opacity={0.6}
    />

    <HStack spacing={4}>
      <Circle size="45px" bg="rgba(239, 68, 68, 0.1)" border="1px solid rgba(239, 68, 68, 0.3)">
        <Icon as={AlertTriangle} color="#ef4444" size={22} />
      </Circle>

      <VStack align="flex-start" spacing={1} flex={1}>
        <Text color="#ef4444" fontWeight="bold" fontSize="md">
          Error de Consulta HORIZONS
        </Text>
        <Text color="rgba(239, 68, 68, 0.8)" fontSize="sm" lineHeight="1.4">
          {error}
        </Text>
      </VStack>
    </HStack>
  </MotionBox>
);

// Sección plegable mejorada
const CollapsibleSection = ({ title, icon, color, children, defaultOpen = false }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: defaultOpen });

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
      borderRadius="xl"
      border="1px solid rgba(59, 130, 246, 0.1)"
      overflow="hidden"
    >
      <Button
        onClick={onToggle}
        variant="ghost"
        width="100%"
        height="auto"
        p={4}
        justifyContent="space-between"
        borderRadius="xl"
        _hover={{
          bg: "rgba(59, 130, 246, 0.05)"
        }}
      >
        <HStack spacing={3}>
          <Circle size="35px" bg={`${color}15`} border={`1px solid ${color}30`}>
            <Icon as={icon} color={color} size={18} />
          </Circle>
          <Text color="white" fontWeight="bold" fontSize="md">
            {title}
          </Text>
        </HStack>

        <Icon
          as={isOpen ? ChevronUp : ChevronDown}
          color="#60a5fa"
          size={20}
          transition="transform 0.2s"
        />
      </Button>

      <Collapse in={isOpen}>
        <Box p={4} pt={0}>
          <Divider borderColor="rgba(59, 130, 246, 0.1)" mb={4} />
          {children}
        </Box>
      </Collapse>
    </MotionBox>
  );
};

// Tabla de efemérides mejorada
const EphemerisTable = ({ ephemeris }) => (
  <Box
    bg="rgba(3, 7, 18, 0.6)"
    borderRadius="lg"
    border="1px solid rgba(59, 130, 246, 0.1)"
    overflow="hidden"
  >
    <TableContainer maxHeight="400px" overflowY="auto">
      <Table variant="simple" size="sm">
        <Thead
          position="sticky"
          top={0}
          bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
          zIndex={1}
        >
          <Tr>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">Fecha</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">RA</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">DEC</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">Delta (AU)</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">deldot</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">Sol. Elong.</Th>
            <Th color="#60a5fa" fontSize="xs" fontWeight="bold">STO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ephemeris.map((e, index) => (
            <MotionTr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              _hover={{
                bg: "rgba(59, 130, 246, 0.05)"
              }}
            >
              <Td color="white" fontSize="xs">{e.date}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.RA}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.DEC}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.delta}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.deldot}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.solarElongation}</Td>
              <Td color="rgba(147, 197, 253, 0.8)" fontSize="xs">{e.STO}</Td>
            </MotionTr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

    <Box p={3} bg="rgba(59, 130, 246, 0.05)" borderTop="1px solid rgba(59, 130, 246, 0.1)">
      <HStack spacing={2}>
        <Icon as={BarChart3} color="#60a5fa" size={14} />
        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">
          {ephemeris.length} entradas de efemérides disponibles
        </Text>
      </HStack>
    </Box>
  </Box>
);

export const HORIZONS = ({ asteroidId }) => {
  const { data, loading, error, fetchHORIZONS } = useHORIZONs();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!asteroidId) return;

    setNotFound(false);

    fetchHORIZONS(asteroidId).then(res => {
      if (!res) setNotFound(true);
    }).catch(() => setNotFound(true));
  }, [asteroidId, fetchHORIZONS]);

  if (error) {
    return <ErrorState error={error} />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!data) return <Header />;

  const { basicInfo, orbitalElements, nonGravitationalForces, nonStandardModel, ephemeris } = data;

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key="horizons-data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        maxHeight="80vh"
        overflowY="auto"
        p={2}
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
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(59, 130, 246, 0.6)',
          },
        }}
      >
        <VStack spacing={5} align="stretch">
          <Header />

          {/* Panel de información básica */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            p={5}
            bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
            borderRadius="xl"
            border="1px solid rgba(59, 130, 246, 0.1)"
            position="relative"
            overflow="hidden"
          >
            <BackgroundParticles />

            <VStack spacing={4} position="relative" zIndex={2}>
              <HStack spacing={3} width="100%">
                <Circle size="40px" bg="rgba(124, 58, 237, 0.15)" border="1px solid rgba(124, 58, 237, 0.3)">
                  <Icon as={Target} color="#8b5cf6" size={20} />
                </Circle>
                <VStack align="flex-start" spacing={0} flex={1}>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    {basicInfo?.name || "Objeto Desconocido"}
                  </Text>
                  <HStack spacing={2}>
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      Datos HORIZONS
                    </Badge>
                    {basicInfo?.spectralType && (
                      <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                        Tipo: {basicInfo.spectralType}
                      </Badge>
                    )}
                  </HStack>
                </VStack>
              </HStack>

              <Divider borderColor="rgba(59, 130, 246, 0.1)" />

              <VStack spacing={3} width="100%" align="stretch">
                <HStack spacing={2}>
                  <Icon as={Database} color="#8b5cf6" size={18} />
                  <Text color="#8b5cf6" fontWeight="bold" fontSize="sm">
                    Propiedades Físicas
                  </Text>
                </HStack>

                <SimpleGrid columns={2} spacing={3}>
                  <MetricCard
                    icon={Ruler}
                    title="Radio"
                    value={basicInfo?.radius ? `${basicInfo.radius} km` : "N/A"}
                    color="#10b981"
                    delay={0.1}
                    subtitle="Radio del objeto"
                  />
                  <MetricCard
                    icon={RotateCcw}
                    title="Período de Rotación"
                    value={basicInfo?.rotation ? `${basicInfo.rotation} h` : "N/A"}
                    color="#06b6d4"
                    delay={0.15}
                    subtitle="Tiempo de rotación"
                  />
                  <MetricCard
                    icon={Star}
                    title="Magnitud Absoluta (H)"
                    value={basicInfo?.H}
                    color="#f59e0b"
                    delay={0.2}
                    subtitle="Brillo intrínseco"
                  />
                  <MetricCard
                    icon={Activity}
                    title="Parámetro de Pendiente (G)"
                    value={basicInfo?.G}
                    color="#8b5cf6"
                    delay={0.25}
                    subtitle="Función de fase"
                  />
                  <MetricCard
                    icon={Palette}
                    title="Índice B-V"
                    value={basicInfo?.BV}
                    color="#ec4899"
                    delay={0.3}
                    subtitle="Color del objeto"
                  />
                  <MetricCard
                    icon={Sun}
                    title="Albedo"
                    value={basicInfo?.albedo}
                    color="#f97316"
                    delay={0.35}
                    subtitle="Reflectividad"
                  />
                </SimpleGrid>
              </VStack>
            </VStack>
          </MotionBox>

          {/* Fuerzas no gravitacionales */}
          {nonGravitationalForces && Object.keys(nonGravitationalForces).length > 0 && (
            <CollapsibleSection
              title="Fuerzas No Gravitacionales"
              icon={Zap}
              color="#ef4444"
            >
              <SimpleGrid columns={2} spacing={3}>
                {Object.entries(nonGravitationalForces).map(([key, value], index) => (
                  <MetricCard
                    key={key}
                    icon={Calculator}
                    title={key}
                    value={value}
                    color="#ef4444"
                    delay={index * 0.05}
                  />
                ))}
              </SimpleGrid>
            </CollapsibleSection>
          )}

          {/* Modelo no estándar */}
          {nonStandardModel && Object.keys(nonStandardModel).length > 0 && (
            <CollapsibleSection
              title="Modelo No Estándar"
              icon={Globe}
              color="#14b8a6"
            >
              <SimpleGrid columns={2} spacing={3}>
                {Object.entries(nonStandardModel).map(([key, value], index) => (
                  <MetricCard
                    key={key}
                    icon={Database}
                    title={key}
                    value={value}
                    color="#14b8a6"
                    delay={index * 0.05}
                  />
                ))}
              </SimpleGrid>
            </CollapsibleSection>
          )}

          {/* Efemérides */}
          {ephemeris && ephemeris.length > 0 && (
            <CollapsibleSection
              title={`Efemérides (${ephemeris.length} entradas)`}
              icon={Telescope}
              color="#60a5fa"
              defaultOpen={true}
            >
              <EphemerisTable ephemeris={ephemeris} />
            </CollapsibleSection>
          )}
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
};