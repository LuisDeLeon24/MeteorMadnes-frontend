import { VStack, Text, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const MotionVStack = motion(VStack);

const AnswerFeedback = ({ correct }) => (
  <MotionVStack
    key={correct ? "correct" : "incorrect"}
    spacing={4}
    align="center"
    justify="center"
    color={correct ? "#60a5fa" : "#f87171"}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.4 }}
  >
    <Icon as={correct ? CheckCircle : XCircle} boxSize={16} />
    <Text fontSize="2xl" fontWeight="bold">
      {correct ? "¡Correcto!" : "Respuesta Incorrecta"}
    </Text>
  </MotionVStack>
);

export default AnswerFeedback;
