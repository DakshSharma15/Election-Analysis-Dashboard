// CandidateProbability.js
import React, { useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function CandidateProbability() {
  const [candidate, setCandidate] = useState('');
  const [res, setRes] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const r = await axios.get(`http://localhost:5000/api/winning-probability?candidate=${candidate}`);
      if (r.data.error) {
        setError(r.data.error);
        setRes(null);
      } else {
        setRes(r.data);
        setError('');
      }
    } catch {
      setError('Failed to fetch');
      setRes(null);
    }
  };

  return (
    <div className='input-row'>
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Candidate Winning Probability</h2>
      <div className="flex mb-4">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Enter Candidate Name"
          value={candidate}
          onChange={e => setCandidate(e.target.value)}
        />
        <button onClick={fetchData} className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg">
          Check
        </button>
      </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {res && (
        <div className="text-center">
          <div className="chart-container">
            <Doughnut
              data={{
                labels: [res.candidate, 'Others'],
                datasets: [
                  {
                    data: [res.winning_probability_percent, 100 - res.winning_probability_percent],
                    backgroundColor: ['#10b981', '#e5e7eb']
                  }
                ]
              }}
            />
          </div>
          <p className="mt-4 text-xl font-bold">{res.winning_probability_percent}%</p>
        </div>
      )}
    </div>
  );
}
