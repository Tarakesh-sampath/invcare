// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Adjust the path as necessary

const Header = () => (
  <header>
    <div className="container">
      <h1><Link to="/" style={{color: 'white'}}>InvCare</Link></h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
