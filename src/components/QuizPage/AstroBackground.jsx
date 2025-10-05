import { Box } from '@chakra-ui/react';

const AstroBackground = () => (
  <Box
    position="fixed"
    inset={0}
    zIndex={0}
    bg="radial-gradient(ellipse at top, #030712 0%, #000000 80%)"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundImage="radial-gradient(circle at 20% 30%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147,197,253,0.08) 0%, transparent 50%)"
      animation="starfield 20s ease-in-out infinite"
    />
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bgImage="url('/path/to/your/background.jpg')"
      bgSize="cover"
      bgPos="center"
      zIndex="-1"
    />
  </Box>
);

export default AstroBackground;
