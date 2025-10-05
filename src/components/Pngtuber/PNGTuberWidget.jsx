import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Text, Image, keyframes } from '@chakra-ui/react';

import idleImage from './images/idle.png';
import talkingImage from './images/talking.png';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-10px);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const PNGTuberWidget = () => {
  const [currentMessage, setCurrentMessage] = useState("¡Hola! 👋 Bienvenido");
  const [isTalking, setIsTalking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const messages = [
    "¡Hola! 👋 Bienvenido a Meteor Madness",
    "¿Sabías que rastreamos asteroides en tiempo real? 🌠",
    "¡Explora el espacio con nosotros! 🚀",
    "Los asteroides son fascinantes, ¿verdad? ☄️",
    "¿Necesitas ayuda? ¡Estoy aquí! 🤖",
    "¡La NASA nos provee datos increíbles! 🛰️",
    "¿Ya probaste buscar un asteroide? 🔍",
    "¡Cada día descubrimos algo nuevo! ✨",
  ];

  const speakRandom = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMsg);
    setIsTalking(true);
    setIsMinimized(false);

    setTimeout(() => setIsTalking(false), 2500);
  };

  useEffect(() => {
    const interval = setInterval(speakRandom, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom={{ base: "10px", sm: "15px", md: "20px", lg: "30px" }}
      right={{ base: "10px", sm: "15px", md: "20px", lg: "30px" }}
      zIndex="9999"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      gap={{ base: "8px", sm: "10px", md: "12px", lg: "15px" }}
      maxW={{ base: "calc(100vw - 20px)", sm: "auto" }}
    >
      {/* Burbuja de texto */}
      {!isMinimized && (
        <Box
          position="relative"
          bgGradient="linear(135deg, #00d4ff 0%, #0099ff 100%)"
          color="white"
          padding={{ base: "10px 12px", sm: "12px 15px", md: "15px 20px" }}
          borderRadius={{ base: "15px", md: "20px" }}
          maxW={{ base: "180px", sm: "220px", md: "260px", lg: "280px" }}
          w="max-content"
          boxShadow="0 8px 20px rgba(0, 212, 255, 0.3)"
          animation={`${fadeInUp} 0.4s ease`}
          textAlign="center"
          _after={{
            content: '""',
            position: "absolute",
            bottom: { base: "-8px", md: "-10px" },
            right: { base: "30px", md: "40px" },
            width: "0",
            height: "0",
            borderLeft: { base: "12px solid transparent", md: "15px solid transparent" },
            borderRight: { base: "12px solid transparent", md: "15px solid transparent" },
            borderTop: { base: "12px solid #0099ff", md: "15px solid #0099ff" },
          }}
          sx={isTalking ? {
            animation: `${pulse} 0.5s ease infinite`
          } : {}}
        >
          <Text
            fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px" }}
            fontWeight="500"
            lineHeight="1.4"
          >
            {currentMessage}
          </Text>
        </Box>
      )}

      {/* Contenedor del personaje */}
      <Box
        position="relative"
        width={{ base: "100px", sm: "120px", md: "150px", lg: "180px", xl: "200px" }}
        height={{ base: "100px", sm: "120px", md: "150px", lg: "180px", xl: "200px" }}
        bgGradient="linear(135deg, #1a1a2e 0%, #16213e 100%)"
        borderRadius="50%"
        overflow="hidden"
        boxShadow="0 10px 30px rgba(0, 0, 0, 0.4)"
        border={{ base: "3px solid", md: "4px solid" }}
        borderColor="#00d4ff"
        transition="all 0.3s ease"
        _hover={{
          transform: { base: "scale(1.03)", md: "scale(1.05)" },
          borderColor: "#00ff88",
          boxShadow: "0 15px 40px rgba(0, 212, 255, 0.5)",
        }}
        animation={isTalking ? `${bounce} 0.6s ease` : `${float} 3s ease-in-out infinite`}
        cursor="pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <Image
          src={isTalking ? talkingImage : idleImage}
          alt="PNGTuber Character"
          width="100%"
          height="100%"
          objectFit="cover"
          pointerEvents="none"
        />

        {/* Botón de cerrar */}
        <Button
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          colorScheme="red"
          position="absolute"
          top={{ base: "-8px", md: "-10px" }}
          right={{ base: "-8px", md: "-10px" }}
          borderRadius="full"
          width={{ base: "22px", md: "25px" }}
          height={{ base: "22px", md: "25px" }}
          minW={{ base: "22px", md: "25px" }}
          padding="0"
          zIndex="10"
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="bold"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
          cursor="pointer"
          transition="all 0.2s ease"
          _hover={{
            transform: "scale(1.1) rotate(90deg)",
            bg: "red.600",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
        >
          ×
        </Button>

        {/* Indicador de minimizado */}
        {isMinimized && (
          <Box
            position="absolute"
            bottom={{ base: "8px", md: "10px" }}
            left="50%"
            transform="translateX(-50%)"
            bg="rgba(0, 212, 255, 0.9)"
            color="white"
            fontSize={{ base: "10px", md: "12px" }}
            fontWeight="bold"
            px={{ base: 2, md: 3 }}
            py={1}
            borderRadius="full"
            backdropFilter="blur(10px)"
            boxShadow="0 2px 10px rgba(0, 212, 255, 0.5)"
          >
            💬
          </Box>
        )}
      </Box>

      {/* Mini controles */}
      {!isMinimized && (
        <HStack
          spacing={{ base: 1, md: 2 }}
          bg="rgba(0, 0, 0, 0.7)"
          p={{ base: "6px 8px", md: "8px 10px" }}
          borderRadius={{ base: "15px", md: "20px" }}
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"
        >
          <Button
            size={{ base: "xs", md: "sm" }}
            onClick={(e) => {
              e.stopPropagation();
              speakRandom();
            }}
            colorScheme="purple"
            fontSize={{ base: "10px", md: "12px" }}
            px={{ base: 2, md: 3 }}
            h={{ base: "24px", md: "28px" }}
            minW="auto"
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(128, 90, 213, 0.4)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
          >
            💬 Hablar
          </Button>

          <Button
            size={{ base: "xs", md: "sm" }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            colorScheme="blue"
            fontSize={{ base: "10px", md: "12px" }}
            px={{ base: 2, md: 3 }}
            h={{ base: "24px", md: "28px" }}
            minW="auto"
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 212, 255, 0.4)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
          >
            {isMinimized ? "📖" : "📕"}
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default PNGTuberWidget;