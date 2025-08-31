import React from "react";
import { Box, Text, Link, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="gray.900" color="cyan.300" py={8} px={6}>
      <VStack spacing={3}>
        {/* Nombre del equipo y proyecto */}
        <Text fontSize="lg" fontWeight="bold">BadVoids – AstroTracker</Text>
        <Text fontSize="sm" color="cyan.400">
          Powered by NASA Horizons API | Datos abiertos
        </Text>

        <HStack spacing={4}>
          <Link 
            href="https://github.com/BadVoids/AstroTracker" 
            isExternal 
            display="flex" 
            alignItems="center"
            _hover={{ textDecoration: "underline", color: "cyan.500" }}
          >
            <FaGithub style={{ marginRight: 6 }} /> GitHub
          </Link>
          <Link 
            href="mailto:badvoids.team@example.com" 
            display="flex" 
            alignItems="center"
            _hover={{ textDecoration: "underline", color: "cyan.500" }}
          >
            <FaEnvelope style={{ marginRight: 6 }} /> Contacto
          </Link>
        </HStack>

        <Divider borderColor="cyan.700" my={2} />

        <Text fontSize="xs" color="cyan.500">
          &copy; 2025 BadVoids. Todos los derechos reservados.
        </Text>

        <Text fontSize="sm" fontStyle="italic" color="cyan.400">
          "Explorando el espacio, un asteroide a la vez"
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
