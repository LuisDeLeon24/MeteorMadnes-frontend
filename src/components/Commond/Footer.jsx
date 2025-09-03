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
      mb={8}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
    >
      <Text
        fontWeight="900"
        fontSize="xl"
        mb={4}
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
          width: '70px',
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
        left="75px"
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
    <MotionBox
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
        width="400px"
        height="400px"
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
        width="350px"
        height="350px"
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
        width="200px"
        height="200px"
        border="1px solid rgba(59, 130, 246, 0.1)"
        borderRadius="full"
        animation="orbit 25s linear infinite"
      />

      <Container as={MotionStack} maxW="container.xl" py={20} position="relative" zIndex={2}>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          spacing={12}
          mb={16}
        >
          <MotionStack
            spacing={8}
            variants={itemVariants}
          >
            <MotionBox
              initial="rest"
              whileHover="hover"
              variants={iconHoverVariants}
            >
              <HStack spacing={4} align="center">
                <Box position="relative">
                  <MotionBox
                    w={16}
                    h={16}
                    background="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"
                    borderRadius="2xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 20px 40px rgba(59, 130, 246, 0.4)"
                    position="relative"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-3px',
                      left: '-3px',
                      right: '-3px',
                      bottom: '-3px',
                      background: 'linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa, #1e40af)',
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
                    <Telescope size={28} color="white" />
                  </MotionBox>

                  <MotionBox
                    as={Badge}
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="linear-gradient(45deg, #059669, #10b981)"
                    color="white"
                    fontSize="10px"
                    px="3"
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
                    width="80px"
                    height="80px"
                    border="2px solid rgba(59, 130, 246, 0.2)"
                    borderRadius="full"
                    animation="radarPulse 3s ease-in-out infinite"
                  />
                </Box>

                <VStack align="flex-start" spacing={1}>
                  <MotionText
                    fontWeight="black"
                    fontSize="3xl"
                    color="white"
                    background="linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa)"
                    backgroundClip="text"
                    letterSpacing="tight"
                    textShadow="0 0 30px rgba(59, 130, 246, 0.3)"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    AtroTracker
                  </MotionText>
                  <MotionText
                    fontSize="sm"
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
              fontSize="md"
              lineHeight="1.8"
              color="rgba(219, 234, 254, 0.8)"
              maxW="350px"
              variants={itemVariants}
            >
              Protegiendo la Tierra con tecnología de vanguardia en detección, análisis y neutralización
              de asteroides potencialmente peligrosos. Vigilancia espacial 24/7.
            </MotionText>

            <MotionStack spacing={4} variants={itemVariants}>
              <ContactItem
                icon={<MapPin size={16} />}
                text="Centro Espacial, Guatemala"
                color="#3b82f6"
              />
              <ContactItem
                icon={<Radio size={16} />}
                text="Frecuencia: +502 SPACE-911"
                color="#60a5fa"
              />
              <ContactItem
                icon={<Mail size={16} />}
                text="mission@asteroidwatch.gt"
                color="#93c5fd"
              />
            </MotionStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Desarrolladores</ListHeader>
            <VStack align="flex-start" spacing={3}>
              <FooterLink href="#detection">Luis De León</FooterLink>
              <FooterLink href="#tracking">Joaquín Figueroa</FooterLink>
              <FooterLink href="#interception">Jorge Alvarez</FooterLink>
              <FooterLink href="#research">Anderson Gómez</FooterLink>
              <FooterLink href="#alerts">Juan Cajchun</FooterLink>
              <FooterLink href="#alerts">Werner Paredes</FooterLink>
            </VStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Centro de Control</ListHeader>
            <Text mb={6} fontSize="sm" color="rgba(219, 234, 254, 0.7)" lineHeight="1.6">
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
                py={6}
                fontSize="md"
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
                size="lg"
                background="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                py={6}
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
              mt={6}
              p={4}
              bg="rgba(59, 130, 246, 0.1)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              backdropFilter="blur(15px)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Text fontSize="xs" color="#93c5fd" textAlign="center">
                🚀 Más de 25,000+ científicos confían en AsteroidWatch
              </Text>
            </MotionBox>

            <HStack spacing={4} mt={6}>
              <SocialButton icon={<Satellite size={20} />} label="Red Satelital" />
              <SocialButton icon={<Globe size={20} />} label="Red Global" />
              <SocialButton icon={<Shield size={20} />} label="Protocolo Seguro" />
            </HStack>
          </MotionStack>

          <MotionStack align="flex-start" variants={itemVariants}>
            <ListHeader>Estado del Sistema</ListHeader>

            <VStack align="flex-start" spacing={4} w="full">
              <SystemStatus
                label="Radares Activos"
                status="OPERATIVO"
                count="47/47"
                color="#10b981"
              />
              <SystemStatus
                label="Satélites Online"
                status="NOMINAL"
                count="523/525"
                color="#3b82f6"
              />
              <SystemStatus
                label="Amenazas Detectadas"
                status="MONITOREANDO"
                count="3 NEO"
                color="#f59e0b"
              />
            </VStack>

            <MotionBox
              mt={6}
              p={4}
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
                  <Text fontSize="sm" fontWeight="bold" color="#10b981">
                    Próximo Escaneo
                  </Text>
                  <Text fontSize="xs" color="rgba(219, 234, 254, 0.6)">
                    Sector 7-Alpha
                  </Text>
                </VStack>
                <Badge
                  bg="#10b981"
                  color="white"
                  px={3}
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
        <Container maxW="container.xl" py={8}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={6}
          >
            <MotionText
              fontSize="sm"
              color="rgba(147, 197, 253, 0.6)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              © {new Date().getFullYear()} AstroTracker Defense System. Todos los derechos reservados.
              Comandancia Espacial Guatemala. 🌍 Protegiendo la Tierra desde 2025.
            </MotionText>
            <HStack spacing={8} fontSize="sm">
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
    </MotionBox>
  );
};

const ContactItem = ({ icon, text, color }) => (
  <MotionBox
    as={motion.div}
    whileHover={{ x: 8, scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <HStack spacing={4} align="center">
      <Box
        w={12}
        h={12}
        bg={`rgba(59, 130, 246, 0.15)`}
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="rgba(59, 130, 246, 0.3)"
        backdropFilter="blur(10px)"
        boxShadow="0 4px 15px rgba(59, 130, 246, 0.2)"
      >
        <Box color={color}>
          {icon}
        </Box>
      </Box>
      <Text fontSize="sm" color="rgba(219, 234, 254, 0.8)" fontWeight="medium">
        {text}
      </Text>
    </HStack>
  </MotionBox>
);

const SystemStatus = ({ label, status, count, color }) => (
  <MotionBox
    w="full"
    p={3}
    bg="rgba(59, 130, 246, 0.05)"
    borderRadius="lg"
    border="1px solid"
    borderColor="rgba(59, 130, 246, 0.1)"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <HStack justify="space-between" align="center">
      <VStack align="flex-start" spacing={1}>
        <Text fontSize="sm" fontWeight="bold" color="white">
          {label}
        </Text>
        <Text fontSize="xs" color={color} fontWeight="semibold">
          {status}
        </Text>
      </VStack>
      <Badge
        bg={color}
        color="white"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
      >
        {count}
      </Badge>
    </HStack>
  </MotionBox>
);

const SocialButton = ({ icon, label }) => (
  <MotionButton
    as={motion.button}
    size="md"
    variant="ghost"
    w={12}
    h={12}
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
      fontSize="sm"
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
      _hover_before={{
        opacity: 1
      }}
    >
      {children}
    </Link>
  </MotionBox>
);

export default Footer;