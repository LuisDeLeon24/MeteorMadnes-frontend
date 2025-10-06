import { Box, VStack, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Wrench, ZapOff, ShieldCheck, Rocket } from "lucide-react";
import MitigationCard from "../components/MitigacionesPage/MitigationCard";
import Navbar from "../components/Commond/NavBar";
import PNGTuberWidget from "../components/Pngtuber/PNGTuberWidget";
import Footer from "../components/Commond/Footer";

const MotionBox = motion(Box);

const MitigationsPage = () => {
  const mitigations = [
    {
      icon: Wrench,
      title: "Desvío Orbital",
      description:
        "Aplicación de empuje controlado para alterar la trayectoria del asteroide mediante propulsores o impacto cinético.",
      color: "rgba(59,130,246,0.25)",
      data: [
        { label: "Efectividad estimada", value: "85%" },
        { label: "Ventana de acción", value: "3–5 años antes del impacto" },
        { label: "Tecnología usada", value: "Propulsores iónicos, impacto cinético" },
        { label: "Estado actual", value: "En pruebas (NASA DART, ESA Hera)" },
      ],
    },
    {
      icon: ZapOff,
      title: "Fragmentación Controlada",
      description:
        "Destrucción parcial del objeto mediante cargas o láseres dirigidos, reduciendo su masa e impacto potencial.",
      color: "rgba(147,197,253,0.2)",
      data: [
        { label: "Efectividad estimada", value: "60–70%" },
        { label: "Riesgo secundario", value: "Fragmentación no controlada" },
        { label: "Tecnología usada", value: "Explosivos nucleares o láser orbital" },
        { label: "Estado actual", value: "Experimental / teórico" },
      ],
    },
    {
      icon: ShieldCheck,
      title: "Escudo Planetario",
      description:
        "Despliegue de estructuras físicas o campos electromagnéticos para dispersar el impacto en la atmósfera.",
      color: "rgba(74,222,128,0.2)",
      data: [
        { label: "Efectividad estimada", value: "40%" },
        { label: "Cobertura", value: "Local (zonas críticas)" },
        { label: "Requisitos energéticos", value: "Extremadamente altos" },
        { label: "Estado actual", value: "Teórico / conceptual" },
      ],
    },
    {
      icon: Rocket,
      title: "Evacuación Preventiva",
      description:
        "Planificación de desplazamientos masivos fuera de la zona de impacto, combinando tecnología y logística avanzada.",
      color: "rgba(250,204,21,0.2)",
      data: [
        { label: "Efectividad estimada", value: "90% (humana)" },
        { label: "Tiempo mínimo", value: "48 horas antes del impacto" },
        { label: "Costo estimado", value: "Altísimo (billones de USD)" },
        { label: "Estado actual", value: "Operacional en planes civiles" },
      ],
    },
  ];

  return (
    <>
        <Navbar />
        <Box
      minH="100vh"
      bg="linear-gradient(180deg, #030712 0%, #0f172a 100%)"
      py={{ base: 10, md: 20 }}
      px={{ base: 6, md: 16 }}
    >
      <VStack spacing={12} textAlign="center">
        <Heading
          size="2xl"
          bgGradient="linear(to-r, #60a5fa, #93c5fd)"
          bgClip="text"
        >
          Estrategias de Mitigación
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          width="100%"
          maxW="1200px"
        >
          {mitigations.map((m, i) => (
            <MitigationCard key={i} {...m} />
          ))}
        </SimpleGrid>

      </VStack>
    </Box>
      <PNGTuberWidget />
        <Footer />
    </>
  );
};

export default MitigationsPage;
