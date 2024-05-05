import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Assuming this imports your Firebase configuration correctly

function SignUp() {
  const [email, setEmail] = useState('');
  const [fName, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      const userRef = collection(db, 'users');
      await addDoc(userRef, { email: email, fName: fName });
      
      setEmail('');
      setName('');
      setPassword('');
      setMessage('User Registered');
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="fName">Name</label>
          <input
            type="text"
            className="form-control"
            id="fName"
            value={fName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="message">{message}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;

