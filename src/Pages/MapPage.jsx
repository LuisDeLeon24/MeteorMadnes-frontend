import { useState } from "react";
import Navbar from "../components/Commond/NavBar";
import { FullMap } from "../components/MapPage/FullMap";
import Sidebar from "../components/MapPage/SideBar";

const MapPage = () => {
  const [countryCode, setCountryCode] = useState(null);
  const [locationDemo, setLocationDemo] = useState(false);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" }}>
      <Navbar />
      <div id="main" style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <FullMap setCountryCode={setCountryCode} setLocationDemo={setLocationDemo} />
        <Sidebar countryCode={countryCode} locationDemo={locationDemo} />
      </div>
    </div>
  );
};

export default MapPage;
