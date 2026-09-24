import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';

const ManageAbout = () => {
  const { aboutContent, updateAboutContent } = useContext(DataContext);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(aboutContent);
  }, [aboutContent]);

  const handleSave = async () => {
    setIsSaving(true);
    await updateAboutContent(content);
    setIsSaving(false);
  };

  return (
    <div className="manage-page">
      <div className="page-header">
        <h2>Manage About Section</h2>
        <p className="text-muted">Edit the main text displayed on the About page.</p>
      </div>

      <div className="stat-card" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea 
          className="input-field" 
          style={{ height: '300px', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem', fontFamily: 'inherit', resize: 'vertical' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the about section content here..."
        />
        <button 
          className="btn-glow-primary" 
          style={{ alignSelf: 'flex-start', padding: '0.6rem 2rem' }} 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ManageAbout;
