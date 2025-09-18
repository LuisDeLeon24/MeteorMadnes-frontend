import { useEffect } from "react";
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  SimpleGrid,
  Center,
  Divider,
  Button,
} from "@chakra-ui/react";
import { usePNeos } from "../../Hooks/usePNEOS";

export function RandomPNeosList() {
  const { data, loading, error, fetchRandomPneos } = usePNeos();

  // Cargar PNEOs aleatorios al montar el componente
  useEffect(() => {
    fetchRandomPneos();
  }, []); // Solo al montar

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="lg" color="teal.400" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert status="warning" borderRadius="md">
        <AlertIcon />
        No se encontraron PNEOs aleatorios.
      </Alert>
    );
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>
        NEOs pendientes de confirmación destacados
      </Heading>

      <Button mb={4} colorScheme="teal" onClick={fetchRandomPneos}>
        Refrescar PNEOs
      </Button>

      {data.map((neo, index) => {
        const {
          tempDesig,
          score,
          vMagnitude,
          discoveryDate,
          position,
          updated,
          nObs,
          arc,
          hMagnitude,
          notSeenDays,
        } = neo;

        return (
          <Box key={neo._id} mb={4} p={2} borderRadius="md" borderWidth="1px">
            <SimpleGrid columns={2} spacing={2}>
              <Box>
                <Text>
                  <strong>Temp Designation:</strong> {tempDesig}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Score:</strong> {score}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Visual Magnitude:</strong> {vMagnitude}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Discovery Date:</strong>{" "}
                  {`${discoveryDate.year}-${discoveryDate.month}-${discoveryDate.day}`}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Position (RA / Dec):</strong>{" "}
                  {`${position.ra} / ${position.dec}`}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Updated:</strong> {updated}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Number of Observations:</strong> {nObs}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Arc:</strong> {arc}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>H Magnitude:</strong> {hMagnitude}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Days Not Seen:</strong> {notSeenDays}
                </Text>
              </Box>
            </SimpleGrid>
            {index < data.length - 1 && <Divider mt={3} />}
          </Box>
        );
      })}
    </Box>
  );
}
