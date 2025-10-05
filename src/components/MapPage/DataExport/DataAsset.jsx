import { Box, VStack, Text, SimpleGrid, HStack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const DataAsset = ({ impactData, countryCode, search, horizonsData, formulasData }) => {
  const backgroundColor = "#0D1B46";
  const topBlockColor = "rgba(255, 255, 255, 0.9)"; // menos brillo
  const textColor = "rgba(255, 255, 255, 0.9)";

  // Colores más transparentes para los bloques inferiores
  const bottomBlockColors = [
    "rgba(30, 83, 139, 0.3)",
    "rgba(89, 42, 84, 0.3)",
    "rgba(64, 53, 101, 0.3)",
    "rgba(16, 94, 99, 0.3)",
    "rgba(47, 50, 120, 0.3)",
    "rgba(64, 64, 64, 0.3)",
  ];

  const RoundedBlock = ({ children, color, ...props }) => (
    <MotionBox
      bg={color}
      borderRadius="24px"
      boxShadow="lg"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </MotionBox>
  );

  const blockContents = [
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Estado del Sistema</Text>
        <Text color="rgba(255, 255, 255, 0.9)" fontSize="xs">País: {countryCode || "No seleccionado"}</Text>
        <Text color="rgba(255, 255, 255, 0.9)" fontSize="xs">Asteroide: {search || "No definido"}</Text>
        <Text color="rgba(255, 255, 255, 0.9)" fontSize="xs">Datos HORIZONS: {horizonsData ? "✓ Disponibles" : "Sin datos"}</Text>
        <Text color="rgba(250, 250, 250, 0.9)" fontSize="xs">Datos Fórmulas: {formulasData ? "✓ Disponibles" : "Sin datos"}</Text>
      </VStack>
    ),
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Impacto Físico</Text>
        <Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Energía liberada: {impactData?.energyMt || "N/A"} MT</Text>
        <Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Área Transversal: {impactData?.areaTransversal || "N/A"} m²</Text>
        <Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Energía cinética: {impactData?.energiaCinetica || "N/A"} PJ</Text>
        <Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Altura fragmentación: {impactData?.alturaFragmentacion || "N/A"} km</Text>
      </VStack>
    ),
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Impacto Económico</Text>
        <Text color="rgba(253, 147, 253, 0.9)" fontSize="xs">PIB total: ${impactData?.GDPtotal || "N/A"}</Text>
        <Text color="rgba(253, 147, 244, 0.9)" fontSize="xs">PIB per cápita: ${impactData?.pibPerCapita || "N/A"}</Text>
        <Text color="rgba(249, 147, 253, 0.9)" fontSize="xs">Pérdida PIB: ${impactData?.perdidaPIBTotal || "N/A"}</Text>
      </VStack>
    ),
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Impacto Poblacional</Text>
        <Text color="rgba(147, 253, 156, 0.9)" fontSize="xs">Población afectada: {impactData?.nafHab || "N/A"}</Text>
        <Text color="rgba(147, 253, 170, 0.9)" fontSize="xs">Víctimas directas: {impactData?.muertesDirectas || "N/A"}</Text>
        <Text color="rgba(147, 253, 161, 0.9)" fontSize="xs">Víctimas indirectas: {impactData?.muertesIndirectas || "N/A"}</Text>
      </VStack>
    ),
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Mitigaciones</Text>
        <Text color="rgba(255, 223, 107, 0.9)" fontSize="xs">Predicción de Consecuencias: {impactData?.prediccionConsecuencias || "Sin datos"}</Text>
        <Text color="rgba(255, 223, 107, 0.9)" fontSize="xs">Estrategias: {impactData?.estrategiasMitigacion || "Pendiente"}</Text>
      </VStack>
    ),
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Daño Ambiental</Text>
        <Text color="rgba(239, 68, 68, 0.9)" fontSize="xs">Emisiones CO2: {impactData?.emisionesCO2 || "Sin datos"}</Text>
        <Text color="rgba(239, 68, 68, 0.9)" fontSize="xs">Superficie deforestada: {impactData?.deforestacionHa || "Sin datos"} ha</Text>
        <Text color="rgba(239, 68, 68, 0.9)" fontSize="xs">Pérdida biodiversidad: {impactData?.perdidaEspecies || "Sin datos"}</Text>
        <Text color="rgba(239, 68, 68, 0.9)" fontSize="xs">Contaminación Agua: {impactData?.contaminacionAgua || "Sin datos"} ppm</Text>
        <Text color="rgba(239, 68, 68, 0.9)" fontSize="xs">Ecosistemas afectados: {impactData?.ecosistemasAfectados || "Sin datos"}</Text>
      </VStack>
    ),
  ];

  return (
    <Box
      bg={backgroundColor}
      minHeight="auto"
      width="100%"
      p={8}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <VStack spacing={6} width={{ base: "90%", sm: "400px", md: "500px" }}>
        {/* Bloque superior con logo */}
        <RoundedBlock color={topBlockColor}>
          <HStack justify="space-between" width="100%">
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              {impactData?.name || "Objeto Detectado"}
            </Text>
            <Image
              src="/assets/images/Main_Logo-removebg-preview.png"
              alt="Logo"
              boxSize="40px"
              objectFit="contain"
            />
          </HStack>
        </RoundedBlock>

        {/* Bloques inferiores */}
        <SimpleGrid columns={2} spacing={4} width="100%">
          {bottomBlockColors.map((color, index) => (
            <RoundedBlock key={index} color={color}>
              {blockContents[index]}
            </RoundedBlock>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default DataAsset;
