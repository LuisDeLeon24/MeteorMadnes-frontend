import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Circle,
    VStack,
    HStack,
    Icon,
    Badge,
    Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Satellite, Radar, Activity, Target, Telescope, Zap, Shield, Orbit } from 'lucide-react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const StepCard = ({ icon, title, description, index, isInView }) => {
    return (
        <MotionVStack
            align="start"
            p={8}
            bg="linear-gradient(145deg, #0f172a 0%, #1e293b 100%)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(14, 165, 233, 0.3)"
            boxShadow="0 10px 30px rgba(14, 165, 233, 0.1)"
            position="relative"
            overflow="hidden"
            height="100%"
            cursor="pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(14, 165, 233, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
            _hover={{
                borderColor: 'rgba(14, 165, 233, 0.5)',
                boxShadow: '0 20px 40px rgba(14, 165, 233, 0.2)',
                _before: {
                    opacity: 1,
                }
            }}
        >
            {/* Número del paso */}
            <Badge
                position="absolute"
                top={4}
                right={4}
                bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={2}
                py={1}
                borderRadius="full"
            >
                {String(index + 1).padStart(2, '0')}
            </Badge>

            {/* Efecto de brillo superior espacial */}
            <Box
                position="absolute"
                top={0}
                left="50%"
                transform="translateX(-50%)"
                width="60%"
                height="2px"
                bg="linear-gradient(90deg, transparent, #0ea5e9, transparent)"
                opacity={0.8}
            />

            <Circle
                size="60px"
                bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                color="white"
                mb={6}
                boxShadow="0 8px 20px rgba(14, 165, 233, 0.4)"
                position="relative"
                _after={{
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    borderRadius: 'full',
                    background: 'linear-gradient(45deg, #0ea5e9, #3b82f6, #1d4ed8)',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                }}
                _hover={{
                    _after: {
                        opacity: 0.7,
                    }
                }}
            >
                <Icon as={icon} boxSize="28px" />
            </Circle>

            <Heading
                as="h3"
                size="lg"
                mb={3}
                bgGradient="linear(to-r, #ffffff, #e2e8f0)"
                bgClip="text"
                fontWeight="700"
            >
                {title}
            </Heading>

            <Text
                color="rgba(226, 232, 240, 0.8)"
                lineHeight="1.7"
                fontSize="sm"
            >
                {description}
            </Text>

            {/* Decoración inferior azul */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="4px"
                bg="linear-gradient(90deg, #0ea5e9, #3b82f6, #1d4ed8)"
                opacity={0}
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 1 }}
            />
        </MotionVStack>
    );
};

const FeaturesBanner = ({ isInView }) => {
    const features = [
        { icon: Telescope, text: "Early Detection", color: "#0ea5e9" },
        { icon: Zap, text: "Instant Analysis", color: "#3b82f6" },
        { icon: Shield, text: "Total Protection", color: "#1d4ed8" }
    ];

    return (
        <HStack
            spacing={8}
            justify="center"
            flexWrap="wrap"
            opacity={isInView ? 1 : 0}
            transform={isInView ? 'translateY(0)' : 'translateY(20px)'}
            transition="all 0.8s ease 0.6s"
        >
            {features.map((feature, index) => (
                <HStack
                    key={index}
                    spacing={2}
                    color="white"
                    fontWeight="600"
                    fontSize="sm"
                    bg="rgba(255, 255, 255, 0.05)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    border="1px solid rgba(14, 165, 233, 0.2)"
                    _hover={{
                        bg: "rgba(14, 165, 233, 0.1)",
                        transform: "scale(1.05)",
                        transition: "all 0.2s ease"
                    }}
                >
                    <Icon as={feature.icon} boxSize="16px" color={feature.color} />
                    <Text>{feature.text}</Text>
                </HStack>
            ))}
        </HStack>
    );
};

