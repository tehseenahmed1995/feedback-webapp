import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchCsrfToken } from './api';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FeedbackList from './components/FeedbackList';

const App = () => {
  useEffect(() => {
    fetchCsrfToken();
  }, []);
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<FeedbackList/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;