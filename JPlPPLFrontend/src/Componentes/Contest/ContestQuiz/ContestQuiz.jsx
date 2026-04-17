import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContestQuiz.css';
import memes3 from '../../../assets/memes/memes (3).jpg';
import memes4 from '../../../assets/memes/memes (4).jpg';
import memes5 from '../../../assets/memes/memes (5).jpg';
import memes6 from '../../../assets/memes/memes (7).jpg';
import memes7 from '../../../assets/memes/memes (8).jpg';
import memes8 from '../../../assets/memes/memes (9).jpg';

const QUIZ_TIME_PER_QUESTION = 90;
const MEME_DISPLAY_TIME = 2000;

const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

const calculateQuestionScore = (question, selectedOptions) => {
    if (!question) {
        return 0;
    }

    const correctIndices = question.correctOptionIndices || [];
    const creditPoints = Number(question.creditPoints) || 1;

    if (question.isMultipleSelect) {
        if (correctIndices.length === 0) {
            return 0;
        }

        const pointsPerCorrectOption = creditPoints / correctIndices.length;
        const correctlySelectedCount = selectedOptions.filter((optionIndex) =>
            correctIndices.includes(optionIndex)
        ).length;

        return correctlySelectedCount * pointsPerCorrectOption;
    }

    if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
        return creditPoints;
    }

    return 0;
};

const ContestQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};
    const [index, setIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
    const [showMeme, setShowMeme] = useState(false);
    const [memeUrl, setMemeUrl] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [showThankYou, setShowThankYou] = useState(false);
    const [shuffledMemes, setShuffledMemes] = useState([]);
    const scoreRef = useRef(0);
    const timerRef = useRef(null);
    const memeTimerRef = useRef(null);
    const fullscreenRef = useRef(null);

    const memes = [memes3, memes4, memes5, memes6, memes7, memes8];
    const question = quizData[index] ?? null;

    const enterFullscreen = () => {
        const elem = fullscreenRef.current || document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch((err) => {
                console.error('Fullscreen error:', err);
            });
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const submitQuiz = (finalScore = score, terminationReason = '') => {
        clearInterval(timerRef.current);
        clearTimeout(memeTimerRef.current);

        const endTime = new Date();
        const timeTaken = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-quiz-score`, {
            enrollment: user.enrollment,
            score: parseFloat(finalScore.toFixed(2)),
            timeToSolveMCQ: timeTaken,
        })
        .then(() => {
            setShowThankYou(true);
            toast.success(terminationReason ? 'Quiz submitted' : 'Quiz completed');
            setTimeout(() => navigate('/contestlogin', { replace: true }), 2000);
        })
        .catch((err) => {
            console.error('Submission error:', err);
            setShowThankYou(true);
            setTimeout(() => navigate('/contestlogin', { replace: true }), 2000);
        });
    };

    const showMemeScreen = () => {
        setShowMeme(true);
        setMemeUrl(shuffledMemes[index % shuffledMemes.length] || memes[index % memes.length]);
        memeTimerRef.current = setTimeout(() => {
            setShowMeme(false);
            setIndex((prev) => prev + 1);
        }, MEME_DISPLAY_TIME);
    };

    const next = () => {
        if (!question || index >= quizData.length) {
            return;
        }

        clearInterval(timerRef.current);

        const pointsEarned = calculateQuestionScore(question, selectedOptions);
        const nextScore = score + pointsEarned;

        setScore(nextScore);

        if (index >= quizData.length - 1) {
            submitQuiz(nextScore);
            return;
        }

        showMemeScreen();
    };

    const handleOptionSelect = (optionIndex) => {
        if (!question || showMeme) {
            return;
        }

        setSelectedOptions((prev) => {
            if (!question.isMultipleSelect) {
                return prev.includes(optionIndex) ? [] : [optionIndex];
            }

            if (prev.includes(optionIndex)) {
                return prev.filter((item) => item !== optionIndex);
            }

            return [...prev, optionIndex];
        });
    };

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                submitQuiz(scoreRef.current, 'tab switch');
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                submitQuiz(scoreRef.current, 'pressed Escape');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('keydown', handleKeyDown);
        enterFullscreen();

        const fetchQuizData = async () => {
            try {
                const league = encodeURIComponent(user.participation);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getquiz/${league}`);
                const fetchedQuiz = response.data.quiz || [];

                setQuizData(fetchedQuiz);
                setShuffledMemes(shuffleArray(memes));
                setStartTime(new Date());
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
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
        if (!question || showMeme || showThankYou) {
            return undefined;
        }

        setSelectedOptions([]);
        setTimeLeft(QUIZ_TIME_PER_QUESTION);
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setTimeout(() => {
                        next();
                    }, 0);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [question, showMeme, showThankYou]);

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
        const totalMarks = quizData.reduce((acc, quizQuestion) => acc + (Number(quizQuestion.creditPoints) || 1), 0);

        return (
            <div className="contestquiz-thank-you" ref={fullscreenRef}>
                <h2>Thank You For Participating!</h2>
                <p>Your quiz has been submitted successfully.</p>
                <h3>Your Score: {score.toFixed(2)} / {totalMarks}</h3>
                <p>Redirecting you back to login page...</p>
                <div className="contestquiz-spinner"></div>
            </div>
        );
    }

    if (showMeme) {
        return (
            <div className="contestquiz-meme-container" ref={fullscreenRef}>
                <h2>Great job! Here&apos;s a meme for you</h2>
                <img src={memeUrl} alt="Funny meme" className="contestquiz-meme" />
                <div className="contestquiz-meme-timer">Next question in 2s...</div>
            </div>
        );
    }

    return (
        <div className="contestquiz-container" ref={fullscreenRef}>
            <div className="contestquiz-header">
                <div className="contestquiz-timer">
                    <span className="contestquiz-timer-icon">Time</span>
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
                                className={`contestquiz-option ${selectedOptions.includes(i) ? 'contestquiz-selected' : ''}`}
                                onClick={() => handleOptionSelect(i)}
                            >
                                {question.isMultipleSelect ? (
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(i)}
                                        readOnly
                                        className="contestquiz-checkbox"
                                    />
                                ) : (
                                    <input
                                        type="radio"
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
                    {index === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
                <div className="contestquiz-progress">
                    Question {index + 1} of {quizData.length}
                </div>
            </div>
        </div>
    );
};

export default ContestQuiz;
