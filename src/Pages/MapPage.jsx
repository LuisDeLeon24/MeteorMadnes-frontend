import { useState } from "react";
import Navbar from "../components/Commond/NavBar";
import { FullMap } from "../components/MapPage/FullMap";
import Sidebar from "../components/MapPage/SideBar";
import { DEMO_COUNTRY, DEMO_PLACE_NAME } from "../demo/demoData";

const MapPage = () => {
  const [countryCode, setCountryCode] = useState(DEMO_COUNTRY);
  const [locationDemo, setLocationDemo] = useState(true);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" }}>
      <Navbar />
      <div id="main" style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <FullMap
          setCountryCode={setCountryCode}
          setLocationDemo={setLocationDemo}
          initialQuery={DEMO_PLACE_NAME}
          initialPlaceDemo
        />
        <Sidebar countryCode={countryCode} locationDemo={locationDemo} initialDemo />
      </div>
    </div>
  );
};

export default MapPage;
