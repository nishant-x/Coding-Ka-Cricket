import React, { useState, useEffect } from 'react';
import Slider from './Sliders/Slider.jsx';
import IntroText from './Introduction/IntroText.jsx';
import ProcessFlow from './ProcessFlow/ProcessFlow.jsx';
import Timeline from './Timelines/Timeline.jsx';
import ProfileCard from './Card/ProfileCard.jsx';
import Faq from './Faq/Faq.jsx';
import Mainpage from './mainpage/Mainpage.jsx';
import DeeveloperSlider from './DeveloperCards/DeveloperCards.jsx';
import '../App.css';
import Cursor from "./Cursor/Cursor";
import './UrgentAlert.css'; // Import the CSS file

const UrgentAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="urgent-alert">
      <h2>🚨 URGENT: Registration closing soon! Final deadline approaching! 🚨</h2>
      <p>Register now before it's too late! 🚀</p>
      <p>Last chance to secure your spot - Don't miss out! ⏳</p>
      <button className="close-btn" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

const Homepage = () => {
  return (
    <>
      <Cursor />
      <UrgentAlert />
      
      <div className="MainPage">
        <Mainpage />
      </div>

      <div className="intro">
        <IntroText />
      </div>

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