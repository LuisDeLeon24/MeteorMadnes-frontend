import { Box, Text } from "@chakra-ui/react";
import { palette } from "../../theme";

const MitigationInfoBox = ({ label, value }) => {
  return (
    <Box py={3} borderTop="1px solid" borderColor={palette.line}>
      <Text fontSize="13px" color={palette.quiet} mb={1}>
        {label}
      </Text>
      <Text fontSize="14px" color={palette.paper}>
        {value}
      </Text>
    </Box>
  );
};

export default MitigationInfoBox;
