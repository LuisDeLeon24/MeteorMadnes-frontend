import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Stack,
    Flex,
    VStack,
    HStack,
    Badge,
    Divider,
    Progress
} from '@chakra-ui/react';
import {
    Telescope,
    Zap,
    Shield,
    Radar,
    Satellite,
    Target,
    ArrowRight,
    Play,
    Star,
    AlertTriangle,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Hero = () => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [progress, setProgress] = useState(0);
    const [asteroidCount, setAsteroidCount] = useState(847);

    const features = [
        { icon: <Telescope size={24} />, text: "Detección Temprana", color: "#0ea5e9" },
        { icon: <Radar size={24} />, text: "Análisis Orbital", color: "#3b82f6" },
        { icon: <Shield size={24} />, text: "Sistema de Defensa", color: "#1d4ed8" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3500);

        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
        }, 80);

        const asteroidInterval = setInterval(() => {
            setAsteroidCount((prev) => prev + Math.floor(Math.random() * 3));
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
            clearInterval(asteroidInterval);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Box
            as="section"
            position="relative"
            minH="100vh"
            display="flex"
            alignItems="center"
            overflow="hidden"
            bg="linear-gradient(135deg, #000000 0%, #0f172a 30%, #1e293b 70%, #334155 100%)"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
            }}
        >
            <ParticleBackground />

            {/* Elementos decorativos de fondo simulando el espacio */}
            <MotionBox
                position="absolute"
                top="15%"
                right="8%"
                width="350px"
                height="350px"
                borderRadius="50%"
                bg="linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.05))"
                filter="blur(120px)"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <MotionBox
                position="absolute"
                bottom="25%"
                left="3%"
                width="280px"
                height="280px"
                borderRadius="50%"
                bg="linear-gradient(45deg, rgba(29, 78, 216, 0.12), rgba(14, 165, 233, 0.06))"
                filter="blur(100px)"
                animate={{
                    scale: [1.3, 1, 1.3],
                    x: [0, 60, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Asteroides flotantes decorativos */}
            <MotionBox
                position="absolute"
                top="10%"
                left="20%"
                w="4px"
                h="4px"
                bg="#0ea5e9"
                borderRadius="50%"
                boxShadow="0 0 15px rgba(14, 165, 233, 0.8)"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 0
                }}
            />

            <MotionBox
                position="absolute"
                top="70%"
                right="15%"
                w="3px"
                h="3px"
                bg="#3b82f6"
                borderRadius="50%"
                boxShadow="0 0 12px rgba(59, 130, 246, 0.8)"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    opacity: [0.4, 1, 0.4]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: 2
                }}
            />

            <Container maxW="container.xl" position="relative" zIndex="2">
                <MotionFlex
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    direction={{ base: 'column', lg: 'row' }}
                    align={{ base: 'center', lg: 'flex-start' }}
                    spacing={12}
                    py={{ base: 20, md: 28 }}
                    gap={{ base: 12, lg: 16 }}
                >
                    {/* Columna Izquierda - Contenido */}
                    <MotionBox flex={1} variants={itemVariants}>
                        <VStack spacing={8} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>

                            {/* Badge de Sistema Activo */}
                            <MotionBox
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Badge
                                    bg="linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.3))"
                                    color="white"
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    fontSize="sm"
                                    fontWeight="bold"
                                    border="1px solid"
                                    borderColor="rgba(14, 165, 233, 0.3)"
                                    backdropFilter="blur(10px)"
                                >
                                    <HStack spacing={2}>
                                        <Activity size={14} />
                                        <Text>Sistema Activo 24/7</Text>
                                    </HStack>
                                </Badge>
                            </MotionBox>

                            {/* Logo y Título Principal */}
                            <MotionBox variants={itemVariants}>
                                <VStack spacing={6}>
                                    <MotionFlex
                                        align="start"
                                        justify={{ base: 'start', lg: 'flex-start' }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <MotionBox
                                            mr={4}
                                            p={3}
                                            borderRadius="2xl"
                                            bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                                            color="white"
                                            whileHover={{
                                                rotate: [0, -10, 10, 0],
                                                boxShadow: "0 0 40px rgba(14, 165, 233, 0.6)"
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Satellite size={40} />
                                        </MotionBox>
                                        <VStack spacing={0} align="start">
                                            <Text
                                                fontSize="3xl"
                                                fontWeight="900"
                                                bgGradient="linear(to-r, #ffffff, #e2e8f0, #0ea5e9)"
                                                bgClip="text"
                                                letterSpacing="tight"
                                            >
                                                AstroTracker
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="blue.300"
                                                fontWeight="600"
                                                letterSpacing="wider"
                                            >
                                                DEFENSE SYSTEM
                                            </Text>
                                        </VStack>
                                    </MotionFlex>

                                    <MotionBox
                                        variants={itemVariants}
                                        textAlign={{ base: 'center', lg: 'left' }}
                                    >
                                        <Heading
                                            lineHeight={1.1}
                                            fontWeight={900}
                                            fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}
                                            mb={4}
                                        >
                                            <MotionText
                                                as="span"
                                                bgGradient="linear(to-r, #0ea5e9, #3b82f6, #1d4ed8)"
                                                bgClip="text"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                Interceptación
                                            </MotionText>
                                            <br />
                                            <MotionText
                                                as="span"
                                                color="white"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                            >
                                                Asteroides
                                            </MotionText>
                                            <MotionText
                                                as="span"
                                                color="blue.400"
                                                fontSize={{ base: '2xl', lg: '4xl' }}
                                                fontWeight={600}
                                                ml={4}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8, delay: 0.6 }}
                                            >
                                                🛡️
                                            </MotionText>
                                        </Heading>

                                        <MotionText
                                            color="rgba(255, 255, 255, 0.8)"
                                            maxW={{ lg: '85%' }}
                                            fontSize={{ base: 'lg', lg: 'xl' }}
                                            lineHeight="tall"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                        >
                                            Protege la Tierra con tecnología avanzada de detección espacial.
                                            <Text as="span" color="blue.300" fontWeight="semibold">
                                                {" "}Monitoreo en tiempo real
                                            </Text>, análisis orbital predictivo y sistemas de defensa planetaria de última generación.
                                        </MotionText>
                                    </MotionBox>
                                </VStack>
                            </MotionBox>

                            {/* Features Dinámicas */}
                            <MotionBox variants={itemVariants} w="full">
                                <VStack spacing={4} align={{ base: 'center', lg: 'flex-start' }}>
                                    <Text color="blue.300" fontSize="sm" fontWeight="bold" letterSpacing="wide">
                                        CAPACIDADES DE DEFENSA
                                    </Text>
                                    <HStack spacing={6} wrap="wrap" justify={{ base: 'center', lg: 'flex-start' }}>
                                        {features.map((feature, index) => (
                                            <MotionBox
                                                key={index}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <HStack
                                                    spacing={3}
                                                    bg={currentFeature === index ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                                                    px={4}
                                                    py={3}
                                                    borderRadius="xl"
                                                    border="1px solid"
                                                    borderColor={currentFeature === index ? "blue.500" : "rgba(255, 255, 255, 0.1)"}
                                                    transition="all 0.3s ease"
                                                    cursor="pointer"
                                                    onClick={() => setCurrentFeature(index)}
                                                >
                                                    <Box color={feature.color}>{feature.icon}</Box>
                                                    <Text
                                                        color={currentFeature === index ? "white" : "rgba(255, 255, 255, 0.7)"}
                                                        fontSize="sm"
                                                        fontWeight="semibold"
                                                    >
                                                        {feature.text}
                                                    </Text>
                                                </HStack>
                                            </MotionBox>
                                        ))}
                                    </HStack>
                                </VStack>
                            </MotionBox>

                            {/* Botones de Acción */}
                            <MotionBox variants={itemVariants}>
                                <HStack spacing={4} justify={{ base: 'center', lg: 'flex-start' }}>
                                    <MotionButton
                                        size="xl"
                                        px={10}
                                        py={8}
                                        fontSize="lg"
                                        fontWeight="bold"
                                        borderRadius="2xl"
                                        bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                                        color="white"
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px rgba(14, 165, 233, 0.4)",
                                            y: -3
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        _hover={{
                                            bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                                        }}
                                    >
                                        <HStack spacing={3}>
                                            <Text>Activar Sistema</Text>
                                            <ArrowRight size={20} />
                                        </HStack>
                                    </MotionButton>

                                    <MotionButton
                                        size="xl"
                                        px={8}
                                        py={8}
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        borderRadius="2xl"
                                        variant="outline"
                                        borderColor="blue.500"
                                        color="white"
                                        _hover={{
                                            bg: "rgba(14, 165, 233, 0.1)",
                                            borderColor: "blue.400"
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            y: -2
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <HStack spacing={2}>
                                            <Play size={18} />
                                            <Text>Simulación</Text>
                                        </HStack>
                                    </MotionButton>
                                </HStack>
                            </MotionBox>

                            {/* Estadísticas del Sistema */}
                            <MotionBox variants={itemVariants} w="full">
                                <HStack spacing={8} justify={{ base: 'center', lg: 'flex-start' }} wrap="wrap">
                                    <VStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold" color="white">{asteroidCount.toLocaleString()}</Text>
                                        <Text fontSize="sm" color="blue.300">Detectados</Text>
                                    </VStack>
                                    <Divider orientation="vertical" h="40px" borderColor="blue.500" />
                                    <VStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold" color="white">0.2s</Text>
                                        <Text fontSize="sm" color="blue.300">Respuesta</Text>
                                    </VStack>
                                    <Divider orientation="vertical" h="40px" borderColor="blue.500" />
                                    <VStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold" color="white">100%</Text>
                                        <Text fontSize="sm" color="blue.300">Cobertura</Text>
                                    </VStack>
                                </HStack>
                            </MotionBox>
                        </VStack>
                    </MotionBox>

                    {/* Columna Derecha - Visualización Espacial */}
                    <MotionFlex
                        flex={1}
                        justify="center"
                        align="center"
                        position="relative"
                        variants={itemVariants}
                    >
                        <MotionBox
                            position="relative"
                            height={{ base: '400px', md: '500px', lg: '600px' }}
                            width="full"
                            maxW="500px"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Contenedor Principal de la Imagen Espacial */}
                            <MotionBox
                                position="relative"
                                height="100%"
                                width="100%"
                                overflow="hidden"
                                borderRadius="3xl"
                                border="2px solid"
                                borderColor="rgba(14, 165, 233, 0.3)"
                                boxShadow="0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(14, 165, 233, 0.1)"
                                bg="linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 23, 42, 0.8))"
                                backdropFilter="blur(20px)"
                                whileHover={{
                                    boxShadow: "0 30px 60px rgba(14, 165, 233, 0.3), 0 0 0 1px rgba(14, 165, 233, 0.2)"
                                }}
                            >
                                <Box
                                    backgroundImage="url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                                    backgroundSize="cover"
                                    backgroundPosition="center"
                                    height="100%"
                                    width="100%"
                                    position="relative"
                                    _after={{
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0, 0, 0, 0.8))',
                                    }}
                                />

                                {/* Overlay de Análisis de Asteroide */}
                                <AnimatePresence mode="wait">
                                    <MotionBox
                                        key={currentFeature}
                                        position="absolute"
                                        bottom="0"
                                        left="0"
                                        right="0"
                                        p={6}
                                        bg="linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 23, 42, 0.9))"
                                        backdropFilter="blur(20px)"
                                        borderTop="1px solid"
                                        borderColor="rgba(14, 165, 233, 0.3)"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <VStack spacing={4} align="start">
                                            <HStack spacing={3}>
                                                <Box color={features[currentFeature].color}>
                                                    {features[currentFeature].icon}
                                                </Box>
                                                <Text color="white" fontSize="lg" fontWeight="bold">
                                                    Sistema: {features[currentFeature].text}
                                                </Text>
                                                <Box
                                                    as={motion.div}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <Zap size={16} color="#0ea5e9" />
                                                </Box>
                                            </HStack>

                                            <Progress
                                                value={progress}
                                                size="sm"
                                                colorScheme="blue"
                                                bg="rgba(255, 255, 255, 0.1)"
                                                borderRadius="full"
                                                w="full"
                                            />

                                            <HStack spacing={4} w="full" justify="space-between">
                                                <VStack spacing={1} align="start">
                                                    <Text color="blue.300" fontSize="xs" fontWeight="semibold">
                                                        AMENAZA
                                                    </Text>
                                                    <Text color="white" fontSize="sm" fontWeight="bold">
                                                        {currentFeature === 0 ? "Baja" : currentFeature === 1 ? "Media" : "Alta"}
                                                    </Text>
                                                </VStack>

                                                <VStack spacing={1} align="center">
                                                    <Text color="blue.300" fontSize="xs" fontWeight="semibold">
                                                        DISTANCIA (km)
                                                    </Text>
                                                    <Text color="white" fontSize="sm" fontWeight="bold">
                                                        {(234567 + currentFeature * 50000).toLocaleString()}
                                                    </Text>
                                                </VStack>

                                                <VStack spacing={1} align="end">
                                                    <Text color="blue.300" fontSize="xs" fontWeight="semibold">
                                                        VELOCIDAD
                                                    </Text>
                                                    <Text color="white" fontSize="sm" fontWeight="bold">
                                                        {(15.7 + currentFeature * 2.3).toFixed(1)} km/s
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </VStack>
                                    </MotionBox>
                                </AnimatePresence>

                                {/* Puntos de Detección de Asteroides Animados */}
                                <MotionBox
                                    position="absolute"
                                    top="25%"
                                    left="30%"
                                    w="8px"
                                    h="8px"
                                    bg="blue.400"
                                    borderRadius="50%"
                                    boxShadow="0 0 20px rgba(14, 165, 233, 0.8)"
                                    animate={{
                                        scale: [1, 1.8, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        delay: 0
                                    }}
                                />

                                <MotionBox
                                    position="absolute"
                                    top="55%"
                                    right="25%"
                                    w="6px"
                                    h="6px"
                                    bg="blue.300"
                                    borderRadius="50%"
                                    boxShadow="0 0 15px rgba(59, 130, 246, 0.8)"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: 0.8
                                    }}
                                />

                                <MotionBox
                                    position="absolute"
                                    top="40%"
                                    left="65%"
                                    w="10px"
                                    h="10px"
                                    bg="blue.500"
                                    borderRadius="50%"
                                    boxShadow="0 0 25px rgba(29, 78, 216, 0.9)"
                                    animate={{
                                        scale: [1, 2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 1.5
                                    }}
                                />
                            </MotionBox>

                            {/* Elementos Flotantes Decorativos del Espacio */}
                            <MotionBox
                                position="absolute"
                                top="-20px"
                                right="-20px"
                                p={4}
                                bg="linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.1))"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="rgba(14, 165, 233, 0.3)"
                                backdropFilter="blur(10px)"
                                animate={{
                                    y: [0, -12, 0],
                                    rotate: [0, 8, 0]
                                }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Star size={24} color="#0ea5e9" />
                            </MotionBox>

                            <MotionBox
                                position="absolute"
                                bottom="-15px"
                                left="-15px"
                                p={3}
                                bg="linear-gradient(135deg, rgba(29, 78, 216, 0.2), rgba(14, 165, 233, 0.1))"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="rgba(29, 78, 216, 0.3)"
                                backdropFilter="blur(10px)"
                                animate={{
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.2
                                }}
                            >
                                <AlertTriangle size={20} color="#1d4ed8" />
                            </MotionBox>
                        </MotionBox>
                    </MotionFlex>
                </MotionFlex>
            </Container>
        </Box>
    );
};

export default Hero;