import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllQuestions.css"; // Import the updated CSS file

const Allquestions = () => {
  const [problems, setProblems] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProblems();
    fetchQuizzes();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allquestions");
      setProblems(response.data);
    } catch (error) {
      console.error("There was an error fetching the problems!", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allquizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("There was an error fetching the quizzes!", error);
    }
  };

  const removeProblem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/delete-question/${id}`);
      console.log(response.data); // Log the response for debugging
      fetchProblems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error removing the problem:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const removeQuiz = async (id, league) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/delete-quiz/${id}`, {
        data: { league },
      });
      fetchQuizzes();
    } catch (error) {
      console.error("Error removing the quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="allquestions_all_questions_container">
        <h1 className="allquestions_page_title">All Problem Statements</h1>
        {loading && (
          <div className="allquestions_loader_container">
            <div className="allquestions_spinner"></div>
          </div>
        )}
        <div className="allquestions_problem_cards">
          {problems.map((problem) => (
            <div key={problem._id} className="allquestions_Quecard">
              <h3 className="allquestions_card_title">Title: {problem.title}</h3>
              <p className="allquestions_card_description">
                Description: {problem.description}
              </p>
              <div className="allquestions_card_actions">
                <button
                  className="allquestions_remove_btn"
                  onClick={() => removeProblem(problem._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="allquestions_addquestionformbtn">
          <button
            onClick={() => (window.location.href = "/add-question")}
          >
            Add New Problem
          </button>
        </div>
      </div>

      {/* Quizzes Section */}
      <div className="allquestions_all_questions_main_container"> 
        <div className="allquestions_all_questions_container">
        <h1 className="allquestions_page_title">All Quizzes</h1>
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="allquestions_Quecard">
            <h3 className="allquestions_card_title">
              League: {quiz.selectedLeague}
            </h3>
            {quiz.questions.map((q, index) => (
              <div key={index} className="allquestions_quiz_question">
                <p>
                  <strong>Q{index + 1}:</strong> {q.question}
                </p>
                <ul>
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: q.correctOptionIndex === i + 1 ? "bold" : "normal",
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="allquestions_card_actions">
              <button
                className="allquestions_remove_btn"
                onClick={() => removeQuiz(quiz._id, quiz.selectedLeague)}
              >
                Delete Quiz
              </button>
            </div>
          </div>
        ))}
        <div className="allquestions_addquizformbtn">
          <button onClick={() => (window.location.href = "/addquiz")}>
            Add New Quiz
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Allquestions;
