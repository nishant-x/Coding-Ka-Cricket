import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ContestQuiz.css';

const ContestQuiz = () => {
    const location = useLocation();
    const { user } = location.state || {};

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [totalPossibleScore, setTotalPossibleScore] = useState(0);
    const [result, setResult] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxSelections, setMaxSelections] = useState(1);
    const [timeLeft, setTimeLeft] = useState(60);
    const [showMeme, setShowMeme] = useState(false);
    const [memeUrl, setMemeUrl] = useState('');
    const [quizFinished, setQuizFinished] = useState(false);
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [questionResults, setQuestionResults] = useState([]);

    const optionRefs = useRef([]);
    const timerRef = useRef(null);
    const memeTimerRef = useRef(null);

    const memes = [
        "https://humornama.com/wp-content/uploads/2020/08/rasode-mein-kaun-tha-440x440.jpg",
        "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/28cd881f-0902-44d6-839e-87b51a5b1239",
        "https://indianmemetemplates.com/wp-content/uploads/kyu-hilaa-daala-na-1024x574.jpg",
        "https://i.pinimg.com/originals/f7/4c/a3/f74ca30e5990935f8a869669248a4524.jpg",
        "https://img.mensxp.com/media/content/2013/Oct/image10_1383058153.gif"
    ];

    useEffect(() => {
        if (!user) return;

        const fetchQuizData = async () => {
            try {
                const league = encodeURIComponent(user.participation);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getquiz/${league}`);
                const data = response.data.quiz;
                setQuizData(data);
                setQuestion(data[0]);
                
                const total = data.reduce((sum, q) => sum + q.creditPoints, 0);
                setTotalPossibleScore(total);
                
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
            clearInterval(timerRef.current);
            clearTimeout(memeTimerRef.current);
        };
    }, [user]);

    useEffect(() => {
        if (quizData.length > 0 && index < quizData.length) {
            const currentQuestion = quizData[index];
            setQuestion(currentQuestion);
            setSelectedOptions([]);
            setMaxSelections(currentQuestion.isMultipleSelect ? 
                currentQuestion.options.length : 1); // Allow selecting all options for multiple select
            
            resetTimer();
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

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(60);
        startTimer();
    };

    const handleTimeUp = () => {
        if (!quizFinished) {
            next();
        }
    };

    const getRandomMeme = () => {
        const randomIndex = Math.floor(Math.random() * memes.length);
        return memes[randomIndex];
    };

    const showMemeScreen = () => {
        if (index < quizData.length - 1) {
            setShowMeme(true);
            setMemeUrl(getRandomMeme());
            
            memeTimerRef.current = setTimeout(() => {
                setShowMeme(false);
                setIndex(prevIndex => prevIndex + 1);
                setSelectedOptions([]);
            }, 2000);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleOptionSelect = (optionIndex) => {
        if (!question || showMeme) return;

        setSelectedOptions(prev => {
            if (prev.includes(optionIndex)) {
                return prev.filter(item => item !== optionIndex);
            }
            else if (prev.length < maxSelections) {
                return [...prev, optionIndex];
            }
            return prev;
        });
    };

    const next = () => {
        if (selectedOptions.length > 0 || timeLeft <= 0) {
            const currentQuestion = quizData[index];
            const correctIndices = currentQuestion.correctOptionIndices;
            const creditPoints = currentQuestion.creditPoints || 1;
            const totalOptions = currentQuestion.options.length;

            let pointsEarned = 0;
            let questionResult = {
                question: currentQuestion.question,
                maxPoints: creditPoints,
                earnedPoints: 0,
                isMultipleSelect: currentQuestion.isMultipleSelect,
                correctOptions: correctIndices,
                selectedOptions: [...selectedOptions],
                optionDetails: []
            };
            
            if (currentQuestion.isMultipleSelect) {
                // Each option is worth equal share of total points
                const pointsPerOption = creditPoints / totalOptions;
                
                // Check all options
                for (let i = 0; i < totalOptions; i++) {
                    const isCorrect = correctIndices.includes(i);
                    const isSelected = selectedOptions.includes(i);
                    let optionPoint = 0;
                    
                    // Award points for:
                    // - Correct options that are selected (+1)
                    // - Incorrect options that are not selected (+1)
                    if ((isCorrect && isSelected) || (!isCorrect && !isSelected)) {
                        optionPoint = pointsPerOption;
                        pointsEarned += pointsPerOption;
                    }
                    
                    questionResult.optionDetails.push({
                        option: currentQuestion.options[i],
                        isCorrect,
                        isSelected,
                        points: optionPoint
                    });
                }
                
                questionResult.earnedPoints = pointsEarned;
                questionResult.pointsPerOption = pointsPerOption;
            } else {
                // Single-select questions - all or nothing
                if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
                    pointsEarned = creditPoints;
                }
                questionResult.earnedPoints = pointsEarned;
                
                // Record option details for single-select
                for (let i = 0; i < totalOptions; i++) {
                    questionResult.optionDetails.push({
                        option: currentQuestion.options[i],
                        isCorrect: correctIndices.includes(i),
                        isSelected: selectedOptions.includes(i),
                        points: (selectedOptions.includes(i) && correctIndices.includes(i)) ? creditPoints : 0
                    });
                }
            }

            const newScore = score + pointsEarned;
            setQuestionResults(prev => [...prev, questionResult]);

            if (index === quizData.length - 1) {
                const endTime = new Date();
                const timeTaken = Math.floor((endTime - startTime) / 1000);
                setTotalTimeTaken(timeTaken);
                setQuizFinished(true);
                setScore(newScore);
                setResult(true);
                clearInterval(timerRef.current);

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-quiz-score`, {
                    enrollment: user.enrollment,
                    score: parseFloat(newScore.toFixed(2)),
                    timeToSolveMCQ: timeTaken
                })
                .then(res => console.log("Score and time submitted:", res.data))
                .catch(err => console.error("Error submitting score and time:", err));

                return;
            }

            setScore(newScore);
            showMemeScreen();
        }
    };

    const reset = () => {
        clearInterval(timerRef.current);
        clearTimeout(memeTimerRef.current);
        setIndex(0);
        setQuestion(quizData[0]);
        setSelectedOptions([]);
        setScore(0);
        setResult(false);
        setShowMeme(false);
        setQuizFinished(false);
        setTimeLeft(60);
        setTotalTimeTaken(0);
        setQuestionResults([]);
        setStartTime(new Date());
        startTimer();
    };

    if (loading) {
        return <div className="contestquiz-loading">Loading quiz...</div>;
    }

    if (quizData.length === 0) {
        return <div className="contestquiz-no-data">No quiz data available</div>;
    }

    if (showMeme) {
        return (
            <div className="contestquiz-meme-container">
                <h2>Great job! Here's a meme for you</h2>
                <img src={memeUrl} alt="Funny meme" className="contestquiz-meme" />
                <div className="contestquiz-meme-timer">Next question in {Math.ceil(timeLeft/60 * 2)}s...</div>
            </div>
        );
    }

    return (
        <div className='contestquiz-container'>
            <div className="contestquiz-timer">
                Time left: {timeLeft}s | Total time: {Math.floor(totalTimeTaken / 60)}m {totalTimeTaken % 60}s
            </div>
            <h1 className='contestquiz-heading'>Quiz</h1>
            <hr className='contestquiz-divider' />
            {result ? (
                <div className='contestquiz-result'>
                    <h1 className='contestquiz-score'>
                        You scored {score.toFixed(2)} out of {totalPossibleScore}
                    </h1>
                    <h2 className='contestquiz-time'>
                        Time taken: {Math.floor(totalTimeTaken / 60)} minutes {totalTimeTaken % 60} seconds
                    </h2>
                    <div className='contestquiz-breakdown'>
                        <h3>Question Breakdown:</h3>
                        {questionResults.map((result, i) => (
                            <div key={i} className='contestquiz-question-result'>
                                <div className='contestquiz-question-text'>
                                    <strong>Q{i+1}:</strong> {result.question}
                                </div>
                                <div className='contestquiz-points'>
                                    Points: {result.earnedPoints.toFixed(1)}/{result.maxPoints}
                                </div>
                                {result.isMultipleSelect && (
                                    <div className='contestquiz-option-details'>
                                        <p>Scoring: Each option is worth {(result.maxPoints/result.correctOptions.length).toFixed(1)} points</p>
                                        <ul>
                                            {result.optionDetails.map((detail, idx) => (
                                                <li key={idx} className={`contestquiz-option-result ${
                                                    detail.isSelected ? "contestquiz-selected" : ""
                                                } ${
                                                    detail.isCorrect ? "contestquiz-correct" : "contestquiz-incorrect"
                                                }`}>
                                                    {detail.option} - {detail.points.toFixed(1)} point(s)
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className='contestquiz-btn' onClick={reset}>Reset</button>
                </div>
            ) : (
                <>
                    <div className='contestquiz-question-container'>
                        <h2 className='contestquiz-question'>
                            {index + 1}. {question ? question.question : "Loading..."}
                        </h2>
                        <p className='contestquiz-instructions'>
                            {question?.isMultipleSelect ? 
                                `(Select all that apply - Each correct selection earns points, incorrect selections lose points)` : 
                                `(Select one correct answer - ${question.creditPoints} points)`}
                        </p>
                        
                        <ul className='contestquiz-options'>
                            {question?.options.map((option, i) => (
                                <li 
                                    key={i}
                                    ref={el => optionRefs.current[i] = el}
                                    className={`contestquiz-option ${
                                        selectedOptions.includes(i) ? "contestquiz-selected" : ""
                                    }`}
                                    onClick={() => !result && handleOptionSelect(i)}
                                >
                                    {question.isMultipleSelect && (
                                        <input 
                                            type="checkbox"
                                            checked={selectedOptions.includes(i)}
                                            readOnly
                                            className="contestquiz-checkbox"
                                        />
                                    )}
                                    <span className='contestquiz-option-text'>{option}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className='contestquiz-controls'>
                        <button 
                            className='contestquiz-btn' 
                            onClick={next}
                            disabled={selectedOptions.length === 0 && timeLeft > 0}
                        >
                            {index === quizData.length - 1 ? 'Finish' : 'Next'}
                        </button>
                        <div className="contestquiz-progress">
                            {index + 1} of {quizData.length} questions
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContestQuiz;