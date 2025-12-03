import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const SeekerDashboard = () => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    interviews: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch applications
      const response = await fetch('http://localhost:5000/api/applications/seeker', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const applications = await response.json();

        // Calculate stats
        const appliedCount = applications.length;
        const interviewCount = applications.filter(app =>
          app.status === 'interview' || app.status === 'accepted'
        ).length;

        setStats({
          appliedJobs: appliedCount,
          savedJobs: 0, // Can be implemented later
          interviews: interviewCount,
        });

        // Get recent 5 applications
        setRecentApplications(applications.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied':
        return 'status-applied';
      case 'reviewing':
        return 'status-reviewing';
      case 'interview':
        return 'status-interview';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-applied';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, Job Seeker!</h1>
        <p className="dashboard-subtitle">Here's what's happening with your job search</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-blue">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Applied Jobs</p>
            <p className="stat-value">{stats.appliedJobs}</p>
          </div>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Saved Jobs</p>
            <p className="stat-value">{stats.savedJobs}</p>
          </div>
        </div>

        <div className="stat-card stat-card-purple">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Interviews</p>
            <p className="stat-value">{stats.interviews}</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="section-card">
        <h2 className="section-title">Recent Applications</h2>
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet</p>
            <p className="empty-hint">Start applying to jobs to see them here!</p>
          </div>
        ) : (
          <div className="applications-list">
            {recentApplications.map((app) => (
              <div key={app._id} className="application-item">
                <div className="application-main">
                  <h3 className="application-title">{app.job?.title || 'Job Title'}</h3>
                  <p className="application-company">
                    {app.job?.company?.companyName || 'Company Name'}
                  </p>
                  <div className="application-meta">
                    <span className="meta-item">
                      <MapPin size={16} />
                      {app.job?.location || 'Location'}
                    </span>
                    <span className="meta-item">
                      <Clock size={16} />
                      {formatDate(app.appliedAt)}
                    </span>
                    {app.matchPercentage !== undefined && (
                      <span className="meta-item match-percentage">
                        Match: {app.matchPercentage}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="application-status">
                  <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerDashboard;
