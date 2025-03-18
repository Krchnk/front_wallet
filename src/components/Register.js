import React, { useState } from 'react';
import axios from 'axios';

function Register({ setMessage, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/register`;
        console.log('Sending signup request to:', apiUrl);
        console.log('Request data:', { username, password, email });
    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
        email,
      });
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Registration failed';
      setMessage(`Error: ${errorMsg}`);
      console.error('Registration error:', error.response || error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p className="signup-prompt">
          Already have an account?{' '}
          <span className="signup-link" onClick={onSwitchToLogin}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;