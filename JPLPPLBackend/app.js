// app.js (or server.js)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const connect = require('./db/conn'); // MongoDB connection
const Registration = require('./models/Registration');
const ProblemStatement = require('./models/Addqueform.js');

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:5174' // Replace with your frontend URL
// }));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload storage configuration (using multer)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST route for handling registration form data
app.post('/register', upload.single('screenshot'), async (req, res) => {
  const { name, email, enrollment, college, branch, year, section, league, transaction } = req.body;
  const screenshot = req.file; // The uploaded screenshot file

  if (!screenshot) {
    return res.status(400).json({ error: 'Screenshot is required' });
  }

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
      screenshot: screenshot.path, // Save the file path in the database
    });

    await newRegistration.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// POST route for adding new problem statement
app.post('/add-question', async (req, res) => {
  const { question, description, testCases } = req.body; // Changed 'title' to 'question'

  const newProblem = new ProblemStatement({ title: question, description, testCases }); // Map 'question' to 'title'

  try {
    await newProblem.save();
    res.status(201).json({ message: 'Problem added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add problem' });
  }
});

// GET route for fetching all problem statements
app.get('/allquestions', async (req, res) => {
  try {
    // Fetch only title and description from the database
    const problems = await ProblemStatement.find({}, 'title description');
    res.status(200).json(problems);
  } catch (err) {
    console.error("Error fetching all questions:", err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// PUT route for updating problem statement
app.delete("/delete-question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await ProblemStatement.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.status(200).json({ message: "Problem removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete problem" });
  }
});

app.post('/contestlogin', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({
      email,
      enrollment
    });

    if (user) {
      res.status(200).json({ message: 'Welcome to contest page', userId: user._id });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

app.post('/adminlogin', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({
      email,
      enrollment
    });

    if (user) {
      res.status(200).json({ message: 'Welcome to contest page', userId: user._id });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
