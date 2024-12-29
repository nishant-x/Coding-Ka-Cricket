import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddQuizForm.css";

const AddQuizForm = () => {
  const [title, setTitle] = useState("");  // State for the quiz title
  const [selectedLeague, setSelectedLeague] = useState("");  // State for the selected league (PPL or JPL)
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: 1,
    },
  ]);

  // Handle changes in title field
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle changes in league dropdown
  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };

  // Handle changes in question fields
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes in options
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOptionIndex: 1 },
    ]);
  };

  // Remove a specific question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle form submission (no backend involved now)
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Quiz added successfully!");
    console.log("Quiz Title:", title);  // Log quiz title
    console.log("Selected League:", selectedLeague);  // Log selected league
    console.log("Quiz Data:", questions);  // Log quiz questions
  };

  return (
    <div className="addquiz-form-container">
      <h2 className="addquiz-form-title">Add Quiz</h2>

      <form className="addquiz-form-add-form" onSubmit={handleSubmit}>
        {/* Title Input */}
        <label className="addquiz-form-label" htmlFor="quiz-title">
          Quiz Title:
        </label>
        <select
          className="addquiz-form-input"
          type="text"
          id="quiz-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter quiz title"
          required
        >
          <option value="">Select Title</option>
          <option value="PPL">Python Premier League (PPL)</option>
          <option value="JPL">Java Premier League (JPL)</option>
        </select>

        {questions.map((quiz, index) => (
          <div key={index} className="addquiz-question-group">
            <label className="addquiz-form-label" htmlFor={`question-${index}`}>
              Question {index + 1}:
            </label>
            <input
              className="addquiz-form-input"
              type="text"
              id={`question-${index}`}
              value={quiz.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              required
            />

            <label className="addquiz-form-label">Options:</label>
            {quiz.options.map((option, oIndex) => (
              <input
                key={oIndex}
                className="addquiz-form-input"
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, oIndex, e.target.value)
                }
                required
              />
            ))}

            <label className="addquiz-form-label" htmlFor={`correct-${index}`}>
              Correct Option Index (1-4):
            </label>
            <input
              className="addquiz-form-input"
              type="number"
              id={`correct-${index}`}
              value={quiz.correctOptionIndex}
              min="1"
              max="4"
              onChange={(e) =>
                handleQuestionChange(index, "correctOptionIndex", +e.target.value)
              }
              required
            />

            {questions.length > 1 && (
              <button
                type="button"
                className="addquiz-remove-btn"
                onClick={() => removeQuestion(index)}
              >
                <IoIosRemoveCircleOutline />
              </button>
            )}
          </div>
        ))}

        <button type="button" className="addquiz-questionadd-btn" onClick={addQuestion}>
          + Add Question
        </button>

        <div className="addquiz-submit-container">
          <input
            className="addquiz-form-submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddQuizForm;
