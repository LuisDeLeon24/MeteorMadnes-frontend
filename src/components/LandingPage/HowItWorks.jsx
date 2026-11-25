import { Box, Container, Heading, Text, SimpleGrid, Stack, Flex } from "@chakra-ui/react";
import { Satellite, Radar, Activity, Target } from "lucide-react";
import { palette } from "../../theme";

const steps = [
  {
    icon: Satellite,
    title: "Space detection",
    description:
      "Telescopes and satellites track near-Earth space, identify new objects, and update trajectories.",
  },
  {
    icon: Radar,
    title: "Orbital analysis",
    description:
      "Algorithms calculate trajectories, velocities, and impact probabilities from multiple astronomical sources.",
  },
  {
    icon: Activity,
    title: "Risk assessment",
    description:
      "Objects are classified by size, composition, speed, and trajectory.",
  },
  {
    icon: Target,
    title: "Defense protocol",
    description:
      "Interception systems are readied and international space agencies are notified.",
  },
];

const HowItWorks = () => {
  return (
    <Box as="section" py={{ base: 20, md: 28 }} bg={palette.ink}>
      <Container maxW="1120px" px={{ base: 4, md: 6 }}>
        <Stack spacing={4} maxW="36rem" mb={{ base: 12, md: 16 }}>
          <Heading as="h2" fontSize={{ base: "32px", md: "40px" }} fontWeight={500} letterSpacing="-0.035em">
            How it works
          </Heading>
          <Text color={palette.quiet} fontSize="16px" lineHeight="1.6">
            Continuous protection through space monitoring, predictive analysis, and automatic response.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={{ base: 16, md: 20 }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Stack key={step.title} spacing={4} align="flex-start">
                <Text fontSize="13px" color={palette.quiet} sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {index + 1}
                </Text>
                <Icon size={18} aria-hidden="true" color={palette.paper} />
                <Heading as="h3" fontSize="18px" fontWeight={500} letterSpacing="-0.02em">
                  {step.title}
                </Heading>
                <Text color={palette.quiet} fontSize="14px" lineHeight="1.6">
                  {step.description}
                </Text>
              </Stack>
            );
          })}
        </SimpleGrid>

        <Flex
          direction={{ base: "column", lg: "row" }}
          border="1px solid"
          borderColor={palette.line}
          borderRadius="12px"
          overflow="hidden"
        >
          <Box flex="1" minH={{ base: "240px", lg: "420px" }} bg={palette.field}>
            <img
              src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1170&auto=format&fit=crop"
              alt="Earth seen from orbit at night"
              width="1170"
              height="780"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 240 }}
            />
          </Box>
          <Stack flex="1" spacing={5} p={{ base: 6, lg: 10 }} justify="center" bg={palette.ink}>
            <Heading as="h3" fontSize={{ base: "28px", md: "32px" }} fontWeight={500} letterSpacing="-0.03em">
              Powered by astronomical models
            </Heading>
            <Text color={palette.quiet} fontSize="16px" lineHeight="1.6" maxW="46ch">
              Models trained on decades of astronomical data estimate trajectories, impact probabilities, and response options.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={6} pt={2}>
              {["Early detection", "Instant analysis", "Coordinated response"].map((item) => (
                <Text key={item} fontSize="14px" color={palette.paper}>
                  {item}
                </Text>
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default HowItWorks;
