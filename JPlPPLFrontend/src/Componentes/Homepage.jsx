import React from 'react';
import Slider from './Sliders/Slider.jsx';

import IntroText from './Introduction/IntroText.jsx';
import ProcessFlow from './ProcessFlow/ProcessFlow.jsx';
import Timeline from './Timelines/Timeline.jsx';
import ProfileCard from './Card/ProfileCard.jsx';
import Faq from './Faq/Faq.jsx';
import Mainpage from './mainpage/Mainpage.jsx';
import Developers from './Developers/Developers.jsx';
import '../App.css'

const Homepage = () => {

  return (
    <>
      <div className="MainPage">
        <Mainpage />
      </div>

      <div className="intro">
        <IntroText />
      </div>

      {/* <div className="MainTimeline">
        <Timeline />
      </div> */}

      <div className="MainFlow">
        <ProcessFlow />
      </div>

      <div className="MainFaq">
        <Faq />
      </div>

      <div className="MainCards">
        <ProfileCard />
      </div>
      
      <div className="MainCoders">
        <Developers />
      </div>
    </>
  );
};

export default Homepage;
