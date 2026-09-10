import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
// Need to import correctly
import { Calendar, Image as ImageIcon, Users, Activity } from 'lucide-react';

const Overview = () => {
  const { user } = useContext(AuthContext);
  const { events, media, members } = useContext(DataContext);

  // We'll just show some static mock stats for the overview
  return (
    <div className="overview-page">
      <div className="page-header">
        <h2>Welcome back, {user?.name}</h2>
        <p className="text-muted">Here is what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-subtle"><Calendar size={20} className="text-blue"/></div>
          <div className="stat-info">
            <span className="stat-label">Total Events</span>
            <h3 className="stat-value">{events.length}</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-purple-subtle"><ImageIcon size={20} className="text-purple"/></div>
          <div className="stat-info">
            <span className="stat-label">Media Uploads</span>
            <h3 className="stat-value">{media.length}</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-green-subtle"><Users size={20} className="text-green"/></div>
          <div className="stat-info">
            <span className="stat-label">Registered Members</span>
            <h3 className="stat-value">{members.length}</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-orange-subtle"><Activity size={20} className="text-orange"/></div>
          <div className="stat-info">
            <span className="stat-label">Ongoing Tournaments</span>
            <h3 className="stat-value">{events.filter(e => e.status === 'ongoing').length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
