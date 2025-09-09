import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Input,
  List,
  ListItem,
  useColorModeValue
} from "@chakra-ui/react";

// Centro inicial (Ciudad de Guatemala)
const initialCenter = [14.6349, -90.5069];

// Componente para recentrar el mapa dinámicamente
const RecenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

const FullMap = () => {
  const [position, setPosition] = useState(initialCenter);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");

  const handleSelect = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setPosition([lat, lon]);
    setSearch(place.display_name);
    setSuggestions([]);
  };

  const handleChange = async (query) => {
    setSearch(query);
    if (query.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <Box position="relative" flex="1" height="100%" width="100%">
      {/* Contenedor de búsqueda */}
      <Box
        position="absolute"
        top="10px"
        left="10px"
        zIndex={1000}
        w="400px"
        bg={bg}
        border="1px solid"
        borderColor={border}
        borderRadius="md"
        p={2}
        boxShadow="lg"
      >
        {/* Input */}
        <Input
          placeholder="Busca una ubicación..."
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          variant="filled"
          size="sm"
          bg={useColorModeValue("gray.100", "gray.700")}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
        />

        {/* Lista de sugerencias */}
        {suggestions.length > 0 && (
          <Box
            mt={1}
            maxH="250px"
            overflowY="auto"
            border="1px solid"
            borderColor={border}
            borderRadius="md"
            bg={bg}
            boxShadow="md"
          >
            <List spacing={0}>
              {suggestions.map((place) => (
                <ListItem
                  key={place.place_id}
                  px={2}
                  py={1}
                  _hover={{
                    bg: useColorModeValue("gray.200", "gray.600"),
                    cursor: "pointer"
                  }}
                  onClick={() => handleSelect(place)}
                >
                  {place.display_name}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Mapa */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }} // fuerza a ocupar todo el espacio
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>{search || "Ubicación seleccionada 🚀"}</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </Box>
  );
};

export default FullMap;
