import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminlogin.css';

// Mock JSON data for admin credentials
const adminData = [
  {
    email: "jhadenishant@gmail.com",
    password: "Nishant@1234"
  },
  {
    email: "moderator@example.com",
    password: "securePassword456"
  }
];

const AdminLogin = () => {
  const navigate = useNavigate(); // For navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check credentials against JSON data
    const admin = adminData.find(
      (user) => user.email === email && user.password === password
    );

    if (admin) {
      // Navigate to /allquestions if credentials match
      navigate('/allquestions');
    } else {
      // Show error message if credentials are invalid
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-main-container">
      <div className="admin-form-container">
        <h1 className="admin-form-title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="admin-form-label" htmlFor="email">Email:</label>
          <input
            className="admin-form-input"
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="admin-form-label" htmlFor="password">Password:</label>
          <input
            className="admin-form-input"
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input className="admin-form-submit" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
