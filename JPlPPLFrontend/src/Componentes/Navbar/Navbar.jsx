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
    
    const pdfUrl = "/Result/JPL-Teams.pdf"; 
    
   
    const response = await fetch(pdfUrl, {
      credentials: 'include', 
    });
    
    if (!response.ok) throw new Error("Failed to fetch PDF");
    
    
    const blob = await response.blob();
    
   
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "JPL-Result.pdf"; 
    document.body.appendChild(link);
    link.click();
    
    // 5. Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: Open PDF in new tab
    window.open(pdfUrl, "_blank");
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