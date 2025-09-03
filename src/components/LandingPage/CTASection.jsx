import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Icon,
    Badge,
    Flex,
    Circle
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ArrowRight,
    Shield,
    Zap,
    Satellite,
    Rocket,
    CheckCircle,
    Target,
    Globe
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const FloatingAsteroid = ({ delay = 0, size = 6, top = "20%", left = "10%" }) => (
    <MotionBox
        position="absolute"
        top={top}
        left={left}
        width={`${size}px`}
        height={`${size}px`}
        bg="linear-gradient(135deg, #3b82f6, #60a5fa)"
        borderRadius="full"
        boxShadow="0 0 15px rgba(59, 130, 246, 0.5)"
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
            opacity: [0, 1, 0.7, 0],
            scale: [0, 1.2, 0.8, 0],
            y: [0, -30, -50, -80],
            rotate: [0, 180, 270, 360],
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeOut"
        }}
        _after={{
            content: '""',
            position: 'absolute',
            width: '2px',
            height: '20px',
            bg: 'linear-gradient(180deg, #60a5fa, transparent)',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
    />
);

const StatsCard = ({ icon, number, label, delay = 0 }) => (
    <MotionVStack
        bg="rgba(10, 14, 26, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(59, 130, 246, 0.3)"
        borderRadius="xl"
        p={6}
        spacing={3}
        minW="140px"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay }}
        _hover={{
            transform: "scale(1.08) translateY(-5px)",
            borderColor: "rgba(59, 130, 246, 0.6)",
            bg: "rgba(10, 14, 26, 0.95)",
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
        }}
        position="relative"
    >
        {/* Efecto de radar */}
        <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="120%"
            height="120%"
            border="1px solid rgba(59, 130, 246, 0.2)"
            borderRadius="full"
            animation="radar 3s ease-in-out infinite"
            opacity={0}
            _hover={{
                opacity: 0.6,
            }}
        />

        <Circle
            size="50px"
            bg="linear-gradient(135deg, #1e3a8a, #3b82f6)"
            color="white"
            boxShadow="0 0 20px rgba(59, 130, 246, 0.4)"
            position="relative"
            _after={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa)',
                borderRadius: 'full',
                zIndex: -1,
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
            _hover={{
                _after: {
                    opacity: 0.8,
                }
            }}
        >
            <Icon as={icon} boxSize={6} />
        </Circle>
        <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, #60a5fa, #93c5fd)"
            bgClip="text"
            textShadow="0 0 10px rgba(96, 165, 250, 0.3)"
        >
            {number}
        </Text>
        <Text fontSize="sm" color="rgba(219, 234, 254, 0.8)" textAlign="center" fontWeight="500">
            {label}
        </Text>
    </MotionVStack>
);

const FeatureBadge = ({ icon, text, delay = 0 }) => (
    <MotionBox
        bg="rgba(59, 130, 246, 0.15)"
        border="1px solid rgba(59, 130, 246, 0.4)"
        borderRadius="full"
        px={5}
        py={3}
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        _hover={{
            bg: "rgba(59, 130, 246, 0.25)",
            borderColor: "rgba(59, 130, 246, 0.7)",
            transform: "scale(1.05)",
            boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)"
        }}
        backdropFilter="blur(10px)"
    >
        <HStack spacing={3}>
            <Icon as={icon} boxSize={5} color="#60a5fa" />
            <Text fontSize="sm" color="white" fontWeight="600">
                {text}
            </Text>
        </HStack>
    </MotionBox>
);

