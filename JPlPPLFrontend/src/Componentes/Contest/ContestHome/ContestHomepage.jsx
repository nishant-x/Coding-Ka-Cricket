import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ContestHomepage.css';

const ContestHomepage = () => {

  const location = useLocation(); // Access navigation state
  const { user } = location.state || {}; // Retrieve user from state

  const [problems, setProblems] = useState([]); // State to hold problem data

  useEffect(() => {
    fetchProblems(); // Fetch problems when component mounts
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allquestions");
      setProblems(response.data); // Set the problem data into state
    } catch (error) {
      console.error("There was an error fetching the problems!", error);
    }
  };

  // Ensure you're using correct fields from the user object
  const userDetails = {
    name: user?.name,
    enrollment: user?.enrollment,
    email: user?.email,
    college: user?.college,
    year: user?.year,
    branch: user?.branch,
    participation: user?.participation,
  };

  return (
    <div className="problem-stat-container">
      {/* Heading */}
      <h1 className="page-heading">Problem Statement</h1>

      <div className="content-container">
        {/* Problem Statements Section (Left Side) */}
        <div className="problem-statements">
          {problems.map((problem) => (
            <div key={problem._id} className="problem-item">
              <div className="problem-text">{problem.title}</div>
              <button className="compile-button">{'>'}</button>
            </div>
          ))}
        </div>

        {/* Partition */}
        <div className="partition"></div>

        {/* User Details Section (Right Side) */}
        <div className="user-details">
          <h2>User Details</h2>
          <ul>
            <li><strong>Name:</strong> {userDetails.name}</li>
            <li><strong>Enrollment:</strong> {userDetails.enrollment}</li>
            <li><strong>Email:</strong> {userDetails.email}</li>
            <li><strong>College:</strong> {userDetails.college}</li>
            <li><strong>Year:</strong> {userDetails.year}</li>
            <li><strong>Branch:</strong> {userDetails.branch}</li>
            <li><strong>Participation League:</strong> {userDetails.participation}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContestHomepage;
