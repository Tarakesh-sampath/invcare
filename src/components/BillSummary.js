import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BillSummary.css'; // Adjust the path as necessary

const BillSummary = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const total = cart.reduce((acc, item) => acc + item.count * item.price, 0);

  return (
    <div>
      <h2>Bill Summary</h2>
      <div className="bill-summary-container">
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.count} x ${item.price} = ${item.count * item.price}
            </li>
          ))}
        </ul>
        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
};

export default BillSummary;
