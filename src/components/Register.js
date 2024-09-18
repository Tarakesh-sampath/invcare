// src/pages/Register.js
import React ,{ useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css'; // Adjust the path as necessary

const Register = () => {
  const navigate = useNavigate();
  const [user , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [server , setServer] = useState('');
  const [pass , setPassword] = useState('');
  const [c_pass , setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(`Username: ${user} Email: ${email} Server: ${server} Password: ${pass} Confirm Password: ${c_pass}`);
    try {
      const response = await axios.post('http://0.0.0.0:8000/register', {
        username:user,
        password:pass,
        server:server,
        email:email,
        c_password:c_pass,
      });
      if (response.data.message === 'true') {
        alert('Register successful');
        navigate('/login'); // Redirect to the home page
      } else {
          alert(response.data.message); // Display error message
      }
    } catch (error) {
        console.error(error);
    }
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
          <input type="test" id="server" placeholder="Sql Server link" className='input-field' onChange={(e)=>setServer(e.target.value)} required/>
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
