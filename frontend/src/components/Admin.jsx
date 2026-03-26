import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Divine Project Admin Panel</p>
      </div>
      
      <div className="admin-content">
        <div className="admin-card">
          <h2>Dashboard Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Active Sessions</h3>
              <p className="stat-number">1</p>
            </div>
            <div className="stat-card">
              <h3>System Status</h3>
              <p className="stat-status">Online</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Manage Users</button>
            <button className="action-btn">View Reports</button>
            <button className="action-btn">System Settings</button>
            <button className="action-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
