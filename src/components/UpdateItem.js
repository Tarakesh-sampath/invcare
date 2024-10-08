import React from 'react';
import Header2 from '../components/Header2';
import { useLocation } from 'react-router-dom';
import '../styles/UpdateItem.css'; // Adjust the path as necessary

const UpdateItem = ({uname,email}) => {
  const location = useLocation();
  uname = location.state?.uname || {}
  email = location.state?.email || {}
  return (
    <>
      <Header2 uname={uname}email={email} />
      <main>
        <div className="container">
          <h2>Update Item</h2>
          <div className="form-container">
            <input type="text" className="input-field" placeholder="Item ID" />
            <input type="text" className="input-field" placeholder="New Item Name" />
            <input type="number" className="input-field" placeholder="New Quantity" />
            <input type="text" className="input-field" placeholder="New Category" />
            <textarea className="input-field" placeholder="New Description"></textarea>
            <button className="input-submit">Update Item</button>
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

export default UpdateItem;
