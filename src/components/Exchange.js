import React, { useState } from 'react';
import axios from 'axios';

function Exchange({ token, setMessage }) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '${process.env.REACT_APP_API_URL}/api/v1/exchange',
        { from_currency: fromCurrency, to_currency: toCurrency, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setAmount('');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Exchange failed'}`);
    }
  };

  return (
    <div className="dashboard-card exchange-card">
      <h3>Exchange Currency</h3>
      <form onSubmit={handleSubmit}>
        <div className="exchange-row">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="dashboard-select"
          >
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="EUR">EUR</option>
          </select>
          <span className="exchange-arrow">→</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="dashboard-select"
          >
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="dashboard-input"
        />
        <button type="submit" className="action-button">Exchange</button>
      </form>
    </div>
  );
}

export default Exchange;