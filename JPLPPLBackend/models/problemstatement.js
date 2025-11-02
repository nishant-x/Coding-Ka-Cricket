const mongoose = require('mongoose');

// Test case schema definition
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

// Problem statement schema definition
const problemStatementSchema = new mongoose.Schema({
  league: { type: String, required: true }, // New field for league
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [testCaseSchema], // Array of test case objects
});

// Create a model for problem statements
const ProblemStatement = mongoose.model('ProblemStatement', problemStatementSchema);

module.exports = ProblemStatement;
