// SentimentAnalysis.js
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function SentimentAnalysis() {
  const [candidate, setCandidate] = useState('');
  const [res, setRes] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const r = await axios.get(`http://localhost:5000/api/sentiment-analysis?candidate=${candidate}`);
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
      <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis (Twitter)</h2>
      <div className="flex mb-4">
        
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Enter Candidate Name"
          value={candidate}
          onChange={e => setCandidate(e.target.value)}
        />
        <button onClick={fetchData} className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
          Analyze
        </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {res && (
        <>
          <div className="chart-container">
            <Bar
              data={{
                labels: ['Positive', 'Negative'],
                datasets: [
                  {
                    label: 'Tweet Sentiment',
                    data: [res.positive, res.negative],
                    backgroundColor: ['#10b981', '#ef4444']
                  }
                ]
              }}
            />
          </div>
          <p className="mt-4 text-center font-bold">{res.verdict}</p>
        </>
      )}
    </div>
  );
}
