import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Commond/NavBar.jsx';
import Footer from '../components/Commond/Footer.jsx';
import {
  Box,
  Button,
  Select,
  HStack,
  VStack,
  Text,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FITS } from '../Hooks/fits.js';
import FileInput from '../components/FitPage/FileInput.jsx';

const FitsPage = () => {
  const [fitsInstance, setFitsInstance] = useState(null);
  const [cursorLoc, setCursorLoc] = useState('[]');
  const [stretch, setStretch] = useState('linear');
  const [contrasts, setContrasts] = useState([0, 0, 0]);
  const [roisEnabled, setRoisEnabled] = useState([true, false, true]);
  const [roiStats, setRoiStats] = useState(['', '', '']);
  const [lastMouseLoc, setLastMouseLoc] = useState(null);

  const fitsDivRef = useRef(null);
  const glassCanvasRef = useRef(null);
  const histoCanvasRefs = useRef([]);
  const NROIS = 2;

  useEffect(() => {
    if (fitsDivRef.current) {
      try {
        const divElement = fitsDivRef.current;
        if (!divElement.style.width) divElement.style.width = '800px';
        if (!divElement.style.height) divElement.style.height = '800px';

        const fits = new FITS(divElement, NROIS);
        fits.setStretch(stretch);
        fits.addMouseHandler(onMouse);
        fits.addROIChangedHandler(onROIChange);

        if (glassCanvasRef.current) fits.addGlassCanvas(glassCanvasRef.current);

        for (let i = 1; i <= NROIS; i++) {
          const state = i === NROIS;
          fits.enableROI(i, state);
        }

        setFitsInstance(fits);

        return () => {
          if (fits.header_win) fits.header_win.close();
        };
      } catch (error) {
        console.error('Error inicializando FITS:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (fitsInstance) {
      const filePath = '/fits/NEOS_SCI_2025024001057_cor.fits';
      fetch(filePath)
        .then(res => {
          if (!res.ok) throw new Error('No se pudo cargar el archivo');
          return res.arrayBuffer();
        })
        .then(buffer => {
          try {
            fitsInstance.setNewImage('NEOS_SCI_2025024001057_cor.fits', buffer);
            fitsInstance.showHeader(false);

            setTimeout(() => {
              fitsInstance.rois.forEach((roi, index) => {
                const canvasElement = histoCanvasRefs.current[index];
                if (canvasElement && roi.stats) {
                  fitsInstance.displayHistogram(roi, canvasElement);
                }
              });
            }, 100);
          } catch (err) {
            console.error('Error procesando imagen FITS:', err);
          }
        })
        .catch(err => {
          console.error('Error cargando archivo FITS:', err);
        });
    }
  }, [fitsInstance]);

  const showHeader = () => { if (fitsInstance) fitsInstance.showHeader(true); };
  const onMouse = (mouseloc) => {
    if (!fitsInstance) return;
    const fitsLoc = fitsInstance.image2FITS(mouseloc);
    setLastMouseLoc(fitsLoc);
    showMouseLoc(fitsLoc);
  };
  const showMouseLoc = (loc) => {
    if (!fitsInstance || !loc) return;
    const pixel = fitsInstance.getPixelAtFITS(loc);
    setCursorLoc(`[${pad(loc.x, 5)},${pad(loc.y, 5)}] = ${pad(pixel.toFixed(1), 9)}`);
  };
  const onROIChange = (roi) => {
    if (!fitsInstance) return;
    const title = roi.z === 0 ? 'Image' : `ROI ${roi.z}`;
    const stats = formatStats(roi, title);
    setRoiStats(prev => { const newStats = [...prev]; newStats[roi.z] = stats; return newStats; });
    const canvasElement = histoCanvasRefs.current[roi.z];
    if (canvasElement) fitsInstance.displayHistogram(roi, canvasElement);
  };
  const formatStats = (roi, title) => {
    if (!fitsInstance || !roi.stats) return '';
    const stats = roi.stats;
    const fitsCoords = fitsInstance.image2FITS(roi);
    const minatCoords = fitsInstance.image2FITS(roi.stats.minat);
    const maxatCoords = fitsInstance.image2FITS(roi.stats.maxat);
    return `${title}: ${pad(roi.width, 4)} x ${pad(roi.height, 5)} @ [${pad(fitsCoords.x, 5)}, ${pad(fitsCoords.y, 5)}]
Min ${pad(stats.min.toFixed(1), 11)}    @ [${pad(minatCoords.x.toFixed(0), 5)}, ${pad(minatCoords.y.toFixed(0), 5)}]
Max ${pad(stats.max.toFixed(1), 11)}    @ [${pad(maxatCoords.x.toFixed(0), 5)}, ${pad(maxatCoords.y.toFixed(0), 5)}]
Mean ${pad(stats.mean.toFixed(1), 10)}  StdDev ${pad(stats.stddev.toFixed(1), 12)}
Median ${pad(stats.median.toFixed(1), 8)} Sum ${pad(stats.sum.toFixed(1), 15)}`;
  };
  const pad = (s, n) => { s = s.toString(); const nadd = n - s.length; return ' '.repeat(Math.max(0, nadd)) + s; };
  const handleContrastChange = (index, value) => {
    if (!fitsInstance) return;
    setContrasts(prev => { const newContrasts = [...prev]; newContrasts[index] = value; return newContrasts; });
    fitsInstance.setContrast(fitsInstance.rois[index], value / 100);
    setTimeout(() => {
      const canvasElement = histoCanvasRefs.current[index];
      const roi = fitsInstance.rois[index];
      if (canvasElement && roi && roi.stats) fitsInstance.displayHistogram(roi, canvasElement);
      if (index === NROIS && histoCanvasRefs.current[0]) {
        const imageRoi = fitsInstance.rois[0];
        if (imageRoi && imageRoi.stats) fitsInstance.displayHistogram(imageRoi, histoCanvasRefs.current[0]);
      }
    }, 50);
  };
  const handleStretchChange = (value) => {
    setStretch(value);
    if (fitsInstance) {
      fitsInstance.setStretch(value);
      setTimeout(() => {
        if (fitsInstance.rois) {
          fitsInstance.rois.forEach((roi, index) => {
            const canvasElement = histoCanvasRefs.current[index];
            if (canvasElement && roi && roi.stats) fitsInstance.displayHistogram(roi, canvasElement);
          });
        }
      }, 50);
    }
  };
  const handleROIToggle = (roiN, checked) => {
    if (fitsInstance) {
      fitsInstance.enableROI(roiN, checked);
      setRoisEnabled(prev => { const newEnabled = [...prev]; newEnabled[roiN] = checked; return newEnabled; });
      setTimeout(() => {
        const canvasElement = histoCanvasRefs.current[roiN];
        const roi = fitsInstance.rois[roiN];
        if (canvasElement && roi && roi.stats) fitsInstance.displayHistogram(roi, canvasElement);
      }, 50);
    }
  };

  return (
    <>
      <Navbar />
      <Box p={6} bg="#1e1f3f" minH="100vh">
        <Box textAlign="center" mb={4}>
          <Text
            as="a"
            href="https://data.asc-csa.gc.ca/users/OpenData_DonneesOuvertes/pub/NEOSSAT/ASTRO/"
            target="_blank"
            rel="noopener noreferrer"
            color="#0ea5e9"
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="bold"
            textDecoration="underline"
            _hover={{ color: "#3b82f6", textDecoration: "none" }}
          >
            Accede a más imágenes aquí
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "320px minmax(600px, 1fr) 320px" }} gap={4}>
          {/* Columna izquierda */}
          <GridItem w="full">
            <VStack w="full" spacing={{ base: 3, md: 4 }} align="stretch" borderRadius="lg" bg="#25274d" boxShadow="0 0 20px #0ea5e9" p={4}>
              <FileInput fits={fitsInstance} w="full" />
              <HStack spacing={{ base: 2, md: 2 }} w="full" wrap="wrap">
                <Button
                  bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                  color="white"
                  _hover={{ bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  borderRadius="2xl"
                  onClick={showHeader}
                  flex="1"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Header
                </Button>
                <Select
                  value={stretch}
                  onChange={(e) => handleStretchChange(e.target.value)}
                  bg="#0ea5e9"
                  color="white"
                  _hover={{ bg: "#3b82f6" }}
                  borderRadius="2xl"
                  flex="1"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <option value="linear">Linear</option>
                  <option value="square">Square</option>
                  <option value="sqrt">Square root</option>
                </Select>
              </HStack>

              <Text fontFamily="monospace" fontSize="xs" color="white" whiteSpace="nowrap">
                {cursorLoc}
              </Text>

              <Box border="2px solid #0ea5e9" borderRadius="md" p={2} w="full">
                <canvas
                  ref={glassCanvasRef}
                  width={280}
                  height={150}
                  style={{ width: "100%", height: "150px", borderRadius: "6px", background: "#1b1c35", display: "block" }}
                  title="Lupa: vista ampliada del área bajo el cursor"
                />
                <Text fontSize="xs" color="#0ea5e9" mt={1} textAlign="center">
                  Lupa: vista ampliada del área bajo el cursor
                </Text>
              </Box>

              <Box bg="#1b1c35" p={2} borderRadius="md">
                <HStack>
                  <Slider
                    value={contrasts[0]}
                    onChange={(val) => handleContrastChange(0, val)}
                    min={0}
                    max={100}
                    flex="1"
                  >
                    <SliderTrack bg="#0a0b1f">
                      <SliderFilledTrack bg="#0ea5e9" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontFamily="monospace" w="50px" color="white">
                    {contrasts[0]}
                  </Text>
                </HStack>
              </Box>

              <Box w="full" p={0}>
                <canvas
                  ref={(el) => (histoCanvasRefs.current[0] = el)}
                  width={280}
                  height={100}
                  style={{ width: "100%", height: "100px", display: "block", borderRadius: "6px", background: "#1b1c35" }}
                  title="Histograma de la imagen completa. Línea negra: píxel negro; magenta: mediana; verde: media; blanca: píxel blanco"
                />
                <Text fontSize="xs" color="#0ea5e9" mt={1} mb={2}>
                  Histograma: Negro=mín, Magenta=mediana, Verde=media, Blanco=máx
                </Text>
                <Text fontFamily="monospace" fontSize="xs" whiteSpace="pre-wrap" color="white" mt={2} minH="80px">
                  {roiStats[0]}
                </Text>
              </Box>
            </VStack>
          </GridItem>

          {/* Columna central - Imagen FITS */}
          <GridItem>
            <Box
              ref={fitsDivRef}
              w={{ base: "100%", md: "800px" }}
              h={{ base: "300px", md: "800px" }}
              minW="300px"
              minH="200px"
              position="center"
              resize="both"
              overflow="auto"
              pr="17px"
              pb="17px"
              border="2px solid #0ea5e9"
              borderRadius="md"
              bg="#1b1c35"
            />
          </GridItem>

          {/* Columna derecha */}
          <GridItem w="full">
            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
              {[2, 1].map((roiNum) => (
                <Box key={roiNum} border="2px solid #0ea5e9" borderRadius="lg" bg="#25274d" p={3} w="full">
                  <HStack spacing={3} flexWrap="wrap">
                    <Slider
                      value={contrasts[roiNum]}
                      onChange={(val) => handleContrastChange(roiNum, val)}
                      min={0}
                      max={100}
                      flex="1"
                    >
                      <SliderTrack bg="#0a0b1f">
                        <SliderFilledTrack bg="#0ea5e9" />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text fontFamily="monospace" w="50px" color="white">
                      {contrasts[roiNum]}
                    </Text>
                    <HStack>
                      <Text fontSize="sm" color="white">On:</Text>
                      <Checkbox
                        isChecked={roisEnabled[roiNum]}
                        onChange={(e) => handleROIToggle(roiNum, e.target.checked)}
                      />
                    </HStack>
                  </HStack>

                  <Box mt={3} w="full" p={0}>
                    <canvas
                      ref={(el) => (histoCanvasRefs.current[roiNum] = el)}
                      width={280}
                      height={100}
                      style={{ width: "100%", height: "100px", display: "block", borderRadius: "6px", background: "#1b1c35" }}
                      title={`Histograma de ROI ${roiNum}. Línea negra: píxel negro; magenta: mediana; verde: media; blanca: píxel blanco`}
                    />
                    <Text fontSize="xs" color="#0ea5e9" mt={1} mb={2}>
                      Histograma ROI {roiNum}: Negro=mín, Magenta=mediana, Verde=media, Blanco=máx
                    </Text>
                  </Box>

                  <Text fontFamily="monospace" fontSize="xs" whiteSpace="pre-wrap" color="white" mt={2} minH="80px">
                    {roiStats[roiNum]}
                  </Text>
                </Box>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default FitsPage;
