import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">Z-Blogs</Link>
        <Link to="/blogs" className="nav-link">Home</Link>
      </div>
      {token && (
        <div className="nav-right">
          <button className="nav-add" onClick={() => navigate('/post')}>+</button>
          <Link to="/profile" className="nav-link">👤</Link>
          <button className="nav-link nav-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!token && (
        <div className="nav-right">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
