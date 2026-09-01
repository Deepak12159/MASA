import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Award, Camera, LogIn, UserPlus } from 'lucide-react';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar dark-nav">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/icon.jpeg" alt="Logo" className="logo-img" />
          <div className="logo-text-container">
            <h2 className="logo-text">MAASA</h2>
            <span className="logo-subtext">Medicaps University</span>
          </div>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <Home size={16} className="nav-icon" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              <Users size={16} className="nav-icon" /> About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faculty" className={`nav-link ${location.pathname === '/faculty' ? 'active' : ''}`}>
              <Users size={16} className="nav-icon" /> Faculty
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}>
              <Calendar size={16} className="nav-icon" /> Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/media" className={`nav-link ${location.pathname === '/media' ? 'active' : ''}`}>
              <Camera size={16} className="nav-icon" /> Media
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <Link to="/admin" className="btn-glow-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-sign-in"><LogIn size={16}/> Sign In</Link>
              <button className="btn-join-us"><UserPlus size={16}/> Join Us</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
