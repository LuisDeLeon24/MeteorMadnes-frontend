import React from "react";
import { Box, Flex, Heading, HStack, Button, Link, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Simulation", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "About Us", href: "#" },
  ];

  return (
    <Box
      bg="gray.900"
      px={6}
      py={4}
      boxShadow="0 4px 6px rgba(0,0,0,0.3)"
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Flex align="center">
        <Heading
          size="lg"
          color="cyan.400"
          fontFamily="monospace"
          textShadow="0 0 8px cyan"
        >
          AstroImpacts
        </Heading>
        <Spacer />
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              fontWeight="bold"
              color="whiteAlpha.800"
              _hover={{ color: "cyan.300", textShadow: "0 0 4px cyan" }}
            >
              {link.name}
            </Link>
          ))}
          <Button
            colorScheme="cyan"
            variant="outline"
            _hover={{ bg: "cyan.400", color: "gray.900", boxShadow: "0 0 10px cyan" }}
          >
            Ingresar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
