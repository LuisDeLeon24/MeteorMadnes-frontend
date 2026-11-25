import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Input,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Satellite, Globe, Shield } from "lucide-react";
import { palette } from "../../theme";

const FooterLink = ({ href = "#", children }) => (
  <Link
    href={href}
    color={palette.quiet}
    fontSize="14px"
    py={1}
    display="inline-block"
    _hover={{ color: palette.paper, textDecoration: "none" }}
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <Box as="footer" borderTop="1px solid" borderColor={palette.line} bg={palette.ink} color={palette.paper}>
      <Container maxW="1120px" py={{ base: 16, md: 20 }} px={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 10, lg: 12 }}>
          <Stack spacing={4}>
            <HStack spacing={3}>
              <img
                src="/assets/images/Main_Logo-removebg-preview.png"
                alt=""
                width="32"
                height="32"
                style={{ width: 32, height: 32 }}
              />
              <Text fontWeight={500} letterSpacing="-0.02em">
                AstroTracker
              </Text>
            </HStack>
            <Text color={palette.quiet} fontSize="14px" maxW="28ch" lineHeight="1.6">
              Detection, analysis, and response for potentially hazardous asteroids.
            </Text>
            <Text color={palette.quiet} fontSize="14px">
              BADVOIDS
            </Text>
            <Text color={palette.quiet} fontSize="14px">
              @Badvoids.gt
            </Text>
          </Stack>

          <Stack spacing={2} align="flex-start">
            <Text fontSize="14px" fontWeight={500}>
              Developers
            </Text>
            <FooterLink href="#detection">Luis De León</FooterLink>
            <FooterLink href="#tracking">Joaquín Figueroa</FooterLink>
            <FooterLink href="#interception">Jorge Alvarez</FooterLink>
            <FooterLink href="#research">Anderson Gómez</FooterLink>
            <FooterLink href="#alerts">Juan Cajchun</FooterLink>
            <FooterLink href="#alerts">José Rivera</FooterLink>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Text fontSize="14px" fontWeight={500}>
              Updates
            </Text>
            <Text color={palette.quiet} fontSize="14px" lineHeight="1.6">
              Notes on detections and changes to the response tools.
            </Text>
            <Stack as="div" spacing={2} w="full">
              <Text as="label" htmlFor="mission-email" fontSize="13px" color={palette.quiet}>
                Email
              </Text>
              <Input
                id="mission-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="commander@email.com"
                aria-label="Email"
              />
              <Button type="button" w="full">
                Join the mission
              </Button>
            </Stack>
            <HStack spacing={2}>
              <IconButton aria-label="Satellite network" variant="outline" size="sm" icon={<Satellite size={16} />} />
              <IconButton aria-label="Global network" variant="outline" size="sm" icon={<Globe size={16} />} />
              <IconButton aria-label="Secure protocol" variant="outline" size="sm" icon={<Shield size={16} />} />
            </HStack>
          </Stack>

          <Stack spacing={4}>
            <Text fontSize="14px" fontWeight={500}>
              System status
            </Text>
            {[
              ["Visible FITS", "Operational", "47/47"],
              ["Simulators", "Nominal", "523/525"],
              ["Average score", "Monitoring", "8 pts"],
            ].map(([label, status, count]) => (
              <Box key={label} borderTop="1px solid" borderColor={palette.line} pt={3}>
                <Text fontSize="14px">{label}</Text>
                <HStack justify="space-between" mt={1}>
                  <Text fontSize="13px" color={palette.quiet}>
                    {status}
                  </Text>
                  <Text fontSize="13px" fontFamily="mono" sx={{ fontVariantNumeric: "tabular-nums" }}>
                    {count}
                  </Text>
                </HStack>
              </Box>
            ))}
            <Text fontSize="13px" color={palette.quiet}>
              MASA Space Apps, BADVOIDS
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTop="1px solid" borderColor={palette.line}>
        <Container maxW="1120px" py={6} px={{ base: 4, md: 6 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            spacing={4}
            color={palette.quiet}
            fontSize="13px"
          >
            <Text>
              © {new Date().getFullYear()} AstroTracker. Guatemala Space Command.
            </Text>
            <HStack spacing={5}>
              <FooterLink href="#protocols">Defense protocols</FooterLink>
              <FooterLink href="#classified">Classified information</FooterLink>
              <FooterLink href="#emergency">Emergencies</FooterLink>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
