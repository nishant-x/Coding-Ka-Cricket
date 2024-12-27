import React, { useState, useEffect } from 'react';
import Sliderimg01 from "../../assets/Sliderimages/Sliderimg01.jpg";
import Sliderimg02 from "../../assets/Sliderimages/Sliderimg02.png";
import Sliderimg03 from "../../assets/Sliderimages/Sliderimg03.png";
import Sliderimg04 from "../../assets/Sliderimages/Sliderimg04.png";
import Sliderimg05 from "../../assets/Sliderimages/Sliderimg05.jpg";
import './Slider.css'

const Slider = () => {

  // Array of images to use for both background and main image
  const images = [ Sliderimg02,Sliderimg01, Sliderimg03 , Sliderimg04, Sliderimg05];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Change images every 4 seconds
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  // Debug logging: Verify arrow and dot click handlers
  const handleDotClick = (index) => {
    console.log("Dot clicked:", index); // Check if dot click is working
    setCurrentImage(index);
  };

  const handlePrevClick = () => {
    console.log("Previous arrow clicked"); // Check if prev arrow is working
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };

  const handleNextClick = () => {
    console.log("Next arrow clicked"); // Check if next arrow is working
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <>
      <header
        className="header"
        style={{
          backgroundImage: `url(${images[currentImage]})`, // Change background image
          transition: 'background-image 2s ease-in-out',
        }}
      >
        <div className="header-content">

          {/* Left and right arrow buttons */}
          <div className="bdarrow left-arrow" onClick={handlePrevClick}>
            &#10094;
          </div>
          <div className="bdarrow right-arrow" onClick={handleNextClick}>
            &#10095;
          </div>

          {/* Dot navigation */}
          <div className="dot-container">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentImage === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </header>
      
    </>
  );
};

export default Slider;
