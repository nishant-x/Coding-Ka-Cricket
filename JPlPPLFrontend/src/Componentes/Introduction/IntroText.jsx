import "./IntroText.css";
import { motion } from "framer-motion";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom"; // Import Link for navigation

const IntroText = () => {
  const text = "Welcome to the Coding Ka Cricket!".split(" ");
  const details = "Get ready for an exciting and competitive journey. Challenge your coding abilities. Showcase your creativity and problem-solving skills! The Java Premier League and Python Premier League are two thrilling competitions designed to challenge your coding abilities, creativity, and problem-solving prowess.";

  return (
    <>   
     <div className="IntroText-container" id="intro">
      <div className="IntroText-left">
        <div className="IntroText-part">
          {text.map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }} // Start below
              whileInView={{ opacity: 1, y: 0 }} // Animate to normal
              transition={{
                duration: 0.7,
                delay: i / 10, // Stagger effect
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="IntroText-detail"
          initial={{ opacity: 0, y: 50 }} // Start below like title
          whileInView={{ opacity: 1, y: 0 }} // Animate to normal
          transition={{
            duration: 0.4,
            delay: 0.1, // Delay slightly after title
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {details}
        </motion.p>
        <div className="register-buttons">
          <Link to="/register" className="register-btn">Register Now</Link>
        </div>
      </div>

      <div className="IntroText-right">
        <DotLottieReact
          src="https://lottie.host/602dd5e1-ea3b-4827-8704-2d4af89bf49b/UJ2EOksxOY.lottie"
          loop
          autoplay
        />
      </div>
    </div>
    </>

  );
};

export default IntroText;
