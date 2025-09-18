import { useEffect } from "react";
import { Box, Text, Spinner, Alert, AlertIcon, Heading, SimpleGrid, Center } from "@chakra-ui/react";
import { useNEOsApi } from "../../Hooks/useNEOsApi";

export function AsteroidInfoNASANEOS({ asteroidId }) {
  const { data, loading, error, searchNEO } = useNEOsApi();

  useEffect(() => {
    if (asteroidId) searchNEO(asteroidId);
  }, [asteroidId, searchNEO]);

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="lg" color="teal.400" />
      </Center>
    );
  }

  if (error) {
  return (
    <Alert status="error" borderRadius="md" flexDirection="column" alignItems="start">
      <AlertIcon />
      <Text>{error}</Text>
      <Text mt={2} fontSize="sm" color="white">
        Intente usar otro ID o nombre de asteroide, o consulte otra fuente.
      </Text>
    </Alert>
  );
}

  if (!data) {
    return <Text color="gray.500">Ingrese un nombre o ID para buscar.</Text>;
  }

  const d = data;

  return (
    <Box>
      <Heading size="sm" mt={4}>Datos generales</Heading>
      <SimpleGrid columns={3} spacing={4} p={2}>
        <Box>
          <Text fontWeight="bold">Nombre</Text>
          <Text>{d.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">ID</Text>
          <Text>{d.id}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Designación</Text>
          <Text>{d.designation}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Magnitud Absoluta</Text>
          <Text>{d.absolute_magnitude_h}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Diámetro Min (km)</Text>
          <Text>{d.estimated_diameter.kilometers.estimated_diameter_min}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Diámetro Max (km)</Text>
          <Text>{d.estimated_diameter.kilometers.estimated_diameter_max}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Potencialmente peligroso</Text>
          <Text>{d.is_potentially_hazardous_asteroid ? "SI" : "NO"}</Text>
        </Box>
      </SimpleGrid>

      <Heading size="sm" mt={4}>Datos orbitales</Heading>
      <SimpleGrid columns={2} spacing={4} p={2}>
        <Box>
          <Text fontWeight="bold">ID de órbita</Text>
          <Text>{d.orbital_data.orbit_id}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Fecha de determinación</Text>
          <Text>{d.orbital_data.orbit_determination_date}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Primera observación</Text>
          <Text>{d.orbital_data.first_observation_date}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Última observación</Text>
          <Text>{d.orbital_data.last_observation_date}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Observaciones usadas</Text>
          <Text>{d.orbital_data.observations_used}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Clase de órbita</Text>
          <Text>
            {d.orbital_data.orbit_class.orbit_class_type} - {d.orbital_data.orbit_class.orbit_class_description}
          </Text>
        </Box>
      </SimpleGrid>

      <Box mt={4}>
        <Text fontWeight="bold">Más información:</Text>
        <Text as="a" href={d.nasa_jpl_url} target="_blank" rel="noreferrer" color="blue.400">
          {d.nasa_jpl_url}
        </Text>
      </Box>
    </Box>
  );
}
