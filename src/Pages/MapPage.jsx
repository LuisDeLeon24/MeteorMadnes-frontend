// MapPage.jsx
import Navbar from "../components/Commond/NavBar";
import FullMap from "../components/MapPage/FullMap";
import Sidebar from "../components/MapPage/SideBar"; // ← tu componente Sidebar real

const MapPage = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      {/* Contenedor de mapa + sidebar */}
      <div style={{ flex: 1, position: "relative" }}>
        <FullMap />
        <Sidebar /> {/* Sidebar sobre el mapa, a la derecha */}
      </div>
    </div>
  );
};

export default MapPage;
