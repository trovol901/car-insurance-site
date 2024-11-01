const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auth = require('../middleware/auth');

// Register a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Check if user exists
      const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Save user to database
      await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
        name,
        email,
        hashedPassword,
      ]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Fetch user
      const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Check if JWT_SECRET is available
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not defined in .env file.");
        return res.status(500).json({ message: 'Server configuration error' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user[0].id, name: user[0].name, email: user[0].email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  // Retrieve user profile data here
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  // Update user profile logic here
});

module.exports = router;
