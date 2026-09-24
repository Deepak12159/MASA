import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthContext } from '../../context/AuthContext';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const ManageAdmins = () => {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', role: '', is_active: true });
  
  const [isAdding, setIsAdding] = useState(false);
  const [newUserData, setNewUserData] = useState({ email: '', password: '', name: '', role: 'faculty' });

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
    setFormData({ name: profile.name, role: profile.role, is_active: profile.is_active ?? true });
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to terminate this user? They will lose their role and access.")) {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (!error) {
        setProfiles(profiles.filter(p => p.id !== id));
      } else {
        alert("Error terminating user.");
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserData.email || !newUserData.password || !newUserData.name) {
      return alert("Please fill all fields.");
    }
    
    // Use secondary client to prevent logging out the current superuser
    const supabaseAdmin = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabaseAdmin.auth.signUp({
      email: newUserData.email,
      password: newUserData.password,
    });

    if (error) {
      alert("Error creating auth user: " + error.message);
      return;
    }

    if (data?.user) {
      const newProfile = {
        id: data.user.id,
        email: data.user.email,
        name: newUserData.name,
        role: newUserData.role,
        is_active: true
      };

      // Insert using main client (which has superuser session)
      const { error: profileError } = await supabase.from('profiles').insert([newProfile]);
      
      if (profileError) {
        alert("User auth created, but error saving profile: " + profileError.message);
      } else {
        setProfiles([...profiles, newProfile]);
        setIsAdding(false);
        setNewUserData({ email: '', password: '', name: '', role: 'faculty' });
        alert("User successfully created and assigned role!");
      }
    }
  };

  if (user?.role !== 'superuser') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Access Denied. Superusers only.</div>;
  }

  return (
    <div className="manage-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Users</h2>
          <p className="text-muted">Create new admins, change roles and update names.</p>
        </div>
        <button className="btn-glow-primary" style={{ padding: '0.6rem 1.2rem' }} onClick={() => setIsAdding(!isAdding)}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddUser} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <h4>Create New Admin / Technical User</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Full Name" className="input-field" value={newUserData.name} onChange={e => setNewUserData({...newUserData, name: e.target.value})} required style={editInputStyle}/>
            <input type="email" placeholder="Email Address" className="input-field" value={newUserData.email} onChange={e => setNewUserData({...newUserData, email: e.target.value})} required style={editInputStyle}/>
            <input type="password" placeholder="Temporary Password" className="input-field" value={newUserData.password} onChange={e => setNewUserData({...newUserData, password: e.target.value})} required minLength={6} style={editInputStyle}/>
            <select className="input-field" value={newUserData.role} onChange={e => setNewUserData({...newUserData, role: e.target.value})} style={editInputStyle}>
              <option value="technical">Technical Team</option>
              <option value="faculty">Faculty Coordinator</option>
              <option value="superuser">Super Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-glow-primary" style={{ alignSelf: 'flex-start' }}>Create User</button>
        </form>
      )}

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
                          <option value="technical">Technical Team</option>
                          <option value="faculty">Faculty Coordinator</option>
                          <option value="superuser">Super Admin</option>
                        </select>
                      </td>
                      <td>
                        <select 
                          value={formData.is_active} 
                          onChange={e => setFormData({...formData, is_active: e.target.value === 'true'})} 
                          className="input-field" 
                          style={{...editInputStyle, width: '80px', marginLeft: '10px'}}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
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
                        <span className={profile.is_active === false ? 'badge-danger' : 'badge-success'} style={{marginLeft: '10px', fontSize: '0.75rem'}}>
                          {profile.is_active === false ? 'Inactive' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn" style={{ background: 'rgba(255,255,255,0.1)', marginRight: '0.5rem' }} onClick={() => handleEditClick(profile)}>
                          <Edit2 size={16} /> Edit
                        </button>
                        {user.role === 'superuser' && user.id !== profile.id && (
                          <button className="action-btn btn-danger" onClick={() => handleDelete(profile.id)}>
                            <Trash2 size={16} />
                          </button>
                        )}
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
