import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';  // To get the user details passed from the previous page
import axios from 'axios';
import './ContestQuiz.css';

const ContestQuize = () => {
    const location = useLocation();
    const { user } = location.state || {};  // Retrieve user details passed from the previous page

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);  // Initialize as null, will be set once data is fetched
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [quizData, setQuizData] = useState([]);  // To store the fetched quiz data
    const [loading, setLoading] = useState(true);  // To manage loading state while fetching data

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const option_arr = [option1, option2, option3, option4];

    useEffect(() => {
        if (!user) return;  // If no user data, stop execution

        // Log user participation to debug
        console.log('User participation:', user.participation);

        // Fetch quiz data based on the user's participation (league)
        const fetchQuizData = async () => {
            try {
              const league = encodeURIComponent(user.participation);  // Ensure the league is properly encoded
              const response = await axios.get(`http://localhost:5000/getquiz/${league}`);
              const data = response.data.quiz;
              setQuizData(data);  // Set quiz data
              setQuestion(data[0]);  // Set the first question from the fetched data
              setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
              console.error("Error fetching quiz data:", error);
              setLoading(false);  // Set loading to false if an error occurs
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
        if (lock === false && question) {  // Ensure question exists
            if (question.correctOptionIndex === ans) {
                e.target.classList.add("contestquize-correct");
                setLock(true);
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("contestquize-wrong");
                setLock(true);
                option_arr[question.correctOptionIndex - 1].current.classList.add("contestquize-correct");
            }
        }
    };

    const next = () => {
        if (lock === true) {
            if (index === quizData.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prevIndex => prevIndex + 1);
            setLock(false);

            option_arr.forEach((option) => {
                option.current.classList.remove("contestquize-wrong");
                option.current.classList.remove("contestquize-correct");
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
        return <div>Loading quiz...</div>;  // Display loading message while fetching data
    }

    if (quizData.length === 0) {
        return <div>No quiz data available</div>;  // Handle the case when no quiz data is found
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
