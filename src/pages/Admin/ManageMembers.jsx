import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ManageMembers = () => {
  const { members, addMember, updateMember, removeMember } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', role: '', dept_or_year: '', category: 'faculty'
  });

  const resetForm = () => {
    setFormData({ name: '', role: '', dept_or_year: '', category: 'faculty' });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (member) => {
    setFormData(member);
    setIsEditing(member.id);
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role) {
      if (isEditing) {
        const { id, ...dataWithoutId } = formData;
        updateMember(isEditing, dataWithoutId);
      } else {
        addMember(formData);
      }
      resetForm();
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Members</h2>
          <p className="text-muted">Add, update or remove university sports members.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => isAdding ? resetForm() : setIsAdding(true)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <h4>{isEditing ? 'Edit Member' : 'Add New Member'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Full Name" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={inputStyle}/>
            <input type="text" placeholder="Role (e.g. President, Volunteer)" className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required style={inputStyle}/>
            
            <input type="text" placeholder="Dept or Year (e.g. 3rd Year, Management)" className="input-field" value={formData.dept_or_year} onChange={e => setFormData({...formData, dept_or_year: e.target.value})} style={inputStyle}/>
            <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
              <option value="faculty">Faculty Coordinator</option>
              <option value="core">Core Member</option>
              <option value="team">Team Member</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }}>{isEditing ? 'Update Member' : 'Save Member'}</button>
        </form>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Dept/Year</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td><strong>{member.name}</strong></td>
                <td>{member.role}</td>
                <td>{member.dept_or_year}</td>
                <td>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                    {member.category}
                  </span>
                </td>
                <td>
                  <button className="action-btn" style={{ marginRight: '0.5rem', background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(member)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn btn-danger" onClick={() => removeMember(member.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No members found.</td></tr>}
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

export default ManageMembers;
