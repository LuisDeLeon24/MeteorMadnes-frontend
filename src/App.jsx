import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNEOsApi } from './Hooks/useNEOsApi'
import { useHORIZONs } from './Hooks/useHORIZONs' // <-- importamos el hook
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { data: neosData, loading: neosLoading, error: neosError } = useNEOsApi();
  const { data: horizonsData, loading: horizonsLoading, error: horizonsError } = useHORIZONs(); // <-- usamos el hook

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      {/* NEOs Section */}
      <h2>Near Earth Objects (NEOs) from NASA API</h2>
      {neosLoading && <p>Loading data...</p>}
      {neosError && <p>Error: {neosError}</p>}
      {neosData && (
        <div>
          <h3>Total NEOs: {neosData.page.total_elements}</h3>
          <ul>
            {neosData.near_earth_objects.slice(0, 10).map((neo) => (
              <li key={neo.id}>
                Name: {neo.name}, 
                Magnitude: {neo.absolute_magnitude_h}, 
                Diameter: {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m - {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m, 
                Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* HORIZONS Section */}
      <h2>HORIZONS Data for Asteroids (2025)</h2>
      {horizonsLoading && <p>Loading Horizons data...</p>}
      {horizonsError && <p>Error: {horizonsError}</p>}
      {horizonsData && (
        <pre style={{ maxHeight: "300px", overflowY: "scroll", backgroundColor: "#f0f0f0", padding: "10px" }}>
          {horizonsData}
        </pre>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
