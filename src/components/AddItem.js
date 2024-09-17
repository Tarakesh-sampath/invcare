import React from 'react';
import Header from '../components/Header';
import '../styles/AddItem.css'; // Adjust the path as necessary

const AddItem = () => (
  <>
    <Header />
    <main>
      <div className="container">
        <h2>Add New Item</h2>
        <div className="form-container">
          <input type="text" className="input-field" placeholder="Item Name" />
          <input type="number" className="input-field" placeholder="Quantity" />
          <input type="text" className="input-field" placeholder="Category" />
          <textarea className="input-field" placeholder="Description"></textarea>
          <button className="input-submit">Add Item</button>
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

export default AddItem;