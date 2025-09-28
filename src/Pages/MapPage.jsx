import { useState } from "react";
import Navbar from "../components/Commond/NavBar";
import { FullMap } from "../components/MapPage/FullMap";
import Sidebar from "../components/MapPage/SideBar";

const MapPage = () => {
  const [countryCode, setCountryCode] = useState(null); // estado compartido

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      {/* Contenedor de mapa + sidebar */}
      <div style={{ flex: 1, position: "relative" }}>
        <FullMap setCountryCode={setCountryCode} />
        <Sidebar countryCode={countryCode} />
      </div>
    </div>
  );
};

export default MapPage;
