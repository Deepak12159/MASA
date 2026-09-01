import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-gradient">Get In Touch</h2>
        <p>Have questions about tournaments or want to join the core team? Reach out to us.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="spotlight-card" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}>
          <div style={{ margin: '0 auto 1.5rem', width: '50px', height: '50px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={24} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Visit Us</h3>
          <p style={{ color: '#94a3b8' }}>Sports Complex, Medicaps University<br/>Indore, MP, India</p>
        </div>
        
        <div className="spotlight-card" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}>
          <div style={{ margin: '0 auto 1.5rem', width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={24} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Email Us</h3>
          <p style={{ color: '#94a3b8' }}>sports@medicaps.ac.in<br/>support@maasa.com</p>
        </div>
        
        <div className="spotlight-card" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}>
          <div style={{ margin: '0 auto 1.5rem', width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={24} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Call Us</h3>
          <p style={{ color: '#94a3b8' }}>+91 98765 43210<br/>(Mon-Fri, 9am - 5pm)</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
