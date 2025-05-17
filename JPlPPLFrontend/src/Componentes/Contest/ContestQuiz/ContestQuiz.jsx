import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ContestQuiz.css';

const ContestQuize = () => {
    const location = useLocation();
    const { user } = location.state || {};

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const option_arr = [option1, option2, option3, option4];

    useEffect(() => {
        if (!user) return;

        const fetchQuizData = async () => {
            try {
                const league = encodeURIComponent(user.participation);
                const response = await axios.get(`http://localhost:5000/getquiz/${league}`);
                const data = response.data.quiz;
                setQuizData(data);
                setQuestion(data[0]);
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
            setQuestion(quizData[index]);
        }
    }, [index, quizData]);

    const checkAns = (e, ans) => {
        if (!lock && question) {
            e.target.classList.add("contestquize-selected"); // Add the selected class
            setLock(true);
            if (question.correctOptionIndex === ans) {
                setScore((prev) => prev + 1);
            }
        }
    };

    const next = () => {
        if (lock) {
            if (index === quizData.length - 1) {
                setResult(true);
                return;
            }
            setIndex((prevIndex) => prevIndex + 1);
            setLock(false);

            option_arr.forEach((option) => {
                option.current.classList.remove("contestquize-selected");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(quizData[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    };

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    if (quizData.length === 0) {
        return <div>No quiz data available</div>;
    }

    return (
        <div className='contestquize-container'>
            <h1 className='contest-quiz-heading'>Quiz</h1>
            <hr />
            {result ? (
                <>
                    <h1 id='contestquize-score'>You scored {score} out of {quizData.length}</h1>
                    <button className='contestquiz-btn' onClick={reset}>Reset</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question ? question.question : "Loading..."}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question?.options[0]}</li>
                        <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question?.options[1]}</li>
                        <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question?.options[2]}</li>
                        <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question?.options[3]}</li>
                    </ul>
                    <button className='contestquiz-btn' onClick={next}>Next</button>
                    <div className="contestquize-index">{index + 1} of {quizData.length} questions</div>
                </>
            )}
        </div>
    );
};

export default ContestQuize;
