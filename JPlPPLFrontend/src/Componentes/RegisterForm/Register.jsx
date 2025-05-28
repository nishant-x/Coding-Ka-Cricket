import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import payment from '../../assets/paymentQR/newQRPushpendra.jpg';
import './Register.css';

const Register = () => {
    const [college, setCollege] = useState('');
    const [branch, setBranch] = useState('');
    const [sectionCount, setSectionCount] = useState(1);
    const [errors, setErrors] = useState({});
    const [screenshot, setScreenshot] = useState(null);
    const [year, setYear] = useState('');
    const [league, setLeague] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const branchesByCollege = {
        'SISTec-GN': ['CSE', 'CSE - Cyber Security', 'CSE - AIML', 'CSE - AIDS'],
        'SISTec-R': ['CSE', 'CSE - AIML'],
        'SISTec-E': ['CSE', 'CSE - IoT'],
    };

    const leagues = [
        'Java Premier League (JPL)',
        'Python Premier League (PPL)'
    ];

    const handleCollegeChange = (e) => {
        setCollege(e.target.value);
        setBranch('');
        setSectionCount(1);
    };

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setBranch(selectedBranch);

        if (college === 'SISTec-GN' && selectedBranch === 'CSE') {
            setSectionCount(4);
        } else if (college === 'SISTec-R' && selectedBranch === 'CSE') {
            setSectionCount(3);
        } else {
            setSectionCount(1);
        }
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleLeagueChange = (e) => {
        setLeague(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleScreenshotChange = (e) => {
        setScreenshot(e.target.files[0]);

        if (e.target.files[0] && e.target.files[0].size > 5000000) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                screenshot: 'File size should not exceed 5MB',
            }));
        } else {
            setErrors((prevErrors) => {
                const { screenshot, ...rest } = prevErrors;
                return rest;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const enrollment = document.getElementById('enrollment').value;
        const transaction = document.getElementById('transaction').value;

        if (!name) {
            newErrors.name = 'Name is required';
        }

        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!phone || !phoneRegex.test(phone)) {
            newErrors.phone = 'Valid 10-digit phone number is required';
        }

        if (!enrollment || enrollment.length !== 12) {
            newErrors.enrollment = 'Enrollment number must be 12 characters long';
        }

        if (!transaction) {
            newErrors.transaction = 'Transaction ID is required';
        }

        if (!screenshot) {
            newErrors.screenshot = 'Screenshot of payment is required';
        }

        if (!league) {
            newErrors.league = 'Please select a league';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', phone);
        formData.append('enrollment', document.getElementById('enrollment').value);
        formData.append('college', college);
        formData.append('branch', branch);
        formData.append('year', year);
        formData.append('section', document.getElementById('section').value);
        formData.append('league', league);
        formData.append('transaction', document.getElementById('transaction').value);
        formData.append('screenshot', screenshot);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/registration`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/');
            } else {
                alert(data.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error(error);
            alert('Server error. Please try again later.');
        }
    };

    return (
        <div className="ckc-registration">
            <div className="registration-container">
                {/* Left Side - Content */}
                <div className="registration-content">
                    <div className="registration-header">
                        <h1>Register for</h1>
                        <h1 className="registration-main-title">Coding ka Cricket 2k25</h1>
                        <p className="registration-subtitle">The ultimate coding competition where programming meets sports spirit!</p>
                        
                        <div className="registration-highlights">
                            <div className="highlight-item">
                                <span className="highlight-icon">🏆</span>
                                <span>Exciting prizes for winners</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">📅</span>
                                <span>30/05/2025 - JPL <br />31/05/2025 - PPL</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">📍</span>
                                <span>SISTec-R Campus, Ratibad, Bhopal - 462044, Madhya Pradesh, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="registration-form-wrapper">
                    <div className="registration-form-container">
                        <h2>Registration Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="registration-form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={errors.name ? 'registration-error-border' : ''}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <span className="registration-error">{errors.name}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={errors.email ? 'registration-error-border' : ''}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <span className="registration-error">{errors.email}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={errors.phone ? 'registration-error-border' : ''}
                                    placeholder="Enter your 10-digit phone number"
                                />
                                {errors.phone && <span className="registration-error">{errors.phone}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="enrollment">Enrollment Number</label>
                                <input
                                    type="text"
                                    id="enrollment"
                                    name="enrollment"
                                    className={errors.enrollment ? 'registration-error-border' : ''}
                                    placeholder="12-digit enrollment number"
                                />
                                {errors.enrollment && <span className="registration-error">{errors.enrollment}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="college">College</label>
                                <select
                                    id="college"
                                    value={college}
                                    onChange={handleCollegeChange}
                                    className={errors.college ? 'registration-error-border' : ''}
                                    required
                                >
                                    <option value="">Select College</option>
                                    <option value="SISTec-GN">SISTec-GN</option>
                                    <option value="SISTec-R">SISTec-R</option>
                                    <option value="SISTec-E">SISTec-E</option>
                                </select>
                            </div>
                            {college && (
                                <div className="registration-form-group">
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        id="branch"
                                        value={branch}
                                        onChange={handleBranchChange}
                                        className={errors.branch ? 'registration-error-border' : ''}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        {branchesByCollege[college].map((branch) => (
                                            <option key={branch} value={branch}>
                                                {branch}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="registration-form-group">
                                <label htmlFor="year">Year</label>
                                <select 
                                    id="year" 
                                    value={year}
                                    onChange={handleYearChange}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                </select>
                            </div>

                            {/* Payment QR Code - Only shown when year is selected */}
                            {year && (
                                <div className="payment-qr-container">
                                    <p>Please make the payment of ₹20 to complete your registration</p>
                                    <img src={payment} alt="Payment QR Code" className="payment-qr-image" />
                                    <p>Scan this QR code to make payment</p>
                                </div>
                            )}

                            {branch && (
                                <div className="registration-form-group">
                                    <label htmlFor="section">Section</label>
                                    <select id="section" required>
                                        {[...Array(sectionCount)].map((_, i) => {
                                            const sectionLetter = String.fromCharCode(65 + i);
                                            return (
                                                <option key={i + 1} value={`Section ${sectionLetter}`}>
                                                    Section {sectionLetter}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}
                            <div className="registration-form-group">
                                <label htmlFor="league">League</label>
                                <select
                                    id="league"
                                    value={league}
                                    onChange={handleLeagueChange}
                                    className={errors.league ? 'registration-error-border' : ''}
                                    required
                                >
                                    <option value="">Select League</option>
                                    {leagues.map((leagueOption) => (
                                        <option key={leagueOption} value={leagueOption}>
                                            {leagueOption}
                                        </option>
                                    ))}
                                </select>
                                {errors.league && <span className="registration-error">{errors.league}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="transaction">Transaction ID</label>
                                <input
                                    type="text"
                                    id="transaction"
                                    name="transaction"
                                    className={errors.transaction ? 'registration-error-border' : ''}
                                    placeholder="Enter transaction ID"
                                    required
                                />
                                {errors.transaction && <span className="registration-error">{errors.transaction}</span>}
                            </div>
                            <div className="registration-form-group">
                                <label htmlFor="screenshot">Screenshot of Payment</label>
                                <input
                                    type="file"
                                    id="screenshot"
                                    name="screenshot"
                                    onChange={handleScreenshotChange}
                                    className={errors.screenshot ? 'registration-error-border' : ''}
                                    accept="image/*"
                                    required
                                />
                                {errors.screenshot && <span className="registration-error">{errors.screenshot}</span>}
                            </div>
                            <button type="submit" className="registration-btn-submit">
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;