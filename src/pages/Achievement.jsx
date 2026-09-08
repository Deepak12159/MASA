import React, { useContext } from 'react';
import { Trophy } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const Achievement = () => {
  const { achievements } = useContext(DataContext);

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-gradient">Wall of Fame</h2>
        <p>Celebrating the outstanding victories and records of our athletes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {achievements.map((ach) => (
          <div key={ach.id} className="spotlight-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', borderRadius: '1rem' }}>
            <div className="icon-pulse bg-purple" style={{ width: '60px', height: '60px', borderRadius: '1rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'white' }}>{ach.title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', lineHeight: '1.5' }}>{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
          No achievements have been added yet.
        </div>
      )}
    </div>
  );
};

export default Achievement;
