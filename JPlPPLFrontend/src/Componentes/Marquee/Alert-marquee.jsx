import React from 'react';
import './Alert-marquee.css';

function Alertmarquee() {
  return (
    <div className="Alert-News">
      <marquee width="100%" direction="left" scrollamount="10">
        <h3>🚨 URGENT: Registration closing soon! Final deadline approaching! 🚨 
        Register now before it's too late! 🚀 
        Last chance to secure your spot - Don't miss out! ⏳ 
        </h3>
      </marquee>
    </div>
  );
}

export default Alertmarquee;