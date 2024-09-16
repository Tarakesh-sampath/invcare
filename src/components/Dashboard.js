// src/pages/Dash.js
import React from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom'; // Import useLocation
import '../styles/Dash.css'; // Adjust the path as necessary

const Dash = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // Access userId from location.state

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2>Welcome to InvCare</h2>
          <p>Your one-stop solution for efficient inventory management.</p>
          <p>Track your stock, manage orders, and streamline your supply chain with ease.</p>
          {userId && <p>User ID: {userId}</p>} {/* Print userId if available */}
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 InvCare. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Dash;
