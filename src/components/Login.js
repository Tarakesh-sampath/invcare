// src/pages/Login.js
import React ,{ useState }from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Adjust the path as necessary

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Username: ${user} Password: ${pass}`);
  }
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
