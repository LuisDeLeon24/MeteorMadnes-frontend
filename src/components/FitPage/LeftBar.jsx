import React, { useEffect } from "react";
import {
  VStack,
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import FileInput from "./fileInput";

const HeaderSelector = ({ fits }) => {
  const handleStretchChange = (e) => {
    fits?.setStretch(e.target.value);
  };

  return (
    <HStack spacing={2} w="100%">
      <Button
        bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
        color="white"
        _hover={{ bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
        onClick={() => fits?.showHeader(true)}
      >
        Header
      </Button>

      <Select
        bg="rgba(59, 130, 246, 0.3)"
        color="white"
        _hover={{ bg: "rgba(14, 165, 233, 0.5)" }}
        onChange={handleStretchChange}
        defaultValue="linear"
      >
        <option value="linear">Linear</option>
        <option value="square">Square</option>
        <option value="sqrt">Square root</option>
      </Select>

      <Text id="cursor_loc" color="white" fontFamily="monospace" />
    </HStack>
  );
};

const GlassCanvas = ({ fits }) => {
  useEffect(() => {
    const canvas = document.getElementById("glass_canvas");
    if (fits && canvas) fits.addGlassCanvas(canvas);
  }, [fits]);

  return (
    <Box border="1px solid rgba(14, 165, 233, 0.3)" borderRadius="md" p={2}>
      <canvas
        id="glass_canvas"
        width={280}
        height={150}
        style={{ borderRadius: "6px", border: "1px solid rgba(14,165,233,0.2)" }}
      />
    </Box>
  );
};

const MainSlider = ({ fits }) => {
  const handleContrast = (value) => {
    document.getElementById(`contrast_value_0`).innerHTML = value;
    fits?.setContrast(fits.rois[0], value / 100);
  };

  return (
    <Slider defaultValue={0} min={0} max={100} onChange={handleContrast}>
      <SliderTrack bg="rgba(255,255,255,0.1)">
        <SliderFilledTrack bg="#3b82f6" />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

const ROIBox = ({ fits, id }) => {
  return (
    <Box>
      <canvas id={`roihcanvas_${id}`} style={{ width: "100%", height: "100px" }} />
      <Text id={`roiinfo_${id}`} color="white" fontFamily="monospace" mt={2} minH="80px" />
    </Box>
  );
};

const LeftBar = ({ fits }) => {
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
      <FileInput fits={fits} />
      <HeaderSelector fits={fits} />
      <GlassCanvas fits={fits} />
      <MainSlider fits={fits} />
      <ROIBox fits={fits} id={0} />
    </VStack>
  );
};

export default LeftBar;
