import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Balance({ token, setMessage }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('${process.env.REACT_APP_API_URL}/api/v1/balance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.balance);
      setMessage('Balance retrieved');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Failed to fetch balance'}`);
    }
  };

  return (
    <div className="dashboard-card balance-card">
      <h3>Your Balance</h3>
      {balance ? (
        <div className="balance-list">
          {Object.entries(balance).map(([currency, amount]) => (
            <div key={currency} className="balance-item">
              <span className="currency">{currency}</span>
              <span className="amount">{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading balance...</p>
      )}
      <button className="refresh-button" onClick={fetchBalance}>Refresh</button>
    </div>
  );
}

export default Balance;