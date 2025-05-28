import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContestQuiz.css';

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
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const optionRefs = useRef([]);
    const timerRef = useRef(null);
    const memeTimerRef = useRef(null);
    const fullscreenRef = useRef(null);

    const memes = [
        "https://humornama.com/wp-content/uploads/2020/08/rasode-mein-kaun-tha-440x440.jpg",
        "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/28cd881f-0902-44d6-839e-87b51a5b1239",
        "https://indianmemetemplates.com/wp-content/uploads/kyu-hilaa-daala-na-1024x574.jpg",
        "https://i.pinimg.com/originals/f7/4c/a3/f74ca30e5990935f8a869669248a4524.jpg",
        "https://img.mensxp.com/media/content/2013/Oct/image10_1383058153.gif"
    ];

    const enterFullscreen = () => {
        const elem = fullscreenRef.current || document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
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
        setTotalTimeTaken(timeTaken);
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-quiz-score`, {
            enrollment: user.enrollment,
            score: parseFloat(score.toFixed(2)),
            timeToSolveMCQ: timeTaken,
            status: terminationReason ? "terminated" : "completed"
        })
        .then(() => {
            toast.success(terminationReason ? "Quiz submitted" : "Quiz completed");
            setTimeout(() => navigate('/'), 1000);
        })
        .catch(err => console.error("Error submitting score:", err));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            submitQuiz("pressing Escape key");
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            submitQuiz("tab switching");
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
                setLoading(false);
                setStartTime(new Date());
                startTimer();
            } catch (error) {
                console.error("Error fetching quiz data:", error);
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
            const currentQuestion = quizData[index];
            setQuestion(currentQuestion);
            setSelectedOptions([]);
            setMaxSelections(currentQuestion.isMultipleSelect ? 
                currentQuestion.options.length : 1);
            setTimeLeft(60);
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

    const showMemeScreen = () => {
        if (index < quizData.length - 1) {
            setShowMeme(true);
            setMemeUrl(getRandomMeme());
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
        const currentQuestion = quizData[index];
        const correctIndices = currentQuestion.correctOptionIndices;
        const creditPoints = currentQuestion.creditPoints || 1;
        let pointsEarned = 0;

        if (currentQuestion.isMultipleSelect) {
            const pointsPerOption = creditPoints / currentQuestion.options.length;
            for (let i = 0; i < currentQuestion.options.length; i++) {
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
        showMemeScreen();
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