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
const BackgroundParticles = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width="1px"
        height="1px"
        bg="rgba(96, 165, 250, 0.4)"
        borderRadius="full"
        top={`${20 + Math.random() * 60}%`}
        left={`${10 + Math.random() * 80}%`}
        animation={`twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`}
        zIndex={1}
      />
    ))}
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.5); }
      }
    `}</style>
  </>
);

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
            color="#60a5fa"
            thickness="3px"
            speed="0.8s"
            emptyColor="rgba(59, 130, 246, 0.1)"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon as={Search} color="#60a5fa" size={20} />
          </Box>
        </Box>
        <Text color="rgba(147, 197, 253, 0.8)" fontSize="sm" fontWeight="medium">
          Consultando NEO Confirmation Page...
        </Text>
      </VStack>
    </Center>
  </MotionBox>
);

// Componente de alerta mejorado
const EnhancedAlert = ({ status, title, message }) => {
  const statusConfig = {
    warning: {
      bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
      border: "rgba(245, 158, 11, 0.3)",
      icon: AlertTriangle,
      color: "#f59e0b"
    },
    error: {
      bg: "linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)",
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
        bg={`linear-gradient(90deg, transparent, ${config.color}, transparent)`}
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
          <Text color="rgba(147, 197, 253, 0.8)" fontSize="xs">
            {message}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

// Componente de métrica individual
const MetricCard = ({ icon, label, value, color = "#60a5fa", delay = 0, tooltip }) => {
  const content = (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      p={3}
      bg="rgba(3, 7, 18, 0.4)"
      borderRadius="lg"
      border="1px solid rgba(59, 130, 246, 0.1)"
      position="relative"
      overflow="hidden"
      _hover={{
        borderColor: "rgba(59, 130, 246, 0.3)",
        bg: "rgba(3, 7, 18, 0.6)"
      }}
      cursor={tooltip ? "help" : "default"}
    >
      <VStack spacing={2} align="stretch">
        <HStack spacing={2}>
          <Circle size="25px" bg={`${color}20`} border={`1px solid ${color}30`}>
            <Icon as={icon} color={color} size={12} />
          </Circle>
          <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs" fontWeight="medium">
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
      bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
      color="white"
      borderColor="rgba(59, 130, 246, 0.3)"
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
        title="Objeto No Encontrado"
        message={`El NEO con designación "${tempDesig}" no se encuentra en la base de datos del IAU Minor Planet Center. Intenta con otra fuente de datos.`}
      />
    );
  }

  if (error) {
    return (
      <EnhancedAlert
        status="error"
        title="Error de Conexión"
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
    if (score >= 90) return { level: "ALTO", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" };
    if (score >= 70) return { level: "MEDIO", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" };
    return { level: "BAJO", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
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
          bg="linear-gradient(135deg, rgba(3, 7, 18, 0.6) 0%, rgba(10, 14, 26, 0.6) 100%)"
          borderRadius="xl"
          border="1px solid rgba(59, 130, 246, 0.2)"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="3px"
            bg="linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent)"
            opacity={0.7}
          />

          <VStack spacing={3} align="stretch">
            <HStack spacing={3} justify="space-between">
              <HStack spacing={3}>
                <Circle size="40px" bg="rgba(59, 130, 246, 0.1)" border="1px solid rgba(59, 130, 246, 0.3)">
                  <Icon as={Globe} color="#60a5fa" size={20} />
                </Circle>
                <VStack align="flex-start" spacing={0}>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    {id}
                  </Text>
                  <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">
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
                RIESGO {riskInfo.level}
              </Badge>
            </HStack>

            {/* Score Progress */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Score de Confirmación</Text>
                <Text color="white" fontSize="sm" fontWeight="bold">{score}/100</Text>
              </HStack>
              <Progress
                value={score}
                size="sm"
                bg="rgba(59, 130, 246, 0.1)"
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
          border="1px solid rgba(59, 130, 246, 0.1)"
        >
          <HStack spacing={3} mb={4}>
            <Icon as={Database} color="#60a5fa" size={20} />
            <Text color="white" fontWeight="bold" fontSize="md">
              Datos Observacionales
            </Text>
          </HStack>

          <SimpleGrid columns={2} spacing={3}>
            <MetricCard
              icon={Eye}
              label="Magnitud Visual"
              value={vMagnitude}
              color="#8b5cf6"
              delay={0.1}
              tooltip="Brillo aparente del objeto visto desde la Tierra"
            />

            <MetricCard
              icon={Star}
              label="Magnitud H"
              value={hMagnitude}
              color="#ec4899"
              delay={0.15}
              tooltip="Magnitud absoluta - brillo intrínseco del objeto"
            />

            <MetricCard
              icon={Target}
              label="Observaciones"
              value={`${nObs} obs`}
              color="#10b981"
              delay={0.2}
              tooltip="Número total de observaciones registradas"
            />

            <MetricCard
              icon={Activity}
              label="Arco Observacional"
              value={arc}
              color="#f59e0b"
              delay={0.25}
              tooltip="Periodo de tiempo cubierto por las observaciones"
            />

            <MetricCard
              icon={Clock}
              label="Días Sin Ver"
              value={`${notSeenDays} días`}
              color={notSeenDays > 30 ? "#ef4444" : "#60a5fa"}
              delay={0.3}
              tooltip="Días transcurridos desde la última observación"
            />

            <MetricCard
              icon={Calendar}
              label="Descubrimiento"
              value={formattedDate}
              color="#06b6d4"
              delay={0.35}
              tooltip="Fecha de descubrimiento del objeto"
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
          border="1px solid rgba(59, 130, 246, 0.1)"
        >
          <HStack spacing={3} mb={4}>
            <Icon as={MapPin} color="#60a5fa" size={20} />
            <Text color="white" fontWeight="bold" fontSize="md">
              Coordenadas Celestiales
            </Text>
          </HStack>

          <SimpleGrid columns={1} spacing={3}>
            <Box
              p={3}
              bg="rgba(59, 130, 246, 0.05)"
              borderRadius="lg"
              border="1px solid rgba(59, 130, 246, 0.1)"
            >
              <VStack spacing={2} align="stretch">
                <HStack justify="space-between">
                  <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Ascensión Recta (RA):</Text>
                  <Text color="white" fontSize="sm" fontWeight="medium" fontFamily="mono">
                    {position?.ra || "N/A"}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Declinación (Dec):</Text>
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
            <Icon as={Clock} color="#8b5cf6" size={16} />
            <Text color="#8b5cf6" fontSize="xs" fontWeight="medium">
              Última actualización:
            </Text>
            <Text color="rgba(147, 197, 253, 0.8)" fontSize="xs">
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
          bg="rgba(59, 130, 246, 0.05)"
          borderRadius="lg"
          border="1px solid rgba(59, 130, 246, 0.1)"
        >
          <Text color="rgba(147, 197, 253, 0.6)" fontSize="xs" textAlign="center" lineHeight="1.4">
            Los objetos en el NeoCP son candidatos a asteroides que requieren confirmación observacional adicional.
            Un score alto indica mayor probabilidad de ser un objeto real.
          </Text>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
}