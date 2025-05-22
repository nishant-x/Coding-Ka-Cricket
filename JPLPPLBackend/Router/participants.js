const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const participants = await Registration.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

module.exports = router;
