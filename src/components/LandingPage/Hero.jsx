import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
    Progress,
    useBreakpointValue
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

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Hero = () => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [progress, setProgress] = useState(0);
    const [asteroidCount, setAsteroidCount] = useState(847);
    const navigate = useNavigate();
    const features = [
        { icon: <Telescope size={20} />, text: "Early Detection", color: "#0ea5e9" },
        { icon: <Radar size={20} />, text: "Orbital Analysis", color: "#3b82f6" },
        { icon: <Shield size={20} />, text: "Defense System", color: "#1d4ed8" }
    ];

    // Breakpoint values para adaptabilidad
    const isMobile = useBreakpointValue({ base: true, md: false });
    const iconSize = useBreakpointValue({ base: 28, md: 36, lg: 40 });
    const badgeIconSize = useBreakpointValue({ base: 12, md: 14 });

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
            minH={{ base: "auto", md: "100vh" }}
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
            {/* Elementos decorativos de fondo - Ocultos en móvil para mejor rendimiento */}
            <MotionBox
                position="absolute"
                top={{ base: "10%", md: "15%" }}
                right={{ base: "5%", md: "8%" }}
                width={{ base: "200px", md: "280px", lg: "350px" }}
                height={{ base: "200px", md: "280px", lg: "350px" }}
                borderRadius="50%"
                bg="linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.05))"
                filter="blur(120px)"
                display={{ base: "none", md: "block" }}
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
                bottom={{ base: "15%", md: "25%" }}
                left={{ base: "2%", md: "3%" }}
                width={{ base: "180px", md: "240px", lg: "280px" }}
                height={{ base: "180px", md: "240px", lg: "280px" }}
                borderRadius="50%"
                bg="linear-gradient(45deg, rgba(29, 78, 216, 0.12), rgba(14, 165, 233, 0.06))"
                filter="blur(100px)"
                display={{ base: "none", md: "block" }}
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

            <Container
                maxW="container.xl"
                position="relative"
                zIndex="2"
                px={{ base: 4, sm: 6, md: 8 }}
            >
                <MotionFlex
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    direction={{ base: 'column', lg: 'row' }}
                    align="center"
                    spacing={12}
                    py={{ base: 12, sm: 16, md: 20, lg: 28 }}
                    gap={{ base: 8, sm: 10, md: 12, lg: 16 }}
                >
                    {/* Columna Izquierda - Contenido */}
                    <MotionBox
                        flex={1}
                        variants={itemVariants}
                        w="full"
                    >
                        <VStack
                            spacing={{ base: 5, sm: 6, md: 8 }}
                            align={{ base: 'center', lg: 'flex-start' }}
                            textAlign={{ base: 'center', lg: 'left' }}
                        >
                            {/* Badge de Sistema Activo */}
                            <MotionBox
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Badge
                                    bg="linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.3))"
                                    color="white"
                                    px={{ base: 3, md: 4 }}
                                    py={{ base: 1.5, md: 2 }}
                                    borderRadius="full"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="bold"
                                    border="1px solid"
                                    borderColor="rgba(14, 165, 233, 0.3)"
                                    backdropFilter="blur(10px)"
                                >
                                    <HStack spacing={{ base: 1.5, md: 2 }}>
                                        <Activity size={badgeIconSize} />
                                        <Text>Active System 24/7</Text>
                                    </HStack>
                                </Badge>
                            </MotionBox>

                            {/* Logo y Título Principal */}
                            <MotionBox variants={itemVariants} w="full">
                                <VStack spacing={{ base: 4, md: 6 }}>
                                    <MotionFlex
                                        align="center"
                                        justify={{ base: 'center', lg: 'flex-start' }}
                                        whileHover={{ scale: 1.02 }}
                                        w="full"
                                    >
                                        <MotionBox
                                            mr={{ base: 3, md: 4 }}
                                            p={{ base: 2, md: 3 }}
                                            borderRadius="2xl"
                                            bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                                            color="white"
                                            whileHover={{
                                                rotate: [0, -10, 10, 0],
                                                boxShadow: "0 0 40px rgba(14, 165, 233, 0.6)"
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Satellite size={iconSize} />
                                        </MotionBox>
                                        <VStack spacing={0} align={{ base: "center", lg: "start" }}>
                                            <Text
                                                fontSize={{ base: "2xl", sm: "2xl", md: "3xl" }}
                                                fontWeight="900"
                                                bgGradient="linear(to-r, #ffffff, #e2e8f0, #0ea5e9)"
                                                bgClip="text"
                                                letterSpacing="tight"
                                            >
                                                AstroTracker
                                            </Text>
                                            <Text
                                                fontSize={{ base: "xs", md: "sm" }}
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
                                        w="full"
                                    >
                                        <Heading
                                            lineHeight={1.1}
                                            fontWeight={900}
                                            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl' }}
                                            mb={{ base: 3, md: 4 }}
                                        >
                                            <MotionText
                                                as="span"
                                                bgGradient="linear(to-r, #0ea5e9, #3b82f6, #1d4ed8)"
                                                bgClip="text"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                Interception
                                            </MotionText>
                                            <br />
                                            <MotionText
                                                as="span"
                                                color="white"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                            >
                                                Asteroids
                                            </MotionText>
                                            <MotionText
                                                as="span"
                                                color="blue.400"
                                                fontSize={{ base: 'xl', sm: '2xl', lg: '4xl' }}
                                                fontWeight={600}
                                                ml={{ base: 2, md: 4 }}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8, delay: 0.6 }}
                                            >
                                                🛡️
                                            </MotionText>
                                        </Heading>

                                        <MotionText
                                            color="rgba(255, 255, 255, 0.8)"
                                            maxW={{ base: "full", lg: '90%' }}
                                            fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
                                            lineHeight="tall"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                            px={{ base: 2, lg: 0 }}
                                        >
                                            Protect Earth with advanced space detection technology.
                                            <Text as="span" color="blue.300" fontWeight="semibold">
                                                {" "}Real-time monitoring
                                            </Text>, predictive orbital analysis, and state-of-the-art planetary defense systems.
                                        </MotionText>
                                    </MotionBox>
                                </VStack>
                            </MotionBox>

                            {/* Features Dinámicas */}
                            <MotionBox variants={itemVariants} w="full">
                                <VStack spacing={{ base: 3, md: 4 }} align={{ base: 'center', lg: 'flex-start' }}>
                                    <Text
                                        color="blue.300"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        fontWeight="bold"
                                        letterSpacing="wide"
                                    >
                                        DEFENSE CAPABILITIES
                                    </Text>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        spacing={{ base: 3, sm: 4, md: 6 }}
                                        wrap="wrap"
                                        justify={{ base: 'center', lg: 'flex-start' }}
                                        w="full"
                                    >
                                        {features.map((feature, index) => (
                                            <MotionBox
                                                key={index}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                flex={{ base: "1 1 100%", sm: "0 1 auto" }}
                                            >
                                                <HStack
                                                    spacing={{ base: 2, md: 3 }}
                                                    bg={currentFeature === index ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                                                    px={{ base: 3, md: 4 }}
                                                    py={{ base: 2.5, md: 3 }}
                                                    borderRadius="xl"
                                                    border="1px solid"
                                                    borderColor={currentFeature === index ? "blue.500" : "rgba(255, 255, 255, 0.1)"}
                                                    transition="all 0.3s ease"
                                                    cursor="pointer"
                                                    onClick={() => setCurrentFeature(index)}
                                                    justify="center"
                                                    w="full"
                                                >
                                                    <Box color={feature.color}>{feature.icon}</Box>
                                                    <Text
                                                        color={currentFeature === index ? "white" : "rgba(255, 255, 255, 0.7)"}
                                                        fontSize={{ base: "xs", md: "sm" }}
                                                        fontWeight="semibold"
                                                    >
                                                        {feature.text}
                                                    </Text>
                                                </HStack>
                                            </MotionBox>
                                        ))}
                                    </Stack>
                                </VStack>
                            </MotionBox>

                            {/* Botones de Acción */}
                            <MotionBox variants={itemVariants} w="full">
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    spacing={{ base: 3, md: 4 }}
                                    justify={{ base: 'center', lg: 'flex-start' }}
                                    w="full"
                                >
                                    <MotionButton
        onClick={() => navigate("/earth")}
        size={{ base: "lg", md: "xl" }}
        px={{ base: 6, md: 10 }}
        py={{ base: 6, md: 8 }}
        fontSize={{ base: "md", md: "lg" }}
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
w={{ base: "full", sm: "auto" }}
      >
        <HStack spacing={{ base: 2, md: 3 }}>
          <Text>Activate System</Text>
          <ArrowRight size={18} />
        </HStack>
      </MotionButton>

      <MotionButton
        onClick={() => navigate("/map")}
        size={{ base: "lg", md: "xl" }}
        px={{ base: 6, md: 8 }}
        py={{ base: 6, md: 8 }}
        fontSize={{ base: "md", md: "lg" }}
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
        w={{ base: "full", sm: "auto" }}
      >
        <HStack spacing={2}>
          <Play size={16} />
          <Text>Simulation</Text>
        </HStack>
      </MotionButton>
                                    </Stack>
                                </MotionBox>

                                {/* System Statistics */}
                                <MotionBox variants={itemVariants} w="full">
                                  <Stack
                                        direction={{ base: 'row', md: 'row' }}
                                        spacing={{ base: 4, md: 8 }}
                                        justify={{ base: 'space-around', lg: 'flex-start' }}
                                        wrap="wrap"
                                        w="full"
                                    >
                                        <VStack spacing={1}>
                                            <Text
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                color="white"
                                            >
                                                {asteroidCount.toLocaleString()}
                                            </Text>
                                            <Text
                                                fontSize={{ base: "xs", md: "sm" }}
                                                color="blue.300"
                                            >
                                                Detected
                                            </Text>
                                        </VStack>
                                        <Divider
                                            orientation="vertical"
                                            h="40px"
                                            borderColor="blue.500"
                                            display={{ base: "none", sm: "block" }}
                                        />
                                        <VStack spacing={1}>
                                            <Text
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                color="white"
                                            >
                                                0.2s
                                            </Text>
                                            <Text
                                                fontSize={{ base: "xs", md: "sm" }}
                                                color="blue.300"
                                            >
                                                Response
                                            </Text>
                                        </VStack>
                                        <Divider
                                            orientation="vertical"
                                            h="40px"
                                            borderColor="blue.500"
                                            display={{ base: "none", sm: "block" }}
                                        />
                                        <VStack spacing={1}>
                                            <Text
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                color="white"
                                            >
                                                100%
                                            </Text>
                                            <Text
                                                fontSize={{ base: "xs", md: "sm" }}
                                                color="blue.300"
                                            >
                                                Coverage
                                            </Text>
                                        </VStack>
                                    </Stack>
                                </MotionBox>
                            </VStack>
                        </MotionBox>

                        {/* Right Column - Spatial Visualization */}
                        <MotionFlex
                            flex={1}
                            justify="center"
                            align="center"
                            position="relative"
                            variants={itemVariants}
                            w="full"
                        >
                            <MotionBox
                                position="relative"
                                height={{ base: '300px', sm: '400px', md: '450px', lg: '550px', xl: '600px' }}
                                width="full"
                                maxW={{ base: "full", md: "450px", lg: "500px" }}
                                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Main Container for Spatial Image */}
                                <MotionBox
                                    position="relative"
                                    height="100%"
                                    width="100%"
                                    overflow="hidden"
                                    borderRadius={{ base: "2xl", md: "3xl" }}
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

                                    {/* Asteroid Analysis Overlay */}
                                    <AnimatePresence mode="wait">
                                        <MotionBox
                                            key={currentFeature}
                                            position="absolute"
                                            bottom="0"
                                            left="0"
                                            right="0"
                                            p={{ base: 4, md: 6 }}
                                            bg="linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 23, 42, 0.9))"
                                            backdropFilter="blur(20px)"
                                            borderTop="1px solid"
                                            borderColor="rgba(14, 165, 233, 0.3)"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <VStack spacing={{ base: 3, md: 4 }} align="start">
                                                <HStack spacing={{ base: 2, md: 3 }}>
                                                    <Box color={features[currentFeature].color}>
                                                        {features[currentFeature].icon}
                                                    </Box>
                                                    <Text
                                                        color="white"
                                                        fontSize={{ base: "sm", md: "md", lg: "lg" }}
                                                        fontWeight="bold"
                                                    >
                                                        System: {features[currentFeature].text}
                                                    </Text>
                                                    <Box
                                                        as={motion.div}
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Zap size={14} color="#0ea5e9" />
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

                                                <Stack
                                                    direction={{ base: 'row', md: 'row' }}
                                                    spacing={{ base: 2, md: 4 }}
                                                    w="full"
                                                    justify="space-between"
                                                >
                                                    <VStack spacing={1} align="start" flex={1}>
                                                        <Text
                                                            color="blue.300"
                                                            fontSize={{ base: "2xs", md: "xs" }}
                                                            fontWeight="semibold"
                                                        >
                                                            THREAT
                                                        </Text>
                                                        <Text
                                                            color="white"
                                                            fontSize={{ base: "xs", md: "sm" }}
                                                            fontWeight="bold"
                                                        >
                                                            {currentFeature === 0 ? "Low" : currentFeature === 1 ? "Medium" : "High"}
                                                        </Text>
                                                    </VStack>

                                                    <VStack spacing={1} align="center" flex={1}>
                                                        <Text
                                                            color="blue.300"
                                                            fontSize={{ base: "2xs", md: "xs" }}
                                                            fontWeight="semibold"
                                                            textAlign="center"
                                                        >
                                                            DISTANCE
                                                        </Text>
                                                        <Text
                                                            color="white"
                                                            fontSize={{ base: "xs", md: "sm" }}
                                                            fontWeight="bold"
                                                        >
                                                            {((234567 + currentFeature * 50000) / 1000).toFixed(0)}k km
                                                        </Text>
                                                    </VStack>

                                                    <VStack spacing={1} align="end" flex={1}>
                                                        <Text
                                                            color="blue.300"
                                                            fontSize={{ base: "2xs", md: "xs" }}
                                                            fontWeight="semibold"
                                                        >
                                                            VELOCITY
                                                        </Text>
                                                        <Text
                                                            color="white"
                                                            fontSize={{ base: "xs", md: "sm" }}
                                                            fontWeight="bold"
                                                        >
                                                            {(15.7 + currentFeature * 2.3).toFixed(1)} km/s
                                                        </Text>
                                                    </VStack>
                                                </Stack>
                                            </VStack>
                                        </MotionBox>
                                    </AnimatePresence>

                                    {/* Detection Points - Responsive */}
                                    <MotionBox
                                        position="absolute"
                                        top="25%"
                                        left="30%"
                                        w={{ base: "6px", md: "8px" }}
                                        h={{ base: "6px", md: "8px" }}
                                        bg="blue.400"
                                        borderRadius="50%"
                                        boxShadow="0 0 20px rgba(14, 165, 233, 0.8)"
                                        display={{ base: "none", md: "block" }}
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
                                        w={{ base: "5px", md: "6px" }}
                                        h={{ base: "5px", md: "6px" }}
                                        bg="blue.300"
                                        borderRadius="50%"
                                        boxShadow="0 0 15px rgba(59, 130, 246, 0.8)"
                                        display={{ base: "none", md: "block" }}
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
                                        w={{ base: "8px", md: "10px" }}
                                        h={{ base: "8px", md: "10px" }}
                                        bg="blue.500"
                                        borderRadius="50%"
                                        boxShadow="0 0 25px rgba(29, 78, 216, 0.9)"
                                        display={{ base: "none", md: "block" }}
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

                                {/* Decorative Floating Elements - Hidden on mobile */}
                                <MotionBox
                                    position="absolute"
                                    top={{ base: "-10px", md: "-20px" }}
                                    right={{ base: "-10px", md: "-20px" }}
                                    p={{ base: 3, md: 4 }}
                                    bg="linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.1))"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="rgba(14, 165, 233, 0.3)"
                                    backdropFilter="blur(10px)"
                                    display={{ base: "none", md: "block" }}
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
                                    bottom={{ base: "-10px", md: "-15px" }}
                                    left={{ base: "-10px", md: "-15px" }}
                                    p={{ base: 2.5, md: 3 }}
                                    bg="linear-gradient(135deg, rgba(29, 78, 216, 0.2), rgba(14, 165, 233, 0.1))"
                                    borderRadius="lg"
                                    border="1px solid"
                                    borderColor="rgba(29, 78, 216, 0.3)"
                                    backdropFilter="blur(10px)"
                                    display={{ base: "none", md: "block" }}
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