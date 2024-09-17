// src/components/Header_Auth.js
import React from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import '../styles/Header.css'; // Adjust the path as necessary

const Header2 = ({uname}) => {
  const navigate = useNavigate();
  const location = useLocation();
  uname = location.state?.uname || {}
  if (!uname) {
    navigate('/login');
  }

  return (
    <header>
      <div className="container">
        <h1><Link to="/" style={{ color: 'white' }}>InvCare</Link></h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><span>Hello,{uname}</span></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
