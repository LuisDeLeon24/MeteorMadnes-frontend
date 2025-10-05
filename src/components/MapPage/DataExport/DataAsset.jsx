import { Box, VStack, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const DataAsset = ({ impactData, countryCode, search, horizonsData, formulasData }) => {
  const backgroundColor = "#000000ff";
  const topBlockColor = "rgba(3, 3, 3, 0.9)";
  const textColor = "rgba(255, 255, 255, 0.9)";

  const bottomBlockColors = [
    "rgba(30, 83, 139, 0.3)",
    "rgba(89, 42, 84, 0.3)",
    "rgba(64, 53, 101, 0.3)",
    "rgba(16, 94, 99, 0.3)",
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
      alignItems="center"
      whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      width="100%"
      {...props}
    >
      {children}
    </MotionBox>
  );

  const blockContents = [
    (
      <VStack spacing={1} align="flex-start">
        <Text color={textColor} fontWeight="bold" fontSize="sm">Estado del Sistema</Text>
        <Text color={textColor} fontSize="xs">País: {countryCode || "No seleccionado"}</Text>
        <Text color={textColor} fontSize="xs">Asteroide: {search || "No definido"}</Text>
        <Text color={textColor} fontSize="xs">Datos HORIZONS: {horizonsData ? "✓ Disponibles" : "Sin datos"}</Text>
        <Text color={textColor} fontSize="xs">Datos Fórmulas: {formulasData ? "✓ Disponibles" : "Sin datos"}</Text>
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
  ];

  // Mantener ancho fijo para 4:5, alto dinámico según contenido
  const width = 400;

  return (
    <Box
      bg={backgroundColor}
      width={`${width}px`}
      borderRadius="16px"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      p={6}
      overflow="visible" // importante para que no se corte nada
    >
      <VStack spacing={4} width="100%">
        
        {/* Logo */}
        <Image
          src="/assets/images/Main_Logo-removebg-preview.png"
          alt="Logo Proyecto"
          boxSize="120px"
          objectFit="contain"
        />

        {/* Nombre del objeto */}
        <RoundedBlock color={topBlockColor}>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
            {impactData?.name || "Objeto Detectado"}
          </Text>
        </RoundedBlock>

        {/* Bloques de datos */}
        <SimpleGrid columns={2} spacing={4} width="100%">
          {bottomBlockColors.map((color, index) => (
            <RoundedBlock key={index} color={color}>
              {blockContents[index]}
            </RoundedBlock>
          ))}
        </SimpleGrid>

        {/* Bloque social */}
        <RoundedBlock color="rgba(255,255,255,0.1)" textAlign="center">
          <Text fontSize="sm" color="white">
            ¡No olvides compartirlo en tus redes sociales y etiquetarnos como <b>@badvoids</b>! 🚀
          </Text>
          <Text fontSize="sm" color="white">
            Visita nuestra página: <a href="https://astrotracker.wiki" target="_blank" rel="noopener noreferrer">astrotracker.wiki</a>
          </Text>
        </RoundedBlock>
      </VStack>
    </Box>
  );
};

export default DataAsset;
