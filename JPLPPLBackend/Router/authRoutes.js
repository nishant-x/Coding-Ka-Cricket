const express = require('express');
const Registration = require('../models/Registration');

const router = express.Router();

// Contest login
router.post('/contest', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({ email, enrollment });

    if (user) {
      res.status(200).json({ message: 'Welcome to contest page', user });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Admin login
router.post('/admin', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({ email, enrollment });

    if (user) {
      res.status(200).json({ message: 'Welcome to admin page', userId: user._id });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;