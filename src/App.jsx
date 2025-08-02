import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './styles/App.css';

// Generate realistic test data based on search parameters
const generateMockStations = (searchData) => {
  const baseStations = [
    { name: "Shell Station", brand: "shell" },
    { name: "BP Gas Station", brand: "bp" },
    { name: "Chevron", brand: "chevron" },
    { name: "Exxon Mobil", brand: "exxon" },
    { name: "RaceTrac", brand: "racetrac" },
    { name: "Speedway", brand: "speedway" },
    { name: "Marathon", brand: "marathon" },
    { name: "Sunoco", brand: "sunoco" }
  ];

  // Realistic current gas prices (as of 2025)
  const basePrices = {
    regular: 3.25,
    midgrade: 3.55,
    premium: 3.85,
    diesel: 3.45
  };

  const basePrice = basePrices[searchData.fuelType];
  const maxStations = Math.min(parseInt(searchData.radius / 2) + 3, 8);
  
  return baseStations.slice(0, maxStations).map((station, index) => ({
    id: index + 1,
    name: station.name,
    address: `${1200 + index * 150} Main St, ${searchData.location}`,
    price: (basePrice + (Math.random() * 0.3 - 0.15)).toFixed(2),
    fuelType: searchData.fuelType,
    distance: (0.3 + Math.random() * (parseInt(searchData.radius) - 0.3)).toFixed(1),
    brand: station.brand
  })).sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Sort by price
};

// SearchForm component directly in App.jsx for now
function SearchForm({ onSearch }) {
  const [location, setLocation] = useState('');
  const [fuelType, setFuelType] = useState('regular');
  const [radius, setRadius] = useState('5');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location,
      fuelType,
      radius
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="location">Location (ZIP code):</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter ZIP code or city"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="fuelType">Fuel Type:</label>
        <select
          id="fuelType"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="regular">Regular</option>
          <option value="midgrade">Mid-Grade</option>
          <option value="premium">Premium</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="radius">Search Radius:</label>
        <select
          id="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        >
          <option value="1">1 mile</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
        </select>
      </div>

      <button type="submit" className="btn">
        Find Stations
      </button>
    </form>
  );
}

function Home() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (searchData) => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const mockStations = generateMockStations(searchData);
      setStations(mockStations);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h2>Find Cheap Fuel Near You</h2>
      <SearchForm onSearch={handleSearch} />
      
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Searching for gas stations...</div>}
      
      {stations.length > 0 && (
        <div className="station-list">
          {stations.map(station => (
            <div key={station.id} className="station-card">
              <h3>{station.name}</h3>
              <p>{station.address}</p>
              <div className="price">${station.price}/gal</div>
              <p>Distance: {station.distance} miles</p>
              <p>Fuel Type: {station.fuelType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function About() {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
      <h2>What is GasBuddy?</h2>
      <p>
      GasBuddy is a React-powered web application that saves drivers money by finding the cheapest fuel stations in their area. 
      Built with modern JavaScript, this single-page application demonstrates proficiency in React hooks, state management, 
      responsive design, and API integration patterns.
      </p>

    <h3>Features:</h3>
    <ul>
      <li>Search by location or ZIP code</li>
      <li>Compare fuel prices</li>
      <li>Filter by fuel type</li>
      <li>See distance from your location</li>
      <li>Real-time price updates</li>
    </ul>
    
    <h3>How to Use:</h3>
    <ol>
      <li>Enter your location or ZIP code</li>
      <li>Select your preferred fuel type</li>
      <li>Choose search radius</li>
      <li>Click "Find Stations"</li>
      <li>Compare prices and choose the best option!</li>
    </ol>
  </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;