import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      const user = JSON.parse(userData);
      setUser(user);
      
      // Check if user is admin
      if (user.username === 'admin') {
        setUserRole('admin');
      } else {
        setUserRole('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Divine Project
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {isAuthenticated ? (
            <div className="nav-auth">
              <span className="nav-user">Welcome, {user?.firstName || user?.username}</span>
              {userRole === 'admin' ? (
                <Link to="/admin" className="nav-admin-btn">Dashboard</Link>
              ) : (
                <Link to="/user-home" className="nav-user-home-btn">My Home</Link>
              )}
              <button onClick={handleLogout} className="nav-logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
