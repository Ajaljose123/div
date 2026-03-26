const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Home route (public)
router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Divine Project API',
    status: 'active'
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone_number: user.phone_number
      }
    });
  });
});

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, phone_number } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `INSERT INTO users (username, email, password, phone_number, created_at, updated_at) 
                   VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`;
    
    db.run(query, [username, email, hashedPassword, phone_number], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      const token = jwt.sign(
        { id: this.lastID, email, username },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: {
          id: this.lastID,
          email,
          username,
          phone_number
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile route (protected)
router.get('/profile', authenticateToken, (req, res) => {
  const query = `
    SELECT u.id, u.username, u.email, u.phone_number, u.created_at, u.updated_at,
           p.bio, p.birth_date, p.location, p.website
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.id = ?
  `;

  db.get(query, [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        bio: user.bio,
        birth_date: user.birth_date,
        location: user.location,
        website: user.website,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    });
  });
});

// Update profile (protected)
router.put('/profile', authenticateToken, (req, res) => {
  const { bio, birth_date, location, website } = req.body;
  
  const query = `
    INSERT OR REPLACE INTO user_profiles (user_id, bio, birth_date, location, website)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [req.user.id, bio, birth_date, location, website], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      message: 'Profile updated successfully',
      profile: {
        user_id: req.user.id,
        bio,
        birth_date,
        location,
        website
      }
    });
  });
});

module.exports = router;
