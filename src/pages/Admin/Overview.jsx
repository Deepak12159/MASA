import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// Need to import correctly
import { Calendar, Image as ImageIcon, Users, Activity } from 'lucide-react';

const Overview = () => {
  const { user } = useContext(AuthContext);

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
            <h3 className="stat-value">12</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-purple-subtle"><ImageIcon size={20} className="text-purple"/></div>
          <div className="stat-info">
            <span className="stat-label">Media Uploads</span>
            <h3 className="stat-value">48</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-green-subtle"><Users size={20} className="text-green"/></div>
          <div className="stat-info">
            <span className="stat-label">Active Athletes</span>
            <h3 className="stat-value">1,240</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-orange-subtle"><Activity size={20} className="text-orange"/></div>
          <div className="stat-info">
            <span className="stat-label">Ongoing Tournaments</span>
            <h3 className="stat-value">3</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
