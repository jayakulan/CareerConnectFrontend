import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, User, FileText, LogOut, Sparkles } from 'lucide-react';
import Dashboard from '../pages/seeker/Dashboard';
import Jobs from '../pages/seeker/Jobs';
import Profile from '../pages/seeker/Profile';
import AIResumeCheck from '../pages/seeker/AIResumeCheck';

const SeekerLayout = () => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  const navItems = [
    { path: '/seeker/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/seeker/jobs', icon: Briefcase, label: 'Find Jobs' },
    { path: '/seeker/ai-resume', icon: Sparkles, label: 'AI Resume Check' },
    { path: '/seeker/profile', icon: User, label: 'My Profile' },
  ];

  return (
    <div className="seeker-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">CareerConnect</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h2 className="header-title">Job Seeker Portal</h2>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                {userInfo.name?.charAt(0) || 'JS'}
              </div>
              <div className="user-info">
                <span className="user-name">{userInfo.name || 'Job Seeker'}</span>
                <span className="user-role">Seeker</span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="ai-resume" element={<AIResumeCheck />} />
          </Routes>
        </main>
      </div>

      <style jsx>{`
        .seeker-layout {
          display: flex;
          min-height: 100vh;
          background: #f9fafb;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1a202c 0%, #0f1419 100%);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .logo-text {
          font-size: 20px;
          font-weight: 800;
          color: white;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          margin: 4px 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }

        .top-header {
          background: white;
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 12px;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: #1a202c;
        }

        .user-role {
          font-size: 12px;
          color: #6b7280;
        }

        .page-content {
          flex: 1;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
          }

          .sidebar-header,
          .sidebar-footer {
            padding: 20px 10px;
          }

          .logo-text,
          .nav-item span,
          .logout-btn span {
            display: none;
          }

          .nav-item,
          .logout-btn {
            justify-content: center;
          }

          .main-content {
            margin-left: 70px;
          }

          .user-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SeekerLayout;