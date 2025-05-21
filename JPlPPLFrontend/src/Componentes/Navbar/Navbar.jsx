import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/sisteclogo.png";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
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
            <a href="#">Guidelines</a>
            <ul className="dropdown-menu">
              <li><Link to="#">Instruction</Link></li>
              <li><Link to="#">Consent Letter</Link></li>
              <li><Link to="#">How to Apply</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">Explore</a>
            <ul className="dropdown-menu">
              <li><a href="/#intro">About</a> </li>
              <li><a href="/#aboutevent">Timeline</a> </li>
              <li><a href="/#processflow">Process Flow</a></li>
              <li><a href="/#faq">FQA</a> </li>
            </ul>
          </li>
          {/* <li><Link to="/contestlogin">Join Contest</Link></li> */}
          {/* <li><Link to="/adminlogin">Admin Login</Link></li> */}
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <div className="nav-buttons">
          <Link to="/register" className="register-btn">Register</Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
