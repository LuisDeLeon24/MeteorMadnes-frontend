import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture, Html, Text, Trail } from "@react-three/drei";
import { Box, VStack, Text as ChakraText, Badge, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Asteroid({ position, size = 0.05, speed = 0.002 }) {
    const asteroidRef = useRef();

    useFrame((state) => {
        if (asteroidRef.current) {
            asteroidRef.current.rotation.x += speed;
            asteroidRef.current.rotation.y += speed * 0.5;
            asteroidRef.current.rotation.z += speed * 0.3;

            const time = state.clock.getElapsedTime() * 0.5;
            asteroidRef.current.position.x = position[0] + Math.sin(time) * 0.3;
            asteroidRef.current.position.z = position[2] + Math.cos(time) * 0.3;
        }
    });

    return (
        <mesh ref={asteroidRef} position={position}>
            <dodecahedronGeometry args={[size, 1]} />
            <meshPhongMaterial
                color="#8B7355"
                shininess={10}
                specular="#444444"
            />
        </mesh>
    );
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
                width={0.5}
                length={8}
                color={new THREE.Color(0, 0.6, 1)}
                attenuation={(t) => t * t}
            >
                <mesh ref={satelliteRef}>
                    <boxGeometry args={[0.1, 0.05, 0.15]} />
                    <meshPhongMaterial
                        color="#0ea5e9"
                        emissive="#0ea5e9"
                        emissiveIntensity={0.3}
                    />

                    <mesh position={[0, 0, 0.1]}>
                        <boxGeometry args={[0.2, 0.02, 0.05]} />
                        <meshPhongMaterial color="#1a1a2e" />
                    </mesh>
                    <mesh position={[0, 0, -0.1]}>
                        <boxGeometry args={[0.2, 0.02, 0.05]} />
                        <meshPhongMaterial color="#1a1a2e" />
                    </mesh>
                </mesh>
            </Trail>
        </group>
    );
}

function CityLights() {
    const countries = [
        { name: "USA", lat: 39.8283, lon: -98.5795, population: 331000000 },
        { name: "UK", lat: 55.3781, lon: -3.4360, population: 67800000 },
        { name: "Japan", lat: 36.2048, lon: 138.2529, population: 126000000 },
        { name: "China", lat: 35.8617, lon: 104.1954, population: 1402000000 },
        { name: "India", lat: 20.5937, lon: 78.9629, population: 1380000000 },
        { name: "Brazil", lat: -14.2350, lon: -51.9253, population: 212000000 },
        { name: "Australia", lat: -25.2744, lon: 133.7751, population: 25600000 },
    ];

    const convertToSpherePosition = (lat, lon, radius = 2.02) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        return [x, y, z];
    };

    const isCountryInNight = (lat, lon) => {
        const now = new Date();
        const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
        const localHours = (utcHours + lon / 15) % 24;
        return localHours >= 18 || localHours <= 6;
    };

    return (
        <group>
            {countries.map((country, index) => {
                if (!isCountryInNight(country.lat, country.lon)) return null;

                const lightCount = Math.floor(Math.log10(country.population) * 60);

                return (
                    <group key={index}>
                        {[...Array(lightCount)].map((_, i) => {
                            const jitter = 2.02 + Math.random() * 0.1;

                            const latOffset = (Math.random() - 0.5) * 6;
                            const lonOffset = (Math.random() - 0.5) * 6;

                            const pos = convertToSpherePosition(
                                country.lat + latOffset,
                                country.lon + lonOffset,
                                jitter
                            );

                            const size = 0.003 + Math.random() * 0.006;
                            const emissiveColors = ["#ffd54f", "#fff176", "#ffb74d", "#fff9c4"];
                            const color = emissiveColors[Math.floor(Math.random() * emissiveColors.length)];

                            return (
                                <mesh key={`${index}-light-${i}`} position={pos}>
                                    <sphereGeometry args={[size, 6, 6]} />
                                    <meshStandardMaterial
                                        color={new THREE.Color(color)}
                                        emissive={new THREE.Color(color)}
                                        emissiveIntensity={0.5 + Math.random() * 0.8}
                                    />
                                </mesh>
                            );
                        })}
                    </group>
                );

            })}
        </group>
    );
}


