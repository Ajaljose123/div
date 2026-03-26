import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API call - adjust to your actual API
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/health');
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDiscoverMore = () => {
    console.log('Discover More clicked');
    // Add navigation logic here
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
    // Add navigation logic here
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cover-page">
      {/* Divine background overlay */}
      <div className="divine-overlay"></div>
      
      {/* Logo */}
      <a href="#" className="logo" onClick={handleLogoClick}>
        <img src="/logo.png" alt="Divine Logo" />
      </a>

      {/* Cross decoration */}
      <div className="cross-decoration">
        <div className="cross-symbol">✝</div>
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        <header className="hero-content">
          <h1 className="main-title">DIVINE</h1>
          <p className="tagline">Walking in Faith, Living in Grace</p>
          
          <div className="scripture-text">
            <p>"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</p>
            <span className="scripture-reference">John 3:16</span>
          </div>

          <div className="devotional-text">
            <p>
              Experience the transformative power of faith through our spiritual journey. 
              Discover biblical wisdom, find strength in prayer, and connect with a community 
              of believers dedicated to spreading God's love and grace.
            </p>
          </div>

          <div className="cta-section">
            <button className="primary-btn" onClick={handleDiscoverMore}>
              Begin Your Journey
            </button>
            <button className="secondary-btn" onClick={handleLearnMore}>
              Explore Scripture
            </button>
          </div>
        </header>
      </div>
      
      {/* Angelic decoration */}
      <div className="angelic-decoration">
        <img src="/download.png" alt="Divine Light" />
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default Home;
