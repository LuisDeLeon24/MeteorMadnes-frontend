import { 
  Box, Heading, Text, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  Spinner, Center, Alert, AlertIcon 
} from "@chakra-ui/react";
import { useHORIZONs } from "../../Hooks/useHORIZONs"; 
import React, { useEffect, useState } from "react";

export const HORIZONS = ({ asteroidId }) => {
  const { data, loading, error, fetchHORIZONS } = useHORIZONs();
  const [notFound, setNotFound] = useState(false);

  // Cargar datos cuando cambia asteroidId
  useEffect(() => {
    if (!asteroidId) return;

    setNotFound(false);

    fetchHORIZONS(asteroidId).then(res => {
      if (!res) setNotFound(true);
    }).catch(() => setNotFound(true));
  }, [asteroidId, fetchHORIZONS]);



  if (error) {
    return (
      <Alert status="error" borderRadius="md" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="lg" color="teal.400" />
      </Center>
    );
  }

  if (!data) return null;

  const { basicInfo, orbitalElements, nonGravitationalForces, nonStandardModel, ephemeris } = data;

  return (
    <Box p={4} maxHeight="80vh" >
      {/* Información básica */}
      <Heading size="md" mb={2}>Información básica</Heading>
      <SimpleGrid columns={3} spacing={4} mb={4}>
        <Box><Text fontWeight="bold">Nombre:</Text><Text>{basicInfo.name}</Text></Box>
        <Box><Text fontWeight="bold">Radio (km):</Text><Text>{basicInfo.radius}</Text></Box>
        <Box><Text fontWeight="bold">Rotación (h):</Text><Text>{basicInfo.rotation}</Text></Box>
        <Box><Text fontWeight="bold">Magnitud absoluta:</Text><Text>{basicInfo.H}</Text></Box>
        <Box><Text fontWeight="bold">Parámetro de pendiente:</Text><Text>{basicInfo.G ?? "N/A"}</Text></Box>
        <Box><Text fontWeight="bold">Índice de color B-V:</Text><Text>{basicInfo.BV ?? "N/A"}</Text></Box>
        <Box><Text fontWeight="bold">Albedo:</Text><Text>{basicInfo.albedo ?? "N/A"}</Text></Box>
        <Box><Text fontWeight="bold">Tipo espectral:</Text><Text>{basicInfo.spectralType ?? "N/A"}</Text></Box>
      </SimpleGrid>

      {/* Fuerzas no gravitacionales */}
      <Heading size="md" mb={2}>Fuerzas no gravitacionales</Heading>
      <SimpleGrid columns={3} spacing={4} mb={4}>
        {Object.entries(nonGravitationalForces).map(([key, value]) => (
          <Box key={key}>
            <Text fontWeight="bold">{key}:</Text>
            <Text>{value ?? "N/A"}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Modelo no estándar */}
      <Heading size="md" mb={3}>Modelo no estándar</Heading>
      <SimpleGrid columns={2} spacing={4} mb={4}>
        {Object.entries(nonStandardModel).map(([key, value]) => (
          <Box key={key}>
            <Text fontWeight="bold">{key}:</Text>
            <Text>{value ?? "N/A"}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Efemérides */}
      <Heading size="md" mb={2}>Efemérides</Heading>
      <TableContainer maxHeight="300px" overflowY="auto">
        <Table variant="striped" size="sm">
          <Thead position="sticky" top={0} bg="gray.100" zIndex={1}>
            <Tr>
              <Th>Fecha</Th>
              <Th>RA</Th>
              <Th>DEC</Th>
              <Th>Delta (AU)</Th>
              <Th>deldot</Th>
              <Th>Solar Elongation</Th>
              <Th>STO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ephemeris.map((e, index) => (
              <Tr key={index}>
                <Td>{e.date}</Td>
                <Td>{e.RA}</Td>
                <Td>{e.DEC}</Td>
                <Td>{e.delta}</Td>
                <Td>{e.deldot}</Td>
                <Td>{e.solarElongation}</Td>
                <Td>{e.STO}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
