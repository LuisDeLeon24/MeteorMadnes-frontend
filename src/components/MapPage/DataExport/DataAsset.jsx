import { Box, VStack, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const DataAsset = ({ impactData, countryCode, search, horizonsData, formulasData }) => {
	const backgroundColor = "#0a0a0a";
	const topBlockColor = "#141414";
	const textColor = "rgba(255, 255, 255, 0.9)";

	const bottomBlockColors = [
		"#141414",
		"#141414",
		"#141414",
		"#141414",
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
				<Text color={textColor} fontWeight="bold" fontSize="sm">System Status</Text>
				<Text color={textColor} fontSize="xs">Country: {countryCode || "Not selected"}</Text>
				<Text color={textColor} fontSize="xs">Asteroid: {search || "Not defined"}</Text>
				<Text color={textColor} fontSize="xs">HORIZONS Data: {horizonsData ? "✓ Available" : "No data"}</Text>
				<Text color={textColor} fontSize="xs">Formulas Data: {formulasData ? "✓ Available" : "No data"}</Text>
			</VStack>
		),
		(
			<VStack spacing={1} align="flex-start">
				<Text color={textColor} fontWeight="bold" fontSize="sm">Physical Impact</Text>
				<Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Energy Released: {impactData?.energyMt || "N/A"} MT</Text>
				<Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Transversal Area: {impactData?.areaTransversal || "N/A"} m²</Text>
				<Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Kinetic Energy: {impactData?.energiaCinetica || "N/A"} PJ</Text>
				<Text color="rgba(147, 228, 253, 0.9)" fontSize="xs">Fragmentation Height: {impactData?.alturaFragmentacion || "N/A"} km</Text>
			</VStack>
		),
		(
			<VStack spacing={1} align="flex-start">
				<Text color={textColor} fontWeight="bold" fontSize="sm">Economic Impact</Text>
				<Text color="rgba(253, 147, 253, 0.9)" fontSize="xs">Total GDP: ${impactData?.GDPtotal || "N/A"}</Text>
				<Text color="rgba(253, 147, 244, 0.9)" fontSize="xs">GDP Per Capita: ${impactData?.pibPerCapita || "N/A"}</Text>
				<Text color="rgba(249, 147, 253, 0.9)" fontSize="xs">GDP Loss: ${impactData?.perdidaPIBTotal || "N/A"}</Text>
			</VStack>
		),
		(
			<VStack spacing={1} align="flex-start">
				<Text color={textColor} fontWeight="bold" fontSize="sm">Population Impact</Text>
				<Text color="rgba(147, 253, 156, 0.9)" fontSize="xs">Affected Population: {impactData?.nafHab || "N/A"}</Text>
				<Text color="rgba(147, 253, 170, 0.9)" fontSize="xs">Direct Casualties: {impactData?.muertesDirectas || "N/A"}</Text>
				<Text color="rgba(147, 253, 161, 0.9)" fontSize="xs">Indirect Casualties: {impactData?.muertesIndirectas || "N/A"}</Text>
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
					<Text fontSize="xl" fontWeight="bold" color="#f4f4f4" textAlign="center">
						{impactData?.name || "Detected Object"}
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
				<RoundedBlock color="#141414" textAlign="center">
					<Text fontSize="sm" color="white">
						Don't forget to share it on your social media and tag us as <b>@badvoids</b>
					</Text>
					<Text fontSize="sm" color="white">
						Visit our page: <a href="https://astrotracker.wiki" target="_blank" rel="noopener noreferrer">astrotracker.wiki</a>
					</Text>
				</RoundedBlock>
			</VStack>
		</Box>
	);
};

export default DataAsset;