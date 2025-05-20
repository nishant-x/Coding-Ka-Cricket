const express = require('express');
const router = express.Router();
const ContactUs = require('../models/ContactUs');

// Route to add a new contact query
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newQuery = new ContactUs({ name, email, subject, message });
    await newQuery.save();

    res.status(201).json({ message: 'Query submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit query' });
  }
});

// Route to get all contact queries
router.get('/', async (req, res) => {
  try {
    const queries = await ContactUs.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact queries' });
  }
});

module.exports = router;
