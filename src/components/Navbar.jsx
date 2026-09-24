import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Award, Camera, LogIn, UserPlus, Info, Menu, X } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar dark-nav">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/icon.jpeg" alt="Logo" className="logo-img" />
          <div className="logo-text-container">
            <h2 className="logo-text" style={{ fontSize: '1rem' }}>Medicaps University</h2>
            <span className="logo-subtext" style={{ fontSize: '0.65rem' }}>Athletics & Sports Association</span>
          </div>
        </Link>

        {/* Desktop & Mobile Menu */}
        <div className={`nav-elements ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                <Home size={16} className="nav-icon" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/members" className={`nav-link ${location.pathname === '/members' ? 'active' : ''}`} onClick={closeMenu}>
                <Users size={16} className="nav-icon" /> Members
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`} onClick={closeMenu}>
                <Calendar size={16} className="nav-icon" /> Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/achievement" className={`nav-link ${location.pathname === '/achievement' ? 'active' : ''}`} onClick={closeMenu}>
                <Award size={16} className="nav-icon" /> Achievements
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/media" className={`nav-link ${location.pathname === '/media' ? 'active' : ''}`} onClick={closeMenu}>
                <Camera size={16} className="nav-icon" /> Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
                <Info size={16} className="nav-icon" /> About
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            {user && (
              <Link to="/admin" className="btn-glow-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={closeMenu}>
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
