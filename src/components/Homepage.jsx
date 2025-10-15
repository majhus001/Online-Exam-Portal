import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = ({ user, exams, onLogout }) => {
  const navigate = useNavigate();

  const handleStartExam = (examId) => {
    navigate(`/test/${examId}`);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-brand">ExamPortal</div>
          <div className="nav-user">
            <span>Welcome, {user.name}</span>
            <button className="btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="welcome-section">
          <h1>Available Exams</h1>
          <p>Select an exam to start testing your knowledge</p>
        </div>

        <div className="exams-grid">
          {exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <h3>{exam.title}</h3>
              <div className="exam-info">
                <div className="info-item">
                  <span className="label">Duration:</span>
                  <span className="value">{exam.duration} minutes</span>
                </div>
                <div className="info-item">
                  <span className="label">Questions:</span>
                  <span className="value">{exam.questions}</span>
                </div>
                <div className="info-item">
                  <span className="label">Difficulty:</span>
                  <span className={`value difficulty-${exam.difficulty.toLowerCase()}`}>
                    {exam.difficulty}
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-success"
                onClick={() => handleStartExam(exam.id)}
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;