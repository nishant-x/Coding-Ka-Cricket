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

 const handleDownload = async (e) => {
  e.preventDefault();
  try {
    const pdfUrl = "/Result/JPL-Teams.pdf"; 
    
    const response = await fetch(pdfUrl, {
      credentials: 'include', // Include cookies if needed
    });
    
    if (!response.ok) throw new Error("Failed to fetch PDF");
    
    const blob = await response.blob();
    
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "JPL-Result.pdf"; // <-- Ensures correct filename
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: Open PDF in new tab
    window.open(pdfUrl, "_blank");
  }
};

  if (!isVisible) return null;

  return (
    <div className="urgent-alert">
      <h2>🚨 URGENT: Java Premier league result is out now check it out 🚨</h2>
      <div className="alert-buttons-container">
        <button 
          onClick={handleDownload} 
          className="download-btn"
        >
          Download Result
        </button>
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
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