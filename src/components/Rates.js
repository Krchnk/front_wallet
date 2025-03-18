import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Rates({ token, setMessage }) {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRates = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/exchange/rates`;
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRates(response.data.rates);
      setMessage('Rates retrieved');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Failed to fetch rates'}`);
    }
  };

  return (
    <div className="dashboard-card rates-card">
      <h3>Exchange Rates</h3>
      {rates ? (
        <div className="rates-list">
          {Object.entries(rates).map(([currency, rate]) => (
            <div key={currency} className="rate-item">
              <span className="currency">{currency}</span>
              <span className="rate">{rate.toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading rates...</p>
      )}
      <button className="refresh-button" onClick={fetchRates}>Refresh</button>
    </div>
  );
}

export default Rates;