import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const Media = () => {
  const { media } = useContext(DataContext);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Group media by title (folder)
  const folders = media.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }
    acc[item.title].push(item);
    return acc;
  }, {});

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern">
        <h2 className="text-gradient">Gallery</h2>
        <p>Photos and videos from our latest events and tournaments.</p>
      </div>

      {!selectedFolder ? (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3rem'
        }}>
          {Object.entries(folders).map(([title, items]) => (
            <div key={title} className="spotlight-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '1rem', cursor: 'pointer' }} onClick={() => setSelectedFolder(title)}>
              <div style={{ position: 'relative', paddingBottom: '75%' }}>
                <img
                  src={items[0].url}
                  alt={title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white'
                }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{title}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{items.length} Items</span>
                </div>
              </div>
            </div>
          ))}

          {Object.keys(folders).length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', padding: '4rem' }}>
              No media uploaded yet.
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '3rem' }}>
          <button 
            className="btn-glow-primary" 
            style={{ marginBottom: '2rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }} 
            onClick={() => setSelectedFolder(null)}
          >
            &larr; Back to Folders
          </button>
          <h3 style={{ color: 'white', marginBottom: '2rem' }}>{selectedFolder}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {folders[selectedFolder].map(item => (
              <div key={item.id} className="spotlight-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '1rem' }}>
                <div style={{ position: 'relative', paddingBottom: '75%' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
