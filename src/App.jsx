import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import { exams } from './data'; 
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('examPortalUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignup = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('examPortalUsers', JSON.stringify(updatedUsers));

    // Auto-login after signup
    handleLogin(newUser);
    return true;
  };

  const handleLogin = (credentials) => {
    const foundUser = users.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup onSignup={handleSignup} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={user ? <Homepage user={user} exams={exams} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/test/:examId" 
            element={user ? <TestPage user={user} exams={exams} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/result/:examId" 
            element={user ? <ResultPage user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;