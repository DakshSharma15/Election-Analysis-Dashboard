// StateResult.js
import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function StateResult() {
  const [state, setState] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/state-results?state=${state}`);
      if (res.data.error) {
        setError(res.data.error);
        setData(null);
      } else {
        setData(res.data);
        setError('');
      }
    } catch {
      setError('Failed to fetch');
      setData(null);
    }
  };

  return (
    <div className='input-row'>
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">State-Wise Election Results</h2>
      <div className="flex mb-4">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Enter State Name"
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <button onClick={fetchData} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Fetch
        </button>
      </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <>
          <div className="chart-container">
            <Pie
              data={{
                labels: data.party_data.map(p => p.party),
                datasets: [
                  {
                    data: data.party_data.map(p => p.seats),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1']
                  }
                ]
              }}
            />
          </div>
          <table className="mt-6 w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Party</th>
                <th className="border px-4 py-2">Seats</th>
                <th className="border px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {data.party_data.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.party}</td>
                  <td className="border px-4 py-2">{p.seats}</td>
                  <td className="border px-4 py-2">{p.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
