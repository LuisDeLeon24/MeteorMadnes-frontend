import { Heading, Text, Button, Stack } from "@chakra-ui/react";
import { palette } from "../../theme";

const QuizIntro = ({ onStart }) => (
  <Stack spacing={6} maxW="36rem" px={2}>
    <Heading as="h1" fontSize={{ base: "36px", md: "48px" }} fontWeight={500} letterSpacing="-0.04em" lineHeight="1.05">
      Mission: defend Earth
    </Heading>
    <Text color={palette.quiet} fontSize="18px" lineHeight="1.6">
      Test what you know about asteroids and planetary defense. Correct answers raise your score and can earn a badge.
    </Text>
    <Button onClick={onStart} alignSelf="flex-start" h="44px" px={5}>
      Start mission
    </Button>
  </Stack>
);

export default QuizIntro;
