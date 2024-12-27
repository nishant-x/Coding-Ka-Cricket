import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram,FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className='footer-head'>Home</h3>
        <ul >
          <li className='list-con'><Link to="#">Guidelines</Link></li>
          <li className='list-con'><Link to="/explore">Explore</Link></li>
          <li className='list-con'><Link to="/about">About</Link></li>
          <li className='list-con'><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className='footer-head'>Participants</h3>
        <ul>
          <li className='list-con'><Link to="/instructions">Instructions</Link></li>
          <li className='list-con'><Link to="/apply">How to Apply</Link></li>
          <li className='list-con'><Link to="/result">Result</Link></li>
          <li className='list-con'><Link to="/faqs">FAQs</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className='footer-head'>Contact Us</h3>
        <p className='list-con'>SISTec-R Ratibad Campus<br />Bhopal, 462003</p>
        <p >+1 (800) 123-4567</p>
        <p><a href="mailto:sistec@codechamp.com">sistec@codechamp.com</a></p>
      </div>
      <div className="footer-section social">
        <h3 className='footer-head'>Follow Us</h3>
        <div className="social-icons" >
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaLinkedin />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
