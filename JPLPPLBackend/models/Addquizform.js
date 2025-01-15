const mongoose = require('mongoose');

const quizDataSchema = new mongoose.Schema({
  selectedLeague: {
    type: String,
    required: true,
    enum: ['Python Premier League (PPL)', 'Java Premier League (JPL)'], // Restrict to specific leagues
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
        validate: {
          validator: function (v) {
            return v.length === 4; // Ensure exactly 4 options
          },
          message: 'Each question must have exactly 4 options.',
        },
      },
      correctOptionIndex: {
        type: Number,
        required: true,
        min: 1,
        max: 4, // Ensure index is between 1 and 4
      },
    },
  ],
});

const QuizData = mongoose.model('QuizData', quizDataSchema);

module.exports = QuizData;
