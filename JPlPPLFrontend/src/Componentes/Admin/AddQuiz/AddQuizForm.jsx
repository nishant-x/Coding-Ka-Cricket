import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddQuizForm.css";

const AddQuizForm = () => {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""], // Start with 2 empty options
      isMultipleSelect: false,
      correctOptionIndices: [0], // 0-based index
      creditPoints: 1
    },
  ]);

  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    
    if (field === 'isMultipleSelect') {
      // When switching to single select, keep only the first correct answer
      if (!value && updatedQuestions[index].correctOptionIndices.length > 1) {
        updatedQuestions[index].correctOptionIndices = [
          updatedQuestions[index].correctOptionIndices[0]
        ];
      }
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswersChange = (qIndex, e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions, 
      option => parseInt(option.value)
    );
    
    // Ensure at least one option is selected
    if (selectedOptions.length === 0) {
      toast.warning("Please select at least one correct answer");
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctOptionIndices = selectedOptions;
    setQuestions(updatedQuestions);
  };

  const handleCreditPointsChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].creditPoints = Math.max(1, parseInt(value) || 1);
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    if (questions[qIndex].options.length >= 6) {
      toast.warning("Maximum 6 options allowed per question");
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    const optionCount = updatedQuestions[qIndex].options.length;
    
    if (optionCount <= 2) {
      toast.warning("Questions must have at least 2 options");
      return;
    }
    
    // Remove the option
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    
    // Adjust correct answers if needed
    const correctIndices = updatedQuestions[qIndex].correctOptionIndices;
    updatedQuestions[qIndex].correctOptionIndices = correctIndices
      .filter(i => i !== oIndex)
      .map(i => i > oIndex ? i - 1 : i);
    
    // Ensure at least one correct answer remains
    if (updatedQuestions[qIndex].correctOptionIndices.length === 0) {
      updatedQuestions[qIndex].correctOptionIndices = [0];
    }
    
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { 
        question: "", 
        options: ["", ""], // Start with 2 empty options
        isMultipleSelect: false,
        correctOptionIndices: [0],
        creditPoints: 1 
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    } else {
      toast.warning("You need to have at least one question");
    }
  };

  const validateForm = () => {
    if (!selectedLeague) {
      toast.error("Please select a league");
      return false;
    }

    for (const [qIndex, question] of questions.entries()) {
      if (!question.question.trim()) {
        toast.error(`Question ${qIndex + 1} is required`);
        return false;
      }

      // Filter out empty options
      const validOptions = question.options.filter(opt => opt.trim() !== "");
      
      if (validOptions.length < 2) {
        toast.error(`Question ${qIndex + 1} needs at least 2 options`);
        return false;
      }

      // Validate correct answers
      if (question.correctOptionIndices.length === 0) {
        toast.error(`Question ${qIndex + 1} must have at least one correct answer`);
        return false;
      }

      // Check if any correct answer points to an empty option
      for (const correctIndex of question.correctOptionIndices) {
        if (!question.options[correctIndex]?.trim()) {
          toast.error(`Question ${qIndex + 1} has correct answer pointing to empty option`);
          return false;
        }
      }

      // Validate single select has exactly one correct answer
      if (!question.isMultipleSelect && question.correctOptionIndices.length !== 1) {
        toast.error(`Question ${qIndex + 1} must have exactly one correct answer for single-select questions`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Prepare data for submission
    const quizData = {
      selectedLeague,
      questions: questions.map(question => ({
        question: question.question.trim(),
        options: question.options.filter(opt => opt.trim() !== ""),
        isMultipleSelect: question.isMultipleSelect,
        correctOptionIndices: question.correctOptionIndices,
        creditPoints: question.creditPoints
      })),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addquiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        window.location.href = "/allquestions";
      } else {
        toast.error(data.message || "Error adding quiz.");
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

        {questions.map((quiz, qIndex) => {
          const validOptions = quiz.options.filter(opt => opt.trim() !== "");
          
          return (
            <div key={qIndex} className="addquiz-question-group">
              <div className="addquiz-question-header">
                <h3>Question {qIndex + 1}</h3>
                <button
                  type="button"
                  className="addquiz-remove-btn"
                  onClick={() => removeQuestion(qIndex)}
                >
                  <IoIosRemoveCircleOutline /> Remove Question
                </button>
              </div>

              <label className="addquiz-form-label" htmlFor={`question-${qIndex}`}>
                Question Text:
              </label>
              <input
                className="addquiz-form-input"
                type="text"
                id={`question-${qIndex}`}
                value={quiz.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "question", e.target.value)
                }
                required
              />

              <label className="addquiz-form-label">
                Options:
                <button 
                  type="button" 
                  className="addquiz-add-option-btn"
                  onClick={() => addOption(qIndex)}
                  disabled={quiz.options.length >= 6}
                >
                  + Add Option
                </button>
              </label>
              
              {quiz.options.map((option, oIndex) => (
                <div key={oIndex} className="addquiz-option-group">
                  <input
                    className="addquiz-form-input"
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                  />
                  {quiz.options.length > 2 && (
                    <button
                      type="button"
                      className="addquiz-remove-option-btn"
                      onClick={() => removeOption(qIndex, oIndex)}
                      title="Remove option"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <div className="addquiz-radio-group">
                <label className="addquiz-form-label">Answer Type:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`answerType-${qIndex}`}
                      checked={!quiz.isMultipleSelect}
                      onChange={() => handleQuestionChange(qIndex, "isMultipleSelect", false)}
                    />
                    Single Correct Answer
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`answerType-${qIndex}`}
                      checked={quiz.isMultipleSelect}
                      onChange={() => handleQuestionChange(qIndex, "isMultipleSelect", true)}
                    />
                    Multiple Correct Answers
                  </label>
                </div>
              </div>

              <label className="addquiz-form-label">
                {quiz.isMultipleSelect ? 'Correct Options (select multiple)' : 'Correct Option'}
              </label>
              <select
                multiple={quiz.isMultipleSelect}
                className="addquiz-form-input"
                value={quiz.correctOptionIndices.map(String)}
                onChange={(e) => handleCorrectAnswersChange(qIndex, e)}
                required
                size={Math.min(4, validOptions.length) || 1}
              >
                {quiz.options.map((opt, oIndex) => (
                  opt.trim() && (
                    <option 
                      key={oIndex} 
                      value={oIndex}
                    >
                      {opt.trim()}
                    </option>
                  )
                ))}
              </select>
              {quiz.isMultipleSelect && (
                <small>Hold CTRL/CMD to select multiple options</small>
              )}

              <label className="addquiz-form-label">
                Credit Points:
              </label>
              <input
                className="addquiz-form-input"
                type="number"
                min="1"
                value={quiz.creditPoints}
                onChange={(e) => handleCreditPointsChange(qIndex, e.target.value)}
                required
              />
            </div>
          );
        })}

        <button 
          type="button" 
          className="addquiz-questionadd-btn" 
          onClick={addQuestion}
        >
          + Add Question
        </button>

        <div className="addquiz-submit-container">
          <button
            className="addquiz-form-submit"
            type="submit"
          >
            Submit Quiz
          </button>
        </div>
      </form>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default AddQuizForm;