import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContestHomepage.css';

const ContestHomepage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(100); // 2 hours in seconds
  const [activeProblem, setActiveProblem] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect if no user data
      return;
    }

    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contesthomepage`);
        setProblems(response.data);
        if (response.data.length > 0) {
          setActiveProblem(response.data[0]._id); // Set first problem as active by default
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load problems. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();

    // Timer for total test duration
    const testTimer = setTimeout(() => {
      alert("Time's up! The test has ended.");
      navigate('/');
    }, 7200000);

    // Countdown timer
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(testTimer);
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
    navigate('/contestquiz', { state: { user: userDetails } });
  };

  const handleEndTest = () => {
    if (window.confirm("Are you sure you want to end the test? Your progress will be saved.")) {
      navigate('/');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProblemClick = (problemId) => {
    setActiveProblem(problemId);
  };

  if (!user) {
    return null; // Already redirecting in useEffect
  }

  if (loading) {
    return (
      <div className="contest-container loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-timer"></div>
        <div className="skeleton-content">
          <div className="skeleton-problems"></div>
          <div className="skeleton-details"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contest-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const activeProblemData = problems.find(problem => problem._id === activeProblem);

  return (
    <div className="contest-container">
      {/* Header Section */}
      <header className="contest-header">
        <h1>TrialOver Challenge</h1>
        <div className="timer-display">
          <span className="timer-icon">⏱️</span>
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="contest-content">
        {/* Problems List Section */}
        <div className="problems-section">
          <h2>Problem Statements</h2>
          <div className="problems-list">
            {problems.map((problem) => (
              <div 
                key={problem._id} 
                className={`problem-item ${activeProblem === problem._id ? 'active' : ''}`}
                onClick={() => handleProblemClick(problem._id)}
              >
                <div className="problem-title">
                  <span className="problem-id">#{problem._id.slice(-4)}</span>
                  {problem.title}
                </div>
                <button className="problem-button">
                  <span className="arrow-icon">➔</span>
                </button>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button className="quiz-button" onClick={handleAttemptQuiz}>
              Attempt Quiz
            </button>
            <button className="end-test-button" onClick={handleEndTest}>
              End Test
            </button>
          </div>
        </div>

        {/* Problem Details Section */}
        {/* <div className="problem-details-section">
          {activeProblemData ? (
            <>
              <h3>{activeProblemData.title}</h3>
              <div className="problem-description">
                <p>{activeProblemData.description}</p>
                {activeProblemData.example && (
                  <div className="problem-example">
                    <h4>Example:</h4>
                    <pre>{activeProblemData.example}</pre>
                  </div>
                )}
              </div>
              <div className="code-editor-placeholder">
                <textarea placeholder="Write your code here..."></textarea>
                <button className="submit-button">Submit Code</button>
              </div>
            </>
          ) : (
            <div className="no-problem-selected">
              <p>Select a problem from the list to view details</p>
            </div>
          )}
        </div> */}

        {/* User Details Section */}
        <div className="user-details-section">
          <h2>Participant Details</h2>
          <div className="user-details-card">
            <div className="user-avatar">
              {userDetails.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Enrollment:</strong> {userDetails.enrollment}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>College:</strong> {userDetails.college}</p>
              <p><strong>Year:</strong> {userDetails.year}</p>
              <p><strong>Branch:</strong> {userDetails.branch}</p>
              <p><strong>League:</strong> {userDetails.participation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestHomepage;