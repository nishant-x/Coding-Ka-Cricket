import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import React, { useEffect, useRef } from 'react';
import './Developers.css';
import Piyuhsimage from '../../assets/coders/piyush.png';
import Krishimage from '../../assets/coders/Crish.png';
import rajimage from '../../assets/coders/raj.png';
import nishant from '../../assets/coders/nishant.png';
import pushpendra from '../../assets/coders/puspa.png';

const images = [
    {
        name: 'Krish Jain',
        image: Krishimage,
        role: 'Frontend Developer',
        socialMedia: {
            facebook: '#',
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        name: 'RajKumar Lodhi',
        image: rajimage,
        role: 'Frontend Developer',
        socialMedia: {
            facebook: '#',
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        name: 'Piyush Jain',
        image: Piyuhsimage,
        role: 'Frontend Developer',
        socialMedia: {
            facebook: '#',
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        name: 'Nishant Jhade',
        image: nishant,
        role: 'Frontend Developer',
        socialMedia: {
            facebook: '#',
            twitter: '#',
            linkedin: '#'
        }
    },
];

const UserCard = () => {
    const containerRef = useRef(null);
    const scrollInterval = useRef(null);
    
    useEffect(() => {
        // Only apply auto-sliding for mobile view
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                startAutoScroll();
            } else {
                stopAutoScroll();
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            stopAutoScroll();
        };
    }, []);
    
    const startAutoScroll = () => {
        stopAutoScroll(); // Clear any existing interval
        
        scrollInterval.current = setInterval(() => {
            if (containerRef.current) {
                const container = containerRef.current;
                const scrollWidth = container.scrollWidth;
                const clientWidth = container.clientWidth;
                const scrollLeft = container.scrollLeft;
                
                // Calculate next scroll position
                let nextScroll = scrollLeft + clientWidth * 0.8;
                
                // If we've reached the end, scroll back to start
                if (nextScroll + clientWidth >= scrollWidth) {
                    nextScroll = 0;
                }
                
                container.scrollTo({
                    left: nextScroll,
                    behavior: 'smooth'
                });
            }
        }, 3000); // Change slide every 3 seconds
    };
    
    const stopAutoScroll = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    };
    
    return (
        <div className='CoderMain'>
            <h1>Developer</h1>
            <h3>Here are the Developer</h3>

            <div className="responsive-slider-wrapper">
                <div className="coder-container" ref={containerRef}>
                    {images.map((user, index) => (
                        <div className="coder-card" key={index}>
                            <div className="coder-imgBx">
                                <img src={user.image} alt={user.name} />
                            </div>
                            <div className="coder-contentBx">
                                <h2>{user.name}</h2>
                                <div className="coder-size">
                                    <h3>Role</h3>
                                    <span>{user.role}</span>
                                </div>

                                <div className="coder-color">
                                    <h3>Social Media</h3>
                                    <a href={user.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebook style={{ color: '#3b5998', fontSize: '24px' }} />
                                    </a>
                                    <a href={user.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter style={{ color: '#00acee', fontSize: '24px' }} />
                                    </a>
                                    <a href={user.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin style={{ color: '#0077b5', fontSize: '24px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserCard;