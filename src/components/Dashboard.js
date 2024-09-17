// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from './Header2'; // Adjust the path as necessary
import '../styles/Dashboard.css'; // Adjust the path as necessary

const Dashboard = ({ username }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <>
      <Header2 username={username} />
      <main>
        <div className="container">
          <h2>Inventory Dashboard</h2>
          <div className="dashboard-actions">
            <div className="dashboard-action">
              <h3>Add Item</h3>
              <button className="input-submit" onClick={() => handleNavigation('add-item')}>Add New Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Search Inventory</h3>
              <input type="text" className="input-field" placeholder="Search..." />
              <button className="input-submit" onClick={() => handleNavigation('search-item')}>Search</button>
            </div>
            <div className="dashboard-action">
              <h3>Update Item</h3>
              <button className="input-submit" onClick={() => handleNavigation('update-item')}>Update Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Billing</h3>
              <button className="input-submit" onClick={() => handleNavigation('billing')}>Generate Bill</button>
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
};

export default Dashboard;
