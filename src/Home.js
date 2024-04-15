import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import './Home.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from './logo.png';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authorizedUid = 'GxDbMf28SRfXxdLZ3kLf8bzYoIC3'; // Authorized UID

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === authorizedUid) {
          // Authorized user, navigate to another page
          navigate('/dashboard');
        } else {
          // Not authorized, display error message
          setErrorMessage('User is not authorized.');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle invalid credentials error
        setErrorMessage('Invalid email or password.');
      });
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Home;
