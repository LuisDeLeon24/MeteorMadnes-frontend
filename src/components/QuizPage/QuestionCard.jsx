import { Box, Heading, Text, Stack, Button, Progress } from "@chakra-ui/react";
import { palette } from "../../theme";

const QuestionCard = ({ question, options, current, total, onSelect }) => (
  <Box
    bg={palette.field}
    border="1px solid"
    borderColor={palette.line}
    borderRadius="12px"
    p={{ base: 5, md: 8 }}
    width={{ base: "100%", md: "640px" }}
    mx="auto"
  >
    <Text color={palette.quiet} mb={3} fontSize="14px" sx={{ fontVariantNumeric: "tabular-nums" }}>
      Question {current} of {total}
    </Text>
    <Heading as="h2" fontSize={{ base: "22px", md: "28px" }} fontWeight={500} letterSpacing="-0.03em" mb={6} lineHeight="1.25">
      {question}
    </Heading>
    <Stack spacing={3}>
      {options.map((opt) => (
        <Button
          key={opt}
          onClick={() => onSelect(opt)}
          width="100%"
          h="auto"
          minH="48px"
          py={3}
          px={4}
          variant="outline"
          justifyContent="flex-start"
          textAlign="left"
          whiteSpace="normal"
          fontWeight={400}
        >
          {opt}
        </Button>
      ))}
    </Stack>
    <Progress
      value={(current / total) * 100}
      mt={8}
      size="xs"
      borderRadius="full"
      aria-label="Quiz progress"
    />
  </Box>
);

export default QuestionCard;