const SeccionCTA = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const stats = [
        { icon: Satellite, number: "500+", label: "Satélites Activos" },
        { icon: Zap, number: "< 3s", label: "Detección Rápida" },
        { icon: Shield, number: "99.97%", label: "Precisión Orbital" }
    ];

    const features = [
        { icon: CheckCircle, text: "Demo Gratuita" },
        { icon: Globe, text: "Cobertura Global" },
        { icon: Target, text: "Soporte Espacial 24/7" }
    ];

    return (
        <Box
            as="section"
            bg="radial-gradient(ellipse at center, #030712 0%, #000000 70%)"
            position="relative"
            overflow="hidden"
            pb={50}
        >
            {/* Campo de estrellas de fondo */}
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage='url("https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=2000&q=80")'
                backgroundSize="cover"
                backgroundPosition="center"
                opacity={0.05}
                zIndex={0}
            />

            {/* Nebulosas brillantes */}
            <Box
                position="absolute"
                top="5%"
                left="5%"
                width="700px"
                height="700px"
                bg="radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(100px)"
                animation="nebulaPulse 10s ease-in-out infinite"
            />
            <Box
                position="absolute"
                bottom="5%"
                right="5%"
                width="500px"
                height="500px"
                bg="radial-gradient(circle, rgba(147, 197, 253, 0.15) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(80px)"
                animation="nebulaPulse 8s ease-in-out infinite reverse"
            />

            {/* Sistema solar de fondo */}
            <Box
                position="absolute"
                top="20%"
                right="10%"
                width="300px"
                height="300px"
                border="1px solid rgba(59, 130, 246, 0.1)"
                borderRadius="full"
                animation="orbit 20s linear infinite"
            />

            {/* Asteroides flotantes */}
            <FloatingAsteroid delay={0} top="10%" left="15%" size={8} />
            <FloatingAsteroid delay={1.5} top="20%" left="85%" size={6} />
            <FloatingAsteroid delay={3} top="70%" left="10%" size={7} />
            <FloatingAsteroid delay={2} top="80%" left="90%" size={5} />
            <FloatingAsteroid delay={4} top="40%" left="75%" size={4} />

            <Container maxW="container.xl" position="relative" zIndex={2}>
                <MotionVStack
                    ref={ref}
                    spacing={12}
                    textAlign="center"
                    maxW="container.lg"
                    mx="auto"
                    px={10}
                    py={24}
                    borderRadius="3xl"
                    bg="linear-gradient(145deg, rgba(10, 14, 26, 0.6), rgba(26, 35, 50, 0.6))"
                    backdropFilter="blur(40px)"
                    border="1px solid rgba(59, 130, 246, 0.3)"
                    boxShadow="0 50px 100px rgba(59, 130, 246, 0.15)"
                    position="relative"
                    overflow="hidden"
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    animate={inView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    } : {
                        opacity: 0,
                        y: 60,
                        scale: 0.9
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        height: '4px',
                        bg: 'linear-gradient(90deg, transparent, #60a5fa, #3b82f6, transparent)',
                        opacity: 0.8,
                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                    }}
                >
                    {/* Efecto de constelación de fondo */}
                    <Box
                        position="absolute"
                        top="10%"
                        right="10%"
                        width="3px"
                        height="3px"
                        bg="#60a5fa"
                        borderRadius="full"
                        opacity={0.8}
                        animation="twinkle 2s ease-in-out infinite"
                    />
                    <Box
                        position="absolute"
                        bottom="20%"
                        left="15%"
                        width="2px"
                        height="2px"
                        bg="#93c5fd"
                        borderRadius="full"
                        opacity={0.6}
                        animation="twinkle 3s ease-in-out infinite 1s"
                    />

                    {/* Badge superior */}
                    <MotionBox
                        initial={{ opacity: 0, y: -30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Badge
                            bg="linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 197, 253, 0.3))"
                            color="white"
                            px={8}
                            py={4}
                            borderRadius="full"
                            border="1px solid rgba(59, 130, 246, 0.5)"
                            fontSize="sm"
                            fontWeight="700"
                            letterSpacing="wide"
                            display="flex"
                            alignItems="center"
                            gap={3}
                            backdropFilter="blur(15px)"
                            textShadow="0 0 10px rgba(96, 165, 250, 0.5)"
                        >
                            <Icon as={Rocket} boxSize={5} />
                            SISTEMA DE DEFENSA PLANETARIA
                        </Badge>
                    </MotionBox>

                    {/* Título principal holográfico */}
                    <MotionBox
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <Heading
                            as="h2"
                            fontSize={{ base: '3xl', md: '5xl', lg: '7xl' }}
                            lineHeight="0.95"
                            fontWeight="900"
                            letterSpacing="tight"
                            textShadow="0 0 50px rgba(96, 165, 250, 0.3)"
                        >
                            <Text
                                as="span"
                                bgGradient="linear(to-r, #f8fafc, #60a5fa)"
                                bgClip="text"
                            >
                                ¿Preparado para
                            </Text>
                            <br />
                            <Text
                                as="span"
                                bgGradient="linear(to-r, #1e40af, #60a5fa)"
                                bgClip="text"
                            >
                                Defender
                            </Text>
                            <br />
                            <Text as="span" color="#dbeafe">
                                la Tierra?
                            </Text>
                        </Heading>
                    </MotionBox>

                    {/* Descripción espacial */}
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color="rgba(219, 234, 254, 0.9)"
                            maxW="700px"
                            lineHeight="1.8"
                            fontWeight="400"
                        >
                            Únete a <Text as="span" color="#60a5fa" fontWeight="700">500+ centros espaciales</Text> que
                            ya protegen nuestro planeta con tecnología de interceptación
                            <Text as="span" color="#93c5fd" fontWeight="700"> 100x más precisa</Text>.
                        </Text>
                    </MotionBox>

                    {/* Estadísticas espaciales */}
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <HStack
                            spacing={8}
                            justify="center"
                            flexWrap="wrap"
                            mb={10}
                        >
                            {stats.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    icon={stat.icon}
                                    number={stat.number}
                                    label={stat.label}
                                    delay={0.6 + index * 0.2}
                                />
                            ))}
                        </HStack>
                    </MotionBox>

                    {/* Botón CTA futurista */}
                    <MotionBox
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <MotionButton
                            size="lg"
                            height="80px"
                            width={{ base: "full", md: "450px" }}
                            fontSize="xl"
                            fontWeight="bold"
                            rightIcon={<ArrowRight />}
                            bg="linear-gradient(135deg, #1e3a8a, #3b82f6)"
                            color="white"
                            border="2px solid rgba(59, 130, 246, 0.5)"
                            borderRadius="2xl"
                            boxShadow="0 20px 40px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(96, 165, 250, 0.3)"
                            position="relative"
                            overflow="hidden"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            _hover={{
                                bg: "linear-gradient(135deg, #1e40af, #2563eb)",
                                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5), 0 0 50px rgba(96, 165, 250, 0.3)",
                                borderColor: "rgba(96, 165, 250, 0.8)",
                                _before: {
                                    opacity: 1,
                                }
                            }}
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                opacity: 0,
                                transition: 'all 0.6s ease',
                            }}
                        >
                            INICIAR MISIÓN ESPACIAL
                        </MotionButton>
                    </MotionBox>

                    {/* Features badges espaciales */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <HStack
                            spacing={6}
                            justify="center"
                            flexWrap="wrap"
                            mb={6}
                        >
                            {features.map((feature, index) => (
                                <FeatureBadge
                                    key={index}
                                    icon={feature.icon}
                                    text={feature.text}
                                    delay={0.9 + index * 0.15}
                                />
                            ))}
                        </HStack>
                    </MotionBox>

                    {/* Texto de garantía cósmica */}
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <Text
                            fontSize="sm"
                            color="rgba(219, 234, 254, 0.7)"
                            fontWeight="500"
                            textShadow="0 0 10px rgba(96, 165, 250, 0.2)"
                        >
                            🚀 Sin compromiso orbital • Demo completa 30 días • Cancelación inmediata
                        </Text>
                    </MotionBox>

                    {/* Efecto de energía inferior */}
                    <Box
                        position="absolute"
                        bottom={0}
                        left="50%"
                        transform="translateX(-50%)"
                        width="80%"
                        height="3px"
                        bg="linear-gradient(90deg, transparent, #60a5fa, #3b82f6, transparent)"
                        opacity={0.8}
                        boxShadow="0 0 20px rgba(96, 165, 250, 0.5)"
                    />

                    {/* Pulso de radar en las esquinas */}
                    <Box
                        position="absolute"
                        top="5%"
                        left="5%"
                        width="30px"
                        height="30px"
                        border="2px solid rgba(59, 130, 246, 0.3)"
                        borderRadius="full"
                        animation="radarPulse 3s ease-in-out infinite"
                    />
                    <Box
                        position="absolute"
                        bottom="5%"
                        right="5%"
                        width="25px"
                        height="25px"
                        border="2px solid rgba(147, 197, 253, 0.3)"
                        borderRadius="full"
                        animation="radarPulse 4s ease-in-out infinite 1s"
                    />
                </MotionVStack>
            </Container>

            {/* Animaciones CSS personalizadas */}
            <style jsx>{`
                @keyframes nebulaPulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.1); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                
                @keyframes orbit {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes radar {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
                
                @keyframes radarPulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.5); opacity: 0.2; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </Box>
    );
};

export default SeccionCTA;