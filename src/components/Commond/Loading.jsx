import React from "react";
import {
    Box,
    Flex,
    Text,
    VStack,
    Circle,
    Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Satellite, Zap, Target } from "lucide-react";

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);
const MotionFlex = motion(Flex);

const AstroSpinner = ({
    size = "lg",
    showText = true,
    loadingText = "Analizando órbitas...",
    variant = "orbital"
}) => {
    const sizeConfig = {
        sm: { container: 80, center: 40, orbit: 60, particles: 4 },
        md: { container: 120, center: 50, orbit: 80, particles: 6 },
        lg: { container: 160, center: 60, orbit: 120, particles: 8 },
        xl: { container: 200, center: 70, orbit: 160, particles: 12 }
    };

    const config = sizeConfig[size];

    // Variante Orbital (principal)
    const OrbitalSpinner = () => (
        <Box position="relative" width={`${config.container}px`} height={`${config.container}px`}>
            {/* Centro - Planeta/Core */}
            <MotionCircle
                position="absolute"
                top="50%"
                left="50%"
                size={`${config.center}px`}
                bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"
                transform="translate(-50%, -50%)"
                boxShadow="0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                animate={{
                    boxShadow: [
                        "0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                        "0 0 60px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.2)",
                        "0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Icon as={Target} size={config.center * 0.4} color="white" />
            </MotionCircle>

            {/* Anillos orbitales */}
            {[1, 2, 3].map((ring, index) => (
                <MotionBox
                    key={`ring-${ring}`}
                    position="absolute"
                    top="50%"
                    left="50%"
                    width={`${config.orbit - (index * 20)}px`}
                    height={`${config.orbit - (index * 20)}px`}
                    border={`${2 - index * 0.3}px solid rgba(59, 130, 246, ${0.4 - index * 0.1})`}
                    borderRadius="full"
                    transform="translate(-50%, -50%)"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8 + index * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        borderTopColor: `rgba(96, 165, 250, ${0.8 - index * 0.2})`,
                        borderRightColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent"
                    }}
                />
            ))}

            {/* Satélites orbitales */}
            {[0, 1, 2].map((satellite) => (
                <MotionBox
                    key={`satellite-${satellite}`}
                    position="absolute"
                    top="50%"
                    left="50%"
                    width={`${config.orbit - (satellite * 20)}px`}
                    height={`${config.orbit - (satellite * 20)}px`}
                    transform="translate(-50%, -50%)"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 6 + satellite * 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <Circle
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translateX(-50%)"
                        size="8px"
                        bg="linear-gradient(45deg, #10b981, #059669)"
                        boxShadow="0 0 15px rgba(16, 185, 129, 0.7)"
                    >
                        <Box
                            position="absolute"
                            width="8px"
                            height="8px"
                            bg="#10b981"
                            borderRadius="full"
                            animation="pulse 1.5s ease-in-out infinite"
                        />
                    </Circle>
                </MotionBox>
            ))}

            {/* Partículas estelares */}
            {[...Array(config.particles)].map((_, i) => (
                <MotionBox
                    key={`particle-${i}`}
                    position="absolute"
                    width="2px"
                    height="2px"
                    bg="#60a5fa"
                    borderRadius="full"
                    top={`${20 + Math.random() * 60}%`}
                    left={`${20 + Math.random() * 60}%`}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </Box>
    );

    // Variante Pulse
    const PulseSpinner = () => (
        <Box position="relative" width={`${config.container}px`} height={`${config.container}px`}>
            {[0, 1, 2, 3].map((ring) => (
                <MotionCircle
                    key={`pulse-${ring}`}
                    position="absolute"
                    top="50%"
                    left="50%"
                    size={`${config.center + (ring * 20)}px`}
                    border="2px solid rgba(59, 130, 246, 0.3)"
                    transform="translate(-50%, -50%)"
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: ring * 0.4,
                        ease: "easeOut"
                    }}
                />
            ))}

            <Circle
                position="absolute"
                top="50%"
                left="50%"
                size={`${config.center}px`}
                bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
                transform="translate(-50%, -50%)"
                boxShadow="0 0 30px rgba(59, 130, 246, 0.6)"
            >
                <Icon as={Zap} size={config.center * 0.4} color="white" />
            </Circle>
        </Box>
    );

    // Variante Radar
    const RadarSpinner = () => (
        <Box position="relative" width={`${config.container}px`} height={`${config.container}px`}>
            {/* Círculos concéntricos del radar */}
            {[1, 2, 3, 4].map((circle) => (
                <Circle
                    key={`radar-circle-${circle}`}
                    position="absolute"
                    top="50%"
                    left="50%"
                    size={`${circle * (config.container / 5)}px`}
                    border="1px solid rgba(59, 130, 246, 0.3)"
                    transform="translate(-50%, -50%)"
                />
            ))}

            {/* Líneas de radar */}
            <Box
                position="absolute"
                top="50%"
                left="0"
                right="0"
                height="1px"
                bg="rgba(59, 130, 246, 0.2)"
            />
            <Box
                position="absolute"
                top="0"
                bottom="0"
                left="50%"
                width="1px"
                bg="rgba(59, 130, 246, 0.2)"
            />

            {/* Barrido del radar */}
            <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                width={`${config.container / 2}px`}
                height="2px"
                bg="linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent)"
                transformOrigin="0 50%"
                transform="translate(0, -50%)"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Centro del radar */}
            <Circle
                position="absolute"
                top="50%"
                left="50%"
                size="12px"
                bg="#10b981"
                transform="translate(-50%, -50%)"
                boxShadow="0 0 20px rgba(16, 185, 129, 0.6)"
            />

            {/* Puntos detectados */}
            {[...Array(4)].map((_, i) => (
                <MotionCircle
                    key={`radar-dot-${i}`}
                    position="absolute"
                    size="4px"
                    bg="#f59e0b"
                    top={`${30 + Math.random() * 40}%`}
                    left={`${30 + Math.random() * 40}%`}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                />
            ))}
        </Box>
    );

    const renderSpinner = () => {
        switch (variant) {
            case "pulse":
                return <PulseSpinner />;
            case "radar":
                return <RadarSpinner />;
            default:
                return <OrbitalSpinner />;
        }
    };

    return (
        <MotionFlex
            direction="column"
            align="center"
            justify="center"
            gap={6}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Contenedor del spinner */}
            <Box
                bg="rgba(3, 7, 18, 0.9)"
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                p={8}
                boxShadow="0 20px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                border="1px solid rgba(59, 130, 246, 0.2)"
                position="relative"
                overflow="hidden"
            >
                {/* Efectos de fondo */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
                    pointerEvents="none"
                />

                <MotionBox
                    position="absolute"
                    top="-50%"
                    left="-50%"
                    width="200%"
                    height="200%"
                    bg="conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent)"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    opacity={0.3}
                />

                {renderSpinner()}
            </Box>

            {/* Texto de carga */}
            {showText && (
                <VStack spacing={2} maxW="300px" textAlign="center">
                    <MotionBox
                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Text
                            color="#60a5fa"
                            fontWeight="semibold"
                            fontSize="lg"
                            fontFamily="monospace"
                            letterSpacing="wide"
                        >
                            {loadingText}
                        </Text>
                    </MotionBox>

                    <Flex gap={1} justify="center">
                        {[0, 1, 2].map((dot) => (
                            <MotionBox
                                key={`loading-dot-${dot}`}
                                width="6px"
                                height="6px"
                                bg="#3b82f6"
                                borderRadius="full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: dot * 0.2
                                }}
                            />
                        ))}
                    </Flex>
                </VStack>
            )}

            {/* Animaciones CSS */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
        </MotionFlex>
    );
};

