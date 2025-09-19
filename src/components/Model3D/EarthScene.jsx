import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture, Text, Trail } from "@react-three/drei";
import { Box, VStack, Text as ChakraText, Badge, HStack, Button } from "@chakra-ui/react";
import * as THREE from "three";

// Controles de cámara mejorados con zoom hacia cursor
function EnhancedOrbitControls() {
    const { camera, gl, scene } = useThree();
    const controlsRef = useRef();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    useEffect(() => {
        const handleWheel = (event) => {
            if (!controlsRef.current) return;

            event.preventDefault();

            // Obtener posición del mouse
            const rect = gl.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Crear raycaster desde la cámara hacia el cursor
            raycaster.setFromCamera(mouse, camera);

            // Buscar intersecciones con objetos en la escena
            const intersects = raycaster.intersectObjects(scene.children, true);

            let targetPoint = null;
            if (intersects.length > 0) {
                targetPoint = intersects[0].point;
            } else {
                // Si no hay intersección, usar un punto en el espacio
                const distance = camera.position.distanceTo(controlsRef.current.target);
                targetPoint = raycaster.ray.at(distance, new THREE.Vector3());
            }

            // Calcular factor de zoom
            const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
            const direction = new THREE.Vector3().subVectors(camera.position, targetPoint);
            const newDistance = direction.length() * zoomFactor;

            // Limitar distancia
            const clampedDistance = Math.max(3, Math.min(30, newDistance));
            direction.normalize().multiplyScalar(clampedDistance);

            // Establecer nueva posición de cámara
            camera.position.copy(targetPoint).add(direction);

            // Actualizar target de los controles suavemente
            controlsRef.current.target.lerp(targetPoint, 0.1);
            controlsRef.current.update();
        };

        gl.domElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            gl.domElement.removeEventListener('wheel', handleWheel);
        };
    }, [camera, gl, scene]);

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false} // Desactivar zoom por defecto
            enablePan={true}
            minDistance={3}
            maxDistance={30}
            autoRotate={false}
            dampingFactor={0.05}
            enableDamping={true}
        />
    );
}
// Datos realistas de asteroides basados en NASA
const REAL_ASTEROIDS = [
    // Near-Earth Asteroids (NEA)
    { name: "Apophis", type: "NEA", size: 0.025, distance: 5.2, period: 323.6, eccentricity: 0.19, inclination: 3.33, color: "#8B4513" },
    { name: "Bennu", type: "NEA", size: 0.015, distance: 4.8, period: 436.6, eccentricity: 0.20, inclination: 6.03, color: "#2F4F4F" },
    { name: "Didymos", type: "NEA", size: 0.020, distance: 5.1, period: 770.1, eccentricity: 0.38, inclination: 3.41, color: "#696969" },

    // Main Belt Asteroids (MBA)
    { name: "Ceres", type: "MBA", size: 0.080, distance: 8.5, period: 1679.8, eccentricity: 0.08, inclination: 10.6, color: "#A0522D" },
    { name: "Vesta", type: "MBA", size: 0.045, distance: 7.8, period: 1325.4, eccentricity: 0.09, inclination: 7.14, color: "#D2691E" },
    { name: "Pallas", type: "MBA", size: 0.042, distance: 8.2, period: 1686.5, eccentricity: 0.23, inclination: 34.8, color: "#708090" },
    { name: "Hygiea", type: "MBA", size: 0.035, distance: 9.1, period: 2029.2, eccentricity: 0.12, inclination: 3.84, color: "#8FBC8F" },

    // Smaller Main Belt Objects
    { name: "Eros", type: "MBA", size: 0.018, distance: 6.8, period: 643.2, eccentricity: 0.22, inclination: 10.8, color: "#CD853F" },
    { name: "Mathilde", type: "MBA", size: 0.025, distance: 7.6, period: 1269.3, eccentricity: 0.27, inclination: 6.7, color: "#556B2F" },
    { name: "Gaspra", type: "MBA", size: 0.012, distance: 6.2, period: 1199.1, eccentricity: 0.17, inclination: 4.1, color: "#BC8F8F" },

    // Trojan Asteroids
    { name: "Hektor", type: "Trojan", size: 0.035, distance: 12.8, period: 4307.8, eccentricity: 0.02, inclination: 18.2, color: "#4682B4" },
    { name: "Patroclus", type: "Trojan", size: 0.028, distance: 12.6, period: 4285.9, eccentricity: 0.14, inclination: 22.0, color: "#5F9EA0" },
];

