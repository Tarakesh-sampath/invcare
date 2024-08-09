// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css'; // Adjust the path as necessary

const Button = ({ type, onClick, value, className }) => (
  <input
    type={type}
    onClick={onClick}
    value={value}
    className={`input-submit ${className}`}
  />
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  className: '',
};

export default Button;
