// src/components/PNGTuber/PNGTuberWidget.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Text, Image } from '@chakra-ui/react';
import './PNGTuberWidget.css';

// Importa tus imágenes
import idleImage from './images/idle.png';
import talkingImage from './images/talking.png';

const PNGTuberWidget = () => {
  const [currentMessage, setCurrentMessage] = useState("¡Hola! 👋 Bienvenido");
  const [isTalking, setIsTalking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
    
    // Detener animación después de 2-3 segundos
    setTimeout(() => setIsTalking(false), 2500);
  };

  // Hablar automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(speakRandom, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <Box className="pngtuber-widget">
      <Box className={`speech-bubble ${isTalking ? 'talking' : ''}`}>
        <Text fontSize="14px" fontWeight="500">
          {currentMessage}
        </Text>
      </Box>

      <Box className={`character-container ${isTalking ? 'bouncing' : ''}`}>

        <Image 
          src={isTalking ? talkingImage : idleImage}
          alt="PNGTuber Character"
          className="character-image"
          objectFit="contain"
        />
        

        <Button
          size="xs"
          onClick={() => setIsVisible(false)}
          colorScheme="red"
          position="absolute"
          top="-10px"
          right="-10px"
          borderRadius="full"
          width="25px"
          height="25px"
          minW="25px"
          padding="0"
          zIndex="10"
          fontSize="18px"
        >
          ×
        </Button>
      </Box>


      <HStack spacing={1} bg="rgba(0, 0, 0, 0.7)" p={2} borderRadius="20px">
        <Button size="xs" onClick={speakRandom} colorScheme="purple">
          💬 Hablar
        </Button>
      </HStack>
    </Box>
  );
};

export default PNGTuberWidget;