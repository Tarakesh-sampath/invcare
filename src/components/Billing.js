import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import items from './items'; // Correct import path
import '../styles/Billing.css'; // Adjust the path as necessary

const Billing = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleAddToCart = () => {
    if (items[itemId]) {
      const existingItem = cart.find((item) => item.id === itemId);
      if (existingItem) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === itemId
              ? { ...item, count: item.count + parseInt(quantity, 10) }
              : item
          ).sort((a, b) => a.name.localeCompare(b.name))
        );
      } else {
        setCart((prevCart) =>
          [...prevCart, {
            id: itemId,
            name: items[itemId].name,
            count: parseInt(quantity, 10),
            price: items[itemId].price,
          }].sort((a, b) => a.name.localeCompare(b.name))
        );
      }
      setItemId('');
      setQuantity('');
    } else {
      alert('Item not found');
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id).sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleGenerateBill = () => {
    navigate('/bill-summary', { state: { cart, customerName } });
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2>Generate Bill</h2>
          <div className="form-container">
            <input
              type="text"
              className="input-field"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Item ID"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="input-submit" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="input-submit" onClick={handleGenerateBill}>
              Generate Bill
            </button>
          </div>
          <div className="cart-container">
            <h3>Cart Items</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  {item.name} - {item.count} x ${item.price} = ${item.count * item.price}
                  <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
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

export default Billing;
