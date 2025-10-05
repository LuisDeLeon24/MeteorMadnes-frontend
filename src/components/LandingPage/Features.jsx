import React from 'react';
import {
    Box,
    Container,
    SimpleGrid,
    Heading,
    Text,
    Flex,
    Icon,
    VStack,
    Badge,
    useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Telescope,
    Shield,
    Zap,
    Target,
    Satellite,
    Activity,
    Star,
    ArrowRight
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const FeatureCard = ({ icon, title, description, index, isInView }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <MotionVStack
            bg="linear-gradient(145deg, #0a0e1a 0%, #1a2332 100%)"
            p={{ base: 6, md: 7, lg: 8 }}
            borderRadius={{ base: "xl", md: "2xl" }}
            border="1px solid"
            borderColor="rgba(59, 130, 246, 0.2)"
            align="flex-start"
            position="relative"
            overflow="hidden"
            height="100%"
            cursor="pointer"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1
            } : {
                opacity: 0,
                y: 40,
                scale: 0.95
            }}
            transition={{
                duration: 0.6,
                delay: isMobile ? index * 0.05 : index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{
                y: isMobile ? 0 : -15,
                scale: isMobile ? 1 : 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.08) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 0,
            }}
            _hover={{
                borderColor: 'rgba(59, 130, 246, 0.5)',
                boxShadow: { 
                    base: '0 15px 40px rgba(59, 130, 246, 0.15)',
                    md: '0 25px 60px rgba(59, 130, 246, 0.2), 0 0 40px rgba(147, 197, 253, 0.1)'
                },
                _before: {
                    opacity: 1,
                }
            }}
        >
            {/* Línea superior brillante */}
            <Box
                position="absolute"
                top={0}
                left="0"
                right="0"
                height={{ base: "2px", md: "3px" }}
                bg="linear-gradient(90deg, transparent, #60a5fa, #3b82f6, transparent)"
                opacity={0.9}
            />

            {/* Patrón de estrellas de fondo - Menos visible en móvil */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage="radial-gradient(circle at 25px 25px, rgba(147, 197, 253, 0.05) 2px, transparent 0)"
                backgroundSize={{ base: "40px 40px", md: "50px 50px" }}
                opacity={{ base: 0.3, md: 0.6 }}
                zIndex={0}
                display={{ base: "none", sm: "block" }}
            />

            {/* Efectos de constelación - Solo en desktop */}
            <Box
                position="absolute"
                top="15%"
                right="10%"
                width="2px"
                height="2px"
                bg="#60a5fa"
                borderRadius="full"
                opacity={0.7}
                animation="twinkle 2s ease-in-out infinite"
                display={{ base: "none", md: "block" }}
            />
            <Box
                position="absolute"
                top="60%"
                right="25%"
                width="1px"
                height="1px"
                bg="#93c5fd"
                borderRadius="full"
                opacity={0.5}
                animation="twinkle 3s ease-in-out infinite 0.5s"
                display={{ base: "none", md: "block" }}
            />

            {/* Contenido */}
            <Box position="relative" zIndex={1} width="100%">
                {/* Ícono con efecto orbital */}
                <MotionFlex
                    w={{ base: 14, md: 16, lg: 18 }}
                    h={{ base: 14, md: 16, lg: 18 }}
                    align="center"
                    justify="center"
                    borderRadius={{ base: "lg", md: "xl" }}
                    bg="linear-gradient(135deg, #1e3a8a, #3b82f6)"
                    mb={{ base: 4, md: 5, lg: 6 }}
                    boxShadow="0 10px 30px rgba(59, 130, 246, 0.4)"
                    position="relative"
                    whileHover={{ 
                        scale: isMobile ? 1 : 1.1, 
                        rotate: isMobile ? 0 : 10 
                    }}
                    transition={{ duration: 0.3 }}
                    _after={{
                        content: '""',
                        position: 'absolute',
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        borderRadius: { base: 'lg', md: 'xl' },
                        background: 'linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa)',
                        zIndex: -1,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                    }}
                    _hover={{
                        _after: {
                            opacity: { base: 0, md: 0.8 },
                        }
                    }}
                >
                    <Icon 
                        as={icon} 
                        color="white" 
                        boxSize={{ base: 6, md: 7, lg: 8 }} 
                    />

                    {/* Anillo orbital - Solo desktop */}
                    <Box
                        position="absolute"
                        width="28px"
                        height="28px"
                        border="1px solid rgba(147, 197, 253, 0.3)"
                        borderRadius="full"
                        animation="orbit 4s linear infinite"
                        opacity={0}
                        display={{ base: "none", md: "block" }}
                        _groupHover={{
                            opacity: 1,
                        }}
                    />
                </MotionFlex>

                {/* Título con efecto holográfico */}
                <Heading
                    as="h3"
                    size={{ base: "md", md: "lg" }}
                    mb={{ base: 3, md: 4 }}
                    bgGradient="linear(to-r, #f8fafc, #dbeafe, #93c5fd)"
                    bgClip="text"
                    fontWeight="700"
                    lineHeight="1.3"
                    position="relative"
                >
                    {title}
                </Heading>

                {/* Descripción */}
                <Text
                    color="rgba(219, 234, 254, 0.8)"
                    lineHeight="1.7"
                    fontSize={{ base: "sm", md: "sm" }}
                    mb={{ base: 4, md: 6 }}
                >
                    {description}
                </Text>

                {/* Indicador de acción */}
                <Flex
                    align="center"
                    mt="auto"
                    color="rgba(96, 165, 250, 0.8)"
                    fontSize="sm"
                    fontWeight="600"
                    opacity={{ base: 0.7, md: 0 }}
                    transform={{ base: "translateX(0)", md: "translateX(-15px)" }}
                    transition="all 0.3s ease"
                    _groupHover={{
                        opacity: 1,
                        transform: "translateX(0)"
                    }}
                >
                    <Text mr={2}>Iniciar Escaneo</Text>
                    <MotionBox
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon as={ArrowRight} boxSize={4} />
                    </MotionBox>
                </Flex>
            </Box>

            {/* Meteorito flotante - Solo desktop */}
            <Box
                position="absolute"
                top="10px"
                right="15px"
                width="6px"
                height="6px"
                bg="linear-gradient(135deg, #60a5fa, #3b82f6)"
                borderRadius="full"
                opacity={0}
                animation="meteor 4s ease-in-out infinite"
                display={{ base: "none", md: "block" }}
                _hover={{
                    opacity: 1,
                }}
                _after={{
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '12px',
                    height: '1px',
                    bg: 'linear-gradient(90deg, transparent, #60a5fa)',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.6,
                }}
            />
        </MotionVStack>
    );
};

