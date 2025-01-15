import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContestHomepage.css';

const ContestHomepage = () => {
  const location = useLocation(); // Access navigation state
  const { user } = location.state || {}; // Retrieve user from state

  const [problems, setProblems] = useState([]); // Declare state to hold problems
  const [loading, setLoading] = useState(true); // Loading state for fetching problems
  const [timeLeft, setTimeLeft] = useState(7200); // Time left in seconds (2 hours)
  const navigate = useNavigate(); // Initialize navigate function

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

    // Set a timer for 2 hours (7200000 milliseconds)
    const timer = setTimeout(() => {
      alert("Time's up! Redirecting to the homepage.");
      navigate('/home'); // Navigate to homepage after time is up
    }, 7200000); // 2 hours in milliseconds

    // Countdown timer every second
    const countdown = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(countdown); // Stop countdown when time is up
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    // Cleanup the timers if the component is unmounted or the user state changes
    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [user, navigate]);

  const userDetails = {
    name: user?.name,
    enrollment: user?.enrollment,
    email: user?.email,
    college: user?.college,
    year: user?.year,
    branch: user?.branch,
    participation: user?.league,
  };

  const handleAttemptQuiz = () => {
    navigate('/contestquiz', { state: { user: userDetails } }); // Pass user data to the contestquiz page
  };

  const handleEndTest = () => {
    alert("Test ended! Redirecting to the homepage.");
    navigate('/'); // Redirect to homepage when the test ends
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div className="contesthome-problem-stat-container">
      {/* Countdown Timer Display */}
      <div className="countdown-timer">{formatTime(timeLeft)}</div>

      {/* Heading */}
      <h1 className="contesthome-page-heading">Problem Statement</h1>

      <div className="contesthome-content-container">
        {/* Problem Statements Section (Left Side) */}
        <div className="contesthome-problem-statements">
          {problems.map((problem) => (
            <div key={problem._id} className="contesthome-problem-item">
              <div className="contesthome-problem-text">{problem.title}</div>
              <button className="contesthome-compile-button">{'>'}</button>
            </div>
          ))}
          <button className="contesthome-attempt-quiz-btn" onClick={handleAttemptQuiz}>
            Attempt Quiz
          </button>
          <button className="contesthome-end-test-btn" onClick={handleEndTest}>
            End Test
          </button>
        </div>

        {/* Partition */}
        <div className="contesthome-partition"></div>

        {/* User Details Section (Right Side) */}
        <div className="contesthome-user-details">
          <h2>Student Details</h2>
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
