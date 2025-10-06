import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  Badge,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { Telescope, Mail, MapPin, Radio, ArrowRight, Github, Twitter, Linkedin, Satellite, Globe, Shield } from 'lucide-react';
import { useRef } from 'react';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);
const MotionText = motion(Text);

// Variantes de animación espaciales
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconHoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: 15,
    transition: { duration: 0.3 }
  }
};

const ListHeader = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <MotionBox
      ref={ref}
      position="relative"
      mb={{ base: 4, md: 6, lg: 8 }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
    >
      <Text
        fontWeight="900"
        fontSize={{ base: 'lg', md: 'xl' }}
        mb={{ base: 3, md: 4 }}
        color="white"
        textTransform="uppercase"
        letterSpacing="wider"
        position="relative"
        textShadow="0 0 20px rgba(96, 165, 250, 0.5)"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: 0,
          width: { base: '50px', md: '70px' },
          height: '3px',
          background: 'linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa)',
          borderRadius: 'full',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
        }}
      >
        {children}
      </Text>
      <MotionBox
        position="absolute"
        bottom="-8px"
        left={{ base: '55px', md: '75px' }}
        w="8px"
        h="8px"
        bg="linear-gradient(135deg, #3b82f6, #60a5fa)"
        borderRadius="full"
        boxShadow="0 0 15px rgba(96, 165, 250, 0.6)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
    </MotionBox>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <Box
      ref={footerRef}
      bg="linear-gradient(180deg, #000000 0%, #030712 30%, #0f172a 60%, #000000 100%)"
      color="gray.300"
      position="relative"
      overflow="hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Línea de energía superior */}
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="3px"
        background="linear-gradient(90deg, transparent, #1e40af, #3b82f6, #60a5fa, transparent)"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        boxShadow="0 0 20px rgba(59, 130, 246, 0.5)"
      />

      {/* Campo de estrellas animado */}
      {[...Array(12)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          width={`${2 + Math.random() * 3}px`}
          height={`${2 + Math.random() * 3}px`}
          bg="linear-gradient(135deg, #60a5fa, #93c5fd)"
          borderRadius="full"
          opacity={0.7}
          top={`${15 + Math.random() * 70}%`}
          left={`${5 + Math.random() * 90}%`}
          display={{ base: i > 5 ? 'none' : 'block', md: 'block' }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Nebulosas de fondo */}
      <MotionBox
        position="absolute"
        top="10%"
        right="5%"
        width={{ base: '250px', md: '350px', lg: '400px' }}
        height={{ base: '250px', md: '350px', lg: '400px' }}
        background="radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
        borderRadius="full"
        pointerEvents="none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        left="5%"
        width={{ base: '200px', md: '300px', lg: '350px' }}
        height={{ base: '200px', md: '300px', lg: '350px' }}
        background="radial-gradient(circle, rgba(147, 197, 253, 0.12) 0%, transparent 70%)"
        borderRadius="full"
        pointerEvents="none"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Box
        position="absolute"
        top="15%"
        left="15%"
        width={{ base: '150px', md: '200px' }}
        height={{ base: '150px', md: '200px' }}
        border="1px solid rgba(59, 130, 246, 0.1)"
        borderRadius="full"
        animation="orbit 25s linear infinite"
        display={{ base: 'none', lg: 'block' }}
      />

      <Container as={MotionStack} maxW="container.xl" py={{ base: 12, md: 16, lg: 20 }} position="relative" zIndex={2} px={{ base: 4, md: 6, lg: 8 }}>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          spacing={{ base: 8, md: 10, lg: 12 }}
          mb={{ base: 8, md: 12, lg: 16 }}
        >
          <MotionStack
            spacing={{ base: 4, md: 6, lg: 8 }}
            variants={itemVariants}
          >
            <MotionBox
              initial="rest"
              whileHover="hover"
              variants={iconHoverVariants}
            >
              <HStack spacing={{ base: 3, md: 4 }} align="center">
                <Box position="relative">
                  <MotionBox
                    w={{ base: 14, md: 16 }}
                    h={{ base: 14, md: 16 }}
                    borderRadius="2xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-3px',
                      left: '-3px',
                      right: '-3px',
                      bottom: '-3px',
                      borderRadius: '2xl',
                      zIndex: -1,
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Box position="relative">
                      <img
                        src="/assets/images/Main_Logo-removebg-preview.png"
                        alt="AstroTracker Logo"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </Box>
                  </MotionBox>

                  <MotionBox
                    as={Badge}
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="linear-gradient(45deg, #059669, #10b981)"
                    color="white"
                    fontSize={{ base: '9px', md: '10px' }}
                    px={{ base: '2', md: '3' }}
                    py="1"
                    borderRadius="full"
                    fontWeight="bold"
                    boxShadow="0 4px 12px rgba(16, 185, 129, 0.3)"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    LIVE
                  </MotionBox>

                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width={{ base: '70px', md: '80px' }}
                    height={{ base: '70px', md: '80px' }}
                    border="2px solid rgba(59, 130, 246, 0.2)"
                    borderRadius="full"
                    animation="radarPulse 3s ease-in-out infinite"
                  />
                </Box>

                <VStack align="flex-start" spacing={1}>
                  <MotionText
                    fontWeight="black"
                    fontSize={{ base: '2xl', md: '3xl' }}
                    color="white"
                    background="linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa)"
                    backgroundClip="text"
                    letterSpacing="tight"
                    textShadow="0 0 30px rgba(59, 130, 246, 0.3)"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    AstroTracker
                  </MotionText>
                  <MotionText
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="#60a5fa"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Sistema de rastreo
                  </MotionText>
                </VStack>
              </HStack>
            </MotionBox>

            <MotionText
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="1.8"
              color="rgba(219, 234, 254, 0.8)"
              maxW={{ base: 'full', lg: '350px' }}
              variants={itemVariants}
            >
              Protegiendo la Tierra con tecnología de vanguardia en detección, análisis y neutralización
              de asteroides potencialmente peligrosos. Vigilancia espacial 24/7.
            </MotionText>

            <MotionStack spacing={{ base: 3, md: 4 }} variants={itemVariants}>
              <ContactItem
                icon={<MapPin size={16} />}
                text="BADVOIDS"
                color="#3b82f6"
              />
              <ContactItem
                icon={<Radio size={16} />}
                text="@Badvoids.gt"
                color="#60a5fa"
              />
            </MotionStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Desarrolladores</ListHeader>
            <VStack align="flex-start" spacing={{ base: 2, md: 3 }} w="full">
              <FooterLink href="#detection">Luis De León</FooterLink>
              <FooterLink href="#tracking">Joaquín Figueroa</FooterLink>
              <FooterLink href="#interception">Jorge Alvarez</FooterLink>
              <FooterLink href="#research">Anderson Gómez</FooterLink>
              <FooterLink href="#alerts">Juan Cajchun</FooterLink>
              <FooterLink href="#alerts">José Rivera</FooterLink>
            </VStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Centro de Control</ListHeader>
            <Text mb={{ base: 4, md: 6 }} fontSize={{ base: 'xs', md: 'sm' }} color="rgba(219, 234, 254, 0.7)" lineHeight="1.6">
              Mantente informado sobre amenazas espaciales, nuevas detecciones y actualizaciones
              del sistema de defensa planetaria.
            </Text>

            <FormControl>
              <Input
                placeholder="comandante@correo.com"
                bg="rgba(10, 14, 26, 0.8)"
                border="2px solid"
                borderColor="rgba(59, 130, 246, 0.3)"
                color="white"
                borderRadius="xl"
                py={{ base: 5, md: 6 }}
                fontSize={{ base: 'sm', md: 'md' }}
                backdropFilter="blur(10px)"
                _placeholder={{ color: 'rgba(147, 197, 253, 0.5)' }}
                _hover={{
                  borderColor: 'rgba(59, 130, 246, 0.6)',
                  bg: 'rgba(10, 14, 26, 0.95)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                }}
                _focus={{
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
                  bg: 'rgba(10, 14, 26, 1)'
                }}
                transition="all 0.3s ease"
              />
              <MotionButton
                as={motion.button}
                mt={4}
                w="full"
                size={{ base: 'md', md: 'lg' }}
                background="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                py={{ base: 5, md: 6 }}
                fontSize={{ base: 'sm', md: 'md' }}
                rightIcon={<ArrowRight size={16} />}
                boxShadow="0 10px 25px rgba(59, 130, 246, 0.3)"
                whileHover={{
                  background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Unirse a la Misión
              </MotionButton>
            </FormControl>

            <MotionBox
              mt={{ base: 4, md: 6 }}
              p={{ base: 3, md: 4 }}
              bg="rgba(59, 130, 246, 0.1)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              backdropFilter="blur(15px)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              w="full"
            >
              <Text fontSize={{ base: '2xs', md: 'xs' }} color="#93c5fd" textAlign="center">
                🚀 Más de 25,000+ científicos confían en AsteroidWatch
              </Text>
            </MotionBox>

            <HStack spacing={{ base: 3, md: 4 }} mt={{ base: 4, md: 6 }} w="full" justify={{ base: 'center', md: 'flex-start' }}>
              <SocialButton icon={<Satellite size={18} />} label="Red Satelital" />
              <SocialButton icon={<Globe size={18} />} label="Red Global" />
              <SocialButton icon={<Shield size={18} />} label="Protocolo Seguro" />
            </HStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Estado del Sistema</ListHeader>

            <VStack align="flex-start" spacing={{ base: 3, md: 4 }} w="full">
              <SystemStatus
                label="FITS Visibles"
                status="OPERATIVO"
                count="47/47"
                color="#10b981"
              />
              <SystemStatus
                label="Simuladores"
                status="NOMINAL"
                count="523/525"
                color="#3b82f6"
              />
              <SystemStatus
                label="Punteo promedio"
                status="MONITOREANDO"
                count=" 8 pts"
                color="#f59e0b"
              />
            </VStack>

            <MotionBox
              mt={{ base: 4, md: 6 }}
              p={{ base: 3, md: 4 }}
              bg="rgba(16, 185, 129, 0.1)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(16, 185, 129, 0.3)"
              w="full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <HStack justify="space-between" align="center">
                <VStack align="flex-start" spacing={1}>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" color="#10b981">
                    MASA SPACE APPS
                  </Text>
                  <Text fontSize="xs" color="rgba(219, 234, 254, 0.6)">
                    BADVOIDS
                  </Text>
                </VStack>
                <Badge
                  bg="#10b981"
                  color="white"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  2:47:23
                </Badge>
              </HStack>
            </MotionBox>
          </MotionStack>
        </SimpleGrid>
      </Container>

      <MotionBox
        bg="rgba(10, 14, 26, 0.9)"
        borderTop="1px solid"
        borderColor="rgba(59, 130, 246, 0.3)"
        backdropFilter="blur(20px)"
        variants={itemVariants}
      >
        <Container maxW="container.xl" py={{ base: 6, md: 8 }} px={{ base: 4, md: 6, lg: 8 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={{ base: 4, md: 6 }}
          >
            <MotionText
              fontSize={{ base: 'xs', md: 'sm' }}
              color="rgba(147, 197, 253, 0.6)"
              textAlign={{ base: 'center', md: 'left' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              © {new Date().getFullYear()} AstroTracker Defense System. Todos los derechos reservados.
              Comandancia Espacial Guatemala. 🌍 Protegiendo la Tierra desde 2025.
            </MotionText>
            <HStack
              spacing={{ base: 4, md: 6, lg: 8 }}
              fontSize={{ base: 'xs', md: 'sm' }}
              flexWrap="wrap"
              justify="center"
            >
              <FooterLink href="#protocols">Protocolos de Defensa</FooterLink>
              <FooterLink href="#classified">Información Clasificada</FooterLink>
              <FooterLink href="#emergency">Emergencias</FooterLink>
            </HStack>
          </Flex>
        </Container>
      </MotionBox>

      <style jsx>{`
                @keyframes orbit {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes radarPulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
            `}</style>
    </Box>
  );
};

const ContactItem = ({ icon, text, color }) => (
  <MotionBox
    as={motion.div}
    whileHover={{ x: 8, scale: 1.02 }}
    transition={{ duration: 0.2 }}
    w="full"
  >
    <HStack spacing={{ base: 3, md: 4 }} align="center">
      <Box
        w={{ base: 10, md: 12 }}
        h={{ base: 10, md: 12 }}
        bg={`rgba(59, 130, 246, 0.15)`}
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="rgba(59, 130, 246, 0.3)"
        backdropFilter="blur(10px)"
        boxShadow="0 4px 15px rgba(59, 130, 246, 0.2)"
        flexShrink={0}
      >
        <Box color={color}>
          {icon}
        </Box>
      </Box>
      <Text fontSize={{ base: 'xs', md: 'sm' }} color="rgba(219, 234, 254, 0.8)" fontWeight="medium">
        {text}
      </Text>
    </HStack>
  </MotionBox>
);

const SystemStatus = ({ label, status, count, color }) => (
  <MotionBox
    w="full"
    p={{ base: 2.5, md: 3 }}
    bg="rgba(59, 130, 246, 0.05)"
    borderRadius="lg"
    border="1px solid"
    borderColor="rgba(59, 130, 246, 0.1)"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <HStack justify="space-between" align="center" spacing={2}>
      <VStack align="flex-start" spacing={1} flex={1}>
        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" color="white">
          {label}
        </Text>
        <Text fontSize="xs" color={color} fontWeight="semibold">
          {status}
        </Text>
      </VStack>
      <Badge
        bg={color}
        color="white"
        px={{ base: 2, md: 3 }}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        flexShrink={0}
      >
        {count}
      </Badge>
    </HStack>
  </MotionBox>
);

const SocialButton = ({ icon, label }) => (
  <MotionButton
    as={motion.button}
    size={{ base: 'sm', md: 'md' }}
    variant="ghost"
    w={{ base: 10, md: 12 }}
    h={{ base: 10, md: 12 }}
    bg="rgba(10, 14, 26, 0.8)"
    color="rgba(147, 197, 253, 0.7)"
    borderRadius="xl"
    border="1px solid"
    borderColor="rgba(59, 130, 246, 0.2)"
    backdropFilter="blur(10px)"
    whileHover={{
      transform: 'translateY(-3px)',
      color: 'white',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      borderColor: 'transparent',
      boxShadow: '0 12px 28px rgba(59, 130, 246, 0.4)'
    }}
    whileTap={{ scale: 0.95 }}
    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    aria-label={label}
  >
    {icon}
  </MotionButton>
);

const FooterLink = ({ children, href = "#" }) => (
  <MotionBox
    as={motion.div}
    whileHover={{ x: 10 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      href={href}
      color="rgba(147, 197, 253, 0.7)"
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight="medium"
      _hover={{
        color: '#60a5fa',
        textDecoration: 'none',
      }}
      transition="all 0.3s ease"
      display="flex"
      alignItems="center"
      position="relative"
      py={2}
      _before={{
        content: '""',
        position: 'absolute',
        left: '-20px',
        width: '4px',
        height: '4px',
        bg: '#3b82f6',
        borderRadius: 'full',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)'
      }}
      sx={{
        '&:hover::before': {
          opacity: 1
        }
      }}
    >
      {children}
    </Link>
  </MotionBox>
);

export default Footer;