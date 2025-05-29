import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/sisteclogo.png";
import Alertmarquee from "../Marquee/Alert-marquee";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      // Path to your PDF file
      const pdfUrl = "/assets/Result/JPL-Teams.pdf";
      
      // Fetch the file
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'JPLResult.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: open in new tab if download fails
      window.open("/assets/Result/JPL-Teams.pdf", '_blank');
    }
  };

  return (
    <>
      <header className="navbarheader">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className={`nav-menu ${isMenuActive ? "active" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <Link to="/guideline">Guidelines</Link>
            </li>
            <li className="dropdown">
              <a href="#">Explore</a>
              <ul className="dropdown-menu">
                <li><a href="/#processflow">Process Flow</a></li>
                <li><a href="/#faq">FAQ's</a> </li>
              </ul>
            </li>
            <li><Link to="/contestlogin">Join Contest</Link></li>
            {/* <li><Link to="/adminlogin">Admin Login</Link></li> */}
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <div className="nav-buttons">
            <button onClick={handleDownload} className="register-btn">Download Result</button>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>
      {/* <Alertmarquee/> */}
    </>
  );
};

export default Navbar;