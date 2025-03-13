import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, setMessage, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', {
        username,
        password,
      });
      setToken(response.data.token);
      setMessage('Login successful');
      setUsername('');
      setPassword('');
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Login failed';
      setMessage(`Error: ${errorMsg}`);
      console.error('Login error:', error.response || error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p className="signup-prompt">
          Don't have an account yet?{' '}
          <span className="signup-link" onClick={onSwitchToRegister}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;