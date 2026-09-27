import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { ArrowLeft, Trophy } from 'lucide-react';
import './Home.css';

const AchievementDetail = () => {
  const { id } = useParams();
  const { achievements } = useContext(DataContext);
  
  const ach = achievements.find(a => a.id.toString() === id);

  if (!ach) {
    return (
      <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center', color: 'white' }}>
        <h2>Achievement not found</h2>
        <Link to="/achievement" className="btn-glow-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to Achievements</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
      <Link to="/achievement" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Achievements
      </Link>
      
      <div className="spotlight-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRadius: '1rem', alignItems: 'center', textAlign: 'center' }}>
        {ach.image ? (
          <div style={{ width: '100%', maxWidth: '600px', maxHeight: '400px', overflow: 'hidden', borderRadius: '1rem' }}>
            <img src={ach.image} alt={ach.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="icon-pulse bg-purple" style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={48} />
          </div>
        )}
        
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0', color: 'white' }}>{ach.title}</h1>
          
          <div style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'left', marginTop: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Details</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{ach.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
