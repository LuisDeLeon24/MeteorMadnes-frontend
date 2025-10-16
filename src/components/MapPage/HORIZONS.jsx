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
	useDisclosure,
	Stack
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
		p={{ base: 4, md: 5 }}
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
			<Stack
				direction={{ base: "column", sm: "row" }}
				spacing={3}
				align="center"
				width="100%"
				justify="center"
			>
				<Circle size={{ base: "40px", md: "45px" }} bg="rgba(124, 58, 237, 0.15)" border="1px solid rgba(124, 58, 237, 0.3)">
					<Icon as={Target} color="#8b5cf6" boxSize={{ base: 5, md: 6 }} />
				</Circle>
				<VStack align={{ base: "center", sm: "flex-start" }} spacing={0}>
					<Text color="white" fontWeight="bold" fontSize={{ base: "md", md: "lg" }} textAlign={{ base: "center", sm: "left" }}>
						NASA JPL HORIZONS
					</Text>
					<Text color="rgba(139, 92, 246, 0.8)" fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" textAlign={{ base: "center", sm: "left" }}>
						Precise Ephemeris & Orbital Data
					</Text>
				</VStack>
			</Stack>

			<Badge
				colorScheme="purple"
				variant="subtle"
				bg="rgba(124, 58, 237, 0.1)"
				color="#8b5cf6"
				px={3}
				py={1}
				borderRadius="full"
				fontSize={{ base: "2xs", md: "xs" }}
				fontWeight="medium"
			>
				🎯 Precise Trajectory Data
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
		p={{ base: 3, md: 4 }}
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
		minH={{ base: "auto", md: "100px" }}
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

		<VStack spacing={{ base: 2, md: 3 }} align="flex-start" position="relative" zIndex={2}>
			<HStack spacing={{ base: 2, md: 3 }} width="100%">
				<Circle size={{ base: "30px", md: "35px" }} bg={`${color}15`} border={`1px solid ${color}30`} flexShrink={0}>
					<Icon as={icon} color={color} boxSize={{ base: 4, md: 5 }} />
				</Circle>
				<VStack align="flex-start" spacing={0} flex={1} minW={0}>
					<Text
						color="rgba(147, 197, 253, 0.7)"
						fontSize={{ base: "2xs", md: "xs" }}
						fontWeight="medium"
						noOfLines={1}
					>
						{title}
					</Text>
					<Text
						color="white"
						fontSize={{ base: "xs", md: "sm" }}
						fontWeight="bold"
						lineHeight="1.2"
						wordBreak="break-word"
					>
						{value || "N/A"}
					</Text>
					{subtitle && (
						<Text
							color="rgba(147, 197, 253, 0.5)"
							fontSize={{ base: "2xs", md: "xs" }}
							noOfLines={1}
						>
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
		p={{ base: 6, md: 8 }}
		bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
		borderRadius="xl"
		border="1px solid rgba(124, 58, 237, 0.1)"
		position="relative"
		overflow="hidden"
	>
		<BackgroundParticles />

		<VStack spacing={4} position="relative" zIndex={2}>
			<Circle size={{ base: "50px", md: "60px" }} bg="rgba(124, 58, 237, 0.1)" border="1px solid rgba(124, 58, 237, 0.2)">
				<Spinner size={{ base: "md", md: "lg" }} color="#8b5cf6" thickness="3px" speed="0.8s" />
			</Circle>

			<VStack spacing={2}>
				<Text color="white" fontWeight="bold" fontSize={{ base: "sm", md: "md" }} textAlign="center">
					Querying JPL HORIZONS
				</Text>
				<Text
					color="rgba(147, 197, 253, 0.7)"
					fontSize={{ base: "xs", md: "sm" }}
					textAlign="center"
					px={{ base: 4, md: 0 }}
				>
					Obtaining ephemeris and orbital elements...
				</Text>
			</VStack>

			<Progress
				size="sm"
				colorScheme="purple"
				isIndeterminate
				bg="rgba(124, 58, 237, 0.1)"
				borderRadius="full"
				width={{ base: "150px", md: "200px" }}
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
		p={{ base: 4, md: 5 }}
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

		<Stack direction={{ base: "column", sm: "row" }} spacing={4} align={{ base: "center", sm: "flex-start" }}>
			<Circle size={{ base: "40px", md: "45px" }} bg="rgba(239, 68, 68, 0.1)" border="1px solid rgba(239, 68, 68, 0.3)" flexShrink={0}>
				<Icon as={AlertTriangle} color="#ef4444" boxSize={{ base: 5, md: 6 }} />
			</Circle>

			<VStack align={{ base: "center", sm: "flex-start" }} spacing={1} flex={1}>
				<Text color="#ef4444" fontWeight="bold" fontSize={{ base: "sm", md: "md" }} textAlign={{ base: "center", sm: "left" }}>
					HORIZONS Query Error
				</Text>
				<Text
					color="rgba(239, 68, 68, 0.8)"
					fontSize={{ base: "xs", md: "sm" }}
					lineHeight="1.4"
					textAlign={{ base: "center", sm: "left" }}
				>
					{error}
				</Text>
			</VStack>
		</Stack>
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
				p={{ base: 3, md: 4 }}
				justifyContent="space-between"
				borderRadius="xl"
				_hover={{
					bg: "rgba(59, 130, 246, 0.05)"
				}}
			>
				<HStack spacing={{ base: 2, md: 3 }}>
					<Circle size={{ base: "30px", md: "35px" }} bg={`${color}15`} border={`1px solid ${color}30`}>
						<Icon as={icon} color={color} boxSize={{ base: 4, md: 5 }} />
					</Circle>
					<Text color="white" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
						{title}
					</Text>
				</HStack>

				<Icon
					as={isOpen ? ChevronUp : ChevronDown}
					color="#60a5fa"
					boxSize={{ base: 5, md: 6 }}
					transition="transform 0.2s"
				/>
			</Button>

			<Collapse in={isOpen}>
				<Box p={{ base: 3, md: 4 }} pt={0}>
					<Divider borderColor="rgba(59, 130, 246, 0.1)" mb={{ base: 3, md: 4 }} />
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
		<TableContainer maxHeight={{ base: "300px", md: "400px" }} overflowY="auto" overflowX="auto">
			<Table variant="simple" size={{ base: "sm", md: "sm" }}>
				<Thead
					position="sticky"
					top={0}
					bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
					zIndex={1}
				>
					<Tr>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">Date</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">RA</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">DEC</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">Delta (AU)</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">deldot</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">Sol. Elong.</Th>
						<Th color="#60a5fa" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" whiteSpace="nowrap">STO</Th>
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
							<Td color="white" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.date}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.RA}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.DEC}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.delta}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.deldot}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.solarElongation}</Td>
							<Td color="rgba(147, 197, 253, 0.8)" fontSize={{ base: "2xs", md: "xs" }} whiteSpace="nowrap">{e.STO}</Td>
						</MotionTr>
					))}
				</Tbody>
			</Table>
		</TableContainer>

		<Box p={{ base: 2, md: 3 }} bg="rgba(59, 130, 246, 0.05)" borderTop="1px solid rgba(59, 130, 246, 0.1)">
			<HStack spacing={2}>
				<Icon as={BarChart3} color="#60a5fa" boxSize={{ base: 3, md: 4 }} />
				<Text color="rgba(147, 197, 253, 0.7)" fontSize={{ base: "2xs", md: "xs" }}>
					{ephemeris.length} ephemeris entries available
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
				maxHeight={{ base: "70vh", md: "80vh" }}
				overflowY="auto"
				p={{ base: 1, md: 2 }}
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
				<VStack spacing={{ base: 4, md: 5 }} align="stretch">
					<Header />

					{/* Panel de información básica */}
					<MotionBox
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						p={{ base: 4, md: 5 }}
						bg="linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(10, 14, 26, 0.4) 100%)"
						borderRadius="xl"
						border="1px solid rgba(59, 130, 246, 0.1)"
						position="relative"
						overflow="hidden"
					>
						<BackgroundParticles />

						<VStack spacing={{ base: 3, md: 4 }} position="relative" zIndex={2}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								spacing={3}
								width="100%"
								align={{ base: "center", sm: "flex-start" }}
							>
								<Circle size={{ base: "35px", md: "40px" }} bg="rgba(124, 58, 237, 0.15)" border="1px solid rgba(124, 58, 237, 0.3)" flexShrink={0}>
									<Icon as={Target} color="#8b5cf6" boxSize={{ base: 5, md: 6 }} />
								</Circle>
								<VStack align={{ base: "center", sm: "flex-start" }} spacing={0} flex={1}>
									<Text
										color="white"
										fontWeight="bold"
										fontSize={{ base: "md", md: "lg" }}
										textAlign={{ base: "center", sm: "left" }}
									>
										{basicInfo?.name || "Unknown Object"}
									</Text>
									<Stack direction={{ base: "column", sm: "row" }} spacing={2} mt={1}>
										<Badge colorScheme="purple" variant="subtle" fontSize={{ base: "2xs", md: "xs" }}>
											HORIZONS Data
										</Badge>
										{basicInfo?.spectralType && (
											<Badge colorScheme="blue" variant="subtle" fontSize={{ base: "2xs", md: "xs" }}>
												Type: {basicInfo.spectralType}
											</Badge>
										)}
									</Stack>
								</VStack>
							</Stack>

							<Divider borderColor="rgba(59, 130, 246, 0.1)" />

							<VStack spacing={{ base: 2, md: 3 }} width="100%" align="stretch">
								<HStack spacing={2}>
									<Icon as={Database} color="#8b5cf6" boxSize={{ base: 4, md: 5 }} />
									<Text color="#8b5cf6" fontWeight="bold" fontSize={{ base: "xs", md: "sm" }}>
										Physical Properties
									</Text>
								</HStack>

								<SimpleGrid columns={{ base: 1, sm: 2, lg: 2 }} spacing={{ base: 2, md: 3 }}>
									<MetricCard
										icon={Ruler}
										title="Radius"
										value={basicInfo?.radius ? `${basicInfo.radius} km` : "N/A"}
										color="#10b981"
										delay={0.1}
										subtitle="Object radius"
									/>
									<MetricCard
										icon={RotateCcw}
										title="Rotation Period"
										value={basicInfo?.rotation ? `${basicInfo.rotation} h` : "N/A"}
										color="#06b6d4"
										delay={0.15}
										subtitle="Rotation time"
									/>
									<MetricCard
										icon={Star}
										title="Absolute Magnitude (H)"
										value={basicInfo?.H}
										color="#f59e0b"
										delay={0.2}
										subtitle="Intrinsic brightness"
									/>
									<MetricCard
										icon={Activity}
										title="Slope Parameter (G)"
										value={basicInfo?.G}
										color="#8b5cf6"
										delay={0.25}
										subtitle="Phase function"
									/>
									<MetricCard
										icon={Palette}
										title="B-V Index"
										value={basicInfo?.BV}
										color="#ec4899"
										delay={0.3}
										subtitle="Object color"
									/>
									<MetricCard
										icon={Sun}
										title="Albedo"
										value={basicInfo?.albedo}
										color="#f97316"
										delay={0.35}
										subtitle="Reflectivity"
									/>
								</SimpleGrid>
							</VStack>
						</VStack>
					</MotionBox>

					{/* Fuerzas no gravitacionales */}
					{nonGravitationalForces && Object.keys(nonGravitationalForces).length > 0 && (
						<CollapsibleSection
							title="Non-Gravitational Forces"
							icon={Zap}
							color="#ef4444"
						>
							<SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 2, md: 3 }}>
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
							title="Non-Standard Model"
							icon={Globe}
							color="#14b8a6"
						>
							<SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 2, md: 3 }}>
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
							title={`Ephemeris (${ephemeris.length} entries)`}
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