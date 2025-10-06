import { Box, VStack, Heading, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MitigationInfoBox from "./Mitigationinfobox";

const MotionBox = motion(Box);

const MitigationCard = ({ icon, title, description, data, color }) => {
  return (
    <MotionBox
      bg={`linear-gradient(145deg, ${color} 0%, rgba(0,0,0,0.4) 100%)`}
      border="1px solid rgba(59,130,246,0.3)"
      borderRadius="2xl"
      p={{ base: 6, md: 10 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
      transition="0.3s"
      width="100%"
      textAlign="left"
    >
      <Icon as={icon} boxSize={10} color="blue.400" mb={4} />
      <Heading size="lg" color="white" mb={3}>
        {title}
      </Heading>
      <Text color="gray.200" mb={6}>
        {description}
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        {data.map((item, i) => (
          <MitigationInfoBox key={i} label={item.label} value={item.value} />
        ))}
      </SimpleGrid>
    </MotionBox>
  );
};

export default MitigationCard;
