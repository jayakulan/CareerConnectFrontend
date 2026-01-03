import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, Sparkles, LogOut, Edit } from 'lucide-react';
import Dashboard from '../pages/company/Dashboard';
import PostJob from '../pages/company/PostJob';
import EditJob from '../pages/company/EditJob';
import Applicants from '../pages/company/Applicants';
import AIAnalyzeCandidates from '../pages/company/AIAnalyzeCandidates';
import NotificationDropdown from '../components/NotificationDropdown';
import EditCompanyProfileModal from '../components/EditCompanyProfileModal';
import logo from '../assets/image.png';

const CompanyLayout = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '{}'));
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        // Update local storage if name changed
        if (data.name !== userInfo.name) {
          const newUserInfo = { ...userInfo, name: data.name };
          localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
          setUserInfo(newUserInfo);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
    // Update local storage if name changed
    if (updatedData.name && updatedData.name !== userInfo.name) {
      const newUserInfo = { ...userInfo, name: updatedData.name };
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
    }
  };

  const navItems = [
    { path: '/company/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/company/post-job', icon: Briefcase, label: 'Post a Job' },
    { path: '/company/applications', icon: Users, label: 'Applications' },
    { path: '/company/ai-analyze', icon: Sparkles, label: 'AI Analyze' },
  ];

  return (
    <div className="company-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="CareerConnect Logo" className="logo-image" />
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
            <h2 className="header-title">Company Portal</h2>
          </div>
          <div className="header-right">
            <NotificationDropdown />
            <div
              className="user-menu clickable"
              onClick={() => setIsEditProfileOpen(true)}
              title="Click to edit profile"
            >
              <div className="user-avatar">
                {userInfo.name?.charAt(0) || 'CO'}
              </div>
              <div className="user-info">
                <span className="user-name">{userInfo.name || 'Company'}</span>
                <span className="user-role">
                  Employer <Edit size={12} style={{ marginLeft: '4px', display: 'inline' }} />
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="edit-job/:id" element={<EditJob />} />
            <Route path="applications" element={<Applicants />} />
            <Route path="ai-analyze" element={<AIAnalyzeCandidates />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>

      <EditCompanyProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdate={handleProfileUpdate}
        initialData={profileData || userInfo}
      />

      <style jsx>{`
        .company-layout {
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
          z-index: 50;
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

        .logo-image {
          height: 40px;
          width: auto;
          object-fit: contain;
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
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
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
          z-index: 40;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-right {
           display: flex;
           align-items: center;
           gap: 20px;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
          border-radius: 12px;
          border: 2px solid rgba(168, 85, 247, 0.2);
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-menu:hover {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            transform: translateY(-1px);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
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
          display: flex;
          align-items: center;
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

export default CompanyLayout;