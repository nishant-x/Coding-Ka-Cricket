const mongoose = require('mongoose');

const quizDataSchema = new mongoose.Schema({
  selectedLeague: {
    type: String,
    required: true,
    enum: ['Python Premier League (PPL)', 'Java Premier League (JPL)'],
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
            // Allow between 2 and 6 options
            return v.length >= 2 && v.length <= 6;
          },
          message: 'Each question must have between 2 and 6 options.',
        },
      },
      isMultipleSelect: {
        type: Boolean,
        default: false,
        required: true,
      },
      correctOptionIndices: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            // Ensure at least one correct answer and all indices are valid (0-based)
            return v.length > 0 && v.every(index => index >= 0 && index <= 5);
          },
          message: 'Each question must have at least one correct answer (0-based index 0–5).',
        },
      },
      creditPoints: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      }
    },
  ],
});

const QuizData = mongoose.model('QuizData', quizDataSchema);

module.exports = QuizData;