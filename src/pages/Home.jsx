import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import StationList from '../components/StationList';

// Generate realistic test data based on search parameters
const generateMockStations = (searchData) => {
  const baseStations = [
    { name: "Shell Station", brand: "shell" },
    { name: "BP Gas Station", brand: "bp" },
    { name: "Chevron", brand: "chevron" },
    { name: "Exxon Mobil", brand: "exxon" },
    { name: "Circle K", brand: "circlek" },
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
      {loading && <div className="loading">Searching for fuel stations...</div>}
      {stations.length > 0 && <StationList stations={stations} />}
    </div>
  );
}

export default Home;