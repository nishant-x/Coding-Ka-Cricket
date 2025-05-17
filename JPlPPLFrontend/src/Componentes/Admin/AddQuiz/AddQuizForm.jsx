import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddQuizForm.css";

const AddQuizForm = () => {
  // const [title, setTitle] = useState("");  // State for the quiz title
  const [selectedLeague, setSelectedLeague] = useState("");  // State for the selected league (PPL or JPL)
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: 1,
    },
  ]);

  // Handle changes in title field
  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

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

  // Handle form submission (send data to the backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const quizData = {
      // title,
      selectedLeague,
      questions,
    };

    try {
      const response = await fetch("http://localhost:5000/addquiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        window.location.href = "/allquestions";  // Navigate to /allquestions route
      }
      else {
        toast.error("Error adding quiz.");
        console.error(data.errors);
      }
    } catch (error) {
      toast.error("Server error.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="addquiz-form-container">
      <h2 className="addquiz-form-title">Add Quiz</h2>

      <form className="addquiz-form-add-form" onSubmit={handleSubmit}>
        
        {/* League Input */}
        <label className="addquiz-form-label" htmlFor="league">
          League:
        </label>
        <select
          className="addquiz-form-input"
          id="league"
          value={selectedLeague}
          onChange={handleLeagueChange}
          required
        >
          <option value="">Select League</option>
          <option value="Python Premier League (PPL)">
            Python Premier League (PPL)
          </option>
          <option value="Java Premier League (JPL)">
            Java Premier League (JPL)
          </option>
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
