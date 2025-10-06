import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, HStack, VStack, Text, Image, Input, IconButton, useToast, Spinner } from '@chakra-ui/react';
import { useOpenRouterChat } from '../../Hooks/useOpenRouterChat';

const idleImage = 'src/components/Pngtuber/images/idle.png';
const talkingImage = 'src/components/Pngtuber/images/talking.png';
const chatIdleImage = 'src/components/Pngtuber/images/chat-idle.png';
const chatTalkingImage = 'src/components/Pngtuber/images/chat-talking.png';

const AstroTrackerAssistant = () => {
  const [currentMessage, setCurrentMessage] = useState("¡Hola! 👋 Soy tu asistente de AstroTracker");
  const [isTalking, setIsTalking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const recognitionRef = useRef(null);
  const toast = useToast();
  const selectedVoiceRef = useRef(null);
  const hasSpokenRef = useRef(false);
  
  const { sendMessage, response, loading, error } = useOpenRouterChat();

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && !selectedVoiceRef.current) {
        console.log('🎤 Voces disponibles:', voices.map(v => v.name));
        
        const yolandaVoice = voices.find(v => 
          v.name === 'Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)'
        );
        
        selectedVoiceRef.current = yolandaVoice || voices[0];
        console.log('✅ Voz seleccionada:', selectedVoiceRef.current?.name);
      }
    };
    
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({
          title: "🎤 Escuchando...",
          status: "info",
          duration: 2000,
        });
      };

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages(prev => [...prev, { type: 'user', text: transcript }]);
        
        hasSpokenRef.current = false;
        await handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Error",
          description: "Error en reconocimiento de voz",
          status: "error",
          duration: 3000,
        });
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    if (response && !hasSpokenRef.current) {
      hasSpokenRef.current = true;
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setCurrentMessage(response);
      speak(response);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error de API",
        description: error,
        status: "error",
        duration: 5000,
      });
      
      const errorMsg = `Error: ${error}`;
      setMessages(prev => [...prev, { type: 'bot', text: errorMsg }]);
      setCurrentMessage(errorMsg);
    }
  }, [error]);

  const speak = (text) => {
    if (isMuted) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    
    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onstart = () => {
      setIsTalking(true);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsTalking(false);
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Error en TTS:', event);
      setIsTalking(false);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsTalking(false);
  };

  const handleSendMessage = async (userMessage) => {
    await sendMessage(userMessage);
  };

  const sendTextMessage = async () => {
    if (inputText.trim()) {
      const userMsg = inputText.trim();
      setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
      setInputText('');
      
      hasSpokenRef.current = false;
      await handleSendMessage(userMsg);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      gap={3}
    >
      {/* Minimized Bubble */}
      {isMinimized && (
        <Box 
          width="60px"
          height="60px"
          borderRadius="full"
          bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
          boxShadow="0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.3s"
          animation="pulse 2s infinite"
          onClick={() => setIsMinimized(false)}
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
          }}
          css={{
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 }
            }
          }}
        >
          <Image
            src={isTalking ? talkingImage : idleImage}
            alt="Assistant"
            width="50px"
            height="50px"
            objectFit="contain"
            filter="drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))"
          />
        </Box>
      )}

      {/* Chat Window */}
      {!isMinimized && chatMode && (
        <Box
          bg="linear-gradient(180deg, #0a1628 0%, #1a2942 50%, #0f1f3a 100%)"
          borderRadius="2xl"
          boxShadow="0 0 40px rgba(59, 130, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.2)"
          width="380px"
          height="550px"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          border="2px solid"
          borderColor="rgba(59, 130, 246, 0.4)"
        >
          {/* Header */}
          <Box 
            bg="rgba(59, 130, 246, 0.1)" 
            backdropFilter="blur(10px)"
            color="white" 
            p={4}
            borderBottom="1px solid"
            borderColor="rgba(59, 130, 246, 0.3)"
          >
            <HStack justify="space-between" align="center">
              <HStack spacing={3}>
                <Box
                  w="10px"
                  h="10px"
                  borderRadius="full"
                  bg="#3b82f6"
                  boxShadow="0 0 10px #3b82f6"
                  animation="pulse 2s infinite"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" fontSize="lg" color="#60a5fa">🤖 Asistente Virtual</Text>
                  <Text fontSize="xs" color="rgba(255,255,255,0.6)">AstroTracker System</Text>
                </VStack>
              </HStack>
              <HStack spacing={2}>
                <IconButton
                  icon={<Text fontSize="18px">{isMuted ? '🔇' : '🔊'}</Text>}
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  bg={isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: isMuted ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)' }}
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                />
                <Button 
                  size="sm" 
                  onClick={() => setChatMode(false)} 
                  bg="rgba(59, 130, 246, 0.2)"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.3)' }}
                >
                  ✕
                </Button>
              </HStack>
            </HStack>
          </Box>

          {/* Messages Area */}
          <VStack 
            flex="1" 
            overflowY="auto" 
            p={4} 
            spacing={3} 
            align="stretch" 
            bg="rgba(10, 22, 40, 0.8)"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#3b82f6',
                borderRadius: '10px',
              },
            }}
          >
            {messages.length === 0 && (
              <VStack spacing={3} py={8} opacity={0.7}>
                <Text fontSize="4xl">🛰️</Text>
                <Text fontSize="sm" color="#60a5fa" textAlign="center" fontWeight="500">
                  Sistema AstroTracker Activo
                </Text>
                <Text fontSize="xs" color="rgba(255,255,255,0.5)" textAlign="center">
                  Pregúntame sobre asteroides, órbitas<br />o sistemas de defensa planetaria
                </Text>
              </VStack>
            )}
            
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                maxWidth="75%"
              >
                <Box
                  bg={msg.type === 'user' 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                    : 'rgba(30, 41, 59, 0.9)'
                  }
                  color="white"
                  p={3}
                  borderRadius="xl"
                  boxShadow={msg.type === 'user' 
                    ? '0 0 15px rgba(59, 130, 246, 0.4)' 
                    : '0 0 15px rgba(0, 0, 0, 0.5)'
                  }
                  position="relative"
                  border="1px solid"
                  borderColor={msg.type === 'user' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.2)'}
                >
                  <Text fontSize="sm" lineHeight="1.6">{msg.text}</Text>
                  {msg.type === 'bot' && !isMuted && (
                    <IconButton
                      icon={<Text fontSize="16px">🔊</Text>}
                      size="xs"
                      position="absolute"
                      bottom="6px"
                      right="6px"
                      minW="26px"
                      height="26px"
                      borderRadius="full"
                      bg="rgba(59, 130, 246, 0.8)"
                      color="white"
                      _hover={{ bg: '#3b82f6', transform: 'scale(1.1)' }}
                      onClick={() => speak(msg.text)}
                      boxShadow="0 0 10px rgba(59, 130, 246, 0.6)"
                    />
                  )}
                </Box>
              </Box>
            ))}
            
            {loading && (
              <Box alignSelf="flex-start" maxWidth="75%">
                <Box
                  bg="rgba(30, 41, 59, 0.9)"
                  p={3}
                  borderRadius="xl"
                  boxShadow="0 0 15px rgba(0, 0, 0, 0.5)"
                  border="1px solid"
                  borderColor="rgba(59, 130, 246, 0.2)"
                >
                  <HStack spacing={2}>
                    <Spinner size="sm" color="#3b82f6" />
                    <Text fontSize="sm" color="#60a5fa">Analizando...</Text>
                  </HStack>
                </Box>
              </Box>
            )}
          </VStack>

          {/* Character Avatar at Bottom */}
          <Box
            position="relative"
            height="120px"
            bg="rgba(10, 22, 40, 0.8)"
            borderTop="1px solid"
            borderColor="rgba(59, 130, 246, 0.3)"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            overflow="hidden"
          >
            <Image
              src={isTalking ? chatTalkingImage : chatIdleImage}
              alt="Assistant"
              height="110px"
              objectFit="contain"
              transition="all 0.3s"
              transform={isTalking ? 'scale(1.1)' : 'scale(1)'}
              filter={isTalking ? 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))' : 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))'}
            />
          </Box>

          {/* Input Area */}
          <Box 
            p={3} 
            bg="rgba(59, 130, 246, 0.1)" 
            backdropFilter="blur(10px)"
            borderTop="1px solid"
            borderColor="rgba(59, 130, 246, 0.3)"
          >
            <HStack spacing={2}>
              <IconButton
                icon={<Text fontSize="20px">{isListening ? '⏹️' : '🎤'}</Text>}
                bg={isListening ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
                color="white"
                size="md"
                borderRadius="full"
                onClick={isListening ? stopListening : startListening}
                boxShadow="0 0 15px rgba(59, 130, 246, 0.5)"
                _hover={{ transform: 'scale(1.1)', bg: isListening ? '#ef4444' : '#3b82f6' }}
              />
              <Input
                placeholder="Escribe tu mensaje..."
                size="md"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && sendTextMessage()}
                bg="rgba(30, 41, 59, 0.8)"
                color="white"
                borderRadius="full"
                border="1px solid"
                borderColor="rgba(59, 130, 246, 0.3)"
                _placeholder={{ color: 'rgba(255,255,255,0.4)' }}
                _focus={{ 
                  borderColor: '#3b82f6', 
                  boxShadow: '0 0 0 1px #3b82f6',
                  bg: 'rgba(30, 41, 59, 0.9)'
                }}
                disabled={loading}
              />
              <IconButton
                icon={<Text fontSize="18px">📡</Text>}
                bg="rgba(59, 130, 246, 0.8)"
                color="white"
                size="md"
                borderRadius="full"
                onClick={sendTextMessage}
                isLoading={loading}
                boxShadow="0 0 15px rgba(59, 130, 246, 0.5)"
                _hover={{ transform: 'scale(1.1)', bg: '#3b82f6' }}
              />
            </HStack>
          </Box>
        </Box>
      )}

      {/* Speech Bubble */}
      {!isMinimized && !chatMode && (
        <Box
          bg="rgba(10, 22, 40, 0.95)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={3}
          boxShadow="0 0 20px rgba(59, 130, 246, 0.4)"
          maxWidth="280px"
          position="relative"
          border="1px solid"
          borderColor="rgba(59, 130, 246, 0.3)"
          transition="all 0.3s"
        >
          <Text fontSize="14px" fontWeight="500" color="white">{currentMessage}</Text>
          <Box
            position="absolute"
            bottom="-8px"
            right="30px"
            width="0"
            height="0"
            borderLeft="10px solid transparent"
            borderRight="10px solid transparent"
            borderTop="10px solid rgba(10, 22, 40, 0.95)"
          />
        </Box>
      )}

      {/* Character */}
      {!isMinimized && !chatMode && (
        <Box position="relative">
          <Box
            bg="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
            borderRadius="full"
            p={4}
            boxShadow="0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)"
            cursor="pointer"
            onClick={() => setChatMode(true)}
            transition="all 0.3s"
            _hover={{ 
              transform: 'scale(1.05)', 
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)' 
            }}
          >
            <Image
              src={isTalking ? talkingImage : idleImage}
              alt="Assistant"
              width="120px"
              height="120px"
              objectFit="contain"
              transition="transform 0.2s"
              transform={isTalking ? 'scale(1.1)' : 'scale(1)'}
              filter="drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
            />
          </Box>
          <Button
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            bg="rgba(239, 68, 68, 0.9)"
            color="white"
            position="absolute"
            top="-5px"
            right="-5px"
            borderRadius="full"
            width="28px"
            height="28px"
            minW="28px"
            padding="0"
            boxShadow="0 0 10px rgba(239, 68, 68, 0.6)"
            _hover={{ bg: '#ef4444', transform: 'scale(1.1)' }}
          >
            ×
          </Button>
        </Box>
      )}

      {/* Controls */}
      {!isMinimized && !chatMode && (
        <HStack spacing={2} bg="rgba(10, 22, 40, 0.9)" backdropFilter="blur(10px)" p={2} borderRadius="20px" border="1px solid" borderColor="rgba(59, 130, 246, 0.3)">
          <IconButton
            icon={<Text fontSize="16px">{isMuted ? '🔇' : '🔊'}</Text>}
            size="xs"
            onClick={() => setIsMuted(!isMuted)}
            bg={isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
            color="white"
            borderRadius="full"
            _hover={{ transform: 'scale(1.1)', bg: isMuted ? '#ef4444' : '#3b82f6' }}
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          />
          <Button 
            size="xs" 
            onClick={() => setChatMode(true)} 
            bg="rgba(59, 130, 246, 0.8)"
            color="white"
            leftIcon={<Text fontSize="14px">💬</Text>}
            borderRadius="full"
            boxShadow="0 0 10px rgba(59, 130, 246, 0.4)"
            _hover={{ bg: '#3b82f6', transform: 'scale(1.05)' }}
          >
            Abrir Chat
          </Button>
          {isSpeaking && (
            <Button 
              size="xs" 
              onClick={stopSpeaking} 
              bg="rgba(239, 68, 68, 0.8)"
              color="white"
              leftIcon={<Text fontSize="14px">⏹️</Text>}
              borderRadius="full"
              boxShadow="0 0 10px rgba(239, 68, 68, 0.4)"
              _hover={{ bg: '#ef4444', transform: 'scale(1.05)' }}
            >
              Detener
            </Button>
          )}
        </HStack>
      )}
    </Box>
  );
};

export default AstroTrackerAssistant;