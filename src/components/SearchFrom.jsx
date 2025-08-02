import React, { useState } from 'react';

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
        <label htmlFor="location">Location (ZIP code or city):</label>
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

export default SearchForm;