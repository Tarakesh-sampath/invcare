// src/pages/Login.js
import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Adjust the path as necessary

const Login = () => (
  <Wrapper>
    <div className="login_box">
      <div className="login-header">
        <h1><Link to="/" style={{color: 'white'}}>InvCare</Link></h1>
        <br />
        <h4>Login</h4>
      </div>
      <InputField type="text" id="user" placeholder="username" />
      <InputField type="password" id="pass" placeholder="Password" />
      <Button type="submit" value="Login" />
      <div className="register">
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </div>
    </div>
  </Wrapper>
);

export default Login;
