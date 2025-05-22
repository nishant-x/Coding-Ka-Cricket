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

       const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % cards.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            intervalRef.current = setInterval(nextSlide, 3000);
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }
    }, [isMobile, currentIndex]); // Added currentIndex to dependencies

    const handleMouseEnter = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleMouseLeave = () => {
        if (isMobile) {
            intervalRef.current = setInterval(nextSlide, 3000);
        }
    };

    // Calculate visible cards for mobile view
    const getVisibleCards = () => {
        if (!isMobile) return cards;

        const visible = [];
        // Show previous, current, and next cards
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + cards.length) % cards.length;
            visible.push({
                ...cards[index],
                style: {
                    transform: i === 0 ? 'scale(1)' : 'scale(0.85)',
                    opacity: i === 0 ? 1 : 0.7,
                    zIndex: i === 0 ? 2 : 1,
                    flex: i === 0 ? '0 0 60%' : '0 0 20%' // Center card takes 60%, side cards 20%
                }
            });
        }
        return visible;
    };


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