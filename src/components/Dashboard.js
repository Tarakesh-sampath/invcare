import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import items from './items'; // Adjust the path as necessary
import '../styles/Dashboard.css'; // Adjust the path as necessary

const Dashboard = () => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (items[searchId]) {
      navigate(`/dashboard/search-item`, { state: { searchId } });
    } else {
      alert('Item does not exist');
      navigate('/dashboard/search-item');
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2>Inventory Dashboard</h2>
          <div className="dashboard-actions">
            <div className="dashboard-action">
              <h3>Add Item</h3>
              <button className="input-submit" onClick={() => navigate('/dashboard/add-item')}>Add New Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Search Inventory</h3>
              <input
                type="text"
                className="input-field"
                placeholder="Search..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button className="input-submit" onClick={handleSearch}>Search</button>
            </div>
            <div className="dashboard-action">
              <h3>Update Item</h3>
              <button className="input-submit" onClick={() => navigate('/dashboard/update-item')}>Update Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Billing</h3>
              <button className="input-submit" onClick={() => navigate('/dashboard/billing')}>Generate Bill</button>
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
