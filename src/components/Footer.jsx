import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <h2>MAASA</h2>
          </div>
          <p className="brand-description">
            Empowering students through technology and innovation at Medicaps University. Join our athletic community.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/medicaps_sports/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About MAASA</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Medicaps University<br />AB Road, Pigdamber, Rau<br />Indore, MP 453331, India</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>contact@maasa.medicaps.ac.in</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+91 8319780454</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; 2026 MAASA, Medicaps University. All rights reserved.</p>
          <div className="bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
