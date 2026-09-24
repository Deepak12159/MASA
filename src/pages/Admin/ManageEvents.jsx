import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const { events, addEvent, updateEvent, removeEvent, uploadFile } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // stores ID of event being edited
  
  const [formData, setFormData] = useState({
    title: '', status: 'upcoming', date: '', participants: '', desc: '', image: '', file: null
  });
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', status: 'upcoming', date: '', participants: '', desc: '', image: '', file: null });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (event) => {
    setFormData({ ...event, file: null });
    setIsEditing(event.id);
    setIsAdding(true); // Open the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.date) {
      setUploading(true);
      
      let finalImageUrl = formData.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800';
      
      if (formData.file) {
        const uploadedUrl = await uploadFile(formData.file, 'events');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const payload = {
        title: formData.title,
        status: formData.status,
        date: formData.date,
        participants: formData.participants,
        desc: formData.desc,
        image: finalImageUrl
      };
      
      if (isEditing) {
        updateEvent(isEditing, payload);
      } else {
        addEvent(payload);
      }
      setUploading(false);
      resetForm();
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Events</h2>
          <p className="text-muted">Upload, update or remove upcoming tournaments.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => isAdding ? resetForm() : setIsAdding(true)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>{isEditing ? 'Edit Event' : 'Add New Event'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Event Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle}/>
            <select className="input-field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={inputStyle}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="archive">Archived</option>
            </select>
            <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required style={inputStyle}/>
            <input type="text" placeholder="Participants (e.g. 200+)" className="input-field" value={formData.participants} onChange={e => setFormData({...formData, participants: e.target.value})} style={inputStyle}/>
            <input type="file" accept="image/*" className="input-field" style={{ gridColumn: '1 / -1', ...inputStyle }} onChange={e => setFormData({...formData, file: e.target.files[0]})} />
            {formData.image && !formData.file && <p style={{ gridColumn: '1 / -1', fontSize: '0.8rem', color: '#94a3b8' }}>Current image will be kept if no new file is selected.</p>}
            <textarea placeholder="Description" className="input-field" style={{ gridColumn: '1 / -1', height: '80px', ...inputStyle }} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>
            {uploading ? 'Uploading...' : (isEditing ? 'Update Event' : 'Save Event')}
          </button>
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
                  <button className="action-btn" style={{ marginRight: '0.5rem', background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(event)}>
                    <Edit2 size={16} />
                  </button>
                  {user?.role !== 'technical' && (
                    <button className="action-btn btn-danger" onClick={() => removeEvent(event.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
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
