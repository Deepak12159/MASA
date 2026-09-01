import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const ManageMedia = () => {
  const { media, addMedia, removeMedia } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    title: '', url: '', type: 'photo'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.title) {
      addMedia({
        ...newItem,
        url: newItem.url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800'
      });
      setIsAdding(false);
      setNewItem({ title: '', url: '', type: 'photo' });
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Media Gallery</h2>
          <p className="text-muted">Upload photos and videos to the public gallery.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => setIsAdding(!isAdding)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Upload Media'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>Upload New Media</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Title/Caption" className="input-field" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} required style={inputStyle}/>
            <select className="input-field" value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value})} style={inputStyle}>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
            <input type="text" placeholder="Media URL (Unsplash/YouTube)" className="input-field" style={{ gridColumn: '1 / -1', ...inputStyle }} value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})}/>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }}>Save Media</button>
        </form>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {media.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.url} alt={item.title} style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                </td>
                <td><strong>{item.title}</strong></td>
                <td>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                    {item.type}
                  </span>
                </td>
                <td>
                  <button className="action-btn btn-danger" onClick={() => removeMedia(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {media.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No media found.</td></tr>}
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

export default ManageMedia;
