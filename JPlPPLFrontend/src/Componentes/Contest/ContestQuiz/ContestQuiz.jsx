import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContestQuiz.css';
// import memes1 from '../../../assets/memes/memes (1).jpg';
// import memes2 from '../../../assets/memes/memes (2).jpg';
// import memes9 from '../../../assets/memes/memes (10).jpg';
import memes3 from '../../../assets/memes/memes (3).jpg';
import memes4 from '../../../assets/memes/memes (4).jpg';
import memes5 from '../../../assets/memes/memes (5).jpg';
import memes6 from '../../../assets/memes/memes (7).jpg';
import memes7 from '../../../assets/memes/memes (8).jpg';
import memes8 from '../../../assets/memes/memes (9).jpg';

const ContestQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxSelections, setMaxSelections] = useState(1);
    const [timeLeft, setTimeLeft] = useState(60);
    const [showMeme, setShowMeme] = useState(false);
    const [memeUrl, setMemeUrl] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [showThankYou, setShowThankYou] = useState(false);
    const timerRef = useRef(null);
    const memeTimerRef = useRef(null);
    const fullscreenRef = useRef(null);
    const [shuffledMemes, setShuffledMemes] = useState([]);


    const memes = [ memes3, memes4, memes5, memes6, memes7, memes8];

    const enterFullscreen = () => {
        const elem = fullscreenRef.current || document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                console.error("Fullscreen error:", err);
            });
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const submitQuiz = (terminationReason = "") => {
        clearInterval(timerRef.current);
        clearTimeout(memeTimerRef.current);
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-quiz-score`, {
            enrollment: user.enrollment,
            score: parseFloat(score.toFixed(2)),
            timeToSolveMCQ: timeTaken,
        })
        .then(() => {
            setShowThankYou(true);
            toast.success(terminationReason ? "Quiz submitted" : "Quiz completed");
            setTimeout(() => navigate('/contestlogin', { replace: true }), 2000);
        })
        .catch(err => {
            console.error("Submission error:", err);
            setShowThankYou(true);
            setTimeout(() => navigate('/contestlogin', { replace: true }), 2000);
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            submitQuiz("pressed Escape");
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            submitQuiz("tab switch");
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('keydown', handleKeyDown);
        enterFullscreen();

        const fetchQuizData = async () => {
            try {
                const league = encodeURIComponent(user.participation);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getquiz/${league}`);
                setQuizData(response.data.quiz);
                setQuestion(response.data.quiz[0]);
                setShuffledMemes(shuffleArray(memes));
                setLoading(false);
                setStartTime(new Date());
                startTimer();
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        };

        fetchQuizData();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(timerRef.current);
            clearTimeout(memeTimerRef.current);
            exitFullscreen();
        };
    }, [user, navigate]);

    useEffect(() => {
        if (quizData.length > 0 && index < quizData.length) {
            const current = quizData[index];
            setQuestion(current);
            setSelectedOptions([]);
            setMaxSelections(current.isMultipleSelect ? current.options.length : 1);
            setTimeLeft(90);
        }
    }, [index, quizData]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const getRandomMeme = () => {
        return memes[Math.floor(Math.random() * memes.length)];
    };
    const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const showMemeScreen = () => {
    if (index < quizData.length - 1) {
        setShowMeme(true);
        setMemeUrl(shuffledMemes[index % shuffledMemes.length]); // show one meme per question
        memeTimerRef.current = setTimeout(() => {
            setShowMeme(false);
            setIndex(prev => prev + 1);
        }, 2000);
    } else {
        submitQuiz();
    }
};


    const handleOptionSelect = (optionIndex) => {
        if (!question || showMeme) return;
        setSelectedOptions(prev => {
            if (prev.includes(optionIndex)) {
                return prev.filter(item => item !== optionIndex);
            } else if (prev.length < maxSelections) {
                return [...prev, optionIndex];
            }
            return prev;
        });
    };

    const handleTimeUp = () => {
        next();
    };

    const next = () => {
        if (!question || index >= quizData.length) return;

        const correctIndices = question.correctOptionIndices;
        const creditPoints = question.creditPoints || 1;
        let pointsEarned = 0;

        if (question.isMultipleSelect) {
            const pointsPerOption = creditPoints / question.options.length;
            for (let i = 0; i < question.options.length; i++) {
                const isCorrect = correctIndices.includes(i);
                const isSelected = selectedOptions.includes(i);
                if ((isCorrect && isSelected) || (!isCorrect && !isSelected)) {
                    pointsEarned += pointsPerOption;
                }
            }
        } else if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
            pointsEarned = creditPoints;
        }

        setScore(prev => prev + pointsEarned);

        if (index >= quizData.length - 1) {
            submitQuiz();
        } else {
            showMemeScreen();
        }
    };

    if (loading) {
        return (
            <div className="contestquiz-loading" ref={fullscreenRef}>
                <div className="contestquiz-spinner"></div>
                <p>Loading quiz...</p>
            </div>
        );
    }

    if (quizData.length === 0) {
        return (
            <div className="contestquiz-no-data" ref={fullscreenRef}>
                <h2>No quiz data available</h2>
                <button onClick={() => navigate('/')} className="contestquiz-btn">
                    Return to Home
                </button>
            </div>
        );
    }

    if (showThankYou) {
        return (
            <div className="contestquiz-thank-you" ref={fullscreenRef}>
                <h2>Thank You For Participating!</h2>
                <p>Your quiz has been submitted successfully.</p>
                <p>Redirecting you back to login page...</p>
                <div className="contestquiz-spinner"></div>
            </div>
        );
    }

    if (showMeme) {
        return (
            <div className="contestquiz-meme-container" ref={fullscreenRef}>
                <h2>Great job! Here's a meme for you</h2>
                <img src={memeUrl} alt="Funny meme" className="contestquiz-meme" />
                <div className="contestquiz-meme-timer">Next question in 2s...</div>
            </div>
        );
    }

    return (
        <div className="contestquiz-container" ref={fullscreenRef}>
            <div className="contestquiz-header">
                <div className="contestquiz-timer">
                    <span className="contestquiz-timer-icon">⏱️</span>
                    <span className="contestquiz-timer-text">
                        Time Left: {timeLeft}s
                    </span>
                </div>
            </div>

            <h1 className="contestquiz-heading">Quiz Challenge</h1>
            <hr className="contestquiz-divider" />

            {question ? (
                <div className="contestquiz-question-container">
                    <h2 className="contestquiz-question">
                        {index + 1}. {question.question}
                    </h2>
                    <p className="contestquiz-instructions">
                        {question.isMultipleSelect
                            ? "(Multiple correct answers)"
                            : "(Single correct answer)"}
                    </p>

                    <ul className="contestquiz-options">
                        {question.options.map((option, i) => (
                            <li
                                key={i}
                                className={`contestquiz-option ${selectedOptions.includes(i) ? "contestquiz-selected" : ""}`}
                                onClick={() => handleOptionSelect(i)}
                            >
                                {question.isMultipleSelect && (
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(i)}
                                        readOnly
                                        className="contestquiz-checkbox"
                                    />
                                )}
                                <span className="contestquiz-option-text">{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="contestquiz-loading-text">Preparing next question...</p>
            )}

            <div className="contestquiz-controls">
                <button
                    className="contestquiz-btn contestquiz-next-btn"
                    onClick={next}
                    disabled={selectedOptions.length === 0 && timeLeft > 0}
                >
                    {index === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
                <div className="contestquiz-progress">
                    Question {index + 1} of {quizData.length}
                </div>
            </div>
        </div>
    );
};

export default ContestQuiz; 