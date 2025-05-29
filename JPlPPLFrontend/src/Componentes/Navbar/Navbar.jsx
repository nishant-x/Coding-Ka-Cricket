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
          {/* <Link to="/register" className="register-btn">Register</Link> */}
          <a href="../../assets/Result/JPL-Teams.pdf" className="register-btn" download="JPLResult.pdf">Download Result</a>
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
