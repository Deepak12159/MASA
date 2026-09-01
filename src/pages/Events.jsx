import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './Home.css';

const EventCard = ({ event }) => (
  <div className="spotlight-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
      <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <span style={{ 
        alignSelf: 'flex-start', padding: '0.3rem 0.8rem', borderRadius: '1rem', 
        fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '1rem',
        background: event.status === 'upcoming' ? 'rgba(59, 130, 246, 0.2)' : 
                    event.status === 'ongoing' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        color: event.status === 'upcoming' ? '#60a5fa' : 
               event.status === 'ongoing' ? '#34d399' : '#94a3b8'
      }}>
        {event.status}
      </span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>{event.title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>{event.desc}</p>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.85rem' }}>
        <span>📅 {event.date}</span>
        <span>👥 {event.participants}</span>
      </div>
    </div>
  </div>
);

const Events = () => {
  const { events } = useContext(DataContext);
  const ongoing = events.filter(e => e.status === 'ongoing');
  const upcoming = events.filter(e => e.status === 'upcoming');
  const past = events.filter(e => e.status === 'archive' || e.status === 'past');

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '100px' }}>
      <div className="section-header-modern">
        <h2 className="text-gradient">MAASA Events</h2>
        <p>Explore all ongoing, upcoming, and past tournaments.</p>
      </div>

      {ongoing.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Ongoing Events</h3>
          <div className="premium-grid">
            {ongoing.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Upcoming Events</h3>
          <div className="premium-grid">
            {upcoming.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Past Events (Archive)</h3>
          <div className="premium-grid">
            {past.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem', marginTop: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
          No events available at the moment.
        </div>
      )}
    </div>
  );
};

export default Events;
