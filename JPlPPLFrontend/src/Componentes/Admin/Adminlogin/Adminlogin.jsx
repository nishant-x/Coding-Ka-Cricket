import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Adminlogin.css';

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password field will store the enrollment number

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with the user's credentials
      const response = await fetch('http://localhost:5000/adminlogin', { // Fixed URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          enrollment: password, // Ensure the property matches backend expectation
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // If credentials are valid, navigate to the ContestHomepage page
        navigate('/adminhomepage', { state: { userId: data.userId } });
      } else {
        // Show an error message if validation fails
        alert(data.error || 'Invalid credentials. Please try again.');
        navigate('/adminlogin')
      }
    } catch (error) {
      alert('Server error. Please try again later.');
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
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />

          <label className="admin-form-label" htmlFor="password">Password:</label>
          <input
            className="admin-form-input"
            type="text"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />

          <input className="admin-form-submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
