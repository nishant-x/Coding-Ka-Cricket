import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader component
import { toast, ToastContainer } from "react-toastify"; // Correct import
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./Addqueform.css"; // Import the CSS file

const Addqueform = () => {
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [loading, setLoading] = useState(false); // Track loading state

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
        window.location.reload(); // Refresh the page after successful submission
      } else {
        setLoading(false); // Stop loading on error
        toast.error("Error adding question! Please try again."); // Error notification
      }
    } catch (err) {
      setLoading(false); // Stop loading on error
      toast.error("Error submitting form! Please try again."); // Error notification
    }
  };

  return (
    <div className="Addqueform_FormContainer">
      <h2 className="Addqueform_FormTitle">Add Questions</h2>

      <form className="Addqueform_AddForm" onSubmit={handleSubmit}>
        <label className="Addqueform_FormLabel" htmlFor="question">
          Question Title:
        </label>
        <input
          className="Addqueform_FormInput"
          type="text"
          id="question"
          name="question"
          required
        />

        <label className="Addqueform_FormLabel" htmlFor="description">
          Description:
        </label>
        <textarea
          className="Addqueform_FormTextarea"
          id="description"
          name="description"
          required
        />

        <label className="Addqueform_FormLabel">Test Cases:</label>
        {testCases.map((testCase, index) => (
          <div key={index} className="Addqueform_TestcaseGroup">
            <input
              className="Addqueform_FormInput"
              type="text"
              placeholder={`Input ${index + 1}`}
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
              required
            />
            <input
              className="Addqueform_FormInput"
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
                className="Addqueform_RemoveBtn"
                onClick={() => removeTestCase(index)}
              >
                <IoIosRemoveCircleOutline />
              </button>
            )}
          </div>
        ))}

        <button type="button" className="Addqueform_TestcaseAddBtn" onClick={addTestCase}>
          + Add Test Case
        </button>

        <div className="Addqueform_SubmitContainer">
          {/* Show loader when loading */}
          {loading ? (
            <ClipLoader color="#007bff" size={40} />
          ) : (
            <input className="Addqueform_FormSubmit" type="submit" value="Submit" />
          )}
        </div>
      </form>

      {/* Corrected ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default Addqueform;
