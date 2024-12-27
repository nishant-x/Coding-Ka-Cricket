import React, { useEffect, useState } from "react";

import "./AllQuestions.css"; // Import the updated CSS file

const Allquestions = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allquestions");
      setProblems(response.data); // Set the problem data into state
    } catch (error) {
      console.error("There was an error fetching the problems!", error);
    }
  };

  const removeProblem = async (id) => {
    setLoading(true); // Set loading to true when deletion starts
    try {
      await axios.delete(`http://localhost:5000/delete-question/${id}`); // Add delete route in backend
      fetchProblems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error removing the problem:", error);
    } finally {
      setLoading(false); // Set loading to false after deletion is done
    }
  };

  return (
    <div className="allquestions_all_questions_container">
      <h1 className="allquestions_page_title">All Problem Statements</h1>

      {/* Show loader when loading */}
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
    </div>
  );
};

export default Allquestions;
