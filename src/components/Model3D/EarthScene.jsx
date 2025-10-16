import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture, Text, Trail } from "@react-three/drei";
import Navbar from "../Commond/NavBar";
import {
    Box,
    VStack,
    Text as ChakraText,
    Badge,
    HStack,
    Button,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Collapse,
    useDisclosure,
    Icon
} from "@chakra-ui/react";
import { SearchIcon, ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import * as THREE from "three";

const REAL_ASTEROIDS = [
    {
        name: "Apophis",
        type: "NEA",
        size: 0.025,
        distance: 5.2,
        period: 323.6,
        eccentricity: 0.19,
        inclination: 3.33,
        color: "#8B4513",
        diameter: "370m",
        discoveryYear: 2004,
        hazardous: true,
        composition: "Stony",
        nextApproach: "2029"
    },
    {
        name: "Bennu",
        type: "NEA",
        size: 0.015,
        distance: 4.8,
        period: 436.6,
        eccentricity: 0.20,
        inclination: 6.03,
        color: "#2F4F4F",
        diameter: "492m",
        discoveryYear: 1999,
        hazardous: true,
        composition: "Carbonaceous",
        nextApproach: "2060"
    },
    {
        name: "Didymos",
        type: "NEA",
        size: 0.020,
        distance: 5.1,
        period: 770.1,
        eccentricity: 0.38,
        inclination: 3.41,
        color: "#696969",
        diameter: "780m",
        discoveryYear: 1996,
        hazardous: false,
        composition: "Stony",
        nextApproach: "2123"
    },
    {
        name: "Ceres",
        type: "MBA",
        size: 0.080,
        distance: 8.5,
        period: 1679.8,
        eccentricity: 0.08,
        inclination: 10.6,
        color: "#A0522D",
        diameter: "940km",
        discoveryYear: 1801,
        hazardous: false,
        composition: "Ice-Rock",
        nextApproach: "N/A"
    },
    {
        name: "Vesta",
        type: "MBA",
        size: 0.045,
        distance: 7.8,
        period: 1325.4,
        eccentricity: 0.09,
        inclination: 7.14,
        color: "#D2691E",
        diameter: "525km",
        discoveryYear: 1807,
        hazardous: false,
        composition: "Rocky",
        nextApproach: "N/A"
    },
    {
        name: "Pallas",
        type: "MBA",
        size: 0.042,
        distance: 8.2,
        period: 1686.5,
        eccentricity: 0.23,
        inclination: 34.8,
        color: "#708090",
        diameter: "512km",
        discoveryYear: 1802,
        hazardous: false,
        composition: "Stony",
        nextApproach: "N/A"
    },
    {
        name: "Hygiea",
        type: "MBA",
        size: 0.035,
        distance: 9.1,
        period: 2029.2,
        eccentricity: 0.12,
        inclination: 3.84,
        color: "#8FBC8F",
        diameter: "434km",
        discoveryYear: 1849,
        hazardous: false,
        composition: "Carbonaceous",
        nextApproach: "N/A"
    },
    {
        name: "Eros",
        type: "MBA",
        size: 0.018,
        distance: 6.8,
        period: 643.2,
        eccentricity: 0.22,
        inclination: 10.8,
        color: "#CD853F",
        diameter: "16.8km",
        discoveryYear: 1898,
        hazardous: false,
        composition: "Silicate",
        nextApproach: "N/A"
    },
    {
        name: "Mathilde",
        type: "MBA",
        size: 0.025,
        distance: 7.6,
        period: 1269.3,
        eccentricity: 0.27,
        inclination: 6.7,
        color: "#556B2F",
        diameter: "52.8km",
        discoveryYear: 1885,
        hazardous: false,
        composition: "Carbonaceous",
        nextApproach: "N/A"
    },
    {
        name: "Gaspra",
        type: "MBA",
        size: 0.012,
        distance: 6.2,
        period: 1199.1,
        eccentricity: 0.17,
        inclination: 4.1,
        color: "#BC8F8F",
        diameter: "12.2km",
        discoveryYear: 1916,
        hazardous: false,
        composition: "Stony",
        nextApproach: "N/A"
    },
    {
        name: "Hektor",
        type: "Trojan",
        size: 0.035,
        distance: 12.8,
        period: 4307.8,
        eccentricity: 0.02,
        inclination: 18.2,
        color: "#4682B4",
        diameter: "225km",
        discoveryYear: 1907,
        hazardous: false,
        composition: "Dark",
        nextApproach: "N/A"
    },
    {
        name: "Patroclus",
        type: "Trojan",
        size: 0.028,
        distance: 12.6,
        period: 4285.9,
        eccentricity: 0.14,
        inclination: 22.0,
        color: "#5F9EA0",
        diameter: "140km",
        discoveryYear: 1906,
        hazardous: false,
        composition: "Dark",
        nextApproach: "N/A"
    },
];

function RealisticAsteroid({ asteroidData, timeScale = 1, showOrbits = true, onAsteroidClick, isSelected = false, onPositionUpdate }) {
    const asteroidRef = useRef();
    const [currentPosition, setCurrentPosition] = useState([0, 0, 0]);

    const calculateOrbitalPosition = (time, asteroid) => {
        const { distance, period, eccentricity, inclination } = asteroid;

        const periodYears = period / 365.25;
        const meanAnomaly = (time * timeScale / periodYears) * 2 * Math.PI;

        let eccentricAnomaly = meanAnomaly;
        for (let i = 0; i < 5; i++) {
            eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
        }

        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const radius = distance * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));

        const x = radius * Math.cos(trueAnomaly);
        const y = radius * Math.sin(trueAnomaly);

        const incRad = (inclination * Math.PI) / 180;
        const finalX = x;
        const finalY = y * Math.cos(incRad);
        const finalZ = y * Math.sin(incRad);

        return [finalX, finalY, finalZ];
    };

    useFrame((state) => {
        if (asteroidRef.current) {
            const time = state.clock.getElapsedTime() * 0.1;
            const position = calculateOrbitalPosition(time, asteroidData);

            asteroidRef.current.position.set(...position);
            setCurrentPosition(position);

            // Report position to parent component
            if (onPositionUpdate) {
                onPositionUpdate(asteroidData.name, position);
            }

            // Only notify position if selected
            if (isSelected && onAsteroidClick) {
                onAsteroidClick(asteroidData, position, true);
            }

            // Asteroid rotation
            asteroidRef.current.rotation.x += 0.001;
            asteroidRef.current.rotation.y += 0.002;
            asteroidRef.current.rotation.z += 0.0005;
        }
    });

    const getAsteroidGeometry = (type) => {
        switch (type) {
            case "NEA":
                return <dodecahedronGeometry args={[asteroidData.size, 1]} />;
            case "MBA":
                return <icosahedronGeometry args={[asteroidData.size, 1]} />;
            case "Trojan":
                return <octahedronGeometry args={[asteroidData.size, 1]} />;
            default:
                return <sphereGeometry args={[asteroidData.size, 16, 16]} />;
        }
    };

    return (
        <group>
            {/* Asteroid Orbit */}
            {showOrbits && !isSelected && (
                <mesh>
                    <ringGeometry args={[asteroidData.distance - 0.1, asteroidData.distance + 0.1, 64]} />
                    <meshBasicMaterial
                        color={asteroidData.color}
                        transparent={true}
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Highlighted orbit for selected asteroid */}
            {isSelected && (
                <mesh>
                    <ringGeometry args={[asteroidData.distance - 0.05, asteroidData.distance + 0.05, 64]} />
                    <meshBasicMaterial
                        color={asteroidData.color}
                        transparent={true}
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* The asteroid with trail */}
            <Trail
                width={isSelected ? 0.4 : 0.2}
                length={isSelected ? 30 : 20}
                color={new THREE.Color(asteroidData.color)}
                attenuation={(t) => t * t * t}
            >
                <mesh ref={asteroidRef}>
                    {getAsteroidGeometry(asteroidData.type)}
                    <meshPhongMaterial
                        color={asteroidData.color}
                        shininess={30}
                        specular="#444444"
                        bumpScale={0.02}
                        emissive={isSelected ? asteroidData.color : "#000000"}
                        emissiveIntensity={isSelected ? 0.4 : 0}
                    />
                </mesh>
            </Trail>

            {/* Asteroid label - always visible but more highlighted if selected */}
            <Text
                position={[currentPosition[0], currentPosition[1] + (isSelected ? 0.5 : 0.3), currentPosition[2]]}
                fontSize={isSelected ? 0.12 : 0.08}
                color={isSelected ? "#ffffff" : asteroidData.color}
                anchorX="center"
                anchorY="middle"
                renderOrder={1000}
                outlineWidth={isSelected ? 0.01 : 0}
                outlineColor="#000000"
            >
                {asteroidData.name}
            </Text>

            {/* Enhanced selection ring */}
            {isSelected && (
                <>
                    <mesh position={currentPosition}>
                        <ringGeometry args={[asteroidData.size + 0.08, asteroidData.size + 0.12, 32]} />
                        <meshBasicMaterial
                            color={asteroidData.color}
                            transparent={true}
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* Pulsing ring */}
                    <mesh position={currentPosition}>
                        <ringGeometry args={[asteroidData.size + 0.15, asteroidData.size + 0.18, 32]} />
                        <meshBasicMaterial
                            color={asteroidData.color}
                            transparent={true}
                            opacity={0.3 + Math.sin(Date.now() * 0.005) * 0.3}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}

function CameraController({ targetPosition, isFollowing, asteroidSize, resetTrigger }) {
    const { camera, controls } = useThree();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (resetTrigger && controls) {
            // Reset to general view
            const targetPos = new THREE.Vector3(0, 8, 12);
            const targetLookAt = new THREE.Vector3(0, 0, 0);

            setIsTransitioning(true);

            // Smooth animated return
            const animateCamera = () => {
                camera.position.lerp(targetPos, 0.05);
                if (controls && controls.target) {
                    controls.target.lerp(targetLookAt, 0.05);
                    controls.update();
                }

                if (camera.position.distanceTo(targetPos) > 0.1) {
                    requestAnimationFrame(animateCamera);
                } else {
                    setIsTransitioning(false);
                }
            };

            requestAnimationFrame(animateCamera);
        }
    }, [resetTrigger, camera, controls]);

    // Effect to handle when tracking is activated
    useEffect(() => {
        if (isFollowing && targetPosition && controls && controls.target) {
            console.log("Starting tracking towards position:", targetPosition);
            setIsTransitioning(true);

            const asteroidPos = new THREE.Vector3(...targetPosition);
            const baseDistance = Math.max(asteroidSize * 15, 1.0);
            const distance = baseDistance + (asteroidSize > 0.05 ? 2 : 0);

            const offset = new THREE.Vector3(
                distance * 0.7,
                distance * 0.4,
                distance * 0.8
            );

            const targetCameraPosition = asteroidPos.clone().add(offset);

            // Fast animation towards the asteroid
            const animateToAsteroid = () => {
                camera.position.lerp(targetCameraPosition, 0.1);
                controls.target.lerp(asteroidPos, 0.1);
                controls.update();

                const distanceToTarget = camera.position.distanceTo(targetCameraPosition);
                const targetDistance = controls.target.distanceTo(asteroidPos);

                if (distanceToTarget > 0.3 || targetDistance > 0.1) {
                    requestAnimationFrame(animateToAsteroid);
                } else {
                    setIsTransitioning(false);
                    console.log("Tracking successfully initiated");
                }
            };

            animateToAsteroid();
        }
    }, [isFollowing, targetPosition, asteroidSize, controls, camera]);

    useFrame(() => {
        if (isFollowing && targetPosition && !isTransitioning && controls && controls.target) {
            const asteroidPos = new THREE.Vector3(...targetPosition);
            const baseDistance = Math.max(asteroidSize * 15, 1.0);
            const distance = baseDistance + (asteroidSize > 0.05 ? 2 : 0);

            const offset = new THREE.Vector3(
                distance * 0.7,
                distance * 0.4,
                distance * 0.8
            );

            const targetCameraPosition = asteroidPos.clone().add(offset);

            // Continuous smooth tracking
            camera.position.lerp(targetCameraPosition, 0.04);
            controls.target.lerp(asteroidPos, 0.06);
            controls.update();
        }
    });

    return null;
}

function DefenseSatellite({ position, orbitRadius = 3, speed = 0.01 }) {
    const satelliteRef = useRef();

    useFrame((state) => {
        if (satelliteRef.current) {
            const time = state.clock.getElapsedTime() * speed;
            satelliteRef.current.position.x = Math.cos(time) * orbitRadius;
            satelliteRef.current.position.z = Math.sin(time) * orbitRadius;
            satelliteRef.current.position.y = position[1];
            satelliteRef.current.rotation.y = time;
        }
    });

    return (
        <group>
            <Trail
                width={0.3}
                length={8}
                color={new THREE.Color(0, 0.8, 1)}
                attenuation={(t) => t * t}
            >
                <mesh ref={satelliteRef}>
                    <boxGeometry args={[0.08, 0.04, 0.12]} />
                    <meshPhongMaterial
                        color="#00bfff"
                        emissive="#0080ff"
                        emissiveIntensity={0.4}
                    />

                    {/* Paneles solares */}
                    <mesh position={[0, 0, 0.08]}>
                        <boxGeometry args={[0.15, 0.02, 0.04]} />
                        <meshPhongMaterial color="#1a1a2e" />
                    </mesh>
                    <mesh position={[0, 0, -0.08]}>
                        <boxGeometry args={[0.15, 0.02, 0.04]} />
                        <meshPhongMaterial color="#1a1a2e" />
                    </mesh>
                </mesh>
            </Trail>
        </group>
    );
}

function EnhancedEarth() {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const atmosphereRef = useRef();

    // Texturas
    const earthTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg");
    const bumpTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg");
    const specularTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png");
    const cloudsTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png");
    const nightTexture = useTexture("dnb_land_ocean_ice.2012.3600x1800.jpg");

    // Material para atmósfera
    const atmosphereMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
        });
    }, []);

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();

        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = elapsedTime * 0.01;
        }

        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.001;
            const scale = 1 + Math.sin(elapsedTime * 2) * 0.02;
            atmosphereRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* Tierra con mapa diurno + nocturno */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshStandardMaterial
                    map={earthTexture}
                    bumpMap={bumpTexture}
                    bumpScale={0.08}
                    roughness={1}
                    metalness={0}
                    emissiveMap={nightTexture}
                    emissive={new THREE.Color("#ffffff")}
                    emissiveIntensity={1.5} // intensidad de luces nocturnas
                />
            </mesh>

            {/* Capa de nubes */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[2.01, 128, 128]} />
                <meshPhongMaterial
                    map={cloudsTexture}
                    transparent={true}
                    opacity={0.6}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Atmósfera */}
            <mesh ref={atmosphereRef} scale={1.15}>
                <sphereGeometry args={[2, 64, 64]} />
                <primitive object={atmosphereMaterial} attach="material" />
            </mesh>

            {/* Wireframe decorativo */}
            <Sphere args={[2.3, 32, 32]}>
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent={true}
                    opacity={0.05}
                    wireframe={true}
                />
            </Sphere>
        </group>
    );
}

