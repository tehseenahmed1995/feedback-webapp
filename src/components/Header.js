import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Feedback App</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;