const express = require('express');
const QuizData = require('../models/Quiz.js');
const Registration = require('../models/Registration.js');
const router = express.Router();

// Add quiz POST route
router.post('/addquiz', async (req, res) => {
  try {
    const quizData = req.body;

    // Validate input
    if (!quizData.selectedLeague || !quizData.questions || quizData.questions.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Validate each question
    for (const [index, question] of quizData.questions.entries()) {
      if (!question.question?.trim()) {
        return res.status(400).json({
          success: false,
          message: `Question ${index + 1} text is required`,
        });
      }

      const validOptions = question.options.filter(opt => opt?.trim() !== "");

      if (validOptions.length < 2) {
        return res.status(400).json({
          success: false,
          message: `Question ${index + 1} needs at least 2 valid options`,
        });
      }

      if (!question.correctOptionIndices || question.correctOptionIndices.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Question ${index + 1} must have at least one correct answer`,
        });
      }

      const isMultiple = question.isMultipleSelect;
      if (!isMultiple && question.correctOptionIndices.length !== 1) {
        return res.status(400).json({
          success: false,
          message: `Question ${index + 1} is single-select but has multiple correct answers`,
        });
      }

      for (const correctIndex of question.correctOptionIndices) {
        if (correctIndex < 0 || correctIndex >= 6) {
          return res.status(400).json({
            success: false,
            message: `Question ${index + 1} has invalid correct answer index`,
          });
        }
      }

      if (!question.creditPoints || question.creditPoints < 1) {
        return res.status(400).json({
          success: false,
          message: `Question ${index + 1} must have at least 1 credit point`,
        });
      }
    }

    const newQuiz = new QuizData({
      selectedLeague: quizData.selectedLeague,
      questions: quizData.questions.map(q => ({
        question: q.question,
        options: q.options.filter(opt => opt?.trim() !== ""),
        isMultipleSelect: q.isMultipleSelect,
        correctOptionIndices: q.correctOptionIndices,
        creditPoints: q.creditPoints,
      })),
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: 'Quiz added successfully!',
      data: newQuiz,
    });
  } catch (error) {
    console.error('Error adding quiz:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the quiz.',
      error: error.message,
    });
  }
});

// Get quiz by league
router.get('/getquiz/:league', async (req, res) => {
  const league = req.params.league;

  try {
    const quizData = await QuizData.findOne({ selectedLeague: league });

    if (quizData && quizData.questions && quizData.questions.length > 0) {
      const shuffled = quizData.questions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 6);

      res.json({ success: true, quiz: selectedQuestions });
    } else {
      res.status(404).json({ success: false, message: 'Quiz data not found for this league.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching quiz data', error });
  }
});

// Get all quizzes
router.get('/allquizzes', async (req, res) => {
  try {
    const quizzes = await QuizData.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete quiz
router.delete('/delete-quiz/:id', async (req, res) => {
  const { id } = req.params;
  const { league } = req.body;

  try {
    const quiz = await QuizData.findOneAndDelete({ _id: id, selectedLeague: league });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found or league mismatch' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit quiz score
router.post('/submit-quiz-score', async (req, res) => {
  try {
    const { enrollment, score, timeToSolveMCQ } = req.body;

    const updatedRegistration = await Registration.findOneAndUpdate(
      { enrollment },
      { quizScore: score, timeToSolveMCQ },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({
      message: 'Score and time updated successfully',
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error('Error updating quiz score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
