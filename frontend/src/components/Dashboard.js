import React, { useState } from 'react';
import './Dashboard.css';
import StateResult from './StateResult';
import CandidateProbability from './CandidateProbability';
import SentimentAnalysis from './SentimentAnalysis';
import { useNavigate } from 'react-router-dom';
import PartyAnalytics from './PartyAnalytics';


export default function Dashboard() {
  const [tab, setTab] = useState('state');
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Hero Header */}
      <div className="dashboard-hero">
        <h1>Election Intelligence Center</h1>
        <p>Access real-time visual insights into elections across India</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>

      {/* National Summary */}
      <div className="summary-cards">
        <div className="summary-card "style={{ backgroundColor: '#f0f8ff' }}>
          <h3>Total Seats</h3>
          <p>543</p>
        </div>
        <div className="summary-card">
          <h3>Estimated Voter Turnout</h3>
          <p>68.5%</p>
        </div>
        <div className="summary-card">
          <h3>Leading Party</h3>
          <p>BJP</p>
        </div>
        <div className="summary-card" style={{ backgroundColor: '#f0f8ff' }}> 
          <h3>Data Updated</h3>
          <p>June-2024</p>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="dashboard-tabs">
        <div
          className={`dashboard-tab ${tab === 'state' ? 'active' : ''}`}
          onClick={() => setTab('state')}
        >
          <h3>📊 State Results</h3>
          <p>Check seat-wise distribution by party</p>
        </div>
        <div
          className={`dashboard-tab ${tab === 'candidate' ? 'active' : ''}`}
          onClick={() => setTab('candidate')}
        >
          <h3>🗳️ Winning Probability</h3>
          <p>AI-based candidate predictions</p>
        </div>
        <div
          className={`dashboard-tab ${tab === 'sentiment' ? 'active' : ''}`}
          onClick={() => setTab('sentiment')}
        >
          <h3>💬 Sentiment Analysis</h3>
          <p>Twitter-based candidate perception</p>
        </div>
        <div
  className={`dashboard-tab ${tab === 'party' ? 'active' : ''}`}
  onClick={() => setTab('party')}
>
  <h3>🏛️ Party Analytics</h3>
  <p>Explore seat share by party across India</p>
</div>

      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {tab === 'state' && <StateResult />}
        {tab === 'candidate' && <CandidateProbability />}
        {tab === 'sentiment' && <SentimentAnalysis />}
        {tab === 'party' && <PartyAnalytics />}

      </div>

      {/* Quick Facts */}
      <div className="quick-facts">
        <h2>Election Quick Facts</h2>
        <ul>
          <li>🗳️ Total Registered Voters: 970 million</li>
          <li>📅 Voting in 7 Phases across April–May</li>
          <li>📌 Key Battleground States: UP, WB, MH</li>
          <li>🤝 Major Alliances: NDA, INDIA, UPA</li>
          <li>💡 First-time Voters: 18 million</li>
        </ul>
      </div>
    </div>
  );
}
