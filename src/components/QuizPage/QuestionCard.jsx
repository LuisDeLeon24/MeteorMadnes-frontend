import { Box, Heading, Text, VStack, Button, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const QuestionCard = ({ question, options, current, total, onSelect }) => (
  <MotionBox
    bg="linear-gradient(145deg, #0a0e1a 0%, #1a2332 100%)"
    border="1px solid rgba(59,130,246,0.2)"
    borderRadius="2xl"
    p={{ base: 4, md: 8 }}          // padding responsive
    width={{ base: '90%', sm: '95%', md: '700px' }} // ancho responsive
    mx="auto"
    boxShadow="0 0 40px rgba(59,130,246,0.15)"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Text color="rgba(219,234,254,0.6)" mb={{ base: 1, md: 2 }} fontSize={{ base: 'sm', md: 'md' }}>
      Pregunta {current} de {total}
    </Text>

    <Heading size={{ base: 'md', md: 'lg' }} color="#f8fafc" mb={{ base: 4, md: 6 }}>
      {question}
    </Heading>

    <VStack spacing={{ base: 3, md: 4 }}>
      {options.map((opt, i) => (
        <Button
          key={i}
          onClick={() => onSelect(opt)}
          width="100%"
          py={{ base: 4, md: 6 }}
          bg="rgba(59,130,246,0.1)"
          color="white"            // <-- fuerza color blanco
          border="1px solid rgba(59,130,246,0.3)"
          _hover={{
            bg: "rgba(59,130,246,0.2)",
            transform: "scale(1.02)",
          }}
          transition="all 0.2s ease"
          fontSize={{ base: 'sm', md: 'md' }}
        >
          {opt}
        </Button>
      ))}
    </VStack>

    <Progress
      value={(current / total) * 100}
      mt={{ base: 6, md: 8 }}
      size="sm"
      colorScheme="blue"
      borderRadius="full"
    />
  </MotionBox>
);

export default QuestionCard;
