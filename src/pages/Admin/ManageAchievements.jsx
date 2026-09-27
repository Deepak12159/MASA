import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ManageAchievements = () => {
  const { user } = useContext(AuthContext);
  const { achievements, addAchievement, updateAchievement, removeAchievement, uploadFile } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', desc: '', image: '', file: null
  });

  const resetForm = () => {
    setFormData({ title: '', desc: '', image: '', file: null });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (ach) => {
    setFormData({ ...ach, file: null });
    setIsEditing(ach.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.desc) {
      setUploading(true);
      let finalImageUrl = formData.image;
      
      if (formData.file) {
        const uploadedUrl = await uploadFile(formData.file, 'achievements');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const payload = {
        title: formData.title,
        desc: formData.desc,
        image: finalImageUrl
      };

      if (isEditing) {
        updateAchievement(isEditing, payload);
      } else {
        addAchievement(payload);
      }
      setUploading(false);
      resetForm();
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Achievements</h2>
          <p className="text-muted">Update the Wall of Fame.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => isAdding ? resetForm() : setIsAdding(true)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Achievement'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>{isEditing ? 'Edit Achievement' : 'Add New Achievement'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <input type="text" placeholder="Achievement Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle}/>
            <input type="file" accept="image/*" className="input-field" style={inputStyle} onChange={e => setFormData({...formData, file: e.target.files[0]})} />
            {formData.image && !formData.file && <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Current image will be kept if no new file is selected.</p>}
            <textarea placeholder="Description" className="input-field" style={{ height: '80px', ...inputStyle }} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} required></textarea>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>
            {uploading ? 'Uploading...' : (isEditing ? 'Update' : 'Save')}
          </button>
        </form>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map(ach => (
              <tr key={ach.id}>
                <td>
                  {ach.image ? (
                    <img src={ach.image} alt={ach.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}></div>
                  )}
                </td>
                <td><strong>{ach.title}</strong></td>
                <td>{ach.desc.substring(0, 50)}{ach.desc.length > 50 ? '...' : ''}</td>
                <td style={{ minWidth: '100px' }}>
                  <button className="action-btn" style={{ marginRight: '0.5rem', background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(ach)}>
                    <Edit2 size={16} />
                  </button>
                  {user?.role !== 'technical' && (
                    <button className="action-btn btn-danger" onClick={() => removeAchievement(ach.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {achievements.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No achievements found.</td></tr>}
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

export default ManageAchievements;
