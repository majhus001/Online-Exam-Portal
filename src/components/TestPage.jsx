import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data'; // Import questions from data.js
import './TestPage.css';

const TestPage = ({ user, exams }) => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const selectedExam = exams.find(e => e.id === parseInt(examId));
    if (selectedExam) {
      setExam(selectedExam);
      setTimeLeft(selectedExam.duration * 60); // Convert to seconds
    }
  }, [examId, exams]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && exam) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleNext = () => {
    const examQuestions = questions[examId] || [];
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const examQuestions = questions[examId] || [];
    let score = 0;
    
    examQuestions.forEach(question => {
      if (answers[question.id] === question.answer) {
        score++;
      }
    });
    
    return score;
  };

  const handleSubmit = () => {
    const examQuestions = questions[examId] || [];
    const score = calculateScore();
    
    const result = {
      score,
      total: examQuestions.length,
      percentage: (score / examQuestions.length) * 100,
      examId: parseInt(examId),
      examTitle: exam?.title,
      timestamp: new Date().toISOString(),
      answers: answers // Store user's answers for review
    };

    // Save result to localStorage
    const userResults = JSON.parse(localStorage.getItem('examResults') || '{}');
    userResults[user.id] = userResults[user.id] || {};
    userResults[user.id][examId] = result;
    localStorage.setItem('examResults', JSON.stringify(userResults));

    navigate(`/result/${examId}`);
  };

  if (!exam) {
    return (
      <div className="test-container">
        <div className="container">
          <div className="loading">Loading exam...</div>
        </div>
      </div>
    );
  }

  const examQuestions = questions[examId] || [];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastQuestion = currentQuestion === examQuestions.length - 1;

  return (
    <div className="test-container">
      <div className="test-header">
        <div className="container">
          <h1>{exam.title}</h1>
          <div className="test-info">
            <div className="timer">
              Time Left: <span className={timeLeft < 300 ? 'time-warning' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="question-counter">
              Question {currentQuestion + 1} of {examQuestions.length}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="test-content">
          {examQuestions.length > 0 ? (
            <>
              <div className="question-card">
                <h3>Q{currentQuestion + 1}: {examQuestions[currentQuestion].question}</h3>
                <div className="options-list">
                  {examQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="option-item">
                      <label>
                        <input
                          type="radio"
                          name={`question-${examQuestions[currentQuestion].id}`}
                          value={option}
                          checked={answers[examQuestions[currentQuestion].id] === option}
                          onChange={() => handleAnswerSelect(examQuestions[currentQuestion].id, option)}
                        />
                        <span className="option-text">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="navigation-buttons">
                <button 
                  className="btn btn-primary" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                
                {isLastQuestion ? (
                  <button 
                    className="btn btn-success" 
                    onClick={handleSubmit}
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="question-progress">
                {examQuestions.map((question, index) => (
                  <div 
                    key={question.id}
                    className={`progress-dot ${currentQuestion === index ? 'active' : ''} ${
                      answers[question.id] !== undefined ? 'answered' : ''
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                    title={`Question ${index + 1}`}
                  />
                ))}
              </div>

              <div className="exam-stats">
                <div className="stat-item">
                  <span className="stat-label">Answered:</span>
                  <span className="stat-value">
                    {Object.keys(answers).length} / {examQuestions.length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time:</span>
                  <span className="stat-value">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="no-questions">
              <h3>No questions available for this exam.</h3>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;