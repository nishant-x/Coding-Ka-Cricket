import React from 'react';
import './RegistrationClosed.css'; // We'll create this CSS file next

const RegistrationClosed = () => {
  return (
    <div className="registration-closed-container">
      <div className="registration-closed-content">
        <svg 
          className="registration-closed-svg" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path d="M16.59 7.58L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
        </svg>
        <h1 className="registration-closed-heading">Registration Closed</h1>
        <p className="registration-closed-message">
          We're sorry, but registration for this event has now closed.
        </p>
        <p className="registration-closed-contact">
          For inquiries, please contact us at <a href="mailto:info@example.com">info@example.com</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationClosed;