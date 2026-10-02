import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Edit2, ArrowUp, ArrowDown } from 'lucide-react';

const ManageMembers = () => {
  const { user } = useContext(AuthContext);
  const { members, addMember, updateMember, removeMember, updateMembersBulk, uploadFile } = useContext(DataContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', role: '', dept_or_year: '', category: 'faculty', image: '', file: null
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ name: '', role: '', dept_or_year: '', category: 'faculty', image: '', file: null });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleEditClick = (member) => {
    setFormData({ ...member, file: null });
    setIsEditing(member.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name) {
      setUploading(true);
      let finalImageUrl = formData.image;
      
      if (formData.file) {
        const uploadedUrl = await uploadFile(formData.file, 'members');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const payload = {
        name: formData.name,
        role: formData.role,
        dept_or_year: formData.dept_or_year,
        category: formData.category,
        image: finalImageUrl
      };

      if (isEditing) {
        updateMember(isEditing, payload);
      } else {
        addMember(payload);
      }
      setUploading(false);
      resetForm();
    }
  };

  const handleMove = (index, direction) => {
    if (searchTerm) {
      alert("Please clear the search box to reorder members.");
      return;
    }
    const newMembers = [...members];
    if (direction === -1 && index > 0) {
      [newMembers[index - 1], newMembers[index]] = [newMembers[index], newMembers[index - 1]];
    } else if (direction === 1 && index < newMembers.length - 1) {
      [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
    } else {
      return;
    }
    const updatedList = newMembers.map((m, i) => ({ ...m, display_order: i }));
    updateMembersBulk(updatedList);
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
            <input type="text" placeholder="Role (Optional)" className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={inputStyle}/>
            
            <input type="text" placeholder="Dept or Year (e.g. 3rd Year, Management)" className="input-field" value={formData.dept_or_year} onChange={e => setFormData({...formData, dept_or_year: e.target.value})} style={inputStyle}/>
            <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
              <option value="faculty">Faculty Coordinator</option>
              <option value="core">Core Member</option>
              <option value="alumni">Alumni</option>
            </select>
            <input type="file" accept="image/*" className="input-field" style={{ gridColumn: '1 / -1', ...inputStyle }} onChange={e => setFormData({...formData, file: e.target.files[0]})} />
            
            {formData.image && !formData.file && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Current image will be kept.</span>
                <button type="button" onClick={() => setFormData({...formData, image: ''})} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Trash2 size={14} /> Remove Photo
                </button>
              </div>
            )}
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>
            {uploading ? 'Uploading...' : (isEditing ? 'Update Member' : 'Save Member')}
          </button>
        </form>
      )}

      <div className="data-table-container">
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search members by name or role..." 
            className="input-field" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ width: '100%', maxWidth: '400px', ...inputStyle }}
          />
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>* Use Up/Down arrows to reorder members within their categories.</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Role</th>
              <th>Dept/Year</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td>
                  {member.image ? (
                    <img src={member.image} alt={member.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                  )}
                </td>
                <td><strong>{member.name}</strong></td>
                <td>{member.role}</td>
                <td>{member.dept_or_year}</td>
                <td>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                    {member.category}
                  </span>
                </td>
                <td>
                  {!searchTerm && (
                    <>
                      <button className="action-btn" title="Move Up" style={{ marginRight: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }} onClick={() => handleMove(members.findIndex(m => m.id === member.id), -1)}>
                        <ArrowUp size={16} />
                      </button>
                      <button className="action-btn" title="Move Down" style={{ marginRight: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }} onClick={() => handleMove(members.findIndex(m => m.id === member.id), 1)}>
                        <ArrowDown size={16} />
                      </button>
                    </>
                  )}
                  <button className="action-btn" title="Edit" style={{ marginRight: '0.5rem', background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(member)}>
                    <Edit2 size={16} />
                  </button>
                  {user?.role !== 'technical' && (
                    <button className="action-btn btn-danger" title="Delete" onClick={() => removeMember(member.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No members found.</td></tr>}
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
