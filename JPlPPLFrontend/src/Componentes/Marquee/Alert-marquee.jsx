import React from 'react';
import './Alert-marquee.css'
function Alertmarquee() {
  return (
    <div className="Alert-News">
      <marquee width="100%" direction="left" scrollamount="5">
        <h3>🚨 Breaking News: This is a sample scrolling text that scrolls to the left! 🚨 
        Stay tuned for updates! 🌍</h3>
      </marquee>
    </div>
  );
}
  
export default Alertmarquee;
