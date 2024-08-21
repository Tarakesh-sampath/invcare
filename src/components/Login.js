// src/pages/Login.js
import React ,{ useState }from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Adjust the path as necessary
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username:user,
        password:pass,
      });
      if (response.data.message === 'true') {
        alert('Login successful!');
        navigate('/'); // Redirect to the home page
      } else {
          alert(response.data.message); // Display error message
      }
    } catch (error) {
        console.error(error);
    }
  };
  return(
    <Wrapper>
      <div className="login_box">
        <div className="login-header">
          <h1><Link to="/" style={{color: 'white'}}>InvCare</Link></h1>
          <br />
          <h4>Login</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input_box">
            <input type="text" id="User" placeholder="username" className='input-field' value={user} onChange={(e)=>setUser(e.target.value)} required/>
          </div> 
          <div className="input_box">
            <input type="password" id="Pass" placeholder="Password" className='input-field' value={pass} onChange={(e)=>setPass(e.target.value)} required/>
          </div> 
          <input type="submit" value="Login" className = "input-submit"/>
        </form>
        <div className="register">
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </div>
    </Wrapper>
  );  
};

export default Login;
