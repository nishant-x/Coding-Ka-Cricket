import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contestlogin.css';
import { useAuth } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const ContestLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contestlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          enrollment: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Check quizScore logic
        const score = data.user?.quizScore;

        if (score === null || score === undefined || score === -1) {
          setUserRole('user');
          navigate('/contesthomepage', { state: { user: data.user } });
        } else if (score >= 0) {
          toast.error('You have already attempted the quiz.');
          setUserRole('guest');
        } else {
          toast.error('Invalid user data.');
        }
      } else {
        toast.error(data.error || 'Invalid credentials. Please try again.');
        setUserRole('guest');
        navigate('/contestlogin');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input className="contest-form-submit" type="submit" value="Join" />
        </form>
      </div>
    </div>
  );
};

export default ContestLogin;
