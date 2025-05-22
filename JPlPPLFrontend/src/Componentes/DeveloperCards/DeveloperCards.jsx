import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import './Developerslider.css';
import PiyushImage from '../../assets/coders/piyush.png';
import KrishImage from '../../assets/coders/Crish.png';
import RajImage from '../../assets/coders/raj.png';
import NishantImage from '../../assets/coders/nishant.png';

const Card = ({ name, date, imageUrl, linkedinUrl, instagramUrl, githubUrl }) => {
    return (
        <div className="cardSlider__card">
            <div className="cardSlider__img-container">
                <img src={imageUrl} alt={name} />
            </div>
            <ul className="cardSlider__social-media">
                <li><a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                <li><a href={githubUrl} target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            </ul>
            <div className="cardSlider__user-info">
                <h2>{name}</h2>
                <span>{date}</span>
            </div>
        </div>
    );
};

const CardSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    const cards = [
        {
            name: "Piyush Jain",
            date: "MERN Developer",
            imageUrl: PiyushImage,
            linkedinUrl: "https://www.linkedin.com/in/p4piyush",
            instagramUrl: "https://www.instagram.com/p4p.iyush/",
            githubUrl:"https://github.com/p4p-iyush"
        },
        {
            name: "Krish Signhai",
            date: "MERN Developer",
            imageUrl: KrishImage,
            linkedinUrl: "https://www.linkedin.com/in/krish-singhai",
            instagramUrl: "https://www.instagram.com/krish_singhai_",
            githubUrl: "https://github.com/Krishsinghai"
        },
        {
            name: "RajKumar Lodhi",
            date: "UI/UX Designer",
            imageUrl: RajImage,
            linkedinUrl: "https://www.linkedin.com/in/rajkumar-lodhi-90181b339/",
            instagramUrl: "https://www.instagram.com/ll._.raj_.ll/",
            githubUrl:"https://github.com/rajxxlodhi"
        },
        {
            name: "Nishant Jhadi",
            date: "MERN Developer",
            imageUrl: NishantImage,
            linkedinUrl: "https://www.linkedin.com/in/nishant-jhade-6b9a2b27b/",
            instagramUrl: "https://www.instagram.com/_nishanttt.zd__/",
            githubUrl: "https://github.com/nishant-x"
        },
    ];

    // ... (keep all your existing functions and effects)

    return (
        <div className={`cardSlider ${isMobile ? 'cardSlider--mobile' : ''}`}>
            <div className="cardSlider__header">
                <h1>Our Developers</h1>
                <h3>Meet the talented team behind our projects</h3>
            </div>
            
            {isMobile ? (
                <div className="cardSlider__mobile-container"
                    ref={sliderRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="cardSlider__mobile-track">
                        {getVisibleCards().map((card, index) => (
                            <div
                                key={`${card.name}-${index}`}
                                className="cardSlider__mobile-slide"
                                style={card.style}
                                onClick={() => {
                                    if (index === 0) prevSlide();
                                    else if (index === 2) nextSlide();
                                }}
                            >
                                <Card {...card} />
                            </div>
                        ))}
                    </div>
                    <div className="cardSlider__dots">
                        {cards.map((_, index) => (
                            <span
                                key={index}
                                className={`cardSlider__dot ${index === currentIndex ? 'cardSlider__dot--active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="cardSlider__desktop-grid">
                    {cards.map((card, index) => (
                        <div key={index} className="cardSlider__desktop-item">
                            <Card {...card} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardSlider;