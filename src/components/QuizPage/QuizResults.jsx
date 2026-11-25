import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Stack, Heading, Text, Button, Box } from "@chakra-ui/react";
import BadgeView from "../../ImagesViews/BadgeView";
import { palette } from "../../theme";

const QuizResults = ({ score, total, onRestart }) => {
  const badgeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadBadge = async () => {
    if (!badgeRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await htmlToImage.toPng(badgeRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = "my-badge.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Stack spacing={5} maxW="28rem" px={2}>
      <Heading
        as="h1"
        fontSize={{ base: "56px", md: "72px" }}
        fontWeight={500}
        letterSpacing="-0.045em"
        lineHeight="1"
        sx={{ fontVariantNumeric: "tabular-nums" }}
      >
        {score}/{total}
      </Heading>
      <Text fontSize="18px" color={palette.quiet} lineHeight="1.5">
        {score / total > 0.7
          ? "Excellent work, commander."
          : "Keep practicing. The next round is ready."}
      </Text>
      <Stack direction={{ base: "column", sm: "row" }} spacing={3} pt={2}>
        <Button onClick={onRestart} h="44px" px={5}>
          Retry
        </Button>
        {score === total && (
          <Button variant="outline" h="44px" px={5} onClick={downloadBadge} isLoading={downloading}>
            Download prize
          </Button>
        )}
      </Stack>
      <Box position="absolute" top={0} left={0} opacity={0} pointerEvents="none" aria-hidden="true">
        <BadgeView
          ref={badgeRef}
          title="Congratulations!"
          teamImage="/assets/images/BadVoids-Logo-White-removebg-preview.png"
          logoImage="/assets/images/Main_Logo-removebg-preview.png"
          badgeImage="/assets/images/Badge-removebg-preview.png"
        />
      </Box>
    </Stack>
  );
};

export default QuizResults;
