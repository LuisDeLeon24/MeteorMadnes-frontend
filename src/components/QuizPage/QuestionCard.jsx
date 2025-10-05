import { Box, Heading, Text, VStack, Button, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const QuestionCard = ({ question, options, current, total, onSelect }) => (
  <MotionBox
    bg="linear-gradient(145deg, #0a0e1a 0%, #1a2332 100%)"
    border="1px solid rgba(59,130,246,0.2)"
    borderRadius="2xl"
    p={8}
    maxW="700px"
    minW="700px"
    mx="auto"
    boxShadow="0 0 40px rgba(59,130,246,0.15)"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Text color="rgba(219,234,254,0.6)" mb={2}>
      Pregunta {current} de {total}
    </Text>
    <Heading size="lg" color="#f8fafc" mb={6}>
      {question}
    </Heading>
    <VStack spacing={4}>
      {options.map((opt, i) => (
        <Button
          key={i}
          onClick={() => onSelect(opt)}
          width="100%"
          py={6}
          bg="rgba(59,130,246,0.1)"
          color="white"            // <-- fuerza color blanco
          border="1px solid rgba(59,130,246,0.3)"
          _hover={{
            bg: "rgba(59,130,246,0.2)",
            transform: "scale(1.02)",
          }}
          transition="all 0.2s ease"
        >
          {opt}
        </Button>
      ))}
    </VStack>
    <Progress
      value={(current / total) * 100}
      mt={8}
      size="sm"
      colorScheme="blue"
      borderRadius="full"
    />
  </MotionBox>
);

export default QuestionCard;
