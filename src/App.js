import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Balance from './components/Balance';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Rates from './components/Rates';
import Exchange from './components/Exchange';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setMessage('Logged out successfully');
  };

  const switchToRegister = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  return (
    <div className="container">
      <h1>Currency Wallet</h1>
      
      {!token ? (
        showLogin ? (
          <Login setToken={handleLogin} setMessage={setMessage} onSwitchToRegister={switchToRegister} />
        ) : (
          <Register setMessage={setMessage} onSwitchToLogin={switchToLogin} />
        )
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>Welcome to Your Wallet</h2>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
          <div className="dashboard-grid">
            <Balance token={token} setMessage={setMessage} />
            <div className="actions-grid">
              <Deposit token={token} setMessage={setMessage} />
              <Withdraw token={token} setMessage={setMessage} />
            </div>
            <Rates token={token} setMessage={setMessage} />
            <Exchange token={token} setMessage={setMessage} />
          </div>
        </div>
      )}
      
      {message && (
        <p className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default App;