// src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import '../styles/Dashboard.css'; // Adjust the path as necessary

const Dashboard = () => (
  <>
    <Header />
    <main>
      <div className="container">
        <h2>Inventory Dashboard</h2>
        <div className="dashboard-actions">
          <div className="dashboard-action">
            <h3>Add Item</h3>
            <button className="input-submit">Add New Item</button>
          </div>
          <div className="dashboard-action">
            <h3>Search Inventory</h3>
            <input type="text" className="input-field" placeholder="Search..." />
          </div>
          <div className="dashboard-action">
            <h3>Update Item</h3>
            <button className="input-submit">Update Item</button>
          </div>
          <div className="dashboard-action">
            <h3>Billing</h3>
            <button className="input-submit">Generate Bill</button>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div className="container">
        <p>&copy; 2024 InvCare. All rights reserved.</p>
      </div>
    </footer>
  </>
);

export default Dashboard;
