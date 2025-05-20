const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  enrollment: { type: String, required: true, length: 12 },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },
  league: { type: String, required: true },
  transaction: { type: String, required: true },
  screenshot: { type: String, required: true }, 
  quizScore: { type: Number, default: null },
  timeToSolveMCQ: { type: Number, default: null }
}, { 
  timestamps: true 
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;