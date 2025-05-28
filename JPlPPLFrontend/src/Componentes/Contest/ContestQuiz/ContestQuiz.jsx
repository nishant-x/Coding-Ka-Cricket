import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContestQuiz.css';

const ContestQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const optionRefs = useRef([]);
    const timerRef = useRef(null);
    const memeTimerRef = useRef(null);
    const warningTimerRef = useRef(null);
    const fullscreenRef = useRef(null);

    const memes = [
        "https://humornama.com/wp-content/uploads/2020/08/rasode-mein-kaun-tha-440x440.jpg ",
        "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/28cd881f-0902-44d6-839e-87b51a5b1239 ",
        "https://indianmemetemplates.com/wp-content/uploads/kyu-hilaa-daala-na-1024x574.jpg ",
        "https://i.pinimg.com/originals/f7/4c/a3/f74ca30e5990935f8a869669248a4524.jpg ",
        "https://img.mensxp.com/media/content/2013/Oct/image10_1383058153.gif "
    ];

    // Enter fullscreen
    const enterFullscreen = () => {
        const elem = fullscreenRef.current || document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
    };

    // Exit fullscreen
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullscreen(false);
    };

    // Handle fullscreen change
    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement);
        setIsFullscreen(isCurrentlyFullscreen);

        if (!isCurrentlyFullscreen && !quizFinished && !result && !showMeme) {
            enterFullscreen(); // Re-enter fullscreen
        }
    };

    // Handle escape key (prevent ESC from exiting)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && !quizFinished && !result && !showMeme) {
            e.preventDefault();
            enterFullscreen();
        }
    };

    // Handle tab switch or focus loss
    const handleVisibilityChange = () => {
        if (document.hidden && !result && !showMeme && !quizFinished) {
            setTabSwitchCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 4) {
                    handleForceSubmit();
                } else {
                    setShowWarning(true);
                    warningTimerRef.current = setTimeout(() => {
                        setShowWarning(false);
                    }, 3000);
                }
                return newCount;
            });
        }
    };

    // Force submit on too many violations
    const handleForceSubmit = () => {
        clearInterval(timerRef.current);
        clearTimeout(memeTimerRef.current);
        clearTimeout(warningTimerRef.current);
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        setTotalTimeTaken(timeTaken);
        setQuizFinished(true);
        setResult(true);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-quiz-score`, {
            enrollment: user.enrollment,
            score: parseFloat(score.toFixed(2)),
            timeToSolveMCQ: timeTaken,
            tabSwitchCount: 4,
            status: "terminated"
        })
        .then(res => console.log("Score submitted (terminated):", res.data))
        .catch(err => console.error("Error submitting score:", err));
    };

    // Fetch quiz data
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('keydown', handleKeyDown);

        enterFullscreen();

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
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(timerRef.current);
            clearTimeout(memeTimerRef.current);
            clearTimeout(warningTimerRef.current);
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
            } else if (prev.length < maxSelections) {
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
                const pointsPerOption = creditPoints / totalOptions;
                for (let i = 0; i < totalOptions; i++) {
                    const isCorrect = correctIndices.includes(i);
                    const isSelected = selectedOptions.includes(i);
                    let optionPoint = 0;

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
                if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
                    pointsEarned = creditPoints;
                }

                for (let i = 0; i < totalOptions; i++) {
                    questionResult.optionDetails.push({
                        option: currentQuestion.options[i],
                        isCorrect: correctIndices.includes(i),
                        isSelected: selectedOptions.includes(i),
                        points: (selectedOptions.includes(i) && correctIndices.includes(i)) ? creditPoints : 0
                    });
                }
                questionResult.earnedPoints = pointsEarned;
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
                    timeToSolveMCQ: timeTaken,
                    tabSwitchCount,
                    status: "completed"
                })
                .then(res => console.log("Score submitted:", res.data))
                .catch(err => console.error("Error submitting score:", err));
                return;
            }

            setScore(newScore);
            showMemeScreen();
        }
    };

    const reset = () => {
        clearInterval(timerRef.current);
        clearTimeout(memeTimerRef.current);
        clearTimeout(warningTimerRef.current);
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
        setTabSwitchCount(0);
        setShowWarning(false);
        setStartTime(new Date());
        startTimer();
        enterFullscreen();
    };

    const exitQuiz = () => {
        exitFullscreen();
        navigate('/');
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
                <div className="contestquiz-meme-timer">Next question in {Math.ceil(timeLeft / 60 * 2)}s...</div>
            </div>
        );
    }
    
  return (
    <div className="contestquiz-container" ref={fullscreenRef}>
      {showWarning && (
        <div className="contestquiz-warning-overlay">
          <div className="contestquiz-warning-box">
            <h2>Warning!</h2>
            <p>You have switched tabs/windows {tabSwitchCount} times.</p>
            <p>
              After {4 - tabSwitchCount} more violations, your quiz will be
              automatically submitted.
            </p>
          </div>
        </div>
      )}

      <div className="contestquiz-header">
        <div className="contestquiz-timer">
          <span className="contestquiz-timer-icon">⏱️</span>
          <span className="contestquiz-timer-text">
            Question Time: {timeLeft}s | Total:{" "}
            {Math.floor(totalTimeTaken / 60)}m {totalTimeTaken % 60}s
          </span>
        </div>
        <div className="contestquiz-fullscreen-status">
          {isFullscreen ? "✔ Fullscreen" : "⚠ Not Fullscreen"}
        </div>
        {/* <div className="contestquiz-violations">
                    Tab Switches: {tabSwitchCount}/3
                </div> */}
      </div>

      <h1 className="contestquiz-heading">Quiz Challenge</h1>
      <hr className="contestquiz-divider" />

      {result ? (
        <div className="contestquiz-result">
          <h1 className="contestquiz-score">
            You scored {score.toFixed(2)} out of {totalPossibleScore}
          </h1>
          <h2 className="contestquiz-time">
            Time taken: {Math.floor(totalTimeTaken / 60)} minutes{" "}
            {totalTimeTaken % 60} seconds
          </h2>

          <div className="contestquiz-breakdown">
            <h3>Question Breakdown:</h3>
            {questionResults.map((result, i) => (
              <div key={i} className="contestquiz-question-result">
                <div className="contestquiz-question-header">
                  <div className="contestquiz-question-text">
                    <strong>Q{i + 1}:</strong> {result.question}
                  </div>
                  <div className="contestquiz-points">
                    {result.earnedPoints.toFixed(1)}/{result.maxPoints} points
                  </div>
                </div>

                {result.isMultipleSelect && (
                  <div className="contestquiz-option-details">
                    <p className="contestquiz-scoring-info">
                      Scoring: Each option is worth{" "}
                      {(
                        result.maxPoints / result.correctOptions.length
                      ).toFixed(1)}{" "}
                      points
                    </p>
                    <ul>
                      {result.optionDetails.map((detail, idx) => (
                        <li
                          key={idx}
                          className={`contestquiz-option-result ${
                            detail.isSelected ? "contestquiz-selected" : ""
                          } ${
                            detail.isCorrect
                              ? "contestquiz-correct"
                              : "contestquiz-incorrect"
                          }`}
                        >
                          {detail.option} - {detail.points.toFixed(1)} point(s)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="contestquiz-result-actions">
            <button
              className="contestquiz-btn contestquiz-reset-btn"
              onClick={reset}
            >
              Try Again
            </button>
            <button
              className="contestquiz-btn contestquiz-exit-btn"
              onClick={exitQuiz}
            >
              Exit Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="contestquiz-question-container">
            <h2 className="contestquiz-question">
              {index + 1}. {question ? question.question : "Loading..."}
            </h2>
            <p className="contestquiz-instructions">
              {question?.isMultipleSelect
                ? `(Multiple correct answers - Partial credit for each correct selection)`
                : `(Single correct answer - ${
                    question?.creditPoints || 1
                  } points)`}
            </p>

            <ul className="contestquiz-options">
              {question?.options.map((option, i) => (
                <li
                  key={i}
                  ref={(el) => (optionRefs.current[i] = el)}
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
        </>
      )}
    </div>
  );
};

export default ContestQuiz;
