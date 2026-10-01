import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { ArrowLeft } from 'lucide-react';
import './Home.css';

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useContext(DataContext);
  
  const event = events.find(e => e.id.toString() === id);

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center', color: 'white' }}>
        <h2>Event not found</h2>
        <Link to="/events" className="btn-glow-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
      <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Events
      </Link>
      
      <div className="spotlight-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRadius: '1rem' }}>
        <div style={{ width: '100%', maxHeight: '400px', overflow: 'hidden', borderRadius: '1rem' }}>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div>
          <span style={{ 
            display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '1rem', 
            fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '1rem',
            background: event.status === 'upcoming' ? 'rgba(59, 130, 246, 0.2)' : 
                        event.status === 'ongoing' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            color: event.status === 'upcoming' ? '#60a5fa' : 
                   event.status === 'ongoing' ? '#34d399' : '#94a3b8'
          }}>
            {event.status}
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>{event.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', color: '#cbd5e1', fontSize: '1rem', marginBottom: '2rem' }}>
            <span>📅 <strong>Date:</strong> {event.date}</span>
            <span>👥 <strong>Participants:</strong> {event.participants}</span>
          </div>
          
          <div style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Description</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{event.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
