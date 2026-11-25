import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import MitigationInfoBox from "./Mitigationinfobox";
import { palette } from "../../theme";

const MitigationCard = ({ icon, title, description, data }) => {
  const Icon = icon;
  return (
    <Box
      border="1px solid"
      borderColor={palette.line}
      borderRadius="12px"
      p={{ base: 6, md: 8 }}
      bg={palette.ink}
      textAlign="left"
    >
      <Icon size={18} aria-hidden="true" color={palette.paper} />
      <Heading as="h2" fontSize="22px" fontWeight={500} letterSpacing="-0.03em" color={palette.paper} mt={4} mb={3}>
        {title}
      </Heading>
      <Text color={palette.quiet} fontSize="15px" lineHeight="1.6" mb={6}>
        {description}
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={8}>
        {data.map((item) => (
          <MitigationInfoBox key={item.label} label={item.label} value={item.value} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MitigationCard;
