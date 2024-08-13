// src/pages/Register.js
import React ,{ useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // Adjust the path as necessary

const Register = () => {
  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confirm_password , setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Username: ${username} Email: ${email} Password: ${password} Confirm Password: ${confirm_password}`);
  }
  return(
  <Wrapper>
    <div className="register_box">
      <div className="header">
        <h1><Link to="/"style={{color: 'white'}}>InvCare</Link></h1>
        <br />
        <h4>Register</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <input type="text" id="Username" placeholder="username" className='input-field' onChange={(e)=>setUsername(e.target.value)} required/>
        </div>
        <div className="input_box">
          <input type="email" id="email" placeholder="Email" className='input-field' onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="input_box">
          <input type="password" id="password" placeholder="Password" className='input-field' onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="input_box">
          <input type="password" id="confirm_password" placeholder="Confirm Password" className='input-field' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
        </div>
        <input type="submit" value="Register" className = "input-submit"/>
      </form>
      <div className="login">
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    </div>
  </Wrapper>
  );
};

export default Register;
