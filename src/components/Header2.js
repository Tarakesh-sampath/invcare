// src/components/Header_Auth.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Adjust the path as necessary

const Header2 = ({ username }) => {
  const navigate = useNavigate();

  if (!username) {
    navigate('/login');
  }

  return (
    <header>
      <div className="container">
        <h1><Link to="/" style={{ color: 'white' }}>InvCare</Link></h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><span>Hello, {username}</span></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
