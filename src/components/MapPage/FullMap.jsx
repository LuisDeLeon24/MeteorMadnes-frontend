import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Input, List, ListItem, Text } from "@chakra-ui/react";
import { demoCountryCode, filterDemoPlaces } from "../../demo/demoData";
import { withDemoFallback } from "../../demo/fallback";

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
	if (lat == null || lon == null) return { code: null, demo: false };
	const response = await withDemoFallback(async (signal) => {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=3&addressdetails=1`,
			{ signal }
		);
		if (!res.ok) return { error: true };
		const data = await res.json();
		const code = data.address?.country_code?.toUpperCase();
		if (!code) return { error: true };
		return { data: code };
	}, () => demoCountryCode(lat, lon));
	if (response?.demo) return { code: response.data, demo: true };
	return { code: response.data, demo: false };
};

export const FullMap = ({ setCountryCode, setLocationDemo, initialQuery = "", initialPlaceDemo = false }) => {
	const [position, setPosition] = useState(initialCenter);
	const [zoom, setZoom] = useState(13);
	const [search, setSearch] = useState(initialQuery);
	const [suggestions, setSuggestions] = useState([]);
	const [placeDemo, setPlaceDemo] = useState(initialPlaceDemo);

	const bg = "#141414";
	const border = "#2a2a2a";

	const handleSelect = async (place) => {
		const lat = parseFloat(place.lat);
		const lon = parseFloat(place.lon);
		if (!isNaN(lat) && !isNaN(lon)) {
			setPosition([lat, lon]);
			setZoom(13);
			setSearch(place.display_name);
			setSuggestions([]);
			if (place.country) {
				setCountryCode(place.country);
				setLocationDemo?.(true);
				setPlaceDemo(true);
				return;
			}
			const { code, demo } = await getCountryCode(lat, lon);
			setCountryCode(code);
			setLocationDemo?.(demo);
			setPlaceDemo(demo);
		}
	};

	const handleChange = async (query) => {
		setSearch(query);
		if (query.trim().length < 1) {
			setSuggestions([]);
			return;
		}
		try {
			const response = await withDemoFallback(async (signal) => {
				const res = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
					{ signal }
				);
				if (!res.ok) return { error: true };
				const data = await res.json();
				if (!Array.isArray(data)) return { error: true };
				return { data };
			}, () => filterDemoPlaces(query));
			setSuggestions(response.data || []);
			setPlaceDemo(Boolean(response.demo));
		} catch (error) {
			console.error("Search error:", error);
			setSuggestions(filterDemoPlaces(query));
			setPlaceDemo(true);
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
				boxShadow="none"
			>
				<Input
					aria-label="Search for a location"
					name="location"
					autoComplete="off"
					placeholder="Search for a location"
					value={search}
					onChange={(e) => handleChange(e.target.value)}
					size="md"
					fontSize="14px"
					width="100%"
					bg="#141414"
					color="#f4f4f4"
					borderColor="#2a2a2a"
					_placeholder={{ color: "#6f6f6f" }}
				/>
				{placeDemo && (
					<Text mt={2} fontSize="12px" color="#9a9a9a">
						Demo data
					</Text>
				)}

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
									color="#f4f4f4"
									fontSize="14px"
									_hover={{
										bg: "#1c1c1c",
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
					<Popup>{search || "Selected location"}</Popup>
				</Marker>

				<RecenterMap position={position} zoom={zoom} />

				<LocationSelector
					onSelect={async ([lat, lon]) => {
						if (!isNaN(lat) && !isNaN(lon)) {
							setPosition([lat, lon]);
							setZoom(13);
							const { code, demo } = await getCountryCode(lat, lon);
							setCountryCode(code);
							setLocationDemo?.(demo);
							setPlaceDemo(demo);
							setSearch("");
						}
					}}
				/>
			</MapContainer>
		</Box>
	);
};