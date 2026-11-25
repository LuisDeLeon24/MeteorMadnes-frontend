import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Navbar from "../components/Commond/NavBar";
import Footer from "../components/Commond/Footer";
import { palette } from "../theme";

const Section = ({ title, children }) => (
  <Stack as="section" spacing={3} pt={8} borderTop="1px solid" borderColor={palette.line}>
    <Heading as="h2" fontSize="22px" fontWeight={500} letterSpacing="-0.03em">
      {title}
    </Heading>
    <Stack spacing={3}>{children}</Stack>
  </Stack>
);

const P = ({ children }) => (
  <Text color={palette.quiet} fontSize="16px" lineHeight="1.65" maxW="68ch">
    {children}
  </Text>
);

const HowItWorksPage = () => (
  <>
    <Navbar />
    <Box id="main" bg={palette.ink} py={{ base: 16, md: 24 }}>
      <Container maxW="760px" px={{ base: 4, md: 6 }}>
        <Stack spacing={4}>
          <Heading as="h1" fontSize={{ base: "36px", md: "48px" }} fontWeight={500} letterSpacing="-0.04em">
            How it works
          </Heading>
          <P>
            This is the path from a map click to the impact numbers, as implemented in this frontend and in MeteorMadnes-backend. It does not describe a step the code does not run.
          </P>
        </Stack>

        <Section title="1. Place">
          <P>
            The simulation map is Leaflet with OpenStreetMap tiles. A search or a click calls the Nominatim reverse and search endpoints. The country code in that response is the `country` sent to the impact summary.
          </P>
        </Section>

        <Section title="2. Horizons ephemeris">
          <P>
            The sidebar requests `GET /MeteorMadnes/fetch/horizons/:id` on the backend. `fetchHorizonsData` calls JPL Horizons at `ssd.jpl.nasa.gov/api/horizons.api` with the id as `COMMAND`, observer center `500@0`, a window of 30 days from today, a 1-day step, and quantities `1,20,23,24`.
          </P>
          <P>
            `parseAsteroidData` reads the returned text. It keeps the target name, `GM`, `RAD`, `ROTPER`, `H`, `G`, `B-V`, albedo, and spectral type. It keeps orbital elements `EC`, `A`, `QR`, `ADIST`, `IN`, `OM`, and `W` when those tokens are on a line. Rows between `$$SOE` and `$$EOE` become ephemeris entries with date, time, right ascension, declination, `delta`, `deldot`, solar elongation, and `STO`.
          </P>
        </Section>

        <Section title="3. Physical calculation">
          <P>
            POST /MeteorMadnes/formulas/datosCompletosAsteroide receives the asteroid id and calls fetchHorizonsData again. Mass is GM divided by 6.6743e-20 when GM is present. Otherwise the mass is a sphere at the Horizons radius, converted from kilometres to metres, and a density of 3000 kg/m³. Cross-sectional area is πr².
          </P>
          <P>
            Speed uses the first ephemeris row: `velRel` if it exists, otherwise `deldot`. The parser stores `deldot` and does not set `velRel`, so the value used is `deldot`. Impact speed is the square root of that value squared plus 11.2², in km/s. Kinetic energy is ½mv². Megatons are that energy in joules divided by 4.184×10¹⁵.
          </P>
          <P>
            The same handler also returns luminosity from a mass-loss fraction of 0.01 and a luminous efficiency of 0.1, unless the request overrides them. Drag uses a coefficient of 1.3 and an air density of 0.001225 kg/m³. Fragmentation height uses a 7000 m scale height and a 10⁶ Pa threshold. Seismic energy is 1% of the kinetic energy.
          </P>
        </Section>

        <Section title="4. Crater area in the browser">
          <P>
            After the physical response, `estimateImpactAreaFromHORIZONS` builds a second mass. It uses the Horizons radius and a density of 3000 kg/m³, or 7800 kg/m³ only if `basicInfo.type` is `"metallic"`. The Horizons parser does not set `type`. Velocity is the physical response’s `velocityKmS` when the sidebar passes it.
          </P>
          <P>
            Crater diameter follows one of two power laws, split at a radius of 500 m. The affected area is the disk of that crater. The sidebar passes 1,000,000 km² as the cap. That cap is a constant in the call, not the country’s land area.
          </P>
        </Section>

        <Section title="5. Country summary">
          <P>
            `POST /MeteorMadnes/formulas/resumenImpacto` takes `country` and `areaAfectadaKm2`. It loads World Bank series for 2020–2023, unless the body sends another `date`. The indicators are population density `EN.POP.DNST`, hospital beds per 1,000 `SH.MED.BEDS.ZS`, total population `SP.POP.TOTL`, GDP `NY.GDP.MKTP.CD`, urban population `SP.URB.TOTL`, and GDP per capita `NY.GDP.PCAP.CD`. Missing beds default to 1.5. Missing GDP per capita defaults to 5000.
          </P>
          <P>
            Affected people are density times area. The direct-death factor is the minimum of 0.05 × (10 / beds per thousand) and 0.3. Direct deaths are affected people times that factor. The indirect factor is the minimum of 0.2 × (10 / beds per thousand) and 0.25. Indirect deaths are affected people times that factor.
          </P>
          <P>
            GDP loss is national GDP times the minimum of affected people over national population, and 1. The code’s urban value per km² is GDP per capita times 1000, because urban population cancels in `(gdp per capita × urban population) / (urban population / 1000)`. Economic loss is 0.3 times area times that value. The percentage is direct plus indirect deaths, divided by national population, times 100.
          </P>
          <P>
            The formula hook posts the physical endpoint and the summary endpoint together. The sidebar calls that hook once for the physical fields and again after the area exists, with the country and the area. The numbers on the result panel are those two responses plus the browser area estimate.
          </P>
        </Section>

        <Section title="6. The other panels">
          <P>
            The NASA panel does not use the backend. The browser calls `api.nasa.gov/neo/rest/v1`: a browse of 10 objects, then a lookup by asteroid id.
          </P>
          <P>
            IAU rows come from the MongoDB collection `neocp_observations`. Search is `GET /MeteorMadnes/PNeos/search/:tempDesig`. The list without a search term is an aggregate sample of 5 documents. Fields are the temporary designation, score, magnitudes, discovery date, position, observation count, arc, and days not seen.
          </P>
          <P>
            The assistant is a separate `POST` to OpenRouter’s chat completions endpoint, model `openai/gpt-3.5-turbo`. Its reply is not an input to the impact numbers.
          </P>
        </Section>

        <Section title="7. When a call does not answer">
          <P>
            If a call fails, returns an error, or is still pending after 12 seconds, or if the assistant has no key, the screen uses fixed records stored in this app. The physical and country stand-ins are run through the equations above. A “Demo data” label is shown in that case. A successful response is shown as returned, without that label.
          </P>
        </Section>
      </Container>
    </Box>
    <Footer />
  </>
);

export default HowItWorksPage;
