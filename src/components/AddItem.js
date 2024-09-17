import React from 'react';
import Header2 from '../components/Header2';
import '../styles/AddItem.css'; // Adjust the path as necessary

const AddItem = ({uname,email}) => (
  <>
    <Header2 username={uname} />
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