// src/pages/Register.js
import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // Adjust the path as necessary

const Register = () => (
  <Wrapper>
    <div className="register_box">
      <div className="header">
        <h1><Link to="/"style={{color: 'white'}}>InvCare</Link></h1>
        <br />
        <h4>Register</h4>
      </div>
      <InputField type="text" id="username" placeholder="username" />
      <InputField type="email" id="email" placeholder="Email" />
      <InputField type="password" id="password" placeholder="Password" />
      <InputField type="password" id="confirm_password" placeholder="Confirm Password" />
      <Button type="submit" value="Register" />
      <div className="login">
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    </div>
  </Wrapper>
);

export default Register;
