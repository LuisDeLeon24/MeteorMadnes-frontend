import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const QuizIntro = ({ onStart }) => (
  <VStack
    spacing={6}
    textAlign="center"
    position="relative"
    zIndex={1}
    minH="100vh"
    justify="center"
    px={6}
  >
    <Heading
      size="2xl"
      bgGradient="linear(to-r, #f8fafc, #60a5fa, #dbeafe)"
      bgClip="text"
      fontWeight="900"
    >
      Misión: Defender la Tierra 
    </Heading>
    <Text color="rgba(219,234,254,0.8)" fontSize="lg" maxW="600px">
      ¿Estás listo para poner a prueba tus conocimientos sobre asteroides y defensa planetaria?
      <br /> Responde correctamente para elevar tu rango de misión y ganar una insignia especial.
    </Text>
    <MotionButton
      onClick={onStart}
      size="lg"
      px={10}
      py={6}
      colorScheme="blue"
      bgGradient="linear(to-r, #1e3a8a, #3b82f6)"
      borderRadius="full"
      leftIcon={<Icon as={Rocket} />}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      Iniciar Misión
    </MotionButton>
  </VStack>
);

export default QuizIntro;
