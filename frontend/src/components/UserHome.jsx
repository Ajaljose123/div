import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.css';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // If no user data, redirect to login
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleProfile = () => {
    // Navigate to profile page (to be created)
    console.log('Navigate to profile');
  };

  const handleSettings = () => {
    // Navigate to settings page (to be created)
    console.log('Navigate to settings');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="user-home">
      {/* Divine background overlay */}
      <div className="divine-overlay"></div>
      
      {/* User welcome section */}
      <div className="welcome-section">
        <div className="welcome-card">
          <h1 className="welcome-title">
            Welcome, {user.firstName}! 🙏
          </h1>
          <p className="welcome-subtitle">
            Thank you for joining our divine community
          </p>
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content">
        <div className="content-grid">
          {/* Daily Devotional */}
          <div className="content-card">
            <h2 className="card-title">Daily Devotional</h2>
            <div className="card-content">
              <p className="scripture-verse">
                "For I know the plans I have for you," declares the LORD, 
                "plans to prosper you and not to harm you, plans to give you hope and a future."
              </p>
              <span className="scripture-reference">Jeremiah 29:11</span>
            </div>
            <button className="card-btn">Read More</button>
          </div>

          {/* Prayer Requests */}
          <div className="content-card">
            <h2 className="card-title">Prayer Requests</h2>
            <div className="card-content">
              <div className="prayer-list">
                <div className="prayer-item">
                  <span className="prayer-person">Sarah M.</span>
                  <span className="prayer-text">Healing and strength</span>
                </div>
                <div className="prayer-item">
                  <span className="prayer-person">John D.</span>
                  <span className="prayer-text">Guidance in career</span>
                </div>
                <div className="prayer-item">
                  <span className="prayer-person">Maria L.</span>
                  <span className="prayer-text">Family unity</span>
                </div>
              </div>
            </div>
            <button className="card-btn">View All Prayers</button>
          </div>

          {/* Community Events */}
          <div className="content-card">
            <h2 className="card-title">Community Events</h2>
            <div className="card-content">
              <div className="event-list">
                <div className="event-item">
                  <div className="event-date">Mar 15</div>
                  <div className="event-details">
                    <h4>Sunday Service</h4>
                    <p>10:00 AM - Main Sanctuary</p>
                  </div>
                </div>
                <div className="event-item">
                  <div className="event-date">Mar 18</div>
                  <div className="event-details">
                    <h4>Bible Study</h4>
                    <p>7:00 PM - Community Hall</p>
                  </div>
                </div>
                <div className="event-item">
                  <div className="event-date">Mar 22</div>
                  <div className="event-details">
                    <h4>Youth Fellowship</h4>
                    <p>6:00 PM - Youth Center</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="card-btn">View Calendar</button>
          </div>

          {/* Spiritual Resources */}
          <div className="content-card">
            <h2 className="card-title">Spiritual Resources</h2>
            <div className="card-content">
              <div className="resource-list">
                <div className="resource-item">
                  <span className="resource-icon">📖</span>
                  <span className="resource-name">Daily Bible</span>
                </div>
                <div className="resource-item">
                  <span className="resource-icon">🙏</span>
                  <span className="resource-name">Prayer Guide</span>
                </div>
                <div className="resource-item">
                  <span className="resource-icon">🎵</span>
                  <span className="resource-name">Worship Songs</span>
                </div>
                <div className="resource-item">
                  <span className="resource-icon">📚</span>
                  <span className="resource-name">Study Materials</span>
                </div>
              </div>
            </div>
            <button className="card-btn">Explore Resources</button>
          </div>
        </div>
      </div>

      {/* User actions sidebar */}
      <div className="user-sidebar">
        <div className="sidebar-card">
          <h3 className="sidebar-title">My Account</h3>
          <div className="sidebar-menu">
            <button onClick={handleProfile} className="sidebar-btn">
              <span className="btn-icon">👤</span>
              <span>Profile</span>
            </button>
            <button onClick={handleSettings} className="sidebar-btn">
              <span className="btn-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button onClick={handleLogout} className="sidebar-btn logout-btn">
              <span className="btn-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
