import React from 'react';
import { useLocation } from 'react-router-dom';
import './ContestHomepage.css'

const ContestHomepage = () => {

  const location = useLocation(); // Access navigation state
  const { user } = location.state || {}; // Retrieve userId from state
  const problems = [
    { id: 1, statement: 'Problem 1: Solve the sorting problem' },
    { id: 2, statement: 'Problem 2: Implement a queue system' },
    { id: 3, statement: 'Problem 3: Design a web scraper' },
    { id: 4, statement: 'Problem 4: Build a REST API' },
    { id: 5, statement: 'Problem 5: Implement a graph traversal algorithm' },
    { id: 6, statement: 'Problem 6: Create a file management system' },
  ];
  
  const userDetails = {
    name: user.name,
    enrollment: user.enrollment,
    email: user.name,
    college: user.name,
    year: user.name,
    branch: user.name,
    participation: user.name,
  };

  return (
    <div className="problem-stat-container">
      {/* Heading */}
      <h1 className="page-heading">Problem Statement</h1>

      <div className="content-container">
        {/* Problem Statements Section (Left Side) */}
        <div className="problem-statements">
          {problems.map((problem) => (
            <div key={problem.id} className="problem-item">
              <div className="problem-text">{problem.statement}</div>
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
