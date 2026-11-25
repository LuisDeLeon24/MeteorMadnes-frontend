import { Box, Container, Heading, Text, Button, Stack, HStack, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { palette } from "../../theme";

const stats = [
  ["500+", "Active satellites"],
  ["< 3s", "Rapid detection"],
  ["99.97%", "Orbital precision"],
];

const SeccionCTA = () => {
  const navigate = useNavigate();

  return (
    <Box as="section" py={{ base: 20, md: 28 }} bg={palette.ink} borderTop="1px solid" borderColor={palette.line}>
      <Container maxW="1120px" px={{ base: 4, md: 6 }}>
        <Stack spacing={8} maxW="40rem">
          <Heading as="h2" fontSize={{ base: "36px", md: "56px" }} fontWeight={500} letterSpacing="-0.04em" lineHeight="1.05">
            Ready to defend Earth?
          </Heading>
          <Text color={palette.quiet} fontSize={{ base: "16px", md: "18px" }} lineHeight="1.6" maxW="46ch">
            Join 500+ space centers already protecting the planet with interception technology.
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} pt={2}>
            {stats.map(([value, label]) => (
              <Stack key={label} spacing={1}>
                <Text fontSize="24px" fontWeight={500} letterSpacing="-0.03em" sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {value}
                </Text>
                <Text fontSize="13px" color={palette.quiet}>
                  {label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
          <HStack spacing={3} pt={2} flexWrap="wrap">
            <Button h="44px" px={5} onClick={() => navigate("/map")}>
              Start space mission
            </Button>
          </HStack>
          <Text fontSize="13px" color={palette.quiet}>
            Free demo · 30 days · Cancel any time
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default SeccionCTA;
