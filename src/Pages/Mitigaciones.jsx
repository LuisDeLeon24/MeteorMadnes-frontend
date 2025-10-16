import { Box, VStack, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Wrench, ZapOff, ShieldCheck, Rocket } from "lucide-react";
import MitigationCard from "../components/MitigacionesPage/MitigationCard";
import Navbar from "../components/Commond/NavBar";
import PNGTuberWidget from "../components/Pngtuber/PNGTuberWidget";
import Footer from "../components/Commond/Footer";

const MotionBox = motion(Box);

const MitigationsPage = () => {
  const mitigations = [
    {
      icon: Wrench,
      title: "Orbital Deflection",
      description:
        "Application of controlled thrust to alter the asteroid's trajectory using thrusters or kinetic impact.",
      color: "rgba(59,130,246,0.25)",
      data: [
        { label: "Estimated Effectiveness", value: "85%" },
        { label: "Action Window", value: "3–5 years before impact" },
        { label: "Technology Used", value: "Ionic thrusters, kinetic impactor" },
        { label: "Current Status", value: "In testing (NASA DART, ESA Hera)" },
      ],
    },
    {
      icon: ZapOff,
      title: "Controlled Fragmentation",
      description:
        "Partial destruction of the object using directed charges or lasers, reducing its mass and potential impact.",
      color: "rgba(147,197,253,0.2)",
      data: [
        { label: "Estimated Effectiveness", value: "60–70%" },
        { label: "Secondary Risk", value: "Uncontrolled fragmentation" },
        { label: "Technology Used", value: "Nuclear explosives or orbital laser" },
        { label: "Current Status", value: "Experimental / theoretical" },
      ],
    },
    {
      icon: ShieldCheck,
      title: "Planetary Shield",
      description:
        "Deployment of physical structures or electromagnetic fields to disperse the impact in the atmosphere.",
      color: "rgba(74,222,128,0.2)",
      data: [
        { label: "Estimated Effectiveness", value: "40%" },
        { label: "Coverage", value: "Local (critical areas)" },
        { label: "Energy Requirements", value: "Extremely high" },
        { label: "Current Status", value: "Theoretical / conceptual" },
      ],
    },
    {
      icon: Rocket,
      title: "Preventive Evacuation",
      description:
        "Planning of massive displacements outside the impact zone, combining advanced technology and logistics.",
      color: "rgba(250,204,21,0.2)",
      data: [
        { label: "Estimated Effectiveness", value: "90% (human)" },
        { label: "Minimum Time", value: "48 hours before impact" },
        { label: "Estimated Cost", value: "Very high (billions of USD)" },
        { label: "Current Status", value: "Operational in civil plans" },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <Box
        minH="100vh"
        bg="linear-gradient(180deg, #030712 0%, #0f172a 100%)"
        py={{ base: 10, md: 20 }}
        px={{ base: 6, md: 16 }}
      >
        <VStack spacing={12} textAlign="center">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, #60a5fa, #93c5fd)"
            bgClip="text"
          >
            Mitigation Strategies
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            width="100%"
            maxW="1200px"
          >
            {mitigations.map((m, i) => (
              <MitigationCard key={i} {...m} />
            ))}
          </SimpleGrid>

        </VStack>
      </Box>
      <PNGTuberWidget />
      <Footer />
    </>
  );
};

export default MitigationsPage;