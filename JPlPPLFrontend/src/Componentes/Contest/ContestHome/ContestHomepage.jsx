import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profilepic from '../../../assets/playerprofile.png';
import profilepic2 from '../../../assets/playerprofile2.png';
import './ContestHomepage.css';

const ContestHomepage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const userDetails = {
    name: user?.name || 'N/A',
    enrollment: user?.enrollment || 'N/A',
    email: user?.email || 'N/A',
    college: user?.college || 'N/A',
    year: user?.year || 'N/A',
    branch: user?.branch || 'N/A',
    participation: user?.league || 'Unassigned',
  };

  const handleAttemptQuiz = () => {
    navigate('/contestquiz', { state: { user: userDetails } , replace: true});
  };

  // Determine contest title based on league
  const contestTitle =
    userDetails.participation === 'Java Premier League (JPL)'
      ? 'TrialOver: Java Premier League'
      : 'TrialOver: Python Premier League';

  const contestPic = userDetails.participation === 'Java Premier League (JPL)' ? profilepic : profilepic2;

  if (loading) {
    return (
      <div className="dark-container loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-user-card"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  }

  return (
    <div className="dark-container">
      <header className="dark-header">
        <h1>🚀 {contestTitle}</h1>
      </header>

      <main className="dark-main">
        <div
          className="user-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="user-avatar glow-effect">
            <img src={contestPic} alt="User Avatar" />
            {/* Fallback initial if image fails to load */}
            {/* <span className="fallback-initial">{userDetails.name.charAt(0).toUpperCase()}</span> */}
          </div>
          <div className="user-details">
            <h2>{userDetails.name}</h2>
            <p><strong>Enrollment:</strong> {userDetails.enrollment}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>College:</strong> {userDetails.college}</p>
            <p><strong>Year:</strong> {userDetails.year}</p>
            <p><strong>Branch:</strong> {userDetails.branch}</p>
            <p><strong>League:</strong> <span className="highlight">{userDetails.participation}</span></p>
          </div>
        </div>

        <button
          className={`join-button ${isHovered ? 'pulse' : ''}`}
          onClick={handleAttemptQuiz}
        >
          🔥 Join Quiz
        </button>
      </main>
    </div>
  );
};

export default ContestHomepage;