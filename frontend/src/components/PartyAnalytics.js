import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const dummyPartyData = {
  BJP: {
    totalSeats: 303,
    stateBreakdown: {
      "Uttar Pradesh": 62,
      "Gujarat": 26,
      "Madhya Pradesh": 28,
      "Rajasthan": 25,
      "Others": 162
    }
  },
  INC: {
    totalSeats: 52,
    stateBreakdown: {
      "Kerala": 15,
      "Punjab": 8,
      "Tamil Nadu": 7,
      "Karnataka": 9,
      "Others": 13
    }
  },
  AAP: {
    totalSeats: 4,
    stateBreakdown: {
      "Delhi": 3,
      "Punjab": 1
    }
  }
};

const PartyAnalytics = () => {
  const [selectedParty, setSelectedParty] = useState('BJP');
  const party = dummyPartyData[selectedParty];

  const chartData = {
    labels: Object.keys(party.stateBreakdown),
    datasets: [
      {
        label: `${selectedParty} Seats`,
        data: Object.values(party.stateBreakdown),
        backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6']
      }
    ]
  };

  return (
    <div className="party-analytics">
      <h2>Party-wise Analytics 2019</h2>
      <div className="input-row">
        <select value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)}>
          {Object.keys(dummyPartyData).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="chart-container">
        <Pie data={chartData} />
      </div>

      <table className="analytics-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(party.stateBreakdown).map(([state, seats], i) => (
            <tr key={i}>
              <td>{state}</td>
              <td>{seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartyAnalytics;
