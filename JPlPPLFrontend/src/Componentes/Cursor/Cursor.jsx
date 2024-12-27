import React, { useEffect, useRef, useState } from "react";
import "./Cursor.css"; 
const Cursor = () => {
  const cursorRef = useRef(null);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setTrail((prevTrail) => [
        ...prevTrail,
        { x: clientX, y: clientY },
      ]);
    };

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Remove oldest trail point when there are too many (adjust this value)
    if (trail.length > 20) { // Increase this number for more tails
      setTrail((prevTrail) => prevTrail.slice(1));
    }
  }, [trail]);

  useEffect(() => {
    // Animate cursor trail using GSAP
    if (trail.length > 0) {
      gsap.to(cursorRef.current, {
        x: trail[trail.length - 1].x - 15, 
        y: trail[trail.length - 1].y - 15,
        duration: 0.3,
        ease: "power3.out"
      });
    }
  }, [trail]);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      {trail.map((point, index) => (
        <div
          key={index}
          className="trail"
          style={{
            left: point.x - 10 + "px",
            top: point.y - 10 + "px",
            opacity: 1 - index / trail.length, // Make older trails fade out
            transform: `scale(${1 - index / trail.length})`, // Optional: Shrink older tails
          }}
        ></div>
      ))}
    </>
  );
};

export default Cursor;
