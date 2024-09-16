// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import '../styles/Dash.css'; // Adjust the path as necessary

const Dash = () => (
  <>
    <Header />
    <main>
      <div className="container">
        <h2>Welcome to InvCare</h2>
        <p>Your one-stop solution for efficient inventory management.</p>
        <p>Track your stock, manage orders, and streamline your supply chain with ease.</p>
      </div>
    </main>
    <footer>
      <div className="container">
        <p>&copy; 2024 InvCare. All rights reserved.</p>
      </div>
    </footer>
  </>
);

export default Dash;
