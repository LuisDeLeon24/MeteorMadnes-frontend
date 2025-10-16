import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Input, List, ListItem, useColorModeValue } from "@chakra-ui/react";

const initialCenter = [14.6349, -90.5069];

const RecenterMap = ({ position, zoom }) => {
	const map = useMap();
	if (position && position[0] != null && position[1] != null) {
		map.setView(position, zoom);
	}
	return null;
};

const LocationSelector = ({ onSelect }) => {
	useMapEvents({
		click(e) {
			if (e.latlng?.lat != null && e.latlng?.lng != null) {
				onSelect([e.latlng.lat, e.latlng.lng]);
			}
		}
	});
	return null;
};

const getCountryCode = async (lat, lon) => {
	if (lat == null || lon == null) return null;
	try {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=3&addressdetails=1`
		);
		const data = await res.json();
		return data.address?.country_code?.toUpperCase() || null;
	} catch (error) {
		console.error("Error obtaining country code:", error);
		return null;
	}
};

export const FullMap = ({ setCountryCode }) => {
	const [position, setPosition] = useState(initialCenter);
	const [zoom, setZoom] = useState(13);
	const [search, setSearch] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const bg = useColorModeValue("white", "gray.800");
	const border = useColorModeValue("gray.200", "gray.600");

	const handleSelect = async (place) => {
		const lat = parseFloat(place.lat);
		const lon = parseFloat(place.lon);
		if (!isNaN(lat) && !isNaN(lon)) {
			setPosition([lat, lon]);
			setZoom(13);
			setSearch(place.display_name);
			setSuggestions([]);
			const code = await getCountryCode(lat, lon);
			setCountryCode(code);
		}
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
			console.error("Search error:", error);
		}
	};

	return (
		<Box position="relative" flex="1" height="100%" width="100%">
			<Box
				position="absolute"
				top={{ base: "5px", md: "10px", lg: "20px" }}
				left={{ base: "5px", md: "10px", lg: "20px" }}
				zIndex={1000}
				w={{ base: "90%", sm: "300px", md: "400px", lg: "500px" }}
				bg={bg}
				border="1px solid"
				borderColor={border}
				borderRadius="md"
				p={{ base: 1.5, md: 2, lg: 3 }}
				boxShadow="lg"
			>
				<Input
					placeholder="Search for a location..."
					value={search}
					onChange={(e) => handleChange(e.target.value)}
					variant="filled"
					size={{ base: "sm", md: "md", lg: "lg" }}
					fontSize={{ base: "sm", md: "md", lg: "lg" }}
					px={{ base: 3, md: 4, lg: 5 }}
					width="100%"
					bg={useColorModeValue("gray.100", "gray.700")}
					_placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
				/>

				{suggestions.length > 0 && (
					<Box
						mt={{ base: 1, md: 2 }}
						maxH={{ base: "180px", md: "250px" }}
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
									px={{ base: 2, md: 3 }}
									py={{ base: 1, md: 2 }}
									_hover={{
										bg: useColorModeValue("gray.200", "gray.600"),
										cursor: "pointer",
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

			<MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }} zoomControl={false}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				/>
				<Marker position={position}>
					<Popup>{search || "Selected location 🚀"}</Popup>
				</Marker>

				<RecenterMap position={position} zoom={zoom} />

				<LocationSelector
					onSelect={async ([lat, lon]) => {
						if (!isNaN(lat) && !isNaN(lon)) {
							setPosition([lat, lon]);
							setZoom(13);
							const code = await getCountryCode(lat, lon);
							setCountryCode(code);
							setSearch("");
						}
					}}
				/>
			</MapContainer>
		</Box>
	);
};