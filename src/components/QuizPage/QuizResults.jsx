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
    <VStack
      spacing={{ base: 4, md: 6 }}
      textAlign="center"
      minH="100vh"
      justify="center"
      px={{ base: 4, md: 8 }}
    >
      {/* Icono responsive */}
      <Icon as={Trophy} boxSize={{ base: 12, md: 16 }} color="#60a5fa" />

      {/* Score Heading responsive */}
      <MotionHeading
        size={{ base: "2xl", md: "3xl" }}
        bgGradient="linear(to-r, #60a5fa, #93c5fd)"
        bgClip="text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {score}/{total}
      </MotionHeading>

      {/* Texto motivacional */}
      <Text fontSize={{ base: "sm", md: "md" }} color="rgba(219,234,254,0.8)">
        {score / total > 0.7
          ? "¡Excelente trabajo, comandante!"
          : "Sigue practicando, el cosmos te espera."}
      </Text>

      {/* Botón de reintentar */}
      <Button
        onClick={onRestart}
        mt={2}
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 6 }}
        fontSize={{ base: "sm", md: "md" }}
        bgGradient="linear(to-r, #1e3a8a, #3b82f6)"
        color="white"
        borderRadius="full"
        _hover={{ transform: "scale(1.05)" }}
      >
        Reintentar
      </Button>

      {/* Botón de descargar premio solo si es perfecto */}
      {score === total && (
        <Button
          mt={2}
          px={{ base: 6, md: 8 }}
          py={{ base: 4, md: 6 }}
          fontSize={{ base: "sm", md: "md" }}
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

      {/* BadgeView invisible para html-to-image */}
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
