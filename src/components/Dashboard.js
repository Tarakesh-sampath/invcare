// src/pages/Dashboard.js
import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Header2 from './Header2'; // Adjust the path as necessary
import '../styles/Dashboard.css'; // Adjust the path as necessary

const Dashboard = ({uname,email}) => {
  const navigate = useNavigate();
  const location = useLocation();
  uname = location.state?.uname || {}
  email = location.state?.email || {}
  const handleNavigation = (path,uname,email) => {
    navigate(`/${path}`,{ state: {uname,email} });
  };

  return (
    <>
      <Header2 uname={uname} />
      <main>
        <div className="container">
          <h2>Inventory Dashboard</h2>
          <div className="dashboard-actions">
            <div className="dashboard-action">
              <h3>Add Item</h3>
              <button className="input-submit" onClick={() => handleNavigation('add-item',uname,email)}>Add New Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Search Inventory</h3>
              <input type="text" className="input-field" placeholder="Search..." />
              <button className="input-submit" onClick={() => handleNavigation('search-item',uname,email)}>Search</button>
            </div>
            <div className="dashboard-action">
              <h3>Update Item</h3>
              <button className="input-submit" onClick={() => handleNavigation('update-item',uname,email)}>Update Item</button>
            </div>
            <div className="dashboard-action">
              <h3>Billing</h3>
              <button className="input-submit" onClick={() => handleNavigation('billing',uname,email)}>Generate Bill</button>
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
