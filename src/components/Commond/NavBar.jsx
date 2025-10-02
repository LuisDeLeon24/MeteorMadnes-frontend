import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  Link,
  Spacer,
  Badge,
  Icon,
  VStack,
  Text,
  Circle
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Telescope,
  Shield,
  Activity,
  Settings,
  Target,
  Satellite,
  Zap
} from "lucide-react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Navbar = () => {
  const navLinks = [
    {
      name: "Centro de Control",
      href: "/",
      icon: Activity,
      description: "Dashboard principal"
    },
    {
      name: "Detección",
      href: "/map",
      icon: Telescope,
      description: "Sistemas de rastreo"
    },
    {
      name: "Interceptación",
      href: "/earth",
      icon: Target,
      description: "Misiones activas"
    },
    {
      name: "Análisis",
      href: "#analysis",
      icon: Settings,
      description: "Datos orbitales"
    },
  ];

  return (
    <Box
      bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
      backdropFilter="blur(20px)"
      px={8}
      py={4}
      boxShadow="0 8px 32px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)"
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px solid rgba(59, 130, 246, 0.2)"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Línea de energía superior */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="2px"
        bg="linear-gradient(90deg, transparent, #1e40af, #3b82f6, #60a5fa, transparent)"
        boxShadow="0 0 20px rgba(59, 130, 246, 0.5)"
      />

      {/* Partículas de fondo */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          bg="#60a5fa"
          borderRadius="full"
          opacity={0.4}
          top={`${20 + Math.random() * 60}%`}
          left={`${10 + i * 12}%`}
          animation={`twinkle ${2 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`}
        />
      ))}

      <Flex align="center" justify="space-between" position="relative">
        {/* Logo y branding */}
        <MotionFlex
  align="center"
  gap={4}
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <Box position="relative">
    <img
      src="/assets/images/Main_Logo-removebg-preview.png"
      alt="AstroTracker Logo"
      style={{ width: "60px", height: "60px" }}
    />
  </Box>

  <VStack align="flex-start" spacing={0}>
    <Heading
      size="lg"
      color="white"
      fontFamily="monospace"
      fontWeight="black"
      letterSpacing="tight"
      textShadow="0 0 20px rgba(96, 165, 250, 0.3)"
      bgGradient="linear(to-r, #f8fafc, #60a5fa, #dbeafe)"
      bgClip="text"
    >
      AstroTracker
    </Heading>
    <Text
      fontSize="xs"
      color="#60a5fa"
      fontWeight="semibold"
      letterSpacing="wider"
      textTransform="uppercase"
    >
      Asteroid incident response system
    </Text>
  </VStack>
</MotionFlex>

        <Spacer />

        {/* Navegación principal */}
        <MotionBox
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <HStack spacing={2} display={{ base: "none", lg: "flex" }}>
            {navLinks.map((link, index) => (
              <MotionBox
                key={link.name}
                position="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  _hover={{ textDecoration: "none" }}
                >
                  <HStack
                    spacing={3}
                    px={4}
                    py={3}
                    borderRadius="xl"
                    bg="rgba(59, 130, 246, 0.05)"
                    border="1px solid rgba(59, 130, 246, 0.1)"
                    backdropFilter="blur(10px)"
                    transition="all 0.3s ease"
                    _hover={{
                      bg: "rgba(59, 130, 246, 0.15)",
                      borderColor: "rgba(59, 130, 246, 0.3)",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)"
                    }}
                  >
                    <Circle size="30px" bg="rgba(59, 130, 246, 0.2)">
                      <Icon as={link.icon} size={16} color="#60a5fa" />
                    </Circle>
                    <VStack align="flex-start" spacing={0}>
                      <Text
                        fontWeight="bold"
                        color="white"
                        fontSize="sm"
                        lineHeight="1"
                      >
                        {link.name}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="rgba(147, 197, 253, 0.7)"
                        lineHeight="1"
                      >
                        {link.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Link>

                {/* Indicador de hover */}
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="0"
                  height="2px"
                  bg="#3b82f6"
                  borderRadius="full"
                  transition="width 0.3s ease"
                  _groupHover={{
                    width: "80%"
                  }}
                />
              </MotionBox>
            ))}
          </HStack>
        </MotionBox>

        {/* Botón de estado de emergencia */}
        <MotionBox
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HStack spacing={4}>
            {/* Monitor de amenazas */}
            <Box
              bg="rgba(59, 130, 246, 0.1)"
              borderRadius="xl"
              px={4}
              py={2}
              border="1px solid rgba(59, 130, 246, 0.2)"
              backdropFilter="blur(10px)"
              display={{ base: "none", md: "block" }}
            >
              <HStack spacing={3}>
                <Circle size="8px" bg="#10b981" opacity={0.8}>
                  <Box
                    position="absolute"
                    width="8px"
                    height="8px"
                    bg="#10b981"
                    borderRadius="full"
                    animation="pulse 2s ease-in-out infinite"
                  />
                </Circle>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="xs" color="#60a5fa" fontWeight="bold">
                    AMENAZAS
                  </Text>
                  <Text fontSize="xs" color="white" fontWeight="bold">
                    3 NEO Monitoreando
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Botón de comando */}
            <MotionButton
              as={motion.button}
              size="lg"
              height="50px"
              px={6}
              bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
              color="white"
              fontWeight="bold"
              borderRadius="xl"
              border="2px solid rgba(59, 130, 246, 0.3)"
              boxShadow="0 0 25px rgba(59, 130, 246, 0.3)"
              rightIcon={<Icon as={Shield} size={18} />}
              whileHover={{
                background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(59, 130, 246, 0.5)",
                borderColor: "rgba(96, 165, 250, 0.6)"
              }}
              whileTap={{ scale: 0.98 }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                opacity: 0,
                transition: 'all 0.5s ease',
              }}
              _hover={{
                _before: {
                  left: '100%',
                  opacity: 1,
                }
              }}
            >
              Centro de Comando
            </MotionButton>
          </HStack>
        </MotionBox>
      </Flex>

      {/* Línea de energía inferior sutil */}
      <Box
        position="absolute"
        bottom="0"
        left="20%"
        right="20%"
        height="1px"
        bg="linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)"
      />

      {/* Animaciones CSS personalizadas */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </Box>
  );
};

export default Navbar;