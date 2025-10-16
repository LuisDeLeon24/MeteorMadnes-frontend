import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { VStack, Text, Box, Image, HStack } from '@chakra-ui/react';

const BadgeView = forwardRef(({
  title = "Congratulations!",
  teamImage,
  logoImage,
  badgeImage
}, ref) => {
  const internalRef = useRef(null);
  useImperativeHandle(ref, () => internalRef.current);

  const stars = [
    { top: "10%", left: "20%" },
    { top: "25%", left: "70%" },
    { top: "34%", left: "93%" },
    { top: "34%", left: "12%" },
    { top: "56%", left: "40%" },
    { top: "65%", left: "80%" },
    { top: "75%", left: "15%" },
    { top: "85%", left: "55%" },
    { top: "87%", left: "67%" },
    { top: "91%", left: "24%" },
  ];

  return (
    <Box
      ref={internalRef}
      w="600px"
      h="750px"
      p={6}
      bgGradient="radial(circle at top, blue.900, blackAlpha.900)"
      borderRadius="2xl"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0 0 50px rgba(0, 255, 255, 0.4), 0 10px 30px rgba(0,0,0,0.5)"
    >
      {/* Logos pequeños */}
      <HStack spacing={2} position="absolute" top={4} left={4}>
        {teamImage && <Image src={teamImage} alt="Team" boxSize="40px" borderRadius="md" />}
        {logoImage && <Image src={logoImage} alt="Logo" boxSize="40px" borderRadius="md" />}
      </HStack>

      {/* Badge y estrellas */}
      <Box
        mb={-4}
        bg="black"
        borderRadius="full"
        p={4}
        position="relative"
        boxShadow="0 0 40px rgba(0, 255, 255, 0.6), 0 10px 30px rgba(0,0,0,0.5)"
      >
        {stars.map((star, i) => (
          <Box
            key={i}
            position="absolute"
            top={star.top}
            left={star.left}
            w="2px"
            h="2px"
            bg="white"
            borderRadius="full"
            opacity={0.8}
          />
        ))}
        {badgeImage && <Image src={badgeImage} alt="Badge" boxSize="380px" borderRadius="full" />}
      </Box>

      {/* Separador */}
      <Box h="24px" /> {/* Ajusta la altura según necesites */}

      {/* Título principal */}
      <Text mt={2} fontSize="3xl" fontWeight="extrabold" letterSpacing="wide" color="white" textAlign="center">
        {title}
      </Text>

      {/* Mensaje adicional */}
      <VStack spacing={3} mt={4} px={6} textAlign="center">
        <Text fontSize="md" fontWeight="medium" color="gray.200">
          The <b>BadVoids</b> and <b>AstroTracker</b> team award you this badge for your performance in the quiz.
        </Text>
        <Text fontSize="sm" color="gray.400">
          Don't forget to share it on your networks and tag us as: <b>@BadVoids</b>
        </Text>
        <Text fontSize="sm" color="gray.400">
          www.astrotracker.wiki
        </Text>
      </VStack>
    </Box>
  );
});

export default BadgeView;