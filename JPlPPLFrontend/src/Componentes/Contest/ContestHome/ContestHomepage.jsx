import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ContestHomepage.css';

const ContestHomepage = () => {
  const location = useLocation(); // Access navigation state
  const { user } = location.state || {}; // Retrieve user from state

  const [problems, setProblems] = useState([]); // Declare state to hold problems
  const [loading, setLoading] = useState(true); // Loading state for fetching problems

  useEffect(() => {
    if (!user) return; // Stop fetching if user is not defined

    // Fetch problems data
    axios
      .get(`http://localhost:5000/contesthomepage`) // Correct template literal usage
      .then(response => {
        setProblems(response.data); // Set fetched problems
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [user]);

  const userDetails = {
    name: user?.name,
    enrollment: user?.enrollment,
    email: user?.email,
    college: user?.college,
    year: user?.year,
    branch: user?.branch,
    participation: user?.league,
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

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
