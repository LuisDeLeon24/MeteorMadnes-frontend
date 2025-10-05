import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { VStack, Heading, Text, Button, Icon, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import BadgeView from '../../ImagesViews/BadgeView'; // Asegúrate de la ruta

const MotionHeading = motion(Heading);

const QuizResults = ({ score, total, onRestart }) => {
  const badgeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadBadge = async () => {
    if (!badgeRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await htmlToImage.toPng(badgeRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = 'mi-badge.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generando imagen:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <VStack spacing={6} textAlign="center" minH="100vh" justify="center">
      <Icon as={Trophy} boxSize={16} color="#60a5fa" />

      <MotionHeading
        size="3xl"
        bgGradient="linear(to-r, #60a5fa, #93c5fd)"
        bgClip="text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {score}/{total}
      </MotionHeading>

      <Text color="rgba(219,234,254,0.8)">
        {score / total > 0.7
          ? "¡Excelente trabajo, comandante!"
          : "Sigue practicando, el cosmos te espera."}
      </Text>

      <Button
        onClick={onRestart}
        mt={4}
        bgGradient="linear(to-r, #1e3a8a, #3b82f6)"
        color="white"
        borderRadius="full"
        _hover={{ transform: "scale(1.05)" }}
      >
        Reintentar
      </Button>

      {/* Botón para descargar solo si es perfecto */}
      {score === total && (
        <Button
          mt={2}
          bgGradient="linear(to-r, #10b981, #06b6d4)"
          color="white"
          borderRadius="full"
          _hover={{ transform: "scale(1.05)" }}
          onClick={downloadBadge}
          isLoading={downloading}
        >
          Descargar premio
        </Button>
      )}

      {/* BadgeView invisible pero renderizado para html-to-image */}
      <Box position="absolute" top={0} left={0} opacity={0} pointerEvents="none">
        <BadgeView
          ref={badgeRef}
          title="¡Felicidades!"
          teamImage="/assets/images/BadVoids-Logo-White-removebg-preview.png"
          logoImage="/assets/images/Main_Logo-removebg-preview.png"
          badgeImage="/assets/images/Badge-removebg-preview.png"
        />
      </Box>
    </VStack>
  );
};

export default QuizResults;
