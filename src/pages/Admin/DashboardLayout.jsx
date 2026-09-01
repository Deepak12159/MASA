import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Calendar, Image as ImageIcon, LogOut, Settings, Shield } from 'lucide-react';
import './Dashboard.css';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadge = (role) => {
    if (role === 'superuser') return <span className="badge-super">Super Admin</span>;
    if (role === 'faculty') return <span className="badge-faculty">Faculty</span>;
    return <span className="badge-tech">Tech Team</span>;
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Shield size={24} className="text-blue" />
          <h2>MAASA Admin</h2>
        </div>

        <div className="user-profile">
          <div className="avatar">{user?.name.charAt(0)}</div>
          <div className="user-info">
            <h4>{user?.name}</h4>
            {getRoleBadge(user?.role)}
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link to="/admin/events" className={`nav-item ${location.pathname === '/admin/events' ? 'active' : ''}`}>
            <Calendar size={18} /> Manage Events
          </Link>
          <Link to="/admin/media" className={`nav-item ${location.pathname === '/admin/media' ? 'active' : ''}`}>
            <ImageIcon size={18} /> Manage Media
          </Link>
          
          {user?.role === 'superuser' && (
            <Link to="/admin/settings" className="nav-item">
              <Settings size={18} /> Settings
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h3>Dashboard</h3>
          </div>
          <div className="topbar-right">
            <Link to="/" className="btn-outline-sm">View Public Site</Link>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
