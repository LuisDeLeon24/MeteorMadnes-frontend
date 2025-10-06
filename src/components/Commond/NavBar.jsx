import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  Link,
  Spacer,
  Icon,
  VStack,
  Text,
  Circle,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Collapse
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Telescope,
  Shield,
  Activity,
  Settings,
  Target,
  Menu,
  ZapOff
} from "lucide-react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    {
      name: "Centro de Control",
      href: "/",
      icon: Activity,
      description: "Dashboard principal"
    },
    {
      name: "Simulación",
      href: "/map",
      icon: Telescope,
      description: "Simulación de impactos"
    },
    {
      name: "Interceptación",
      href: "/earth",
      icon: Target,
      description: "Revisión de orbitas"
    },
    {
      name: "Quiz",
      href: "/quiz",
      icon: Settings,
      description: "Desafía tu mente"
    },
    {
      name: "Mitigaciones",
      href: "/mitigations",
      icon: ZapOff,
      description: "Protegete"
    },
  ];

  const navigate = useNavigate();

const handleCommandClick = () => {
  navigate("/map"); // Aquí va la ruta de destino
};

  return (
    <>
      <Box
        bg="linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
        backdropFilter="blur(20px)"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 3, md: 4 }}
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

        {/* Partículas de fondo - ocultas en móvil */}
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
            display={{ base: "none", md: "block" }}
          />
        ))}

        <Flex align="center" justify="space-between" position="relative">
          {/* Logo y branding */}
          <MotionFlex
            align="center"
            gap={{ base: 2, md: 3, lg: 4 }}
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
                size={{ base: "md", md: "lg" }}
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
                fontSize={{ base: "2xs", md: "xs" }}
                color="#60a5fa"
                fontWeight="semibold"
                letterSpacing="wider"
                textTransform="uppercase"
                display={{ base: "none", sm: "block" }}
              >
                Asteroid Response System
              </Text>
            </VStack>
          </MotionFlex>

          <Spacer />

          {/* Navegación desktop */}
          <MotionBox
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            display={{ base: "none", lg: "block" }}
          >
            <HStack spacing={2}>
              {navLinks.map((link) => (
                <MotionBox
                  key={link.name}
                  position="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    _hover={{ textDecoration: "none" }}
                    onClick={() => setActiveLink(link.href)}
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
                </MotionBox>
              ))}
            </HStack>
          </MotionBox>

          {/* Sección derecha - Desktop */}
          <MotionBox
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            display={{ base: "none", lg: "block" }}
          >
            <HStack spacing={4}>
             <Box>
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
                onClick={handleCommandClick} // 👈 aquí agregas esto
              >
                Centro de Comando
              </MotionButton>
            </HStack>
          </MotionBox>

          {/* Botón de menú móvil */}
          <HStack spacing={2} display={{ base: "flex", lg: "none" }}>
            {/* Indicador de amenazas móvil */}
            <Circle
              size={{ base: "35px", md: "40px" }}
              bg="rgba(59, 130, 246, 0.1)"
              border="1px solid rgba(59, 130, 246, 0.2)"
              position="relative"
            >
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
              <Text
                position="absolute"
                top="-8px"
                right="-8px"
                bg="#3b82f6"
                color="white"
                fontSize="2xs"
                fontWeight="bold"
                px={1.5}
                py={0.5}
                borderRadius="full"
                minW="18px"
                textAlign="center"
              >
                3
              </Text>
            </Circle>

            <IconButton
              aria-label="Abrir menú"
              icon={<Icon as={Menu} size={24} />}
              onClick={onOpen}
              bg="rgba(59, 130, 246, 0.1)"
              color="#60a5fa"
              border="1px solid rgba(59, 130, 246, 0.2)"
              _hover={{
                bg: "rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 0.4)"
              }}
              size={{ base: "md", md: "lg" }}
              borderRadius="xl"
            />
          </HStack>
        </Flex>

        {/* Línea de energía inferior */}
        <Box
          position="absolute"
          bottom="0"
          left="20%"
          right="20%"
          height="1px"
          bg="linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)"
        />

        {/* Animaciones CSS */}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </Box>

      {/* Drawer móvil */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)" />
        <DrawerContent
          bg="linear-gradient(135deg, rgba(3, 7, 18, 0.98) 0%, rgba(10, 14, 26, 0.98) 100%)"
          backdropFilter="blur(20px)"
        >
          <DrawerCloseButton
            color="white"
            size="lg"
            top={4}
            right={4}
            bg="rgba(59, 130, 246, 0.1)"
            border="1px solid rgba(59, 130, 246, 0.2)"
            _hover={{
              bg: "rgba(59, 130, 246, 0.2)"
            }}
          />

          <DrawerHeader borderBottomWidth="1px" borderColor="rgba(59, 130, 246, 0.2)">
            <HStack spacing={3}>
              <Box position="relative">
                <img
                  src="/assets/images/Main_Logo-removebg-preview.png"
                  alt="AstroTracker Logo"
                  style={{ width: "60px", height: "60px" }}
                />
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Heading
                  size="md"
                  color="white"
                  fontFamily="monospace"
                  bgGradient="linear(to-r, #f8fafc, #60a5fa, #dbeafe)"
                  bgClip="text"
                >
                  AstroTracker
                </Heading>
                <Text fontSize="xs" color="#60a5fa" fontWeight="semibold">
                  MENÚ DE NAVEGACIÓN
                </Text>
              </VStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody py={6}>
            <Stack spacing={4}>
              {/* Monitor de amenazas en móvil */}
              <Box
                bg="rgba(59, 130, 246, 0.1)"
                borderRadius="xl"
                p={4}
                border="1px solid rgba(59, 130, 246, 0.2)"
                mb={2}
              >
                <HStack spacing={3}>
                  <Circle size="12px" bg="#10b981" opacity={0.8}>
                    <Box
                      position="absolute"
                      width="12px"
                      height="12px"
                      bg="#10b981"
                      borderRadius="full"
                      animation="pulse 2s ease-in-out infinite"
                    />
                  </Circle>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color="#60a5fa" fontWeight="bold">
                      ESTADO DEL SISTEMA
                    </Text>
                    <Text fontSize="md" color="white" fontWeight="bold">
                      3 NEO Monitoreando
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              {/* Enlaces de navegación */}
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  _hover={{ textDecoration: "none" }}
                  onClick={() => {
                    setActiveLink(link.href);
                    onClose();
                  }}
                >
                  <MotionBox
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <HStack
                      spacing={4}
                      p={4}
                      borderRadius="xl"
                      bg="rgba(59, 130, 246, 0.05)"
                      border="1px solid rgba(59, 130, 246, 0.1)"
                      _hover={{
                        bg: "rgba(59, 130, 246, 0.15)",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        transform: "translateX(5px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      <Circle size="45px" bg="rgba(59, 130, 246, 0.2)">
                        <Icon as={link.icon} size={22} color="#60a5fa" />
                      </Circle>
                      <VStack align="flex-start" spacing={1} flex={1}>
                        <Text
                          fontWeight="bold"
                          color="white"
                          fontSize="md"
                        >
                          {link.name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="rgba(147, 197, 253, 0.7)"
                        >
                          {link.description}
                        </Text>
                      </VStack>
                      <Icon as={Target} size={16} color="rgba(59, 130, 246, 0.5)" />
                    </HStack>
                  </MotionBox>
                </Link>
              ))}

              {/* Botón de comando en móvil */}
              <MotionButton
                as={motion.button}
                size="lg"
                width="full"
                height="60px"
                bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                border="2px solid rgba(59, 130, 246, 0.3)"
                boxShadow="0 0 25px rgba(59, 130, 246, 0.3)"
                rightIcon={<Icon as={Shield} size={20} />}
                mt={4}
                whileTap={{ scale: 0.98 }}
              >
                Centro de Comando
              </MotionButton>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;