import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useHORIZONs } from "../Hooks/useHORIZONs"; 
import Navbar from "../components/Commond/NavBar";
import Footer from "../components/Commond/Footer";

const LandingPage = () => {
  const [asteroidId, setAsteroidId] = useState("99942");
  const [inputId, setInputId] = useState("99942");
  const { data, loading, error } = useHORIZONs(asteroidId);

  const handleSearch = () => {
    if (inputId.trim() !== "") {
      setAsteroidId(inputId.trim());
    }
  };

  return (
    <>
      <Navbar />
      <Box bg="gray.900" minH="100vh" px={6} py={10} color="cyan.200">
      {/* Header */}
      <VStack spacing={4} textAlign="center" mb={10}>
        <Heading size="2xl" color="cyan.400">
          AstroTracker
        </Heading>
        <Text fontSize="xl" color="gray.400">
          Visualiza datos de asteroides en tiempo real con NASA Horizons API
        </Text>

        {/* Input de asteroide */}
        <InputGroup size="md" maxW="300px">
          <Input
            placeholder="Ingresa ID del asteroide"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            bg="gray.800"
            color="cyan.200"
            _placeholder={{ color: "gray.500" }}
          />
          <InputRightElement width="6rem">
            <Button colorScheme="cyan" onClick={handleSearch}>
              Buscar
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>

      {/* Loading / Error */}
      {loading && (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="cyan.400" />
          <Text mt={2}>Cargando datos del asteroide...</Text>
        </Box>
      )}
      {error && (
        <Box textAlign="center" py={10} color="red.500">
          <Text>{error}</Text>
        </Box>
      )}

      {/* Datos del asteroide */}
      {data && (
        <Box mb={10}>
          <Heading size="lg" mb={4} color="cyan.300">
            Información de {data.basicInfo.name}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
            <Feature title="Radio (km)" description={data.basicInfo.radius} />
            <Feature title="Rotación (h)" description={data.basicInfo.rotation} />
            <Feature title="Magnitud H" description={data.basicInfo.H} />
            <Feature title="Tipo espectral" description={data.basicInfo.spectralType || "Desconocido"} />
          </SimpleGrid>

          <Heading size="md" mb={2} color="cyan.300">
            Ephemeris
          </Heading>
          <Table variant="simple" bg="gray.800" borderRadius="md" shadow="md">
            <Thead>
              <Tr>
                <Th color="cyan.200">Fecha</Th>
                <Th color="cyan.200">RA</Th>
                <Th color="cyan.200">DEC</Th>
                <Th color="cyan.200">Distancia (UA)</Th>
                <Th color="cyan.200">Velocidad (km/s)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.ephemeris.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.date}</Td>
                  <Td>{e.RA}</Td>
                  <Td>{e.DEC}</Td>
                  <Td>{e.delta.toFixed(3)}</Td>
                  <Td>{e.deldot.toFixed(3)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Call to action */}
      <Box textAlign="center" py={10} bg="gray.800" borderRadius="md">
        <Heading size="lg" mb={4} color="cyan.300">
          ¿Listo para explorar el espacio?
        </Heading>
        <Button colorScheme="cyan" size="lg">
          Ver asteroides
        </Button>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt={10} py={4} color="gray.500">
        &copy; 2025 AstroTracker. Todos los derechos reservados.
      </Box>
    </Box>
      <Footer />
    </>
  );
};

// Componente Feature
const Feature = ({ title, description }) => (
  <Box p={6} bg="gray.800" shadow="md" borderRadius="md" textAlign="center">
    <Heading size="md" mb={2} color="cyan.300">
      {title}
    </Heading>
    <Text color="cyan.200">{description}</Text>
  </Box>
);

export default LandingPage;
