// src/components/InputField.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/InputField.css'; // Adjust the path as necessary

const InputField = ({ type, id, placeholder }) => (
  <div className="input_box">
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="input-field"
      required
    />
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputField;
