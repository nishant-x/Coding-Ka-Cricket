const express = require('express');
const ProblemStatement = require('../models/Addqueform.js');

const router = express.Router();

// Add a new problem statement
router.post('/add', async (req, res) => {
  const { question, description, testCases } = req.body;
  const newProblem = new ProblemStatement({ title: question, description, testCases });

  try {
    await newProblem.save();
    res.status(201).json({ message: 'Problem added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add problem' });
  }
});

// Fetch all problem statements
router.get('/all', async (req, res) => {
  try {
    const problems = await ProblemStatement.find({}, 'title description');
    res.status(200).json(problems);
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Delete a problem statement
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await ProblemStatement.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(200).json({ message: 'Problem removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete problem' });
  }
});

module.exports = router;