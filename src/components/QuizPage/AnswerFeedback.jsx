import { Stack, Text } from "@chakra-ui/react";
import { CheckCircle, XCircle } from "lucide-react";
import { palette } from "../../theme";

const AnswerFeedback = ({ correct }) => (
  <Stack
    key={correct ? "correct" : "incorrect"}
    spacing={3}
    align="center"
    bg={palette.field}
    border="1px solid"
    borderColor={palette.line}
    borderRadius="12px"
    px={8}
    py={6}
    role="status"
    aria-live="polite"
  >
    {correct ? (
      <CheckCircle size={28} aria-hidden="true" color={palette.paper} />
    ) : (
      <XCircle size={28} aria-hidden="true" color={palette.hazard} />
    )}
    <Text fontSize="20px" fontWeight={500} color={correct ? palette.paper : palette.hazard}>
      {correct ? "Correct" : "Incorrect"}
    </Text>
  </Stack>
);

export default AnswerFeedback;