// Ejemplos de uso
export const SpinnerExamples = () => {
    return (
        <VStack spacing={8} p={8} bg="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" minH="100vh">
            <Text color="white" fontSize="2xl" fontWeight="bold" mb={4}>
                AstroTracker Loading Spinners
            </Text>

            {/* Spinner orbital grande */}
            <Box>
                <Text color="#60a5fa" fontSize="md" mb={4} textAlign="center">
                    Orbital Spinner (Large)
                </Text>
                <AstroSpinner
                    size="lg"
                    variant="orbital"
                    loadingText="Calibrando sistemas de defensa..."
                />
            </Box>

            {/* Spinner de pulso mediano */}
            <Box>
                <Text color="#60a5fa" fontSize="md" mb={4} textAlign="center">
                    Pulse Spinner (Medium)
                </Text>
                <AstroSpinner
                    size="md"
                    variant="pulse"
                    loadingText="Sincronizando telemetría..."
                />
            </Box>

            {/* Spinner de radar pequeño */}
            <Box>
                <Text color="#60a5fa" fontSize="md" mb={4} textAlign="center">
                    Radar Spinner (Small)
                </Text>
                <AstroSpinner
                    size="sm"
                    variant="radar"
                    loadingText="Escaneando amenazas..."
                />
            </Box>
        </VStack>
    );
};

export default AstroSpinner;