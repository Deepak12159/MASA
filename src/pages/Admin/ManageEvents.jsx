import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const ManageEvents = () => {
  const { events, addEvent, removeEvent } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: '', status: 'upcoming', date: '', participants: '', desc: '', image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      addEvent({
        ...newEvent,
        image: newEvent.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800'
      });
      setIsAdding(false);
      setNewEvent({ title: '', status: 'upcoming', date: '', participants: '', desc: '', image: '' });
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Events</h2>
          <p className="text-muted">Upload or remove upcoming tournaments.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => setIsAdding(!isAdding)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>Add New Event</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Event Title" className="input-field" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required style={inputStyle}/>
            <select className="input-field" value={newEvent.status} onChange={e => setNewEvent({...newEvent, status: e.target.value})} style={inputStyle}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="archive">Archived</option>
            </select>
            <input type="date" className="input-field" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required style={inputStyle}/>
            <input type="text" placeholder="Participants (e.g. 200+)" className="input-field" value={newEvent.participants} onChange={e => setNewEvent({...newEvent, participants: e.target.value})} style={inputStyle}/>
            <input type="text" placeholder="Image URL (Unsplash)" className="input-field" style={{ gridColumn: '1 / -1', ...inputStyle }} value={newEvent.image} onChange={e => setNewEvent({...newEvent, image: e.target.value})}/>
            <textarea placeholder="Description" className="input-field" style={{ gridColumn: '1 / -1', height: '80px', ...inputStyle }} value={newEvent.desc} onChange={e => setNewEvent({...newEvent, desc: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }}>Save Event</button>
        </form>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>
                  <img src={event.image} alt={event.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                </td>
                <td><strong>{event.title}</strong></td>
                <td>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                    {event.status}
                  </span>
                </td>
                <td>{event.date}</td>
                <td>
                  <button className="action-btn btn-danger" onClick={() => removeEvent(event.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No events found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: '0.5rem',
  fontFamily: 'inherit'
};

export default ManageEvents;
