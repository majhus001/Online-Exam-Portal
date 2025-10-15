import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = ({ user }) => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const userResults = JSON.parse(localStorage.getItem('examResults') || '{}');
    const userExamResult = userResults[user.id]?.[examId];
    
    if (userExamResult) {
      setResult(userExamResult);
    }
  }, [examId, user.id]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRetakeExam = () => {
    navigate(`/test/${examId}`);
  };

  if (!result) {
    return (
      <div className="result-container">
        <div className="container">
          <div className="result-card">
            <h2>Result Not Found</h2>
            <p>Unable to find your exam result.</p>
            <button className="btn btn-primary" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPassed = result.percentage >= 60;

  return (
    <div className="result-container">
      <div className="container">
        <div className="result-card">
          <div className={`result-header ${isPassed ? 'passed' : 'failed'}`}>
            <h1>Exam Result</h1>
            <div className="result-icon">
              {isPassed ? '🎉' : '😔'}
            </div>
          </div>

          <div className="result-details">
            <h2>{result.examTitle}</h2>
            <p className="result-date">
              Completed on: {new Date(result.timestamp).toLocaleDateString()}
            </p>

            <div className="score-section">
              <div className="score-circle">
                <div className="score-value">{result.percentage.toFixed(1)}%</div>
                <div className="score-label">Score</div>
              </div>
              
              <div className="score-details">
                <div className="score-item">
                  <span className="label">Correct Answers:</span>
                  <span className="value">{result.score} / {result.total}</span>
                </div>
                <div className="score-item">
                  <span className="label">Status:</span>
                  <span className={`value status-${isPassed ? 'passed' : 'failed'}`}>
                    {isPassed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="score-item">
                  <span className="label">Percentage:</span>
                  <span className="value">{result.percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="performance-message">
              {isPassed ? (
                <p>Congratulations! You have successfully passed the exam.</p>
              ) : (
                <p>Don't worry! Keep practicing and try again.</p>
              )}
            </div>

            <div className="result-actions">
              <button className="btn btn-primary" onClick={handleBackToHome}>
                Back to Home
              </button>
              <button className="btn btn-success" onClick={handleRetakeExam}>
                Retake Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;