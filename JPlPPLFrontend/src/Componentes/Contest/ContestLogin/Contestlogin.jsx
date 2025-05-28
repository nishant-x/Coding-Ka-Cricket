import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import './Contestlogin.css';

const ContestLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        const score = data.user?.quizScore;
        
        if (score === null || score === undefined || score === -1) {
          setUserRole('user');
          toast.success('Login successful! Redirecting...');
          setTimeout(() => {
            navigate('/contesthomepage', { state: { user: data.user }});
          }, 1500);
        } else if (score >= 0) {
          toast.error('You have already attempted the quiz.');
        } else {
          toast.error('Invalid user data.');
        }
      } else {
        toast.error(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contest-login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16V16.01M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1>Quiz Contest</h1>
          </div>
          <p>Enter your credentials to join the competition</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-field">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password </label>
            <div className="input-field">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span>Join Now</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>New to quiz? <span  onClick={() => toast('Contact admin for enrollment help')}>Create account</span></p>
          {/* <p onClick={() => toast('Contact admin for enrollment help')}>Forgot password?</p> */}
        </div>
      </div>

      <div className="background-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--size': `${Math.random() * 0.5 + 0.5}rem`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${Math.random() * 10 + 10}s`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default ContestLogin;
