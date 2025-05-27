import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedNews = localStorage.getItem('electionNews');
    if (cachedNews) {
      setNews(JSON.parse(cachedNews));
    } else {
      fetchNews();
    }
  }, []);

  const fetchNews = () => {
    fetch("https://newsapi.org/v2/everything?q=indian-election&apiKey=38cdf4ee48304f2fa249e3eb138cc8de")
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          const topNews = data.articles.slice(0, 3);
          setNews(topNews);
          localStorage.setItem('electionNews', JSON.stringify(topNews));
        }
      })
      .catch(error => console.error("Error fetching news:", error));
  };

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <img 
          src="https://www.india.gov.in/sites/upload_files/npi/files/spotlights/voter_information_services.jpg" 
          alt="Election Info"
          className="banner-image"
        />
        <div className="banner-overlay">
          <h1>India Election 2024 Dashboard</h1>
          <p>Track trends, forecasts, and voter sentiments in real-time.</p>
          <button onClick={() => navigate('/dashboard')}>Explore Dashboard</button>
        </div>
      </div>

      {/* News Section */}
      <section className="news-section">
        <h2>Latest Election News</h2>
        <div className="news-container">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-card">
                <img src={article.urlToImage} alt="News" className="news-image" />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            ))
          ) : (
            <p>Loading news...</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>"This platform gives real-time trends and it's super helpful!"</p>
            <span>- An Informed Voter</span>
          </div>
          <div className="testimonial">
            <p>"Best dashboard to follow India's election analytics!"</p>
            <span>- A Political Analyst</span>
          </div>
          <div className="testimonial">
            <p>"The 2024 election saw the BJP retain power with fewer seats, while the INDIA bloc gained strong ground. It reflected a shift toward more balanced regional influence."</p>
            <span>- Voter </span>
          </div>
        </div>
      </section>

{/* Map Preview Section */}
<section className="map-embed-section">
<div className="election-comparison">
    <h3 className='cta-section'>2024 vs 2019 Election Comparison</h3>
    <p>
      The 2024 Lok Sabha elections are witnessing key shifts in India's political landscape. The ruling party, <strong>BJP</strong>, aims to secure another term, but opposition forces, including <strong>INC</strong>, <strong>AAP</strong>, and regional parties, are intensifying their campaigns to challenge BJP's dominance in states like Uttar Pradesh, West Bengal, and Karnataka.
    </p>
    <ul>
      <li>
        <strong>Major Shifts:</strong> In 2019, BJP's dominance was clear in most northern and western states, while 2024 sees growing competition in several key states.
      </li>
      <li>
        <strong>New Challenges:</strong> Opposition parties have formed alliances to challenge BJP, especially in the Hindi heartland.
      </li>
      <li>
        <strong>Regional Realignment:</strong> South India, previously a stronghold for Congress and regional parties, shows signs of fragmentation in 2024, with AAP gaining traction.
      </li>
      <li>
        <strong>Voter Turnout:</strong> Increased voter engagement, especially among first-time voters and young people, is expected to make a significant difference in the 2024 results.
      </li>
    </ul>
    <p>
      The map and results here will help you explore how the political dynamics of 2024 differ from 2019 and how the seats have been redistributed.
    </p>
  </div>
  <h2 className=''>Constituency Map Preview</h2>
  <p>Click the image to explore the Analysis.</p>
  
  <a
    href="http://localhost:3000/dashboard"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://www.greaterpacificcapital.com/gpc-img/june-2024/3.jpg"
      alt="Lok Sabha Constituency Map Preview"
      className="map-preview-image"
    />
  </a>
</section>


      {/* Call to Action */}
      <section className="cta-section">
        <h2>Start Exploring Election Insights Now</h2>
        <button onClick={() => navigate('/dashboard')} className="cta-button">
          Go to Dashboard
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="footer-social">
            <a href="https://linkedin.com/in/daksh-sharma-50998121b" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
            </a>
            <a href="https://linkedin.com/in/daksh-sharma-50998121b" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
            </a>
            <a href="https://linkedin.com/in/daksh-sharma-50998121b" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
            </a>
          </div>
          <p>© 2024 Election Analysis. Made by Daksh Sharma & Team.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
