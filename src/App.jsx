import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNEOsApi } from './Hooks/useNEOsApi'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { data, loading, error } = useNEOsApi();


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
      <h2>Near Earth Objects (NEOs) from NASA API</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>Total NEOs: {data.page.total_elements}</h3>
          <ul>
            {data.near_earth_objects.slice(0, 10).map((neo) => (
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
