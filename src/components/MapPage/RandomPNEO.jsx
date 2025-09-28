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
  Divider,
  Button,
  VStack,
  HStack,
  Badge,
  Icon,
  Circle,
  Progress
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Eye,
  Calendar,
  MapPin,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Star,
  AlertTriangle
} from "lucide-react";
import { usePNeos } from "../../Hooks/usePNEOS";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// Componente de partículas de fondo
const BackgroundParticles = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width="2px"
        height="2px"
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
        50% { opacity: 0.8; transform: scale(1.3); }
      }
    `}</style>
  </>
);

// Componente para obtener el color del score
const getScoreColor = (score) => {
  if (score >= 80) return "red";
  if (score >= 60) return "orange";
  if (score >= 40) return "yellow";
  return "green";
};

// Componente para obtener el color de la magnitud
const getMagnitudeColor = (magnitude) => {
  if (magnitude <= 18) return "green";
  if (magnitude <= 20) return "yellow";
  if (magnitude <= 22) return "orange";
  return "red";
};

export function RandomPNeosList() {
  const { data, loading, error, fetchRandomPneos } = usePNeos();

  // Cargar PNEOs aleatorios al montar el componente
  useEffect(() => {
    fetchRandomPneos();
  }, []); // Solo al montar

  if (loading) {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        p={8}
        bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
        borderRadius="xl"
        border="1px solid rgba(59, 130, 246, 0.2)"
        position="relative"
        overflow="hidden"
      >
        <BackgroundParticles />
        <Center>
          <VStack spacing={4}>
            <Box position="relative">
              <Spinner 
                size="xl" 
                color="#60a5fa"
                thickness="3px"
                speed="0.8s"
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                animation="pulse 2s ease-in-out infinite"
              >
                <Icon as={Target} color="#60a5fa" size={24} />
              </Box>
            </Box>
            <Text color="rgba(147, 197, 253, 0.8)" fontSize="sm" fontWeight="medium">
              Escaneando NEOs pendientes de confirmación...
            </Text>
          </VStack>
        </Center>
      </MotionBox>
    );
  }

  if (error) {
    return (
      <MotionBox
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
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
              Error de Sistema
            </Text>
            <Text color="rgba(239, 68, 68, 0.8)" fontSize="xs">
              {error}
            </Text>
          </VStack>
        </HStack>
      </MotionBox>
    );
  }

  if (!data || data.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        p={4}
        bg="linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)"
        border="1px solid rgba(245, 158, 11, 0.3)"
        borderRadius="xl"
        position="relative"
      >
        <HStack spacing={3}>
          <Icon as={Eye} color="#f59e0b" size={20} />
          <VStack align="flex-start" spacing={1}>
            <Text color="#f59e0b" fontWeight="bold" fontSize="sm">
              Sin Datos Disponibles
            </Text>
            <Text color="rgba(245, 158, 11, 0.8)" fontSize="xs">
              No se encontraron PNEOs aleatorios en este momento.
            </Text>
          </VStack>
        </HStack>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      position="relative"
    >
      {/* Header con título y botón de refresh */}
      <Box
        p={4}
        bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
        borderRadius="xl"
        border="1px solid rgba(59, 130, 246, 0.1)"
        mb={4}
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
        
        <VStack spacing={4}>
          <HStack spacing={3} width="100%" justify="space-between">
            <HStack spacing={3}>
              <Icon as={Star} color="#60a5fa" size={24} />
              <VStack align="flex-start" spacing={0}>
                <Text color="white" fontWeight="bold" fontSize="md">
                  NEOs Destacados
                </Text>
                <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">
                  Pendientes de confirmación
                </Text>
              </VStack>
            </HStack>
            
            <Badge 
              colorScheme="blue" 
              variant="subtle" 
              bg="rgba(59, 130, 246, 0.1)" 
              color="#60a5fa"
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              {data.length} objetos
            </Badge>
          </HStack>

          <MotionButton
            onClick={fetchRandomPneos}
            size="sm"
            width="100%"
            height="40px"
            bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
            color="white"
            fontWeight="bold"
            borderRadius="lg"
            border="2px solid rgba(59, 130, 246, 0.3)"
            leftIcon={<Icon as={RefreshCw} size={16} />}
            _hover={{
              background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Actualizar Datos
          </MotionButton>
        </VStack>
      </Box>

      {/* Lista de NEOs */}
      <VStack spacing={3} align="stretch">
        <AnimatePresence>
          {data.map((neo, index) => {
            const {
              tempDesig,
              score,
              vMagnitude,
              discoveryDate,
              position,
              updated,
              nObs,
              arc,
              hMagnitude,
              notSeenDays,
            } = neo;

            return (
              <MotionBox
                key={neo._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
                p={4}
                bg="linear-gradient(135deg, rgba(3, 7, 18, 0.3) 0%, rgba(10, 14, 26, 0.3) 100%)"
                borderRadius="lg"
                border="1px solid rgba(59, 130, 246, 0.1)"
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
                  transform: "translateY(-2px)"
                }}
                whileHover={{ scale: 1.01 }}
                cursor="pointer"
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
                  zIndex={1}
                />

                <VStack spacing={3} align="stretch" position="relative" zIndex={2}>
                  {/* Header del NEO */}
                  <HStack justify="space-between" align="flex-start">
                    <HStack spacing={3}>
                      <Circle size="40px" bg="rgba(59, 130, 246, 0.1)" border="1px solid rgba(59, 130, 246, 0.2)">
                        <Icon as={Target} color="#60a5fa" size={18} />
                      </Circle>
                      <VStack align="flex-start" spacing={0}>
                        <Text color="white" fontWeight="bold" fontSize="sm">
                          {tempDesig}
                        </Text>
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">
                          Designación temporal
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Badge 
                      colorScheme={getScoreColor(score)} 
                      variant="subtle"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      Score: {score}
                    </Badge>
                  </HStack>

                  {/* Datos principales en grid */}
                  <SimpleGrid columns={2} spacing={3}>
                    {/* Magnitud Visual */}
                    <Box p={2} bg="rgba(59, 130, 246, 0.05)" borderRadius="md" border="1px solid rgba(59, 130, 246, 0.1)">
                      <HStack spacing={2} mb={1}>
                        <Icon as={Eye} color="#60a5fa" size={14} />
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Mag. Visual</Text>
                      </HStack>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {vMagnitude}
                      </Text>
                    </Box>

                    {/* Fecha de descubrimiento */}
                    <Box p={2} bg="rgba(16, 185, 129, 0.05)" borderRadius="md" border="1px solid rgba(16, 185, 129, 0.1)">
                      <HStack spacing={2} mb={1}>
                        <Icon as={Calendar} color="#10b981" size={14} />
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Descubierto</Text>
                      </HStack>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {`${discoveryDate.year}-${discoveryDate.month.toString().padStart(2, '0')}-${discoveryDate.day.toString().padStart(2, '0')}`}
                      </Text>
                    </Box>

                    {/* Posición */}
                    <Box p={2} bg="rgba(124, 58, 237, 0.05)" borderRadius="md" border="1px solid rgba(124, 58, 237, 0.1)">
                      <HStack spacing={2} mb={1}>
                        <Icon as={MapPin} color="#8b5cf6" size={14} />
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Posición</Text>
                      </HStack>
                      <Text color="white" fontSize="xs" fontWeight="medium">
                        RA: {position.ra}
                      </Text>
                      <Text color="white" fontSize="xs" fontWeight="medium">
                        Dec: {position.dec}
                      </Text>
                    </Box>

                    {/* Observaciones */}
                    <Box p={2} bg="rgba(245, 158, 11, 0.05)" borderRadius="md" border="1px solid rgba(245, 158, 11, 0.1)">
                      <HStack spacing={2} mb={1}>
                        <Icon as={TrendingUp} color="#f59e0b" size={14} />
                        <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Observaciones</Text>
                      </HStack>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {nObs} obs
                      </Text>
                    </Box>
                  </SimpleGrid>

                  {/* Datos adicionales */}
                  <Box p={2} bg="rgba(3, 7, 18, 0.3)" borderRadius="md" border="1px solid rgba(59, 130, 246, 0.05)">
                    <SimpleGrid columns={3} spacing={2} fontSize="xs">
                      <VStack spacing={1}>
                        <Text color="rgba(147, 197, 253, 0.5)">Arco</Text>
                        <Text color="white" fontWeight="medium">{arc}</Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text color="rgba(147, 197, 253, 0.5)">H Mag</Text>
                        <Text color="white" fontWeight="medium">{hMagnitude}</Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text color="rgba(147, 197, 253, 0.5)">No visto</Text>
                        <Text color="white" fontWeight="medium">{notSeenDays}d</Text>
                      </VStack>
                    </SimpleGrid>
                  </Box>

                  {/* Barra de progreso basada en score */}
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">Nivel de Prioridad</Text>
                      <Text color="rgba(147, 197, 253, 0.7)" fontSize="xs">{score}%</Text>
                    </HStack>
                    <Progress
                      value={score}
                      size="sm"
                      colorScheme={getScoreColor(score)}
                      bg="rgba(59, 130, 246, 0.1)"
                      borderRadius="full"
                    />
                  </Box>

                  {/* Footer con fecha de actualización */}
                  <HStack justify="space-between" pt={2}>
                    <HStack spacing={2}>
                      <Icon as={Clock} color="rgba(147, 197, 253, 0.5)" size={12} />
                      <Text color="rgba(147, 197, 253, 0.5)" fontSize="xs">
                        Actualizado: {updated}
                      </Text>
                    </HStack>
                    
                    {notSeenDays > 7 && (
                      <Badge colorScheme="red" variant="subtle" fontSize="xs">
                        ⚠️ Crítico
                      </Badge>
                    )}
                  </HStack>
                </VStack>
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </VStack>

      {/* CSS para animaciones */}
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </MotionBox>
  );
}