const FloatingAsteroid = ({ delay = 0, size = "8px" }) => (
    <MotionBox
        position="absolute"
        width={size}
        height={size}
        bg="linear-gradient(135deg, #3b82f6, #60a5fa)"
        borderRadius="full"
        display={{ base: "none", md: "block" }}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -40, -80],
            rotate: [0, 180, 360],
        }}
        transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeOut"
        }}
        _after={{
            content: '""',
            position: 'absolute',
            width: '2px',
            height: '15px',
            bg: 'linear-gradient(180deg, #60a5fa, transparent)',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
    />
);

const Features = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const features = [
        {
            icon: Telescope,
            title: 'Detección Automática Avanzada',
            description: 'Sistemas de radar y telescopios ópticos con IA para identificar asteroides potencialmente peligrosos a millones de kilómetros.',
        },
        {
            icon: Shield,
            title: 'Análisis de Amenaza Planetaria',
            description: 'Evaluación en tiempo real del riesgo de impacto y cálculo de trayectorias con precisión milimétrica.',
        },
        {
            icon: Zap,
            title: 'Predicción de Trayectorias',
            description: 'Algoritmos cuánticos que predicen rutas orbitales hasta 100 años en el futuro con exactitud científica.',
        },
        {
            icon: Target,
            title: 'Sistema de Interceptación',
            description: 'Coordinación automatizada de misiles de desviación y cargas nucleares para neutralización controlada.',
        },
        {
            icon: Satellite,
            title: 'Red de Satélites Centinela',
            description: 'Constelación de 500+ satélites monitoreando continuamente el espacio cercano a la Tierra.',
        },
        {
            icon: Activity,
            title: 'Monitoreo Sísmico Espacial',
            description: 'Análisis espectral de composición mineral y detección de fragmentación en tiempo real.',
        },
    ];

    return (
        <Box
            as="section"
            py={{ base: 16, sm: 20, md: 24 }}
            bg="radial-gradient(ellipse at top, #030712 0%, #000000 70%)"
            position="relative"
            overflow="hidden"
        >
            {/* Campo de estrellas animado - Reducido en móvil */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage="radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 197, 253, 0.08) 0%, transparent 50%)"
                animation="starfield 20s ease-in-out infinite"
                opacity={{ base: 0.5, md: 1 }}
            />

            {/* Nebulosas de fondo - Ajustadas para móvil */}
            <Box
                position="absolute"
                top={{ base: "10%", md: "15%" }}
                left={{ base: "5%", md: "10%" }}
                width={{ base: "300px", md: "500px", lg: "600px" }}
                height={{ base: "200px", md: "350px", lg: "400px" }}
                bg="radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 70%)"
                borderRadius="full"
                filter={{ base: "blur(60px)", md: "blur(80px)" }}
                animation="nebula 12s ease-in-out infinite"
                display={{ base: "none", sm: "block" }}
            />
            <Box
                position="absolute"
                bottom={{ base: "15%", md: "20%" }}
                right={{ base: "10%", md: "15%" }}
                width={{ base: "250px", md: "350px", lg: "400px" }}
                height={{ base: "180px", md: "250px", lg: "300px" }}
                bg="radial-gradient(ellipse, rgba(147, 197, 253, 0.08) 0%, transparent 70%)"
                borderRadius="full"
                filter={{ base: "blur(50px)", md: "blur(60px)" }}
                animation="nebula 8s ease-in-out infinite reverse"
                display={{ base: "none", sm: "block" }}
            />

            {/* Asteroides flotantes - Solo desktop */}
            <FloatingAsteroid delay={0} size="10px" />
            <FloatingAsteroid delay={2.5} size="6px" />
            <FloatingAsteroid delay={5} size="8px" />

            <Container 
                maxW="container.xl" 
                ref={ref} 
                position="relative" 
                zIndex={2}
                px={{ base: 4, sm: 6, md: 8 }}
            >
                <MotionVStack
                    spacing={{ base: 6, md: 8 }}
                    mb={{ base: 12, md: 16, lg: 20 }}
                    textAlign="center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Badge espacial */}
                    <Badge
                        bg="linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 197, 253, 0.2))"
                        color="white"
                        px={{ base: 4, md: 6, lg: 8 }}
                        py={{ base: 2, md: 3, lg: 4 }}
                        borderRadius="full"
                        border="1px solid rgba(59, 130, 246, 0.4)"
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="600"
                        letterSpacing="wide"
                        display="flex"
                        alignItems="center"
                        gap={{ base: 2, md: 3 }}
                        backdropFilter="blur(10px)"
                    >
                        <Icon as={Star} boxSize={{ base: 3, md: 4 }} />
                        <Text>DEFENSA PLANETARIA ACTIVA</Text>
                    </Badge>

                    {/* Título principal holográfico */}
                    <Heading
                        as="h2"
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl' }}
                        fontWeight="900"
                        lineHeight="0.9"
                        bgGradient="linear(to-r, #f8fafc, #60a5fa, #dbeafe)"
                        bgClip="text"
                        letterSpacing="tight"
                        textAlign="center"
                        textShadow={{ base: "none", md: "0 0 40px rgba(96, 165, 250, 0.3)" }}
                        px={{ base: 2, md: 0 }}
                    >
                        Interceptación
                        <Text
                            as="span"
                            display="block"
                            bgGradient="linear(to-r, #1e40af, #60a5fa)"
                            bgClip="text"
                            mt={{ base: 2, md: 0 }}
                        >
                            Asteroid System
                        </Text>
                    </Heading>

                    {/* Subtítulo */}
                    <Text
                        color="rgba(219, 234, 254, 0.8)"
                        fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                        maxW={{ base: "full", md: "700px", lg: "800px" }}
                        lineHeight="1.8"
                        fontWeight="400"
                        px={{ base: 4, md: 0 }}
                    >
                        Protege la Tierra con tecnología de detección y análisis de última generación.
                        Monitoreo continuo de objetos cercanos a la Tierra con precisión militar.
                    </Text>

                    {/* Línea de energía */}
                    <Box
                        width={{ base: "100px", md: "150px" }}
                        height={{ base: "3px", md: "4px" }}
                        bg="linear-gradient(90deg, transparent, #60a5fa, #3b82f6, transparent)"
                        borderRadius="full"
                        mt={{ base: 4, md: 6 }}
                        boxShadow="0 0 20px rgba(96, 165, 250, 0.6)"
                    />
                </MotionVStack>

                {/* Grid de características */}
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={{ base: 6, md: 7, lg: 8 }}
                    sx={{
                        '& > div': {
                            role: 'group'
                        }
                    }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                            isInView={inView}
                        />
                    ))}
                </SimpleGrid>

                {/* Panel de estadísticas espaciales */}
                <MotionFlex
                    mt={{ base: 16, md: 20, lg: 24 }}
                    justify="center"
                    align="center"
                    flexWrap="wrap"
                    gap={{ base: 6, sm: 8, md: 12, lg: 16 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                    {[
                        { number: "99.97%", label: "Precisión de Detección" },
                        { number: "< 5s", label: "Tiempo de Respuesta" },
                        { number: "24/7", label: "Vigilancia Continua" },
                        { number: "50M+", label: "Objetos Rastreados" }
                    ].map((stat, index) => (
                        <VStack
                            key={index}
                            spacing={{ base: 2, md: 3 }}
                            textAlign="center"
                            opacity={0.9}
                            _hover={{ 
                                opacity: 1, 
                                transform: { base: "scale(1)", md: "scale(1.05)" }
                            }}
                            transition="all 0.3s ease"
                            p={{ base: 4, md: 5, lg: 6 }}
                            borderRadius={{ base: "lg", md: "xl" }}
                            bg="rgba(59, 130, 246, 0.05)"
                            border="1px solid rgba(59, 130, 246, 0.1)"
                            backdropFilter="blur(10px)"
                            minW={{ base: "140px", sm: "160px", md: "auto" }}
                        >
                            <Text
                                fontSize={{ base: "2xl", md: "3xl" }}
                                fontWeight="bold"
                                bgGradient="linear(to-r, #60a5fa, #93c5fd)"
                                bgClip="text"
                                textShadow={{ base: "none", md: "0 0 20px rgba(96, 165, 250, 0.5)" }}
                            >
                                {stat.number}
                            </Text>
                            <Text
                                fontSize={{ base: "xs", md: "sm" }}
                                color="rgba(219, 234, 254, 0.7)"
                                fontWeight="500"
                            >
                                {stat.label}
                            </Text>
                        </VStack>
                    ))}
                </MotionFlex>
            </Container>

            {/* Animaciones CSS personalizadas */}
            <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes meteor {
          0% { transform: translateY(0) translateX(0) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(20px) rotate(45deg); opacity: 0; }
        }
        
        @keyframes nebula {
          0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes starfield {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
        </Box>
    );
};

export default Features;