import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const SeekerDashboard = () => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    interviews: 0,
    profileViews: 0,
  });

  const recentApplications = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      appliedDate: '2 days ago',
      status: 'Under Review',
      matchPercentage: 85,
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      appliedDate: '5 days ago',
      status: 'Interview Scheduled',
      matchPercentage: 92,
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'New York, NY',
      appliedDate: '1 week ago',
      status: 'Applied',
      matchPercentage: 78,
    },
  ];

  useEffect(() => {
    // Fetch user stats
    setStats({
      appliedJobs: 12,
      savedJobs: 8,
      interviews: 3,
      profileViews: 45,
    });
  }, []);

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
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Interviews</p>
            <p className="stat-value">{stats.interviews}</p>
          </div>
        </div>

        <div className="stat-card stat-card-orange">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Profile Views</p>
            <p className="stat-value">{stats.profileViews}</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="section-card">
        <h2 className="section-title">Recent Applications</h2>
        <div className="applications-list">
          {recentApplications.map((app) => (
            <div key={app.id} className="application-item">
              <div className="application-main">
                <h3 className="application-title">{app.title}</h3>
                <p className="application-company">{app.company}</p>
                <div className="application-meta">
                  <span className="meta-item">
                    <MapPin size={16} />
                    {app.location}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    {app.appliedDate}
                  </span>
                </div>
              </div>
              <div className="application-status">
                <span className={`status-badge status-${app.status.toLowerCase().replace(' ', '-')}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default SeekerDashboard;
