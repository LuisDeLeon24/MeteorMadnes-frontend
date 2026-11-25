import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { Telescope, Radar, Shield } from "lucide-react";
import { palette } from "../../theme";

const features = [
  { icon: Telescope, text: "Early detection" },
  { icon: Radar, text: "Orbital analysis" },
  { icon: Shield, text: "Defense system" },
];

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [asteroidCount, setAsteroidCount] = useState(847);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
    }, 80);

    const asteroidInterval = setInterval(() => {
      setAsteroidCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearInterval(asteroidInterval);
    };
  }, []);

  const threat = currentFeature === 0 ? "Low" : currentFeature === 1 ? "Medium" : "High";
  const distance = ((234567 + currentFeature * 50000) / 1000).toFixed(0);
  const velocity = (15.7 + currentFeature * 2.3).toFixed(1);
  const FeatureIcon = features[currentFeature].icon;

  return (
    <Box as="section" id="main" bg={palette.ink} pt={{ base: 16, md: 28 }} pb={{ base: 20, md: 32 }}>
      <Container maxW="1120px" px={{ base: 4, md: 6 }}>
        <Flex direction={{ base: "column", lg: "row" }} align={{ lg: "center" }} gap={{ base: 12, lg: 20 }}>
          <Stack spacing={8} flex="1" maxW="540px">
            <Stack spacing={5}>
              <Heading
                as="h1"
                fontWeight={500}
                fontSize={{ base: "44px", md: "64px" }}
                lineHeight="1.02"
                letterSpacing="-0.04em"
                color={palette.paper}
              >
                Interception asteroids
              </Heading>
              <Text color={palette.quiet} fontSize={{ base: "16px", md: "18px" }} lineHeight="1.6" maxW="42ch">
                Protect Earth with advanced space detection technology. Real-time monitoring, predictive orbital analysis, and planetary defense systems.
              </Text>
            </Stack>

            <HStack spacing={2} flexWrap="wrap">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const selected = currentFeature === index;
                return (
                  <Button
                    key={feature.text}
                    variant={selected ? "solid" : "outline"}
                    size="sm"
                    h="36px"
                    onClick={() => setCurrentFeature(index)}
                    leftIcon={<Icon size={16} aria-hidden="true" />}
                    aria-pressed={selected}
                  >
                    {feature.text}
                  </Button>
                );
              })}
            </HStack>

            <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
              <Button h="44px" px={5} onClick={() => navigate("/map")}>
                Activate system
              </Button>
              <Button h="44px" px={5} variant="outline" onClick={() => navigate("/map")}>
                Simulation
              </Button>
            </Stack>

            <HStack spacing={{ base: 6, md: 10 }} pt={2} sx={{ fontVariantNumeric: "tabular-nums" }}>
              {[
                [asteroidCount.toLocaleString(), "Detected"],
                ["0.2s", "Response"],
                ["100%", "Coverage"],
              ].map(([value, label]) => (
                <Stack key={label} spacing={0}>
                  <Text fontSize="22px" fontWeight={500} letterSpacing="-0.03em">
                    {value}
                  </Text>
                  <Text fontSize="13px" color={palette.quiet}>
                    {label}
                  </Text>
                </Stack>
              ))}
            </HStack>
          </Stack>

          <Stack flex="1" spacing={4} w="full" maxW="560px">
            <Box border="1px solid" borderColor={palette.line} borderRadius="12px" overflow="hidden" bg={palette.field}>
              <img
                src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1213&auto=format&fit=crop"
                alt="The night sky"
                width="1213"
                height="808"
                fetchPriority="high"
                style={{ display: "block", width: "100%", height: "320px", objectFit: "cover" }}
              />
            </Box>
            <Box border="1px solid" borderColor={palette.line} borderRadius="12px" p={5} bg={palette.field}>
              <HStack spacing={2} mb={4} color={palette.paper}>
                <FeatureIcon size={16} aria-hidden="true" />
                <Text fontSize="14px" fontWeight={500}>
                  {features[currentFeature].text}
                </Text>
              </HStack>
              <Progress value={progress} size="xs" mb={4} borderRadius="full" aria-label="Scan progress" />
              <HStack justify="space-between" align="flex-start" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {[
                  ["Threat", threat],
                  ["Distance", `${distance}k km`],
                  ["Velocity", `${velocity} km/s`],
                ].map(([label, value]) => (
                  <Stack key={label} spacing={1}>
                    <Text fontSize="12px" color={palette.quiet}>
                      {label}
                    </Text>
                    <Text fontSize="14px">{value}</Text>
                  </Stack>
                ))}
              </HStack>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