function RealisticAsteroid({ asteroidData, timeScale = 1, showOrbits = true }) {
    const asteroidRef = useRef();
    const orbitRef = useRef();
    const [currentPosition, setCurrentPosition] = useState([0, 0, 0]);

    // Función para calcular posición orbital realista
    const calculateOrbitalPosition = (time, asteroid) => {
        const { distance, period, eccentricity, inclination } = asteroid;

        // Convertir período de días a años para cálculos
        const periodYears = period / 365.25;

        // Anomalía media (posición en la órbita basada en tiempo)
        const meanAnomaly = (time * timeScale / periodYears) * 2 * Math.PI;

        // Anomalía excéntrica (aproximación para órbitas elípticas)
        let eccentricAnomaly = meanAnomaly;
        for (let i = 0; i < 5; i++) {
            eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
        }

        // Anomalía verdadera
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

        // Radio vector (distancia al sol en la órbita elíptica)
        const radius = distance * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));

        // Coordenadas en el plano orbital
        const x = radius * Math.cos(trueAnomaly);
        const y = radius * Math.sin(trueAnomaly);

        // Aplicar inclinación orbital
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

            // Rotación del asteroide
            asteroidRef.current.rotation.x += 0.001;
            asteroidRef.current.rotation.y += 0.002;
            asteroidRef.current.rotation.z += 0.0005;
        }
    });

    // Crear geometría basada en el tipo de asteroide
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
            {/* Órbita del asteroide */}
            <mesh>
                <ringGeometry args={[asteroidData.distance - 0.1, asteroidData.distance + 0.1, 64]} />
                <meshBasicMaterial
                    color={asteroidData.color}
                    transparent={true}
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* El asteroide */}
            <Trail
                width={0.2}
                length={20}
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
                    />
                </mesh>
            </Trail>

            {/* Etiqueta del asteroide */}
            <Text
                position={[currentPosition[0], currentPosition[1] + 0.3, currentPosition[2]]}
                fontSize={0.08}
                color={asteroidData.color}
                anchorX="center"
                anchorY="middle"
                renderOrder={1000}
            >
                {asteroidData.name}
            </Text>
        </group>
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
    const nightTexture = useTexture("../../../public/dnb_land_ocean_ice.2012.3600x1800.jpg");

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

function AsteroidInfo({ selectedAsteroid }) {
    if (!selectedAsteroid) return null;

    return (
        <Box
            position="absolute"
            top="20px"
            right="20px"
            bg="rgba(0, 0, 0, 0.8)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            p={4}
            color="white"
            fontSize="sm"
            zIndex={10}
            maxW="300px"
        >
            <VStack align="start" spacing={2}>
                <HStack>
                    <Badge colorScheme="blue">{selectedAsteroid.type}</Badge>
                    <ChakraText fontWeight="bold">{selectedAsteroid.name}</ChakraText>
                </HStack>
                <ChakraText fontSize="xs">
                    <strong>Distancia:</strong> {selectedAsteroid.distance.toFixed(1)} AU
                </ChakraText>
                <ChakraText fontSize="xs">
                    <strong>Período orbital:</strong> {(selectedAsteroid.period / 365.25).toFixed(1)} años
                </ChakraText>
                <ChakraText fontSize="xs">
                    <strong>Excentricidad:</strong> {selectedAsteroid.eccentricity.toFixed(3)}
                </ChakraText>
                <ChakraText fontSize="xs">
                    <strong>Inclinación:</strong> {selectedAsteroid.inclination.toFixed(1)}°
                </ChakraText>
            </VStack>
        </Box>
    );
}

function SystemControls({ timeScale, setTimeScale, showOrbits, setShowOrbits }) {
    return (
        <Box
            position="absolute"
            bottom="20px"
            left="20px"
            bg="rgba(0, 0, 0, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            p={4}
            zIndex={10}
        >
            <VStack spacing={3}>
                <HStack>
                    <ChakraText color="white" fontSize="sm">Velocidad:</ChakraText>
                    <Button size="xs" onClick={() => setTimeScale(0.5)}>0.5x</Button>
                    <Button size="xs" onClick={() => setTimeScale(1)}>1x</Button>
                    <Button size="xs" onClick={() => setTimeScale(2)}>2x</Button>
                    <Button size="xs" onClick={() => setTimeScale(5)}>5x</Button>
                </HStack>
                <Button
                    size="sm"
                    onClick={() => setShowOrbits(!showOrbits)}
                    colorScheme={showOrbits ? "blue" : "gray"}
                >
                    {showOrbits ? "Ocultar Órbitas" : "Mostrar Órbitas"}
                </Button>
            </VStack>
        </Box>
    );
}

export default function RealisticAsteroidEarthScene() {
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);
    const [timeScale, setTimeScale] = useState(1);
    const [showOrbits, setShowOrbits] = useState(true);

    useEffect(() => {
        // Seleccionar un asteroide aleatorio para mostrar info
        const randomAsteroid = REAL_ASTEROIDS[Math.floor(Math.random() * REAL_ASTEROIDS.length)];
        setSelectedAsteroid(randomAsteroid);
    }, []);

    return (
        <Box
            width="100vw"
            height="100vh"
            bg="linear-gradient(135deg, #000000 0%, #0a0a2e 30%, #1a1a3a 70%, #2a2a4a 100%)"
            position="relative"
        >
            <AsteroidInfo selectedAsteroid={selectedAsteroid} />
            <SystemControls
                timeScale={timeScale}
                setTimeScale={setTimeScale}
                showOrbits={showOrbits}
                setShowOrbits={setShowOrbits}
            />

            <Canvas
                camera={{ position: [0, 8, 12], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                <SunLight />

                <pointLight
                    position={[-10, -8, -10]}
                    intensity={0.2}
                    color="#4169e1"
                />

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={6}
                    maxDistance={25}
                    autoRotate={false}
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

                {/* Asteroides realistas */}
                {REAL_ASTEROIDS.map((asteroid, index) => (
                    <RealisticAsteroid
                        key={index}
                        asteroidData={asteroid}
                        timeScale={timeScale}
                    />
                ))}

                {/* Satélites de defensa */}
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
    );
}