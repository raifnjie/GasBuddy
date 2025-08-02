import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>GasBuddy </h1>
        <nav>
          <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;