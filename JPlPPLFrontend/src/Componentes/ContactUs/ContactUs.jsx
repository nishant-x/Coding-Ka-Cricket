import React from 'react';
import './ContactUs.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ContactUs = () => {
  return (
    <div className="contactus-main">
      <div className="contactus-info">
        <div className="contactus-heading">
          <h2>How Can We Assist You?</h2>
          <h4>Your satisfaction is our priority!</h4>
        </div>
        <div className="contactus-box-container">
          <div className="contactus-box">
            <div className="contactus-icon">
              <i className="fas fa-phone-alt"></i> Helpline Numbers
            </div>
            <p>Available 24/7 for all your queries and support.</p>
            <div>
              <h3>+91 7879261234</h3>
              <h3>+91 9827666677</h3>
              <h3>+91 9584471159</h3>
            </div>
          </div>
          <div className="contactus-box">
            <div className="contactus-icon">
              <i className="fas fa-map-marker-alt"></i> Address
            </div>
            <p>Visit us for personalized assistance and explore opportunities.</p>
            <div>
              <h3>SISTec-R Sikandrabad, Ratibad,</h3>
              <h3>Bhopal, Madhya Pradesh, 462044</h3>
            </div>
          </div>
          <div className="contactus-box">
            <div className="contactus-icon">
              <i className="fas fa-envelope"></i> Email
            </div>
            <p>Drop us an email, and our team will get back to you promptly!</p>
            <div>
              <h3>rohitbansal@sistec.ac.in</h3>
              <h3>himanshuyadav@sistec.ac.in</h3>
              <h3>amitsahu@sistec.ac.in</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="contactus-form">
        <div className="contactus-left">
          <h1>Contact Us</h1>
          <DotLottieReact
            src="https://lottie.host/57881042-52c5-4b51-abc0-c7af5a257ec9/B7oZCt6Jb0.lottie"
            loop
            autoplay
          />
        </div>
        <div className="contactus-right">
          <div className="contactus-name-email">
            <input type="text" className="contactus-text" placeholder="Name" />
            <input type="email" className="contactus-email" placeholder="Email" />
          </div>
          <input type="text" className="contactus-text" placeholder="Subject" />
          <textarea className="contactus-textarea" placeholder="Message"></textarea>
          <input type="submit" className="contactus-submit" value="Send" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
