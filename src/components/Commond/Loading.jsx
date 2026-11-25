import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { palette } from "../../theme";

const AstroSpinner = ({
  size = "lg",
  showText = true,
  loadingText = "Analyzing orbits…",
  variant = "orbital",
}) => {
  const dimension = size === "sm" ? 18 : size === "md" ? 22 : size === "xl" ? 32 : 26;
  const label =
    variant === "pulse"
      ? loadingText
      : variant === "radar"
        ? loadingText
        : loadingText;

  return (
    <Flex minH="100vh" align="center" justify="center" bg={palette.ink} px={6}>
      <VStack spacing={4}>
        <Box
          role="status"
          aria-label={label}
          w={`${dimension}px`}
          h={`${dimension}px`}
          border="1.5px solid"
          borderColor={palette.line}
          borderTopColor={palette.paper}
          borderRadius="full"
          sx={{
            animation: "astro-spin 0.8s linear infinite",
            "@keyframes astro-spin": {
              to: { transform: "rotate(360deg)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
              borderTopColor: palette.paper,
              borderRightColor: palette.paper,
            },
          }}
        />
        {showText && (
          <Text color={palette.quiet} fontSize="14px" aria-live="polite">
            {label}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

export const SpinnerExamples = () => (
  <VStack spacing={8} p={8} bg={palette.ink} minH="100vh">
    <AstroSpinner size="lg" variant="orbital" loadingText="Calibrating defense systems…" />
    <AstroSpinner size="md" variant="pulse" loadingText="Synchronizing telemetry…" />
    <AstroSpinner size="sm" variant="radar" loadingText="Scanning for threats…" />
  </VStack>
);

export default AstroSpinner;
