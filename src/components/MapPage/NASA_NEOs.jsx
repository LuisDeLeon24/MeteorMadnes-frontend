import { useEffect } from "react";
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  SimpleGrid,
  Center,
  VStack,
  HStack,
  Badge,
  Icon,
  Circle,
  Divider,
  Progress,
  Link,
  Button
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Satellite,
  Calendar,
  Eye,
  MapPin,
  Activity,
  Star,
  Clock,
  Target,
  TrendingUp,
  Zap,
  Telescope,
  AlertTriangle,
  Shield,
  ExternalLink,
  Orbit,
  Ruler,
  Database,
  Globe,
  AlertCircle
} from "lucide-react";
import { useNEOsApi } from "../../Hooks/useNEOsApi";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

// Componente de partículas de fondo
const BackgroundParticles = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width="1.5px"
        height="1.5px"
        bg="rgba(239, 68, 68, 0.4)"
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

// Componente de encabezado mejorado
const Header = () => (
  <MotionBox
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    p={5}
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.6) 0%, rgba(10, 14, 26, 0.6) 100%)"
    borderRadius="xl"
    border="1px solid rgba(239, 68, 68, 0.2)"
    position="relative"
    overflow="hidden"
    mb={6}
  >
    {/* Línea de energía superior */}
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      height="2px"
      bg="linear-gradient(90deg, transparent, #ef4444, #dc2626, transparent)"
      opacity={0.8}
    />

    <BackgroundParticles />

    <VStack spacing={2} position="relative" zIndex={2}>
      <HStack spacing={3}>
        <Circle size="45px" bg="rgba(239, 68, 68, 0.15)" border="1px solid rgba(239, 68, 68, 0.3)">
          <Icon as={Satellite} color="#ef4444" size={22} />
        </Circle>
        <VStack align="flex-start" spacing={0}>
          <Text color="white" fontWeight="bold" fontSize="lg">
            NASA Near Earth Objects
          </Text>
          <Text color="rgba(239, 68, 68, 0.8)" fontSize="sm" fontWeight="medium">
            Center for Near Earth Object Studies
          </Text>
        </VStack>
      </HStack>

      <Badge
        colorScheme="red"
        variant="subtle"
        bg="rgba(239, 68, 68, 0.1)"
        color="#ef4444"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="medium"
      >
        🛰️ Official NASA/JPL Data
      </Badge>
    </VStack>
  </MotionBox>
);

// Componente de métrica individual
const MetricCard = ({ icon, title, value, color = "#ef4444", delay = 0, subtitle = null, isHighlight = false }) => (
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
      ? "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)"
      : "linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    }
    borderRadius="lg"
    border={isHighlight
      ? "1px solid rgba(239, 68, 68, 0.3)"
      : "1px solid rgba(59, 130, 246, 0.1)"
    }
    position="relative"
    overflow="hidden"
    _hover={{
      borderColor: isHighlight ? "rgba(239, 68, 68, 0.5)" : "rgba(59, 130, 246, 0.3)",
      transform: "translateY(-2px)",
      boxShadow: isHighlight
        ? "0 8px 25px rgba(239, 68, 68, 0.2)"
        : "0 8px 25px rgba(59, 130, 246, 0.1)"
    }}
  >
    {/* Efecto de brillo sutil */}
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

// Componente de estado de carga mejorado
const LoadingState = () => (
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    p={8}
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    borderRadius="xl"
    border="1px solid rgba(239, 68, 68, 0.1)"
    position="relative"
    overflow="hidden"
  >
    <BackgroundParticles />

    <VStack spacing={4} position="relative" zIndex={2}>
      <Circle size="60px" bg="rgba(239, 68, 68, 0.1)" border="1px solid rgba(239, 68, 68, 0.2)">
        <Spinner size="lg" color="#ef4444" thickness="3px" speed="0.8s" />
      </Circle>

      <VStack spacing={2}>
        <Text color="white" fontWeight="bold" fontSize="md">
          Querying NASA NEOS
        </Text>
        <Text color="rgba(147, 197, 253, 0.7)" fontSize="sm" textAlign="center">
          Retrieving asteroid data from JPL...
        </Text>
      </VStack>

      <Progress
        size="sm"
        colorScheme="red"
        isIndeterminate
        bg="rgba(239, 68, 68, 0.1)"
        borderRadius="full"
        width="200px"
      />
    </VStack>
  </MotionBox>
);

// Componente de error mejorado
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

    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Circle size="45px" bg="rgba(239, 68, 68, 0.1)" border="1px solid rgba(239, 68, 68, 0.3)">
          <Icon as={AlertTriangle} color="#ef4444" size={22} />
        </Circle>

        <VStack align="flex-start" spacing={1} flex={1}>
          <Text color="#ef4444" fontWeight="bold" fontSize="md">
            NASA Query Error
          </Text>
          <Text color="rgba(239, 68, 68, 0.8)" fontSize="sm" lineHeight="1.4">
            {error}
          </Text>
        </VStack>
      </HStack>

      <Box
        p={3}
        bg="rgba(245, 158, 11, 0.1)"
        borderRadius="lg"
        border="1px solid rgba(245, 158, 11, 0.2)"
      >
        <HStack spacing={2}>
          <Icon as={AlertCircle} color="#f59e0b" size={16} />
          <Text color="rgba(245, 158, 11, 0.9)" fontSize="xs" lineHeight="1.4">
            Try using another Asteroid ID or name, or check another source (JPL HORIZONS or IAU NeoCP).
          </Text>
        </HStack>
      </Box>
    </VStack>
  </MotionBox>
);

