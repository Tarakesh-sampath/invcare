import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://invcare-1.onrender.com/login', {
        username: user,
        password: pass,
      });

      if (response.data.message === 'true') {
        const userId = response.data.userid;
        alert('Login successful!');
        navigate('/Dash', { state: { userId } }); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <div className="login_box">
        <div className="login-header">
          <h1><Link to="/" style={{ color: 'white' }}>InvCare</Link></h1>
          <br />
          <h4>Login</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input_box">
            <input
              type="text"
              id="User"
              placeholder="Username"
              className='input-field'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="Pass"
              placeholder="Password"
              className='input-field'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <input type="submit" value="Login" className="input-submit" />
        </form>
        <div className="register">
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;