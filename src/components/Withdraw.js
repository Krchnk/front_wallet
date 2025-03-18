import React, { useState } from 'react';
import axios from 'axios';

function Withdraw({ token, setMessage }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/wallet/withdraw`;
    try {
      const response = await axios.post(
        apiUrl,
        { amount: parseFloat(amount), currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setAmount('');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Withdrawal failed'}`);
    }
  };

  return (
    <div className="dashboard-card action-card">
      <h3>Withdraw</h3>
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
        <button type="submit" className="action-button">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;