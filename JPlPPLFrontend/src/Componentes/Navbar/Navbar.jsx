import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/sisteclogo.png";
import { FaBell, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Registration is now open!", read: false },
    { id: 2, text: "Contest starts in 3 days", read: false },
    { id: 3, text: "New guidelines updated", read: true },
  ]);

  // Marquee announcements
  const announcements = [
      " 🚨 URGENT: Registration closing soon! Final deadline approaching! 🚨 ",
      " Register now bforee it's too late! 🚀 "
      , " Last chance to secure your spot - Don't miss out! ⏳ ", " 🚨 URGENT: Registration closing soon! Final deadline approaching! 🚨 ",
      " Register now bforee it's too late! 🚀 "
      , " Last chance to secure your spot - Don't miss out! ⏳ "

  ];

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
        {/* Marquee Notification Bar */}
      <div className="marquee-bar">
        <div className="marquee-content">
          {announcements.map((announcement, index) => (
            <span key={index} className="announcement-item">
              {announcement}
              {index < announcements.length - 1 && <span className="announcement-separator">•</span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;