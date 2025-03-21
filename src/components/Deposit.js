import React, { useState } from 'react';
import axios from 'axios';

function Deposit({ token, setMessage }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/wallet/deposit`;
    console.log('Sending deposit request to:', apiUrl, 'with data:', { amount: parseFloat(amount), currency });
    try {
      const response = await axios.post(
        apiUrl,
        { amount: parseFloat(amount), currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Deposit response:', response.data);
      setMessage(response.data.message);
      setAmount('');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Deposit failed';
      console.error('Deposit error:', error.response || error);
      setMessage(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="dashboard-card action-card">
      <h3>Deposit</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="dashboard-input"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="dashboard-select"
        >
          <option value="USD">USD</option>
          <option value="RUB">RUB</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="submit" className="action-button">Deposit</button>
      </form>
      {setMessage && <p>{setMessage}</p>} {/* Для отладки, если нужно */}
    </div>
  );
}

export default Deposit;