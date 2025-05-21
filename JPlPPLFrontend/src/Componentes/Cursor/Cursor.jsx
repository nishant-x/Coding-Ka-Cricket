import React, { useEffect, useRef } from "react";
import "./Cursor.css";
// import ballImage from "./ball.png"; 

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <img ref={cursorRef} src='https://pngfre.com/wp-content/uploads/Cricket-1-1-1024x1024.png' alt="cursor" className="custom-cursor" />;
};

export default Cursor;
