import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Contestlogin.css';

const ContestLogin = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password field will store the enrollment number

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with the user's credentials
      const response = await fetch('http://localhost:5000/contestlogin', { // Fixed URL
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
        navigate('/contesthomepage', { state: { user: data.user } });
      } else {
        // Show an error message if validation fails
        alert(data.error || 'Invalid credentials. Please try again.');
        navigate('/contestlogin')
      }
    } catch (error) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="contest-main-container">
      <div className="contest-form-container">
        <h1 className="contest-form-title">Join Contest</h1>
        <form onSubmit={handleSubmit}>
          <label className="contest-form-label" htmlFor="email">Email:</label>
          <input
            className="contest-form-input"
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />

          <label className="contest-form-label" htmlFor="password">Password:</label>
          <input
            className="contest-form-input"
            type="text"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />

          <input className="contest-form-submit" type="submit" value="Join" />
        </form>
      </div>
    </div>
  );
};

export default ContestLogin;
