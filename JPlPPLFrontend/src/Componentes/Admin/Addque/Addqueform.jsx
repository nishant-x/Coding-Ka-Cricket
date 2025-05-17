import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader component
import { toast, ToastContainer } from "react-toastify"; // Correct import
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./Addqueform.css"; // Import the CSS file

const Addqueform = () => {
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [selectedLeague, setSelectedLeague] = useState(""); // Track selected league

  // Handle league selection
  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };

  // Handle changes for input and expected output
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  // Add a new test case
  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };

  // Remove a specific test case
  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    const questionData = {
      league: selectedLeague,
      question: e.target.question.value,
      description: e.target.description.value,
      testCases,
    };

    try {
      const response = await fetch("http://localhost:5000/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Question added successfully!"); // Success notification
        setLoading(false); // Stop loading after successful submission
        window.location = "/allquestions"; // Redirect to the questions page
      } else {
        setLoading(false); // Stop loading on error
        toast.error(data.message || "Error adding question! Please try again."); // Error notification
      }
    } catch (err) {
      setLoading(false); // Stop loading on error
      toast.error("Error submitting form! Please try again."); // Error notification
    }
  };

  return (
    <div className="addque-form-container">
      <h2 className="addque-form-title">Add Questions</h2>

      <form className="addque-form-add-form" onSubmit={handleSubmit}>
        <label className="addque-form-label" htmlFor="league">
          League:
        </label>
        <select
          className="addque-form-input"
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

        <label className="addque-form-label" htmlFor="question">
          Question Title:
        </label>
        <input
          className="addque-form-input"
          type="text"
          id="question"
          name="question"
          required
        />

        <label className="addque-form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="addque-form-textarea"
          id="description"
          name="description"
          required
        />

        <label className="addque-form-label">Test Cases:</label>
        {testCases.map((testCase, index) => (
          <div key={index} className="addque-testcase-group">
            <input
              className="addque-form-input"
              type="text"
              placeholder={`Input ${index + 1}`}
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
              required
            />
            <input
              className="addque-form-input"
              type="text"
              placeholder={`Expected Output ${index + 1}`}
              value={testCase.expectedOutput}
              onChange={(e) =>
                handleTestCaseChange(index, "expectedOutput", e.target.value)
              }
              required
            />
            {testCases.length > 1 && (
              <button
                type="button"
                className="addque-remove-btn"
                onClick={() => removeTestCase(index)}
              >
                <IoIosRemoveCircleOutline />
              </button>
            )}
          </div>
        ))}

        <button type="button" className="addque-testcaseadd-btn" onClick={addTestCase}>
          + Add Test Case
        </button>

        <div className="addque-submit-container">
          {/* Show loader when loading */}
          {loading ? (
            <ClipLoader color="#007bff" size={40} />
          ) : (
            <input className="addque-form-submit" type="submit" value="Submit" />
          )}
        </div>
      </form>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default Addqueform;
