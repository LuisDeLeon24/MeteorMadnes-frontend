import { useState } from "react";
import Navbar from "../components/Commond/NavBar";
import { FullMap } from "../components/MapPage/FullMap";
import Sidebar from "../components/MapPage/SideBar";

const MapPage = () => {
  const [countryCode, setCountryCode] = useState(null);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" }}>
      <Navbar />
      <div id="main" style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <FullMap setCountryCode={setCountryCode} />
        <Sidebar countryCode={countryCode} />
      </div>
    </div>
  );
};

export default MapPage;