function SunLight() {
    const lightRef = useRef();

    useFrame(() => {
        const now = new Date();
        const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
        const guatemalaHours = (utcHours - 6 + 24) % 24;
        const sunAngle = (guatemalaHours / 24) * Math.PI * 2 - Math.PI / 2;

        const radius = 15;
        const x = Math.cos(sunAngle) * radius;
        const y = Math.sin(sunAngle) * radius * 0.8;
        const z = Math.sin(sunAngle) * radius * 0.3;

        let intensity = guatemalaHours >= 6 && guatemalaHours <= 18 ? 1.5 : 0.3;

        if (lightRef.current) {
            lightRef.current.position.set(x, y, z);
            lightRef.current.intensity = intensity;

            if (guatemalaHours >= 5 && guatemalaHours <= 7) {
                lightRef.current.color.setHex(0xffb347);
            } else if (guatemalaHours >= 17 && guatemalaHours <= 19) {
                lightRef.current.color.setHex(0xff8c69);
            } else if (guatemalaHours >= 7 && guatemalaHours <= 17) {
                lightRef.current.color.setHex(0xffffff);
            } else {
                lightRef.current.color.setHex(0x87ceeb);
            }
        }
    });

    return (
        <>
            <directionalLight
                ref={lightRef}
                intensity={1.2}
                castShadow
                color="#ffffff"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <ambientLight intensity={0.15} color="#404040" />
        </>
    );
}

