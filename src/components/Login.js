import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Form.css';
import '../styles/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="button-row">
          <button type="submit">Login</button>
          <Link to="/signup" className="alt-button">Sign Up</Link>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;


