import React, { useState } from 'react';
import './ContactUs.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ContactUs = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for feedback message
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('Failed to connect to the server');
    }
  };

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
              <h3>+91 9049415191</h3>
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
              <h3>priyankabhatele@sistec.ac.in</h3>
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

        <form className="contactus-right" onSubmit={handleSubmit}>
          <div className="contactus-name-email">
            <input
              type="text"
              name="name"
              className="contactus-text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="contactus-email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            className="contactus-text"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            className="contactus-textarea"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <input type="submit" className="contactus-submit" value="Send" />
          {status && <p className="contactus-status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
