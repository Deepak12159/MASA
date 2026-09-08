import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthContext } from '../../context/AuthContext';
import { Edit2 } from 'lucide-react';

const ManageAdmins = () => {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', role: '' });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) {
      setProfiles(data);
    }
    setLoading(false);
  };

  const handleEditClick = (profile) => {
    setFormData({ name: profile.name, role: profile.role });
    setEditingId(profile.id);
  };

  const handleSave = async (id) => {
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', id);
      
    if (!error) {
      setProfiles(profiles.map(p => p.id === id ? { ...p, ...formData } : p));
      setEditingId(null);
    } else {
      alert("Error updating profile.");
    }
  };

  if (user?.role !== 'superuser') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Access Denied. Superadmin only.</div>;
  }

  return (
    <div className="manage-page">
      <div className="page-header">
        <h2>Manage Admins</h2>
        <p className="text-muted">Change roles and update names for all registered admins.</p>
        <p style={{ fontSize: '0.85rem', color: '#ffb020', marginTop: '0.5rem' }}>
          Note: To add a new admin, first create their account in the Supabase Authentication dashboard. Once they log in here, they will appear in this list.
        </p>
      </div>

      <div className="data-table-container" style={{ marginTop: '2rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profiles...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id}>
                  <td>{profile.email}</td>
                  
                  {editingId === profile.id ? (
                    <>
                      <td>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})} 
                          className="input-field" 
                          style={editInputStyle} 
                        />
                      </td>
                      <td>
                        <select 
                          value={formData.role} 
                          onChange={e => setFormData({...formData, role: e.target.value})} 
                          className="input-field" 
                          style={editInputStyle}
                        >
                          <option value="tech">Technical Team</option>
                          <option value="faculty">Faculty Coordinator</option>
                          <option value="superuser">Super Admin</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn-glow-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleSave(profile.id)}>
                          Save
                        </button>
                        <button className="btn-outline-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginLeft: '0.5rem' }} onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td><strong>{profile.name}</strong></td>
                      <td>
                        <span className={`badge-${profile.role === 'superuser' ? 'super' : profile.role === 'faculty' ? 'faculty' : 'tech'}`}>
                          {profile.role}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={() => handleEditClick(profile)}>
                          <Edit2 size={16} /> Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {profiles.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No profiles found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const editInputStyle = {
  padding: '0.4rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'white',
  borderRadius: '4px',
  width: '100%'
};

export default ManageAdmins;
