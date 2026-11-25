import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Button,
  Link,
  Icon,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Menu, Shield } from "lucide-react";
import { palette } from "../../theme";

const navLinks = [
  { name: "FITS", href: "/fits", description: "FITS viewer" },
  { name: "Simulation", href: "/map", description: "Impact simulation" },
  { name: "Interception", href: "/earth", description: "Orbit review" },
  { name: "Quiz", href: "/quiz", description: "Challenge your knowledge" },
  { name: "Mitigations", href: "/mitigations", description: "Protect yourself" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToMap = () => {
    navigate("/map");
    onClose();
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Box
        as="header"
        bg={palette.ink}
        borderBottom="1px solid"
        borderColor={palette.line}
        position="sticky"
        top="0"
        zIndex="40"
        px={{ base: 4, md: 6 }}
      >
        <Flex align="center" h="64px" gap={6}>
          <HStack as="a" href="/" spacing={3} minW={0} _hover={{ textDecoration: "none" }} aria-label="AstroTracker home">
            <img
              src="/assets/images/Main_Logo-removebg-preview.png"
              alt=""
              width="32"
              height="32"
              style={{ width: 32, height: 32, display: "block" }}
            />
            <VStack align="flex-start" spacing={0} minW={0}>
              <Text
                color={palette.paper}
                fontWeight={500}
                fontSize="15px"
                letterSpacing="-0.02em"
                lineHeight="1.2"
              >
                AstroTracker
              </Text>
              <Text
                color={palette.quiet}
                fontSize="12px"
                lineHeight="1.2"
                display={{ base: "none", sm: "block" }}
              >
                Asteroid response
              </Text>
            </VStack>
          </HStack>

          <HStack
            as="nav"
            aria-label="Primary"
            spacing={1}
            display={{ base: "none", lg: "flex" }}
            flex="1"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  px={3}
                  py={2}
                  borderRadius="8px"
                  fontSize="14px"
                  fontWeight={active ? 500 : 400}
                  color={active ? palette.paper : palette.quiet}
                  bg={active ? palette.field : "transparent"}
                  _hover={{ color: palette.paper, textDecoration: "none", bg: palette.field }}
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </HStack>

          <Button
            display={{ base: "none", lg: "inline-flex" }}
            size="sm"
            h="36px"
            px={4}
            onClick={goToMap}
            rightIcon={<Icon as={Shield} size={16} aria-hidden="true" />}
          >
            Command center
          </Button>

          <IconButton
            aria-label="Open menu"
            icon={<Menu size={18} aria-hidden="true" />}
            onClick={onOpen}
            display={{ base: "inline-flex", lg: "none" }}
            ml="auto"
            variant="outline"
            size="sm"
          />
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay bg="rgba(0,0,0,0.4)" />
        <DrawerContent bg={palette.ink} color={palette.paper}>
          <DrawerCloseButton
            color={palette.paper}
            mt={3}
            mr={3}
            border="1px solid"
            borderColor={palette.line}
            borderRadius="8px"
          />
          <DrawerBody pt={20} px={6}>
            <Stack as="nav" aria-label="Mobile" spacing={0}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    py={4}
                    borderBottom="1px solid"
                    borderColor={palette.line}
                    _hover={{ textDecoration: "none" }}
                    aria-current={active ? "page" : undefined}
                  >
                    <Text fontSize="28px" fontWeight={500} letterSpacing="-0.03em" color={palette.paper}>
                      {link.name}
                    </Text>
                    <Text fontSize="14px" color={palette.quiet} mt={1}>
                      {link.description}
                    </Text>
                  </Link>
                );
              })}
            </Stack>
            <Button mt={8} w="full" h="44px" onClick={goToMap}>
              Command center
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
