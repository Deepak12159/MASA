import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Media = () => {
  const { media } = useContext(DataContext);

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern">
        <h2 className="text-gradient">Gallery</h2>
        <p>Photos and videos from our latest events and tournaments.</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3rem'
      }}>
        {media.map(item => (
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
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{item.title}</h4>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{item.type}</span>
              </div>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', padding: '4rem' }}>
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
