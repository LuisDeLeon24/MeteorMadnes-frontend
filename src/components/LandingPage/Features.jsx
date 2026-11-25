import { Box, Container, SimpleGrid, Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { Telescope, Shield, Zap, Target, Satellite, Activity } from "lucide-react";
import { palette } from "../../theme";

const features = [
  {
    icon: Telescope,
    title: "Automatic detection",
    description:
      "Radar and optical telescopes identify potentially hazardous asteroids millions of kilometers away.",
  },
  {
    icon: Shield,
    title: "Threat analysis",
    description: "Impact risk and trajectory are estimated from the latest observations.",
  },
  {
    icon: Zap,
    title: "Trajectory prediction",
    description: "Orbital paths are projected forward so a response can start early.",
  },
  {
    icon: Target,
    title: "Interception",
    description: "Deflection options are coordinated once an object is classified as a threat.",
  },
  {
    icon: Satellite,
    title: "Satellite network",
    description: "A constellation of satellites watches near-Earth space.",
  },
  {
    icon: Activity,
    title: "Composition monitoring",
    description: "Spectral readings estimate mineral composition and fragmentation.",
  },
];

const stats = [
  ["99.97%", "Detection accuracy"],
  ["< 5s", "Response time"],
  ["24/7", "Monitoring"],
  ["50M+", "Objects tracked"],
];

const Features = () => {
  return (
    <Box as="section" py={{ base: 20, md: 28 }} bg={palette.ink} borderTop="1px solid" borderColor={palette.line}>
      <Container maxW="1120px" px={{ base: 4, md: 6 }}>
        <Stack spacing={4} maxW="40rem" mb={{ base: 12, md: 16 }}>
          <Heading as="h2" fontSize={{ base: "32px", md: "40px" }} fontWeight={500} letterSpacing="-0.035em">
            Asteroid interception system
          </Heading>
          <Text color={palette.quiet} fontSize="16px" lineHeight="1.6">
            Detection and analysis for near-Earth objects, with the instruments on this site.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX={{ base: 8, lg: 12 }} spacingY={12}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Stack
                key={feature.title}
                spacing={4}
                pt={6}
                borderTop="1px solid"
                borderColor={palette.line}
                align="flex-start"
              >
                <Icon size={18} aria-hidden="true" />
                <Heading as="h3" fontSize="18px" fontWeight={500} letterSpacing="-0.02em">
                  {feature.title}
                </Heading>
                <Text color={palette.quiet} fontSize="14px" lineHeight="1.6">
                  {feature.description}
                </Text>
              </Stack>
            );
          })}
        </SimpleGrid>

        <Flex mt={{ base: 12, md: 16 }} wrap="wrap" gap={{ base: 8, md: 12 }}>
          {stats.map(([value, label]) => (
            <Stack key={label} spacing={1} minW="140px">
              <Text fontSize="28px" fontWeight={500} letterSpacing="-0.03em" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {value}
              </Text>
              <Text fontSize="13px" color={palette.quiet}>
                {label}
              </Text>
            </Stack>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Features;
