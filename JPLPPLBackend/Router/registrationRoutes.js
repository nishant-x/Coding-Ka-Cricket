const express = require('express');
const multer = require('multer');
const path = require('path');
const Registration = require('../models/Registration');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Handle registration form data
router.post('/', upload.single('screenshot'), async (req, res) => {
  const { name, email, enrollment, college, branch, year, section, league, transaction } = req.body;
  const screenshot = req.file;
  if (!screenshot) return res.status(400).json({ error: 'Screenshot is required' });

  try {
    const newRegistration = new Registration({
      name,
      email,
      enrollment,
      college,
      branch,
      year,
      section,
      league,
      transaction,
      screenshot: screenshot.path,
    });
    await newRegistration.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