function AsteroidList({ asteroids, selectedAsteroid, onAsteroidSelect, searchTerm, setSearchTerm }) {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

    const filteredAsteroids = asteroids.filter(asteroid =>
        asteroid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asteroid.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeDescription = (type) => {
        switch (type) {
            case "NEA": return "Near-Earth";
            case "MBA": return "Main Belt";
            case "Trojan": return "Trojan";
            default: return type;
        }
    };

    return (
        <Box
            position="absolute"
            top="20px"
            left="20px"
            bg="rgba(0, 0, 0, 0.9)"
            backdropFilter="blur(15px)"
            borderRadius="xl"
            p={4}
            color="white"
            zIndex={20}
            maxW="320px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
            maxH="80vh"
        >
            <VStack spacing={3} align="stretch">
                <HStack justify="space-between" align="center">
                    <ChakraText fontWeight="bold" fontSize="md" color="cyan.300">
                        🚀 Asteroid List
                    </ChakraText>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onToggle}
                        color="white"
                        p={1}
                    >
                        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
                    </Button>
                </HStack>

                <Collapse in={isOpen}>
                    <VStack spacing={3} align="stretch">
                        <InputGroup size="sm">
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search asteroid..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                bg="rgba(255, 255, 255, 0.1)"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                color="white"
                                _placeholder={{ color: "gray.400" }}
                                _focus={{
                                    bg: "rgba(255, 255, 255, 0.15)",
                                    borderColor: "cyan.300"
                                }}
                            />
                        </InputGroup>

                        <Box maxH="50vh" overflowY="auto" css={{
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '2px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '2px',
                            },
                        }}>
                            <VStack spacing={2} align="stretch">
                                {filteredAsteroids.map((asteroid, index) => (
                                    <Box
                                        key={index}
                                        p={3}
                                        bg={selectedAsteroid?.name === asteroid.name
                                            ? "rgba(0, 191, 255, 0.2)"
                                            : "rgba(255, 255, 255, 0.05)"
                                        }
                                        borderRadius="lg"
                                        border={selectedAsteroid?.name === asteroid.name
                                            ? "2px solid"
                                            : "1px solid"
                                        }
                                        borderColor={selectedAsteroid?.name === asteroid.name
                                            ? "cyan.300"
                                            : "rgba(255, 255, 255, 0.1)"
                                        }
                                        cursor="pointer"
                                        onClick={() => onAsteroidSelect(asteroid)}
                                        transition="all 0.2s"
                                        _hover={{
                                            bg: "rgba(0, 191, 255, 0.1)",
                                            transform: "translateY(-1px)",
                                            borderColor: "cyan.400"
                                        }}
                                    >
                                        <VStack spacing={2} align="start">
                                            <HStack justify="space-between" w="100%">
                                                <ChakraText
                                                    fontWeight="bold"
                                                    fontSize="sm"
                                                    color={selectedAsteroid?.name === asteroid.name ? "cyan.100" : "white"}
                                                >
                                                    {asteroid.name}
                                                </ChakraText>
                                                <HStack spacing={1}>
                                                    <Badge
                                                        size="sm"
                                                        colorScheme={asteroid.hazardous ? "red" : "blue"}
                                                        variant="solid"
                                                        fontSize="xs"
                                                    >
                                                        {asteroid.type}
                                                    </Badge>
                                                    {asteroid.hazardous && (
                                                        <Badge
                                                            size="sm"
                                                            colorScheme="orange"
                                                            variant="outline"
                                                            fontSize="xs"
                                                        >
                                                            PHO
                                                        </Badge>
                                                    )}
                                                </HStack>
                                            </HStack>

                                            <ChakraText fontSize="xs" color="gray.400">
                                                {getTypeDescription(asteroid.type)} • {asteroid.diameter}
                                            </ChakraText>

                                            <HStack justify="space-between" w="100%">
                                                <ChakraText fontSize="xs" color="gray.300">
                                                    Distance: {asteroid.distance.toFixed(1)} AU
                                                </ChakraText>
                                                <ChakraText fontSize="xs" color="gray.300">
                                                    {asteroid.composition}
                                                </ChakraText>
                                            </HStack>

                                            {asteroid.hazardous && (
                                                <HStack spacing={1}>
                                                    <ChakraText fontSize="xs" color="orange.300">
                                                        ⚠️
                                                    </ChakraText>
                                                    <ChakraText fontSize="xs" color="orange.300">
                                                        Next Approach: {asteroid.nextApproach}
                                                    </ChakraText>
                                                </HStack>
                                            )}
                                        </VStack>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>

                        <Box p={2} bg="rgba(255, 255, 255, 0.05)" borderRadius="md">
                            <ChakraText fontSize="xs" color="gray.400" textAlign="center">
                                {filteredAsteroids.length} of {asteroids.length} asteroids
                            </ChakraText>
                        </Box>
                    </VStack>
                </Collapse>
            </VStack>
        </Box>
    );
}

function DetailedAsteroidInfo({ selectedAsteroid, isFollowing, onStopFollowing }) {
    if (!selectedAsteroid) return null;

    const getTypeDescription = (type) => {
        switch (type) {
            case "NEA": return "Near-Earth Asteroid";
            case "MBA": return "Main Belt Asteroid";
            case "Trojan": return "Trojan Asteroid";
            default: return type;
        }
    };

    return (
        <Box
            position="absolute"
            top="20px"
            right="20px"
            bg="rgba(0, 0, 0, 0.9)"
            backdropFilter="blur(15px)"
            borderRadius="xl"
            p={6}
            color="white"
            fontSize="sm"
            zIndex={10}
            maxW="350px"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
            transform={selectedAsteroid ? "translateX(0)" : "translateX(400px)"}
            transition="transform 0.3s ease-in-out"
        >
            <VStack align="start" spacing={3}>
                <HStack justify="space-between" w="100%">
                    <HStack>
                        <Badge
                            colorScheme={selectedAsteroid.hazardous ? "red" : "blue"}
                            variant="solid"
                        >
                            {selectedAsteroid.type}
                        </Badge>
                        {selectedAsteroid.hazardous && (
                            <Badge colorScheme="orange" variant="outline">
                                PHO
                            </Badge>
                        )}
                    </HStack>
                    {isFollowing && (
                        <Button
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={onStopFollowing}
                        >
                            ✕
                        </Button>
                    )}
                </HStack>

                <ChakraText fontWeight="bold" fontSize="lg" color="cyan.300">
                    {selectedAsteroid.name}
                </ChakraText>

                <ChakraText fontSize="xs" color="gray.300">
                    {getTypeDescription(selectedAsteroid.type)}
                </ChakraText>

                <Divider borderColor="rgba(255, 255, 255, 0.2)" />

                <VStack align="start" spacing={2} w="100%">
                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Diameter:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.diameter}</ChakraText>
                    </HStack>

 <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Distance:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.distance.toFixed(1)} AU</ChakraText>
                    </HStack>

                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Orbital Period:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{(selectedAsteroid.period / 365.25).toFixed(1)} years</ChakraText>
                    </HStack>

                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Eccentricity:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.eccentricity.toFixed(3)}</ChakraText>
                    </HStack>

                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Inclination:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.inclination.toFixed(1)}°</ChakraText>
                    </HStack>

                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Composition:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.composition}</ChakraText>
                    </HStack>

                    <HStack justify="space-between" w="100%">
                        <ChakraText fontSize="xs" color="gray.400">Discovery:</ChakraText>
                        <ChakraText fontSize="xs" fontWeight="semibold">{selectedAsteroid.discoveryYear}</ChakraText>
                    </HStack>

                    {selectedAsteroid.nextApproach !== "N/A" && (
                        <HStack justify="space-between" w="100%">
                            <ChakraText fontSize="xs" color="gray.400">Next Approach:</ChakraText>
                            <ChakraText fontSize="xs" fontWeight="semibold" color="orange.300">
                                {selectedAsteroid.nextApproach}
                            </ChakraText>
                        </HStack>
                    )}
                </VStack>

                {selectedAsteroid.hazardous && (
                    <Box
                        w="100%"
                        bg="rgba(255, 165, 0, 0.1)"
                        p={2}
                        borderRadius="md"
                        border="1px solid rgba(255, 165, 0, 0.3)"
                    >
                        <ChakraText fontSize="xs" color="orange.300" fontWeight="semibold">
                            ⚠️ Potentially Hazardous Object
                        </ChakraText>
                        <ChakraText fontSize="xs" color="orange.200">
                            Under constant monitoring by NASA
                        </ChakraText>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}

function SystemControls({ timeScale, setTimeScale, showOrbits, setShowOrbits, onResetView, selectedAsteroid }) {
    return (
        <Box
            position="absolute"
            bottom="20px"
            left="20px"
            bg="rgba(0, 0, 0, 0.8)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            p={4}
            zIndex={10}
            border="1px solid rgba(255, 255, 255, 0.1)"
            marginBottom='100px'
        >
            <VStack spacing={3}>
                <HStack>
                    <ChakraText color="white" fontSize="sm" fontWeight="semibold">Speed:</ChakraText>
                    <Button size="xs" onClick={() => setTimeScale(0.5)} colorScheme={timeScale === 0.5 ? "blue" : "gray"}>0.5x</Button>
                    <Button size="xs" onClick={() => setTimeScale(1)} colorScheme={timeScale === 1 ? "blue" : "gray"}>1x</Button>
                    <Button size="xs" onClick={() => setTimeScale(2)} colorScheme={timeScale === 2 ? "blue" : "gray"}>2x</Button>
                    <Button size="xs" onClick={() => setTimeScale(5)} colorScheme={timeScale === 5 ? "blue" : "gray"}>5x</Button>
                </HStack>

                <HStack spacing={2}>
                    <Button
                        size="sm"
                        onClick={() => setShowOrbits(!showOrbits)}
                        colorScheme={showOrbits ? "blue" : "gray"}
                    >
                        {showOrbits ? "Hide Orbits" : "Show Orbits"}
                    </Button>

                    {selectedAsteroid && (
                        <Button
                            size="sm"
                            onClick={onResetView}
                            colorScheme="green"
                            variant="outline"
                        >
                            General View
                        </Button>
                    )}
                </HStack>
            </VStack>
        </Box>
    );
}

export default function RealisticAsteroidEarthScene() {
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);
    const [timeScale, setTimeScale] = useState(1);
    const [showOrbits, setShowOrbits] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [targetPosition, setTargetPosition] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [asteroidPositions, setAsteroidPositions] = useState({});

    const calculateAsteroidPosition = (asteroid) => {
        const time = Date.now() * 0.0001;
        const { distance, period, eccentricity, inclination } = asteroid;

        const periodYears = period / 365.25;
        const meanAnomaly = (time / periodYears) * 2 * Math.PI;

        let eccentricAnomaly = meanAnomaly;
        for (let i = 0; i < 5; i++) {
            eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
        }

        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const radius = distance * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));

        const x = radius * Math.cos(trueAnomaly);
        const y = radius * Math.sin(trueAnomaly);

        const incRad = (inclination * Math.PI) / 180;
        const finalX = x;
        const finalY = y * Math.cos(incRad);
        const finalZ = y * Math.sin(incRad);

        return [finalX, finalY, finalZ];
    };

    const handleAsteroidClick = (asteroid, position, isUpdate = false) => {
        if (!isUpdate) {
            console.log("Asteroide seleccionado:", asteroid.name);
            setSelectedAsteroid(asteroid);
            setIsFollowing(true);
            setResetTrigger(0);
        }
        setTargetPosition([...position]);
    };

    const handleAsteroidSelect = (asteroid) => {
        console.log("Asteroide seleccionado desde lista:", asteroid.name);
        setSelectedAsteroid(asteroid);
        setResetTrigger(0);
        setSearchTerm("");

        const storedPosition = asteroidPositions[asteroid.name];
        if (storedPosition) {
            console.log("Usando posición almacenada:", storedPosition);
            setTargetPosition(storedPosition);
            setIsFollowing(true);
        } else {
            // Calcular posición como respaldo
            const currentPosition = calculateAsteroidPosition(asteroid);
            console.log("Calculando posición:", currentPosition);
            setTargetPosition(currentPosition);
            setIsFollowing(true);
        }
    };

    const updateAsteroidPosition = (asteroidName, position) => {
        setAsteroidPositions(prev => ({
            ...prev,
            [asteroidName]: [...position]
        }));
    };

    const handleStopFollowing = () => {
        setIsFollowing(false);
        setTargetPosition(null);
        setSelectedAsteroid(null);
        setResetTrigger(Date.now());
    };

    const handleResetView = () => {
        setIsFollowing(false);
        setTargetPosition(null);
        setSelectedAsteroid(null);
        setResetTrigger(Date.now());
    };

    // useEffect(() => {
    //     const randomAsteroid = REAL_ASTEROIDS[Math.floor(Math.random() * REAL_ASTEROIDS.length)];
    //     setSelectedAsteroid(randomAsteroid);
    // }, []);

    return (
        <>
            <Navbar />
            <Box
                width="100vw"
                height="100vh"
                bg="linear-gradient(135deg, #000000 0%, #0a0a2e 30%, #1a1a3a 70%, #2a2a4a 100%)"
                position="relative"
            >
                <AsteroidList
                    asteroids={REAL_ASTEROIDS}
                    selectedAsteroid={selectedAsteroid}
                    onAsteroidSelect={handleAsteroidSelect}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <DetailedAsteroidInfo
                    selectedAsteroid={selectedAsteroid}
                    isFollowing={isFollowing}
                    onStopFollowing={handleStopFollowing}
                />

                <SystemControls
                    timeScale={timeScale}
                    setTimeScale={setTimeScale}
                    showOrbits={showOrbits}
                    setShowOrbits={setShowOrbits}
                    onResetView={handleResetView}
                    selectedAsteroid={selectedAsteroid}
                />

                <Canvas
                    camera={{ position: [0, 8, 12], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                    shadows
                >
                    <CameraController
                        targetPosition={targetPosition}
                        isFollowing={isFollowing}
                        asteroidSize={selectedAsteroid?.size || 0.025}
                        resetTrigger={resetTrigger}
                    />

                    <SunLight />

                    <pointLight
                        position={[-10, -8, -10]}
                        intensity={0.2}
                        color="#4169e1"
                    />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        minDistance={0.1}
                        maxDistance={25}
                        autoRotate={false}
                        enabled={!isFollowing}
                    />

                    <Stars
                        radius={400}
                        depth={80}
                        count={12000}
                        factor={8}
                        saturation={0.4}
                        fade
                        speed={0.3}
                    />

                    <EnhancedEarth />

                    {REAL_ASTEROIDS.map((asteroid, index) => (
                        <RealisticAsteroid
                            key={index}
                            asteroidData={asteroid}
                            timeScale={timeScale}
                            showOrbits={showOrbits}
                            onAsteroidClick={handleAsteroidClick}
                            onPositionUpdate={updateAsteroidPosition}
                            isSelected={selectedAsteroid?.name === asteroid.name}
                        />
                    ))}

                    <DefenseSatellite position={[0, 1, 0]} orbitRadius={3.2} speed={0.015} />
                    <DefenseSatellite position={[0, -0.5, 0]} orbitRadius={3.8} speed={-0.012} />
                    <DefenseSatellite position={[0, 0.8, 0]} orbitRadius={4.5} speed={0.008} />

                    <Text
                        position={[0, -6, 0]}
                        fontSize={0.4}
                        color="#00bfff"
                        anchorX="center"
                        anchorY="middle"
                        fontWeight="bold"
                    >
                        NASA-Based Asteroid Tracking System
                    </Text>
                </Canvas>

                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    pointerEvents="none"
                    background="radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%)"
                    zIndex={1}
                />
            </Box>
        </>

    );
}