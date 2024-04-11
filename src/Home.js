import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './Home.css';
import logo from './logo.png';


function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Use useNavigate

  const handleSignIn = () => {
    // Implement your sign-in logic here
    // For example, using Firebase Authentication
    // If sign-in is successful, redirect to the dashboard
    // Replace this with your actual authentication logic
    if (email === 'admin@gmail.com' && password === 'pass') {
      navigate('/dashboard');  // Use navigate to redirect
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
        <img src={logo} alt="ADDMAS Admin Login Logo" className="logo" />
      <h2>ADDMAS Admin Login</h2>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
