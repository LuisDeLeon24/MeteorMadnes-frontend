import { Box, Text, Heading } from "@chakra-ui/react";

const MitigationInfoBox = ({ label, value }) => {
  return (
    <Box
      bg="rgba(255,255,255,0.05)"
      border="1px solid rgba(59,130,246,0.2)"
      borderRadius="lg"
      p={4}
      textAlign="left"
      _hover={{ bg: "rgba(255,255,255,0.08)" }}
      transition="0.3s"
    >
      <Heading size="sm" color="blue.300" mb={1}>
        {label}
      </Heading>
      <Text color="gray.200" fontSize="sm">
        {value}
      </Text>
    </Box>
  );
};

export default MitigationInfoBox;
