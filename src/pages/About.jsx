import React from 'react';

function About() {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
      <h2>About GasBuddy</h2>
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
        <li>Compare prices and choose the best option</li>
      </ol>
    </div>
  );
}

export default About;