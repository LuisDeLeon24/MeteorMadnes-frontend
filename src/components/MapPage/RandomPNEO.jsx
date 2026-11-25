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
  Progress,
  Stack
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

// Background particles component
const BackgroundParticles = () => null;

// Component to get score color
const getScoreColor = (score) => {
  if (score >= 80) return "red";
  if (score >= 60) return "orange";
  if (score >= 40) return "yellow";
  return "green";
};

// Component to get magnitude color
const getMagnitudeColor = (magnitude) => {
  if (magnitude <= 18) return "green";
  if (magnitude <= 20) return "yellow";
  if (magnitude <= 22) return "orange";
  return "red";
};

export function RandomPNeosList() {
  const { data, loading, error, fetchRandomPneos } = usePNeos();

  // Load random PNEOs on component mount
  useEffect(() => {
    fetchRandomPneos();
  }, []); // Only on mount

  if (loading) {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        p={{ base: 6, md: 8 }}
        bg="#141414"
        borderRadius="xl"
        border="1px solid #2a2a2a"
        position="relative"
        overflow="hidden"
      >
        <BackgroundParticles />
        <Center>
          <VStack spacing={4}>
            <Box position="relative">
              <Spinner 
                size={{ base: "lg", md: "xl" }}
                color="#f4f4f4"
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
                <Icon as={Target} color="#f4f4f4" boxSize={{ base: 5, md: 6 }} />
              </Box>
            </Box>
            <Text 
              color="#9a9a9a" 
              fontSize={{ base: "xs", md: "sm" }} 
              fontWeight="medium"
              textAlign="center"
              px={{ base: 4, md: 0 }}
            >
              Scanning pending confirmation NEOs...
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
        p={{ base: 3, md: 4 }}
        bg="#141414"
        border="1px solid rgba(220, 38, 38, 0.3)"
        borderRadius="xl"
        position="relative"
      >
        <Stack direction={{ base: "column", sm: "row" }} spacing={3} align={{ base: "center", sm: "flex-start" }}>
          <Icon as={AlertTriangle} color="#ef4444" boxSize={{ base: 5, md: 6 }} flexShrink={0} />
          <VStack align={{ base: "center", sm: "flex-start" }} spacing={1}>
            <Text 
              color="#ef4444" 
              fontWeight="bold" 
              fontSize={{ base: "xs", md: "sm" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              System Error
            </Text>
            <Text 
              color="rgba(239, 68, 68, 0.8)" 
              fontSize={{ base: "2xs", md: "xs" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              {error}
            </Text>
          </VStack>
        </Stack>
      </MotionBox>
    );
  }

  if (!data || data.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        p={{ base: 3, md: 4 }}
        bg="#141414"
        border="1px solid rgba(245, 158, 11, 0.3)"
        borderRadius="xl"
        position="relative"
      >
        <Stack direction={{ base: "column", sm: "row" }} spacing={3} align={{ base: "center", sm: "flex-start" }}>
          <Icon as={Eye} color="#f4f4f4" boxSize={{ base: 5, md: 6 }} flexShrink={0} />
          <VStack align={{ base: "center", sm: "flex-start" }} spacing={1}>
            <Text 
              color="#f4f4f4" 
              fontWeight="bold" 
              fontSize={{ base: "xs", md: "sm" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              No Data Available
            </Text>
            <Text 
              color="rgba(245, 158, 11, 0.8)" 
              fontSize={{ base: "2xs", md: "xs" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              No random NEOs were found at this time.
            </Text>
          </VStack>
        </Stack>
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
        p={{ base: 3, md: 4 }}
        bg="#141414"
        borderRadius="xl"
        border="1px solid #2a2a2a"
        mb={{ base: 3, md: 4 }}
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
        
        <VStack spacing={{ base: 3, md: 4 }}>
          <Stack 
            direction={{ base: "column", sm: "row" }}
            spacing={3} 
            width="100%" 
            justify="space-between"
            align={{ base: "center", sm: "flex-start" }}
          >
            <HStack spacing={{ base: 2, md: 3 }}>
              <Icon as={Star} color="#f4f4f4" boxSize={{ base: 5, md: 6 }} />
              <VStack align="flex-start" spacing={0}>
                <Text 
                  color="white" 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  Featured NEOs
                </Text>
                <Text 
                  color="#9a9a9a" 
                  fontSize={{ base: "2xs", md: "xs" }}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  Pending Confirmation
                </Text>
              </VStack>
            </HStack>
            
            <Badge 
              colorScheme="blue" 
              variant="subtle" 
              bg="#2a2a2a" 
              color="#f4f4f4"
              px={{ base: 2, md: 3 }}
              py={1}
              borderRadius="full"
              fontSize={{ base: "2xs", md: "xs" }}
            >
              {data[0]?.demo ? "Demo data" : `${data.length} objects`}
            </Badge>
          </Stack>

          <MotionButton
            onClick={fetchRandomPneos}
            size={{ base: "sm", md: "md" }}
            width="100%"
            height={{ base: "36px", md: "40px" }}
            bg="#141414"
            color="white"
            fontWeight="bold"
            fontSize={{ base: "xs", md: "sm" }}
            borderRadius="lg"
            border="2px solid #2a2a2a"
            leftIcon={<Icon as={RefreshCw} boxSize={{ base: 3.5, md: 4 }} />}
            _hover={{
              background: "#141414",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 20px #2a2a2a"
            }}
            
            
          >
            Refresh Data
          </MotionButton>
        </VStack>
      </Box>

      {/* Lista de NEOs */}
      <VStack spacing={{ base: 2.5, md: 3 }} align="stretch">
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
                p={{ base: 3, md: 4 }}
                bg="#141414"
                borderRadius="lg"
                border="1px solid #2a2a2a"
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: "#2a2a2a",
                  boxShadow: "0 4px 20px #2a2a2a",
                  transform: "translateY(-2px)"
                }}
                
                cursor="pointer"
              >
                {/* Efecto de brillo sutil */}
                <Box
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="100%"
                  height="100%"
                  bg="#141414"
                  animation="shimmer 3s ease-in-out infinite"
                  zIndex={1}
                />

                <VStack spacing={{ base: 2.5, md: 3 }} align="stretch" position="relative" zIndex={2}>
                  {/* Header del NEO */}
                  <Stack 
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between" 
                    align={{ base: "stretch", sm: "flex-start" }}
                    spacing={3}
                  >
                    <HStack spacing={{ base: 2, md: 3 }}>
                      <Circle 
                        size={{ base: "35px", md: "40px" }} 
                        bg="#2a2a2a" 
                        border="1px solid #2a2a2a"
                        flexShrink={0}
                      >
                        <Icon as={Target} color="#f4f4f4" boxSize={{ base: 4, md: 5 }} />
                      </Circle>
                      <VStack align="flex-start" spacing={0}>
                        <Text 
                          color="white" 
                          fontWeight="bold" 
                          fontSize={{ base: "xs", md: "sm" }}
                          wordBreak="break-word"
                        >
                          {tempDesig}
                        </Text>
                        <Text 
                          color="#9a9a9a" 
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          Temporary Designation
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Badge 
                      colorScheme={getScoreColor(score)} 
                      variant="subtle"
                      fontSize={{ base: "2xs", md: "xs" }}
                      fontWeight="bold"
                      alignSelf={{ base: "flex-start", sm: "center" }}
                    >
                      Score: {score}
                    </Badge>
                  </Stack>

                  {/* Datos principales en grid */}
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 2, md: 3 }}>
                    {/* Magnitud Visual */}
                    <Box 
                      p={{ base: 2, md: 2.5 }} 
                      bg="#2a2a2a" 
                      borderRadius="md" 
                      border="1px solid #2a2a2a"
                    >
                      <HStack spacing={2} mb={1}>
                        <Icon as={Eye} color="#f4f4f4" boxSize={{ base: 3, md: 3.5 }} />
                        <Text 
                          color="#9a9a9a" 
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          Visual Mag.
                        </Text>
                      </HStack>
                      <Text 
                        color="white" 
                        fontSize={{ base: "xs", md: "sm" }} 
                        fontWeight="medium"
                      >
                        {vMagnitude}
                      </Text>
                    </Box>

                    {/* Fecha de descubrimiento */}
                    <Box 
                      p={{ base: 2, md: 2.5 }} 
                      bg="rgba(16, 185, 129, 0.05)" 
                      borderRadius="md" 
                      border="1px solid rgba(16, 185, 129, 0.1)"
                    >
                      <HStack spacing={2} mb={1}>
                        <Icon as={Calendar} color="#f4f4f4" boxSize={{ base: 3, md: 3.5 }} />
                        <Text 
                          color="#9a9a9a" 
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          Discovered
                        </Text>
                      </HStack>
                      <Text 
                        color="white" 
                        fontSize={{ base: "xs", md: "sm" }} 
                        fontWeight="medium"
                      >
                        {`${discoveryDate.year}-${discoveryDate.month.toString().padStart(2, '0')}-${discoveryDate.day.toString().padStart(2, '0')}`}
                      </Text>
                    </Box>

                    {/* Posición */}
                    <Box 
                      p={{ base: 2, md: 2.5 }} 
                      bg="rgba(124, 58, 237, 0.05)" 
                      borderRadius="md" 
                      border="1px solid rgba(124, 58, 237, 0.1)"
                    >
                      <HStack spacing={2} mb={1}>
                        <Icon as={MapPin} color="#f4f4f4" boxSize={{ base: 3, md: 3.5 }} />
                        <Text 
                          color="#9a9a9a" 
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          Position
                        </Text>
                      </HStack>
                      <Text 
                        color="white" 
                        fontSize={{ base: "2xs", md: "xs" }} 
                        fontWeight="medium"
                      >
                        RA: {position.ra}
                      </Text>
                      <Text 
                        color="white" 
                        fontSize={{ base: "2xs", md: "xs" }} 
                        fontWeight="medium"
                      >
                        Dec: {position.dec}
                      </Text>
                    </Box>

                    {/* Observaciones */}
                    <Box 
                      p={{ base: 2, md: 2.5 }} 
                      bg="rgba(245, 158, 11, 0.05)" 
                      borderRadius="md" 
                      border="1px solid rgba(245, 158, 11, 0.1)"
                    >
                      <HStack spacing={2} mb={1}>
                        <Icon as={TrendingUp} color="#f4f4f4" boxSize={{ base: 3, md: 3.5 }} />
                        <Text 
                          color="#9a9a9a" 
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          Observations
                        </Text>
                      </HStack>
                      <Text 
                        color="white" 
                        fontSize={{ base: "xs", md: "sm" }} 
                        fontWeight="medium"
                      >
                        {nObs} obs
                      </Text>
                    </Box>
                  </SimpleGrid>

                  {/* Datos adicionales */}
                  <Box 
                    p={{ base: 2, md: 2.5 }} 
                    bg="rgba(3, 7, 18, 0.3)" 
                    borderRadius="md" 
                    border="1px solid #2a2a2a"
                  >
                    <SimpleGrid columns={3} spacing={{ base: 1.5, md: 2 }} fontSize={{ base: "2xs", md: "xs" }}>
                      <VStack spacing={1}>
                        <Text color="#9a9a9a">Arc</Text>
                        <Text color="white" fontWeight="medium">{arc}</Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text color="#9a9a9a">H Mag</Text>
                        <Text color="white" fontWeight="medium">{hMagnitude}</Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text color="#9a9a9a">Not Seen</Text>
                        <Text color="white" fontWeight="medium">{notSeenDays}d</Text>
                      </VStack>
                    </SimpleGrid>
                  </Box>

                  {/* Barra de progreso basada en score */}
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text 
                        color="#9a9a9a" 
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                        Priority Level
                      </Text>
                      <Text 
                        color="#9a9a9a" 
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                        {score}%
                      </Text>
                    </HStack>
                    <Progress
                      value={score}
                      size="sm"
                      colorScheme={getScoreColor(score)}
                      bg="#2a2a2a"
                      borderRadius="full"
                    />
                  </Box>

                  {/* Footer con fecha de actualización */}
                  <Stack 
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between" 
                    pt={2}
                    spacing={{ base: 2, sm: 0 }}
                  >
                    <HStack spacing={2}>
                      <Icon as={Clock} color="#9a9a9a" boxSize={{ base: 3, md: 3.5 }} />
                      <Text 
                        color="#9a9a9a" 
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                        Updated: {updated}
                      </Text>
                    </HStack>
                    
                    {notSeenDays > 7 && (
                      <Badge 
                        colorScheme="red" 
                        variant="subtle" 
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                         Critical
                      </Badge>
                    )}
                  </Stack>
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