function EnhancedEarth() {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const atmosphereRef = useRef();

    const earthTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg");
    const bumpTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg");
    const specularTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png");
    const cloudsTexture = useTexture("https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png");
    const nightTexture = useTexture("../../../public/dnb_land_ocean_ice.2012.3600x1800.jpg");

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

        if(cloudsRef.current){
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
                    emissiveIntensity={1.5}
                />
            </mesh>

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

            <mesh ref={atmosphereRef} scale={1.15}>
                <sphereGeometry args={[2, 64, 64]} />
                <primitive object={atmosphereMaterial} attach="material" />
            </mesh>

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
    const [sunPosition, setSunPosition] = useState([10, 5, 10]);
    const [lightIntensity, setLightIntensity] = useState(1.2);

    useFrame(() => {
        const now = new Date();
        const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;

        const guatemalaHours = (utcHours - 6 + 24) % 24;

        const sunAngle = (guatemalaHours / 24) * Math.PI * 2 - Math.PI / 2;

        const radius = 15;
        const x = Math.cos(sunAngle) * radius;
        const y = Math.sin(sunAngle) * radius * 0.8;
        const z = Math.sin(sunAngle) * radius * 0.3;

        let intensity;
        if (guatemalaHours >= 6 && guatemalaHours <= 18) {
            intensity = 1.5;
        } else if (guatemalaHours >= 5 && guatemalaHours <= 19) {
            intensity = 0.8;
        } else {
            intensity = 0.3;
        }

        setSunPosition([x, y, z]);
        setLightIntensity(intensity);

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
                intensity={lightIntensity}
                castShadow
                color="#ffffff"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <ambientLight intensity={0.1} color="#404040" />
        </>
    );
}

function TimeInfo() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const guatemalaTime = new Date(currentTime.toLocaleString("en-US", { timeZone: "America/Guatemala" }));
    const utcTime = new Date(currentTime.toUTCString());

    return (
        <Box
            position="absolute"
            top="20px"
            left="20px"
            bg="rgba(0, 0, 0, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            p={4}
            color="white"
            fontSize="sm"
            zIndex={10}
            pointerEvents="auto"
        >
            <VStack align="start" spacing={2}>
                <HStack>
                    <Badge colorScheme="blue">Guatemala</Badge>
                    <ChakraText>{guatemalaTime.toLocaleTimeString()}</ChakraText>
                </HStack>
                <HStack>
                    <Badge colorScheme="gray">UTC</Badge>
                    <ChakraText>{utcTime.toLocaleTimeString()}</ChakraText>
                </HStack>
                <ChakraText fontSize="xs" opacity={0.8}>
                    Iluminación sincronizada en tiempo real
                </ChakraText>
            </VStack>
        </Box>
    );
}

export default function EnhancedEarthScene() {
    return (
        <Box
            width="100vw"
            height="100vh"
            bg="linear-gradient(135deg, #000000 0%, #0f172a 30%, #1e293b 70%, #334155 100%)"
            position="relative"
        >
            <TimeInfo />

            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                <SunLight />

                <pointLight
                    position={[-8, -5, -8]}
                    intensity={0.3}
                    color="#0ea5e9"
                />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={15}
                    autoRotate={false}
                />

                <Stars
                    radius={300}
                    depth={60}
                    count={8000}
                    factor={6}
                    saturation={0.3}
                    fade
                    speed={0.5}
                />

                <EnhancedEarth />

                <DefenseSatellite position={[0, 1, 0]} orbitRadius={3.2} speed={0.015} />
                <DefenseSatellite position={[0, -0.5, 0]} orbitRadius={3.8} speed={-0.012} />
                <DefenseSatellite position={[0, 0.8, 0]} orbitRadius={4.2} speed={0.008} />

                <Asteroid position={[6, 2, -3]} size={0.08} speed={0.003} />
                <Asteroid position={[-4, -1, 5]} size={0.06} speed={0.002} />
                <Asteroid position={[3, -3, 4]} size={0.1} speed={0.004} />

                <Text
                    position={[0, -4, 0]}
                    fontSize={0.3}
                    color="#0ea5e9"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    AstroTracker Defense System
                </Text>
            </Canvas>

            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                pointerEvents="none"
                background="radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%)"
                zIndex={1}
            />
        </Box>
    );
}