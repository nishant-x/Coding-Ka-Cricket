import React, { useState, useEffect } from 'react';
import Slider from './Sliders/Slider.jsx';
import IntroText from './Introduction/IntroText.jsx';
import ProcessFlow from './ProcessFlow/ProcessFlow.jsx';
import Timeline from './Timelines/Timeline.jsx';
import ProfileCard from './Card/ProfileCard.jsx';
import Faq from './Faq/Faq.jsx';
import Mainpage from './mainpage/Mainpage.jsx';
import DeeveloperSlider from './DeveloperCards/DeveloperCards.jsx'
import '../App.css'
import Cursor from "./Cursor/Cursor";

// New UrgentAlert component
const UrgentAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Auto-close after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      zIndex: 1000,
      // maxWidth: '80%',
      animation: 'pulse 2s infinite',
    }}>
      <h2 style={{ marginTop: 0, fontSize: '1.5em' }}>🚨 URGENT: Registration closing soon! Final deadline approaching! 🚨</h2>
      <p style={{ marginBottom: '10px', fontSize: '1.2em' }}>Register now before it's too late! 🚀</p>
      <p style={{ marginBottom: '10px', fontSize: '1.2em' }}>Last chance to secure your spot - Don't miss out! ⏳</p>
      <button 
        onClick={handleClose}
        style={{
          backgroundColor: 'white',
          color: '#ff4444',
          border: 'none',
          padding: '5px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '10px',
        }}
      >
        Close
      </button>
    </div>
  );
};

const Homepage = () => {
  return (
    <>
      <Cursor />
      {/* Add the UrgentAlert component here */}
      <UrgentAlert />
      
      <div className="MainPage">
        <Mainpage />
      </div>

      <div className="intro">
        <IntroText />
      </div>

      {/* <div className="MainTimeline">
        <Timeline />
      </div> */}

      <div className="MainFlow">
        <ProcessFlow />
      </div>

      <div className="MainFaq">
        <Faq />
      </div>

      <div className="MainCards">
        <ProfileCard />
      </div>
      
      <div className="MainCoders">
        <DeeveloperSlider/>
      </div>
    </>
  );
};

export default Homepage;