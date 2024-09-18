import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header2 from '../components/Header2';

const AddItem = ({ uname, email }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const location = useLocation();
  uname = location.state?.uname || {}
  email = location.state?.email || {}
  console.log(uname,email)
  const handleAddItem = async () => {
    if (!itemName || !quantity || !category || !description) {
      alert('All fields are required');
      return;
    }
    try {
      const response = await axios.post('https://invcare-1.onrender.com/additem', {
        email: email,
        item_name: itemName,
        quantity: parseInt(quantity, 10),
        category   : category,
        description:description,
      });
      console.log(response.data.dblink);
      alert('Item added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add item');
    }
  };

  return (
    <>
      <Header2 username={uname} />
      <main>
        <div className="container">
          <h2>Add New Item</h2>
          <div className="form-container">
            <input type="text" className="input-field" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="number" className="input-field" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="text" className="input-field" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <textarea className="input-field" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button className="input-submit" onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddItem;