const HowItWorks = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const steps = [
        {
            icon: Satellite,
            title: 'Space Detection',
            description: 'Network of telescopes and satellites continuously track near-Earth space, identifying new objects and updating trajectories.',
        },
        {
            icon: Radar,
            title: 'Orbital Analysis',
            description: 'Advanced algorithms calculate precise trajectories, velocities, and impact probabilities using data from multiple astronomical sources.',
        },
        {
            icon: Activity,
            title: 'Risk Assessment',
            description: 'Automatic classification system determines the threat level based on the object’s size, composition, speed, and trajectory.',
        },
        {
            icon: Target,
            title: 'Defense Protocol',
            description: 'Immediate activation of interception systems and notification to international space agencies for a coordinated response.',
        },
    ];

    return (
        <Box
            as="section"
            py={20}
            bg="radial-gradient(ellipse at center, #000000 0%, #0f172a 70%)"
            position="relative"
            overflow="hidden"
        >
            {/* Efectos de fondo espacial */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                width="300px"
                height="300px"
                bg="radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(40px)"
            />
            <Box
                position="absolute"
                bottom="20%"
                right="15%"
                width="200px"
                height="200px"
                bg="radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
                borderRadius="full"
                filter="blur(30px)"
            />

            {/* Estrellas flotantes */}
            <Box
                position="absolute"
                top="15%"
                right="20%"
                w="2px"
                h="2px"
                bg="#0ea5e9"
                borderRadius="50%"
                boxShadow="0 0 10px rgba(14, 165, 233, 0.8)"
                as={motion.div}
                animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0
                }}
            />

            <Box
                position="absolute"
                top="60%"
                left="15%"
                w="3px"
                h="3px"
                bg="#3b82f6"
                borderRadius="50%"
                boxShadow="0 0 12px rgba(59, 130, 246, 0.8)"
                as={motion.div}
                animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 1
                }}
            />

            <Container maxW="container.xl" ref={ref} position="relative" zIndex={2}>
                <MotionVStack
                    spacing={6}
                    mb={16}
                    textAlign="center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Badge
                        bg="linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.2))"
                        color="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                        border="1px solid rgba(14, 165, 233, 0.3)"
                        fontSize="sm"
                        fontWeight="600"
                        letterSpacing="wide"
                    >
                        PLANETARY DEFENSE SYSTEM
                    </Badge>

                    <Heading
                        as="h2"
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                        fontWeight="800"
                        lineHeight="1.1"
                        bgGradient="linear(to-r, #ffffff, #0ea5e9, #ffffff)"
                        bgClip="text"
                        letterSpacing="tight"
                    >
                        How It Works?
                    </Heading>

                    <Text
                        color="rgba(226, 232, 240, 0.7)"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        maxW="600px"
                        lineHeight="1.8"
                        fontWeight="400"
                    >
                        Continuous protection through advanced space monitoring, predictive analysis, and automatic response systems.
                    </Text>

                    <Divider
                        orientation="horizontal"
                        borderColor="rgba(14, 165, 233, 0.4)"
                        maxW="100px"
                        borderWidth="2px"
                        my={4}
                    />
                </MotionVStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={16}>
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            index={index}
                            isInView={inView}
                        />
                    ))}
                </SimpleGrid>

                <MotionFlex
                    borderRadius="3xl"
                    overflow="hidden"
                    flexDir={{ base: 'column', lg: 'row' }}
                    bg="linear-gradient(145deg, #0f172a 0%, #1e293b 100%)"
                    border="1px solid rgba(14, 165, 233, 0.3)"
                    boxShadow="0 25px 50px rgba(14, 165, 233, 0.1)"
                    position="relative"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    _hover={{
                        boxShadow: "0 35px 70px rgba(14, 165, 233, 0.2)",
                        transition: "all 0.3s ease"
                    }}
                >
                    {/* Imagen espacial con overlay sofisticado */}
                    <Box
                        flex="1"
                        backgroundImage="url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        minH={{ base: '300px', lg: '500px' }}
                        position="relative"
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
                        }}
                    >
                        {/* Grid pattern overlay espacial */}
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            backgroundImage="radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.2) 1px, transparent 0)"
                            backgroundSize="30px 30px"
                            opacity={0.4}
                        />

                        {/* Puntos de radar animados */}
                        <Box
                            position="absolute"
                            top="25%"
                            left="30%"
                            w="6px"
                            h="6px"
                            bg="#0ea5e9"
                            borderRadius="50%"
                            boxShadow="0 0 15px rgba(14, 165, 233, 0.8)"
                            as={motion.div}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0
                            }}
                        />

                        <Box
                            position="absolute"
                            top="60%"
                            right="25%"
                            w="4px"
                            h="4px"
                            bg="#3b82f6"
                            borderRadius="50%"
                            boxShadow="0 0 12px rgba(59, 130, 246, 0.8)"
                            as={motion.div}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: 0.5
                            }}
                        />
                    </Box>

                    <VStack
                        flex="1"
                        p={{ base: 8, lg: 12 }}
                        justify="center"
                        align="flex-start"
                        spacing={6}
                        bg="linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))"
                    >
                        <Badge
                            bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            letterSpacing="wide"
                        >
                            ADVANCED SPACE TECHNOLOGY
                        </Badge>

                        <Heading
                            as="h3"
                            size="xl"
                            bgGradient="linear(to-r, #ffffff, #e2e8f0)"
                            bgClip="text"
                            fontWeight="700"
                        >
                            Powered by Astronomical AI
                        </Heading>

                        <Text
                            color="rgba(226, 232, 240, 0.8)"
                            lineHeight="1.8"
                            fontSize="md"
                        >
                            Our machine learning algorithms have been trained with decades of astronomical data,
                            allowing us to predict trajectories with millimeter precision, calculate impact probabilities,
                            and coordinate planetary defense responses in real time.
                        </Text>

                        <FeaturesBanner isInView={inView} />
                    </VStack>
                </MotionFlex>
            </Container>
        </Box>
    );
};

export default HowItWorks;