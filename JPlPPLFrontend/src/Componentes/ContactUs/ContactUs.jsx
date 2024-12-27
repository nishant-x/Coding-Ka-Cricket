import React from 'react';
import './ContactUs.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ContactUs = () => {
  return (
    <div className="Cmain_contact">
      <div className="Ccontact_info">
        <div className="Cheading">
          <h2>How Can We Assist You?</h2>
          <h4>Your satisfaction is our priority!</h4>
        </div>
        <div className="Ccontact_box">
          <div className="Cboxs">
            <div className="Cicon">
              <i className="fas fa-phone-alt"></i> Helpline Numbers
            </div>
              <p>Available 24/7 for all your queries and support.</p>                          
            <div className="Cbox">
              <h3>+91 7879261234</h3>
              <h3>+91 9827666677</h3>
              <h3>+91 9584471159</h3>
            </div>
          </div>
          <div className="Cboxs">
            <div className="Cicon">
              <i className="fas fa-map-marker-alt"></i> Address
            </div>
              <p>Visit us for personalized assistance and explore opportunities.</p>
            <div className="Cbox">
              <h3>SISTec-R Sikandrabad, Ratibad,</h3>
              <h3>Bhopal, Madhya Pradesh, 462044</h3>
            </div>
          </div>
          <div className="Cboxs">
            <div className="Cicon">
              <i className="fas fa-envelope"></i> Email
            </div>
              <p>Drop us an email, and our team will get back to you promptly!</p>
            <div className="Cbox">
              <h3>rohitbansal@sistec.ac.in</h3>
              <h3>himanshuyadav@sistec.ac.in</h3>
              <h3>amitsahu@sistec.ac.in</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="Ccontact_form">
        <div className="Cleft">
          <h1>Contact Us</h1>
          {/* ye image ha  */}
          <DotLottieReact
            src="https://lottie.host/57881042-52c5-4b51-abc0-c7af5a257ec9/B7oZCt6Jb0.lottie"
            loop
            autoplay
          />
        </div>
        <div className="Cright">
          <div className="CName_Email">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message"></textarea>
          <input type="submit" value="Send" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
