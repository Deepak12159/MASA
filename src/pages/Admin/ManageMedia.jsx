import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ManageMedia = () => {
  const { user } = useContext(AuthContext);
  const { media, addMedia, updateMedia, removeMedia, uploadFile } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // stores ID of item being edited
  
  const [formData, setFormData] = useState({
    title: '', url: '', type: 'photo', file: null
  });
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', url: '', type: 'photo', file: null });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (item) => {
    setFormData({ ...item, file: null });
    setIsEditing(item.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title) {
      setUploading(true);

      let finalUrl = formData.url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800';

      if (formData.file) {
        const uploadedUrl = await uploadFile(formData.file, 'gallery');
        if (uploadedUrl) {
          finalUrl = uploadedUrl;
        }
      }

      const payload = {
        title: formData.title,
        type: formData.type,
        url: finalUrl
      };

      if (isEditing) {
        updateMedia(isEditing, payload);
      } else {
        addMedia(payload);
      }
      setUploading(false);
      resetForm();
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Media Gallery</h2>
          <p className="text-muted">Upload, edit or remove photos and videos.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => isAdding ? resetForm() : setIsAdding(true)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Upload Media'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>{isEditing ? 'Edit Media' : 'Upload New Media'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Title/Caption" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle}/>
            <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={inputStyle}>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
            <input type="file" accept="image/*,video/*" className="input-field" style={{ gridColumn: '1 / -1', ...inputStyle }} onChange={e => setFormData({...formData, file: e.target.files[0]})} />
            {formData.url && !formData.file && <p style={{ gridColumn: '1 / -1', fontSize: '0.8rem', color: '#94a3b8' }}>Current file will be kept if no new file is selected.</p>}
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>
            {uploading ? 'Uploading...' : (isEditing ? 'Update Media' : 'Save Media')}
          </button>
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
                  <button className="action-btn" style={{ marginRight: '0.5rem', background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(item)}>
                    <Edit2 size={16} />
                  </button>
                  {user?.role !== 'technical' && (
                    <button className="action-btn btn-danger" onClick={() => removeMedia(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
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
