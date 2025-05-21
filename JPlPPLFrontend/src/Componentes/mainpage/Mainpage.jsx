import React from "react";
import "./Homepage.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import fullvideo from "../../assets/HOMEVIDEO.mp4";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homemain" >
      <div className="tophome" id="top">
        <video
          src={fullvideo}
          //   controls
          autoPlay
          muted
          loop
          className="home-video"
        ></video>
      </div>
      <div className="bottomhome">
        {/* Python Premier League Card */}
        <div className="home-card">
          <div className="home-card__content">
            <h3 className="home-card__title">
              Join the <span>Python Premier League</span>!
            </h3>
            <p className="home-card__text">
              Compete in 3 exciting rounds & showcase your Python skills!
            </p>
            <Link to="/register" className="home-card__link">
              <span>Get Started</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="home-card__extra">
            <h4>
              Win <span>exclusive rewards</span>!
            </h4>
          </div>
        </div>

        {/* Java Premier League Card */}
        <div className="home-card java-card">
          <div className="home-card__content">
            <h3 className="home-card__title">
              Enter the <span>Java Premier League</span>!
            </h3>
            <p className="home-card__text">
              Prove your Java skills and claim the top spot!
            </p>

            <Link to="/register" className="home-card__link">
              <span>Join Now</span>

              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="home-card__extra">
            <h4>
              Secure your <span>spot</span> today!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
