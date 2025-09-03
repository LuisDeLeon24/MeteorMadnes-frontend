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
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Features from "../components/LandingPage/Features";
import SeccionCTA from "../components/LandingPage/CTASection";

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
      <Hero />
      <HowItWorks />
      <Features />
      <SeccionCTA />
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
