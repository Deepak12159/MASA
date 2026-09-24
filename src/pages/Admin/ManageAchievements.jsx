import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ManageAchievements = () => {
  const { user } = useContext(AuthContext);
  const { achievements, addAchievement, updateAchievement, removeAchievement } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', desc: ''
  });

  const resetForm = () => {
    setFormData({ title: '', desc: '' });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (ach) => {
    setFormData(ach);
    setIsEditing(ach.id);
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.desc) {
      if (isEditing) {
        const { id, ...dataWithoutId } = formData;
        updateAchievement(isEditing, dataWithoutId);
      } else {
        addAchievement(formData);
      }
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
            <textarea placeholder="Description" className="input-field" style={{ height: '80px', ...inputStyle }} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} required></textarea>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }}>{isEditing ? 'Update' : 'Save'}</button>
        </form>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map(ach => (
              <tr key={ach.id}>
                <td><strong>{ach.title}</strong></td>
                <td>{ach.desc}</td>
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
            {achievements.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No achievements found.</td></tr>}
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
