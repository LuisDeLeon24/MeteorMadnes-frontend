import React from "react";
import { VStack, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, HStack, Input } from "@chakra-ui/react";

const ROIControl = ({ fits, id }) => {
  // actualizar contraste del ROI
  const handleContrast = (value) => {
    document.getElementById(`contrast_value_${id}`).innerHTML = value;
    fits?.setContrast(fits.rois[id], value / 100);
  };

  // habilitar/deshabilitar ROI
  const handleDisplayROI = (e) => {
    fits?.enableROI(id, e.target.checked);
  };

  return (
    <Box key={id} border="1px solid rgba(14,165,233,0.2)" borderRadius="md" p={2}>
      <HStack w="100%" spacing={2}>
        <Slider defaultValue={0} min={0} max={100} flex={1} onChange={handleContrast}>
          <SliderTrack bg="rgba(255,255,255,0.1)">
            <SliderFilledTrack bg="#3b82f6" />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Text id={`contrast_value_${id}`} color="white" w="25%" fontFamily="monospace">
          0
        </Text>

        <HStack w="25%">
          <Text color="white">On:</Text>
          <Input type="checkbox" defaultChecked onChange={handleDisplayROI} />
        </HStack>
      </HStack>

      <Box mt={2}>
        <canvas
          id={`roihcanvas_${id}`}
          title="histogram. black line: black pixel; magenta: median; green: mean; white: white pixel"
          style={{ width: "100%", height: "100px" }}
        />
        <Text id={`roiinfo_${id}`} color="white" fontFamily="monospace" mt={2} minH="80px">
          <br /><br /><br /><br /><br />
        </Text>
      </Box>
    </Box>
  );
};

const RightBar = ({ fits }) => {
  // NROIS del ejemplo HTML original: 2 y 1 (orden descendente)
  const nrois = [2, 1];

  return (
    <VStack
      w={{ base: "100%", md: "320px" }}
      spacing={4}
      p={4}
      align="stretch"
      borderRadius="lg"
      bg="rgba(14, 165, 233, 0.05)"
      boxShadow="0 8px 30px rgba(14, 165, 233, 0.3)"
    >
      {nrois.map((roi) => (
        <ROIControl key={roi} fits={fits} id={roi} />
      ))}
    </VStack>
  );
};

export default RightBar;
