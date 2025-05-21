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
    const [maxSelections, setMaxSelections] = useState(1); // Initialize with 1 for single-select

    const optionRefs = useRef([]);

    useEffect(() => {
        if (!user) return;

        const fetchQuizData = async () => {
            try {
                const league = encodeURIComponent(user.participation);
                const response = await axios.get(`http://localhost:5000/getquiz/${league}`);
                const data = response.data.quiz;
                setQuizData(data);
                setQuestion(data[0]);
                
                // Calculate total possible score
                const total = data.reduce((sum, q) => sum + q.creditPoints, 0);
                setTotalPossibleScore(total);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [user]);

    useEffect(() => {
        if (quizData.length > 0 && index < quizData.length) {
            const currentQuestion = quizData[index];
            setQuestion(currentQuestion);
            setSelectedOptions([]);
            // Set max selections based on number of correct answers
            setMaxSelections(currentQuestion.isMultipleSelect ? 
                currentQuestion.correctOptionIndices.length : 1);
        }
    }, [index, quizData]);

    const handleOptionSelect = (optionIndex) => {
        if (!question) return;

        setSelectedOptions(prev => {
            // If option is already selected, remove it
            if (prev.includes(optionIndex)) {
                return prev.filter(item => item !== optionIndex);
            }
            // If not selected and we haven't reached max selections, add it
            else if (prev.length < maxSelections) {
                return [...prev, optionIndex];
            }
            // If max selections reached, don't change
            return prev;
        });
    };

    const checkAns = () => {
        if (!question) return;

        const currentQuestion = quizData[index];
        const correctIndices = currentQuestion.correctOptionIndices; // 0-based
        const creditPoints = currentQuestion.creditPoints || 1;
        
        if (currentQuestion.isMultipleSelect) {
            // Calculate how many correct options were selected
            const correctSelected = selectedOptions.filter(opt => 
                correctIndices.includes(opt)
            ).length;
            
            // Calculate partial score based on ratio of correct selections
            const partialScore = (correctSelected / correctIndices.length) * creditPoints;
            setScore(prev => prev + partialScore);
        } else {
            // For single select, check if the selected option is correct
            if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
                setScore(prev => prev + creditPoints);
            }
        }
    };
const next = () => {
    if (selectedOptions.length > 0) {
        const currentQuestion = quizData[index];
        const correctIndices = currentQuestion.correctOptionIndices;
        const creditPoints = currentQuestion.creditPoints || 1;

        let pointsEarned = 0;
        if (currentQuestion.isMultipleSelect) {
            const correctSelected = selectedOptions.filter(opt =>
                correctIndices.includes(opt)
            ).length;
            pointsEarned = (correctSelected / correctIndices.length) * creditPoints;
        } else {
            if (selectedOptions.length === 1 && correctIndices.includes(selectedOptions[0])) {
                pointsEarned = creditPoints;
            }
        }

        const newScore = score + pointsEarned;

        if (index === quizData.length - 1) {
            setScore(newScore);  // Update state for display
            setResult(true);

            // Send updated score to backend
            axios.post('http://localhost:5000/submit-quiz-score', {
                enrollment: user.enrollment,
                score: parseFloat(newScore.toFixed(2))
            })
            .then(res => console.log("Score submitted:", res.data))
            .catch(err => console.error("Error submitting score:", err));

            return;
        }

        setScore(newScore);  // For next questions
        setIndex(prevIndex => prevIndex + 1);
        setSelectedOptions([]);
    }
};


    const reset = () => {
        setIndex(0);
        setQuestion(quizData[0]);
        setSelectedOptions([]);
        setScore(0);
        setResult(false);
    };

    if (loading) {
        return <div className="contestquiz-loading">Loading quiz...</div>;
    }

    if (quizData.length === 0) {
        return <div className="contestquiz-no-data">No quiz data available</div>;
    }

    return (
        <div className='contestquiz-container'>
            <h1 className='contestquiz-heading'>Quiz</h1>
            <hr className='contestquiz-divider' />
            {result ? (
                <div className='contestquiz-result'>
                    <h1 className='contestquiz-score'>
                        You scored {score.toFixed(2)} out of {totalPossibleScore}
                    </h1>
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
                                `(Select ${question.correctOptionIndices.length} correct answers - ${question.creditPoints} points)` : 
                                `(Select one correct answer - ${question.creditPoints} points)`}
                        </p>
                        
                        <ul className='contestquiz-options'>
                            {question?.options.map((option, i) => (
                                <li 
                                    key={i}
                                    ref={el => optionRefs.current[i] = el}
                                    className={`contestquiz-option ${
                                        selectedOptions.includes(i) ? "contestquiz-selected" : ""
                                    } ${
                                        result && question.correctOptionIndices.includes(i) ? 
                                        "contestquiz-correct-answer" : ""
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
                            disabled={selectedOptions.length === 0}
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