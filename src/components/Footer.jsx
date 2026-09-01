import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
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
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
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
