import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { usePNeos } from "../../Hooks/usePNEOS";

export function PNeoInfo({ tempDesig }) {
  const { data, loading, error, fetchPneo } = usePNeos();
  const [displayData, setDisplayData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!tempDesig) return;

    setNotFound(false);

    fetchPneo(tempDesig)
      .then(res => {
        if (!res) setNotFound(true); // Si no hay datos
        else setDisplayData(res);    // res ya es el objeto
      })
      .catch(() => setNotFound(true));
  }, [tempDesig, fetchPneo]);

  if (notFound) {
    return (
      <Alert status="warning" borderRadius="md">
        <AlertIcon />
        El Objeto con ID "{tempDesig}" no encontrado intenta con otra fuente.
      </Alert>
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

  if (!displayData && loading) {
    return (
      <Center py={10}>
        <Spinner size="lg" color="teal.400" />
      </Center>
    );
  }

  if (!displayData) return null;

  const {
    tempDesig: id,
    score,
    vMagnitude,
    discoveryDate,
    position,
    updated,
    nObs,
    arc,
    hMagnitude,
    notSeenDays,
  } = displayData;

  return (
    <Box>
      <Heading size="sm" mb={2}>NEOs pendientes de confirmación</Heading>
      <Heading size="sm" mb={2}>Datos del objeto</Heading>
      <SimpleGrid columns={2} spacing={4}>
        <Box><Text><strong>Temp Designation:</strong> {id}</Text></Box>
        <Box><Text><strong>Score:</strong> {score}</Text></Box>
        <Box><Text><strong>Visual Magnitude:</strong> {vMagnitude}</Text></Box>
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
        <Box><Text><strong>Updated:</strong> {updated}</Text></Box>
        <Box><Text><strong>Number of Observations:</strong> {nObs}</Text></Box>
        <Box><Text><strong>Arc:</strong> {arc}</Text></Box>
        <Box><Text><strong>H Magnitude:</strong> {hMagnitude}</Text></Box>
        <Box><Text><strong>Days Not Seen:</strong> {notSeenDays}</Text></Box>
      </SimpleGrid>
    </Box>
  );
}
