// src/components/Wrapper.js
import React from 'react';
import '../styles/Wrapper.css'; // Adjust the path as necessary

const Wrapper = ({ children }) => (
  <div className="wrapper">
    {children}
  </div>
);

export default Wrapper;