// Componente de prompt inicial
const InitialPrompt = () => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    p={5}
    bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
    borderRadius="xl"
    border="1px solid rgba(59, 130, 246, 0.1)"
    position="relative"
    overflow="hidden"
  >
    <VStack spacing={4}>
      <Circle size="50px" bg="rgba(59, 130, 246, 0.1)" border="1px solid rgba(59, 130, 246, 0.2)">
        <Icon as={Database} color="#60a5fa" size={24} />
      </Circle>

      <VStack spacing={2}>
        <Text color="white" fontWeight="bold" fontSize="md" textAlign="center">
          Ready to Query
        </Text>
        <Text color="rgba(147, 197, 253, 0.7)" fontSize="sm" textAlign="center" lineHeight="1.4">
          Enter an asteroid name or ID to get detailed NASA NEOS data
        </Text>
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
        💫 Examples: Apophis, 99942, Bennu
      </Badge>
    </VStack>
  </MotionBox>
);

export function AsteroidInfoNASANEOS({ asteroidId }) {
  const { data, loading, error, searchNEO } = useNEOsApi();

  useEffect(() => {
    if (asteroidId) searchNEO(asteroidId);
  }, [asteroidId, searchNEO]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data) {
    return <InitialPrompt />;
  }

  const d = data;
  const isPotentiallyHazardous = d.is_potentially_hazardous_asteroid;
  const diameterMin = d.estimated_diameter?.kilometers?.estimated_diameter_min;
  const diameterMax = d.estimated_diameter?.kilometers?.estimated_diameter_max;
  const avgDiameter = diameterMin && diameterMax ? ((diameterMin + diameterMax) / 2).toFixed(3) : null;

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key="nasa-neos-data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={5} align="stretch">
          <Header />

          {/* Panel de información principal del asteroide */}
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
                <Circle size="40px" bg="rgba(239, 68, 68, 0.15)" border="1px solid rgba(239, 68, 68, 0.3)">
                  <Icon as={Target} color="#ef4444" size={20} />
                </Circle>
                <VStack align="flex-start" spacing={0} flex={1}>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    {d.name}
                  </Text>
                  <HStack spacing={2}>
                    <Badge
                      colorScheme={isPotentiallyHazardous ? "red" : "green"}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {isPotentiallyHazardous ? "⚠️ Potentially Hazardous" : "✅ Non-Hazardous"}
                    </Badge>
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      fontSize="xs"
                    >
                      ID: {d.id}
                    </Badge>
                  </HStack>
                </VStack>

                <Circle
                  size="35px"
                  bg={isPotentiallyHazardous ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 197, 94, 0.15)"}
                  border={`1px solid ${isPotentiallyHazardous ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.3)"}`}
                >
                  <Icon
                    as={isPotentiallyHazardous ? AlertTriangle : Shield}
                    color={isPotentiallyHazardous ? "#ef4444" : "#22c55e"}
                    size={18}
                  />
                </Circle>
              </HStack>

              <Divider borderColor="rgba(59, 130, 246, 0.1)" />

              {/* Datos Generales */}
              <VStack spacing={4} width="100%" align="stretch">
                <VStack spacing={3} align="stretch">
                  <HStack spacing={2}>
                    <Icon as={Database} color="#60a5fa" size={18} />
                    <Text color="#60a5fa" fontWeight="bold" fontSize="sm">
                      General Data
                    </Text>
                  </HStack>

                  <SimpleGrid columns={2} spacing={3}>
                    <MetricCard
                      icon={Star}
                      title="Designation"
                      value={d.designation}
                      color="#f59e0b"
                      delay={0.1}
                      subtitle="Official designation"
                    />
                    <MetricCard
                      icon={Activity}
                      title="Absolute Magnitude (H)"
                      value={d.absolute_magnitude_h}
                      color="#8b5cf6"
                      delay={0.15}
                      subtitle="Intrinsic brightness"
                    />
                    <MetricCard
                      icon={Ruler}
                      title="Minimum Diameter"
                      value={diameterMin ? `${diameterMin.toFixed(3)} km` : "N/A"}
                      color="#10b981"
                      delay={0.2}
                      subtitle="Lower estimate"
                    />
                    <MetricCard
                      icon={Ruler}
                      title="Maximum Diameter"
                      value={diameterMax ? `${diameterMax.toFixed(3)} km` : "N/A"}
                      color="#06b6d4"
                      delay={0.25}
                      subtitle="Upper estimate"
                    />
                  </SimpleGrid>

                  {avgDiameter && (
                    <MetricCard
                      icon={Target}
                      title="Estimated Average Diameter"
                      value={`${avgDiameter} km`}
                      color="#ec4899"
                      delay={0.3}
                      subtitle="Calculated mean value"
                      isHighlight={true}
                    />
                  )}
                </VStack>

                <Divider borderColor="rgba(59, 130, 246, 0.05)" />

                {/* Datos Orbitales */}
                <VStack spacing={3} align="stretch">
                  <HStack spacing={2}>
                    <Icon as={Orbit} color="#ec4899" size={18} />
                    <Text color="#ec4899" fontWeight="bold" fontSize="sm">
                      Orbital Data
                    </Text>
                  </HStack>

                  <SimpleGrid columns={1} spacing={3}>
                    <MetricCard
                      icon={Database}
                      title="Orbit ID"
                      value={d.orbital_data?.orbit_id}
                      color="#ec4899"
                      delay={0.35}
                      subtitle="Orbital identifier"
                    />
                    <MetricCard
                      icon={Calendar}
                      title="Orbit Determination Date"
                      value={d.orbital_data?.orbit_determination_date}
                      color="#14b8a6"
                      delay={0.4}
                      subtitle="Calculation date"
                    />
                    <MetricCard
                      icon={Eye}
                      title="First Observation"
                      value={d.orbital_data?.first_observation_date}
                      color="#f97316"
                      delay={0.45}
                      subtitle="First sighting"
                    />
                    <MetricCard
                      icon={Clock}
                      title="Last Observation"
                      value={d.orbital_data?.last_observation_date}
                      color="#ef4444"
                      delay={0.5}
                      subtitle="Most recent observation"
                    />
                    <MetricCard
                      icon={TrendingUp}
                      title="Observations Used"
                      value={d.orbital_data?.observations_used}
                      color="#8b5cf6"
                      delay={0.55}
                      subtitle="Data for orbital calculation"
                    />

                    {d.orbital_data?.orbit_class && (
                      <MetricCard
                        icon={Globe}
                        title="Orbit Class"
                        value={`${d.orbital_data.orbit_class.orbit_class_type}`}
                        color="#06b6d4"
                        delay={0.6}
                        subtitle={d.orbital_data.orbit_class.orbit_class_description}
                        isHighlight={true}
                      />
                    )}
                  </SimpleGrid>
                </VStack>
              </VStack>

              {/* Enlace a NASA JPL */}
              {d.nasa_jpl_url && (
                <Box
                  p={4}
                  bg="rgba(59, 130, 246, 0.05)"
                  borderRadius="lg"
                  border="1px solid rgba(59, 130, 246, 0.1)"
                  width="100%"
                >
                  <VStack spacing={3}>
                    <HStack spacing={2}>
                      <Icon as={ExternalLink} color="#60a5fa" size={16} />
                      <Text color="#60a5fa" fontWeight="bold" fontSize="sm">
                        More Information
                      </Text>
                    </HStack>

                    <Link
                      href={d.nasa_jpl_url}
                      target="_blank"
                      rel="noreferrer"
                      width="100%"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        leftIcon={<Icon as={Satellite} size={16} />}
                        rightIcon={<Icon as={ExternalLink} size={14} />}
                        width="100%"
                        bg="rgba(59, 130, 246, 0.05)"
                        borderColor="rgba(59, 130, 246, 0.3)"
                        _hover={{
                          bg: "rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.5)"
                        }}
                      >
                        View on NASA JPL Database
                      </Button>
                    </Link>

                    <Text color="rgba(147, 197, 253, 0.6)" fontSize="xs" textAlign="center">
                      Access complete technical data and orbital trajectory
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>
          </MotionBox>
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
}