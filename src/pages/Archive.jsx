import React from 'react';

const Archive = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern">
        <h2 className="text-gradient">Tournament Archives</h2>
        <p>A look back at the legendary sports events hosted by MAASA over the years.</p>
      </div>

      <div style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', marginTop: '3rem' }}>
        No archived events available right now.
      </div>
    </div>
  );
};

export default Archive;
