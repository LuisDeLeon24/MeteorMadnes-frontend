import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  SimpleGrid,
  Center,
  Badge,
  Icon,
  Circle,
  Divider,
  Progress,
  Tooltip
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Eye,
  Calendar,
  MapPin,
  Activity,
  Clock,
  Target,
  Telescope,
  Star,
  AlertTriangle,
  Search,
  Database
} from "lucide-react";
import { usePNeos } from "../../Hooks/usePNEOS";

const MotionBox = motion.create(Box);

// Componente de partículas de fondo (mismo del Sidebar)
const BackgroundParticles = () => null;

// Componente de estado de carga mejorado
const LoadingSpinner = () => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Center py={10}>
      <VStack spacing={4}>
        <Box position="relative">
          <Spinner
            size="xl"
            color="#f4f4f4"
            thickness="3px"
            speed="0.8s"
            emptyColor="#2a2a2a"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon as={Search} color="#f4f4f4" size={20} />
          </Box>
        </Box>
        <Text color="#9a9a9a" fontSize="sm" fontWeight="medium">
          Consulting NEO Confirmation Page...
        </Text>
      </VStack>
    </Center>
  </MotionBox>
);

// Componente de alerta mejorado
const EnhancedAlert = ({ status, title, message }) => {
  const statusConfig = {
    warning: {
      bg: "#141414",
      border: "rgba(245, 158, 11, 0.3)",
      icon: AlertTriangle,
      color: "#f4f4f4"
    },
    error: {
      bg: "#141414",
      border: "rgba(220, 38, 38, 0.3)",
      icon: AlertTriangle,
      color: "#ef4444"
    }
  };

  const config = statusConfig[status];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={4}
      bg={config.bg}
      border="1px solid"
      borderColor={config.border}
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
        bg={`#141414`}
        opacity={0.6}
      />

      <HStack spacing={3}>
        <Circle size="35px" bg={`${config.color}20`} border={`1px solid ${config.color}50`}>
          <Icon as={config.icon} color={config.color} size={18} />
        </Circle>
        <VStack align="flex-start" spacing={1} flex={1}>
          <Text color={config.color} fontWeight="bold" fontSize="sm">
            {title}
          </Text>
          <Text color="#9a9a9a" fontSize="xs">
            {message}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

// Componente de métrica individual
const MetricCard = ({ icon, label, value, color = "#f4f4f4", delay = 0, tooltip }) => {
  const content = (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      p={3}
      bg="rgba(3, 7, 18, 0.4)"
      borderRadius="lg"
      border="1px solid #2a2a2a"
      position="relative"
      overflow="hidden"
      _hover={{
        borderColor: "#2a2a2a",
        bg: "rgba(3, 7, 18, 0.6)"
      }}
      cursor={tooltip ? "help" : "default"}
    >
      <VStack spacing={2} align="stretch">
        <HStack spacing={2}>
          <Circle size="25px" bg={`${color}20`} border={`1px solid ${color}30`}>
            <Icon as={icon} color={color} size={12} />
          </Circle>
          <Text color="#9a9a9a" fontSize="xs" fontWeight="medium">
            {label}
          </Text>
        </HStack>
        <Text color="white" fontSize="sm" fontWeight="bold" textAlign="left">
          {value || "N/A"}
        </Text>
      </VStack>
    </MotionBox>
  );

  return tooltip ? (
    <Tooltip
      label={tooltip}
      placement="top"
      hasArrow
      bg="#141414"
      color="white"
      borderColor="#2a2a2a"
      fontSize="xs"
    >
      {content}
    </Tooltip>
  ) : content;
};

export function PNeoInfo({ tempDesig }) {
  const { data, loading, error, fetchPneo } = usePNeos();
  const [displayData, setDisplayData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!tempDesig) return;

    setNotFound(false);
    setDisplayData(null);

    fetchPneo(tempDesig)
      .then(res => {
        if (!res) setNotFound(true);
        else setDisplayData(res);
      })
      .catch(() => setNotFound(true));
  }, [tempDesig, fetchPneo]);

  if (notFound) {
    return (
      <EnhancedAlert
        status="warning"
        title="Object Not Found"
        message={`The NEO with designation "${tempDesig}" is not in the IAU Minor Planet Center database. Try another data source.`}
      />
    );
  }

  if (error) {
    return (
      <EnhancedAlert
        status="error"
        title="Connection Error"
        message={error}
      />
    );
  }

  if (loading || (!displayData && tempDesig)) {
    return <LoadingSpinner />;
  }

  if (!displayData) return null;

  const {
    tempDesig: id,
    score,
    vMagnitude,
    discoveryDate,
    position,
    updated,
    nObs,
    arc,
    hMagnitude,
    notSeenDays,
  } = displayData;

  // Calcular nivel de riesgo basado en score
  const getRiskLevel = (score) => {
    if (score >= 90) return { level: "HIGH", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" };
    if (score >= 70) return { level: "MEDIUM", color: "#f4f4f4", bg: "rgba(245, 158, 11, 0.1)" };
    return { level: "LOW", color: "#f4f4f4", bg: "rgba(16, 185, 129, 0.1)" };
  };

  const riskInfo = getRiskLevel(score);
  const formattedDate = discoveryDate ?
    `${discoveryDate.year}-${String(discoveryDate.month).padStart(2, '0')}-${String(discoveryDate.day).padStart(2, '0')}` :
    "N/A";

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      position="relative"
      overflow="hidden"
    >
      <BackgroundParticles />

      <VStack spacing={5} align="stretch" position="relative" zIndex={2}>
        {/* Header del objeto */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          p={4}
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
            height="3px"
            bg="#141414"
            opacity={0.7}
          />

          <VStack spacing={3} align="stretch">
            <HStack spacing={3} justify="space-between">
              <HStack spacing={3}>
                <Circle size="40px" bg="#2a2a2a" border="1px solid #2a2a2a">
                  <Icon as={Globe} color="#f4f4f4" size={20} />
                </Circle>
                <VStack align="flex-start" spacing={0}>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    {id}
                  </Text>
                  <Text color="#9a9a9a" fontSize="xs">
                    Near-Earth Object Confirmation Page
                  </Text>
                </VStack>
              </HStack>

              <Badge
                bg={riskInfo.bg}
                color={riskInfo.color}
                border={`1px solid ${riskInfo.color}50`}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                RISK {riskInfo.level}
              </Badge>
            </HStack>

            {/* Score Progress */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text color="#9a9a9a" fontSize="xs">Confirmation Score</Text>
                <Text color="white" fontSize="sm" fontWeight="bold">{score}/100</Text>
              </HStack>
              <Progress
                value={score}
                size="sm"
                bg="#2a2a2a"
                borderRadius="full"
                colorScheme={score >= 90 ? "red" : score >= 70 ? "orange" : "green"}
              />
            </Box>
          </VStack>
        </MotionBox>

        {/* Datos principales */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          p={4}
          bg="rgba(3, 7, 18, 0.4)"
          borderRadius="xl"
          border="1px solid #2a2a2a"
        >
          <HStack spacing={3} mb={4}>
            <Icon as={Database} color="#f4f4f4" size={20} />
            <Text color="white" fontWeight="bold" fontSize="md">
              Observational Data
            </Text>
          </HStack>

          <SimpleGrid columns={2} spacing={3}>
            <MetricCard
              icon={Eye}
              label="Visual Magnitude"
              value={vMagnitude}
              color="#f4f4f4"
              delay={0.1}
              tooltip="Apparent brightness of the object as seen from Earth"
            />

            <MetricCard
              icon={Star}
              label="H Magnitude"
              value={hMagnitude}
              color="#ec4899"
              delay={0.15}
              tooltip="Absolute magnitude - intrinsic brightness of the object"
            />

            <MetricCard
              icon={Target}
              label="Observations"
              value={`${nObs} obs`}
              color="#f4f4f4"
              delay={0.2}
              tooltip="Total number of registered observations"
            />

            <MetricCard
              icon={Activity}
              label="Observational Arc"
              value={arc}
              color="#f4f4f4"
              delay={0.25}
              tooltip="Period of time covered by the observations"
            />

            <MetricCard
              icon={Clock}
              label="Days Unseen"
              value={`${notSeenDays} days`}
              color={notSeenDays > 30 ? "#ef4444" : "#f4f4f4"}
              delay={0.3}
              tooltip="Days elapsed since the last observation"
            />

            <MetricCard
              icon={Calendar}
              label="Discovery"
              value={formattedDate}
              color="#06b6d4"
              delay={0.35}
              tooltip="Object discovery date"
            />
          </SimpleGrid>
        </MotionBox>

        {/* Coordenadas y posición */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          p={4}
          bg="rgba(3, 7, 18, 0.4)"
          borderRadius="xl"
          border="1px solid #2a2a2a"
        >
          <HStack spacing={3} mb={4}>
            <Icon as={MapPin} color="#f4f4f4" size={20} />
            <Text color="white" fontWeight="bold" fontSize="md">
              Celestial Coordinates
            </Text>
          </HStack>

          <SimpleGrid columns={1} spacing={3}>
            <Box
              p={3}
              bg="#2a2a2a"
              borderRadius="lg"
              border="1px solid #2a2a2a"
            >
              <VStack spacing={2} align="stretch">
                <HStack justify="space-between">
                  <Text color="#9a9a9a" fontSize="xs">Right Ascension (RA):</Text>
                  <Text color="white" fontSize="sm" fontWeight="medium" fontFamily="mono">
                    {position?.ra || "N/A"}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="#9a9a9a" fontSize="xs">Declination (Dec):</Text>
                  <Text color="white" fontSize="sm" fontWeight="medium" fontFamily="mono">
                    {position?.dec || "N/A"}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </MotionBox>

        {/* Información de actualización */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          p={3}
          bg="rgba(124, 58, 237, 0.1)"
          borderRadius="lg"
          border="1px solid rgba(124, 58, 237, 0.2)"
        >
          <HStack spacing={2}>
            <Icon as={Clock} color="#f4f4f4" size={16} />
            <Text color="#f4f4f4" fontSize="xs" fontWeight="medium">
              Last update:
            </Text>
            <Text color="#9a9a9a" fontSize="xs">
              {updated || "N/A"}
            </Text>
          </HStack>
        </MotionBox>

        {/* Disclaimer */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          p={3}
          bg="#2a2a2a"
          borderRadius="lg"
          border="1px solid #2a2a2a"
        >
          <Text color="#9a9a9a" fontSize="xs" textAlign="center" lineHeight="1.4">
            Objects on the NeoCP are asteroid candidates that require additional observational confirmation.
            A high score indicates a greater probability of being a real object.
          </Text>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
}