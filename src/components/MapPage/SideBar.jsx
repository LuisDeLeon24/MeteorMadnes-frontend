import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  useColorModeValue,
  Image,
  SimpleGrid
} from "@chakra-ui/react";

// Subcomponentes
const SearchBar = ({ search, setSearch }) => (
  <Input
    placeholder="Ingrese el nombre o el codigo del asteroide"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    size="sm"
    mb={3}
    bg={useColorModeValue("gray.100", "gray.700")}
    _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
  />
);

const ButtonsPanel = ({ selected, setSelected }) => {
  const logos = [
    { id: "agency1", src: "src/assets/images/NASA_logo.png", alt: "NASA" },
    { id: "agency2", src: "src/assets/images/NASA_JPL_logo.png", alt: "NASA JPL" },
    { id: "agency3", src: "src/assets/images/ESA_logo.png", alt: "ESA" },
    { id: "agency4", src: "src/assets/images/AEE_logo.png", alt: "AEE" },
    { id: "agency5", src: "src/assets/images/IAU_logo.png", alt: "IAU" },
    { id: "agency6", src: "src/assets/images/Hawaii_logo.png", alt: "Hawaii Univ." },
    { id: "agency7", src: "src/assets/images/India_logo.png", alt: "ISRO" },
  ];

  return (
    <SimpleGrid columns={3} spacing={10} mb={3}>
      {logos.map((logo) => (
        <Button
          key={logo.id}
          onClick={() => setSelected(logo.id)}
          p={10}
          variant={selected === logo.id ? "solid" : "ghost"}
          colorScheme={selected === logo.id ? "teal" : "gray"}
        >
          <Image src={logo.src} alt={logo.alt} boxSize="100px" objectFit="contain" />
        </Button>
      ))}
    </SimpleGrid>
  );
};


const ContentPanel = ({ selected }) => {
  let content;
  switch (selected) {
    case "agency1":
      content = <Text>NASA API</Text>;
      break;
    case "agency2":
      content = <Text>NASA JPL API</Text>;
      break;
    case "agency3":
      content = <Text>ESA API</Text>;
      break;
    case "agency4":
      content = <Text>AEE API</Text>;
      break;
    case "agency5":
        content = <Text>IAU API</Text>;
        break;
    case "agency6":
        content = <Text>Hawaii Univ. API</Text>;
        break;
    case "agency7":
        content = <Text>ISRO API</Text>;
        break;
    default:
      content = <Text>Selecciona una opción</Text>;
  }
  return <Box>{content}</Box>;
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // cerrado por defecto
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      height="100%" // ocupa todo el alto del contenedor (mapa)
      w={isOpen ? "33%" : "40px"} // abierto 1/3 de la pantalla, cerrado pequeño
      bg={bg}
      borderLeft="1px solid"
      borderColor={border}
      boxShadow="md"
      transition="width 0.3s"
      overflow="hidden"
      zIndex={1000} // encima del mapa
      p={isOpen ? 4 : 1}
      display="flex"
      flexDirection="column"
    >
      {/* Botón para abrir/cerrar */}
      <Button size="sm" onClick={() => setIsOpen(!isOpen)} mb={4}>
        {isOpen ? "→" : "←"}
      </Button>

      {/* Contenido */}
      {isOpen && (
        <>
          <SearchBar search={search} setSearch={setSearch} />
          <ButtonsPanel selected={selected} setSelected={setSelected} />
          <ContentPanel selected={selected} />
        </>
      )}
    </Box>
  );
};

export default Sidebar;
