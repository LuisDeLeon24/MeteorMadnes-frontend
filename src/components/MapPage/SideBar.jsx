import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  useColorModeValue,
  Image,
  SimpleGrid,
  IconButton,
  InputGroup,
  InputLeftElement, // <-- agregar esto
  Tooltip,
  Portal
} from "@chakra-ui/react";


import { QuestionIcon } from "@chakra-ui/icons";

import { AsteroidInfoNASANEOS } from "./NASA_NEOs";
import { HORIZONS } from "./HORIZONS";
import { PNeoInfo } from "./IAU_PNEOS";
import { RandomPNeosList } from "./RandomPNEO";

// Subcomponentes
const SearchBar = ({ search, setSearch }) => (
  <InputGroup size="sm" mb={3}>
    <InputLeftElement>
      <Tooltip
        label="Ingresa el nombre o ID del asteroide y selecciona un lugar en el mapa para iniciar la simulación."
        placement="top"
        hasArrow
        openDelay={200}
        isInteractive
        bg="black"
        color="white"
        portalProps={{ appendToParentPortal: true }}
      >
        <IconButton
          aria-label="Ayuda"
          icon={<QuestionIcon />}
          size="xs" // más pequeño para que quepa dentro del input
          variant="ghost"
        />
      </Tooltip>
    </InputLeftElement>

    <Input
      placeholder="Nombre o ID del asteroide"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      bg={useColorModeValue("gray.100", "gray.700")}
      _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
      pl={10} // deja espacio para el icono
    />
  </InputGroup>
);

const ButtonsPanel = ({ selected, setSelected }) => {
  const logos = [
    { id: "agency1", src: "src/assets/images/NASA_logo.png", alt: "NASA" },
    { id: "agency2", src: "src/assets/images/NASA_JPL_logo.png", alt: "NASA JPL" },
    //{ id: "agency3", src: "src/assets/images/ESA_logo.png", alt: "ESA" },
    { id: "agency5", src: "src/assets/images/IAU_logo.png", alt: "IAU" },
    //{ id: "agency6", src: "src/assets/images/Hawaii_logo.png", alt: "Hawaii Univ." }
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

const DefaultInfo = () => {
  return (
    <Box>
      <Text fontWeight="bold" mb={2}>Fuentes de datos disponibles</Text>
      <Text mb={2}>
        Actualmente puedes consultar información de asteroides y cuerpos menores desde varias fuentes:
      </Text>
      <Text mb={1}>• <b>NASA NEOS API:</b> Información general de Near Earth Objects, órbitas, magnitudes y riesgo de impacto.</Text>
      <Text mb={1}>• <b>NASA JPL HORIZONS API:</b> Datos precisos de posiciones, trayectorias y efemérides de asteroides y cometas.</Text>
      <Text mb={1}>• <b>IAU Minor Planet Center:</b> Listas de asteroides pendientes de confirmación y designaciones temporales.</Text>
      <Text mb={1}>• Próximamente agregaremos mas fuentes</Text>
      <Text mt={2} color="gray.500">
        Selecciona una fuente arriba para consultar información específica de un asteroide.
      </Text>
    </Box>
  );
};

const ContentPanel = ({ selected, search }) => {
  switch (selected) {
    case "agency1":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>NASA NEOS API</Text>
          {search ? (
            <AsteroidInfoNASANEOS asteroidId={search} />
          ) : (
            <Text color="gray.500">Ingrese un nombre o ID para buscar</Text>
          )}
        </Box>
      );
    case "agency2":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>NASA JPL HORIZONS API</Text>
          {search ? (
            <HORIZONS asteroidId={search} />
          ) : (
            <Text color="gray.500">Ingrese un nombre o ID para buscar</Text>
          )}
        </Box>
      );
    case "agency3":
      return <Text>ESA API</Text>;
    case "agency4":
      return <Text>AEE API</Text>;
    case "agency5":
      return (
        <Box>
          <Text fontWeight="bold" mb={2}>IAU Minor Planet Center NeoCP (Neos Pendientes)</Text>
          {search ? (
            <PNeoInfo tempDesig={search} />
          ) : (
            <RandomPNeosList />
          )}
        </Box>
      );
    case "agency6":
      return <Text>Hawaii Univ. API</Text>;
    case "agency7":
      return <Text>ISRO API</Text>;
    default:
      return <DefaultInfo />;
  }
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // cerrado por defecto
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");

  // Función para el botón de simulación
  const handleStartSimulation = () => {
    alert("Simulación iniciada"); // Aquí puedes reemplazarlo con la lógica real
  };

  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      height="100%"
      w={isOpen ? "33%" : "40px"}
      bg={bg}
      borderLeft="1px solid"
      borderColor={border}
      boxShadow="md"
      transition="width 0.3s"
      overflow="hidden"
      zIndex={1000}
      p={isOpen ? 4 : 1}
      display="flex"
      flexDirection="column"
    >
      {/* Botón para abrir/cerrar */}
      <Button size="sm" onClick={() => setIsOpen(!isOpen)} mb={4}>
        {isOpen ? "→" : "←"}
      </Button>

      {/* Contenedor scrolleable */}
      {isOpen && (
        <Box flex="1" overflowY="auto" pr={2}>
          <SearchBar search={search} setSearch={setSearch} />

          {/* Botón de iniciar simulación */}
          <Button
            colorScheme="teal"
            size="sm"
            mb={4}
            py={6}
            width="100%"
            onClick={handleStartSimulation}
          >
            Iniciar Simulación
          </Button>

          <ButtonsPanel selected={selected} setSelected={setSelected} />
          <ContentPanel selected={selected} search={search} />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
