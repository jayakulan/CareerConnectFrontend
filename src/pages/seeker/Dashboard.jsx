import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp } from 'lucide-react';

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
                                <div className="match-percentage">
                                    <div className="match-circle" style={{ background: `conic-gradient(#4f46e5 ${app.matchPercentage * 3.6}deg, #e5e7eb 0deg)` }}>
                                        <div className="match-inner">{app.matchPercentage}%</div>
                                    </div>
                                    <span className="match-label">Match</span>
                                </div>
                                <span className={`status-badge status-${app.status.toLowerCase().replace(' ', '-')}`}>
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .dashboard-container {
          padding: 24px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-card-blue .stat-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-card-green .stat-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .stat-card-purple .stat-icon {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }

        .stat-card-orange .stat-icon {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 14px;
          color: #718096;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .applications-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .application-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .application-item:hover {
          border-color: #4f46e5;
          background: #f9fafb;
        }

        .application-main {
          flex: 1;
        }

        .application-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .application-company {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .application-meta {
          display: flex;
          gap: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: #6b7280;
        }

        .application-status {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .match-percentage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .match-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .match-inner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #4f46e5;
          font-size: 14px;
        }

        .match-label {
          font-size: 12px;
          color: #6b7280;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-under-review {
          background: #fef3c7;
          color: #92400e;
        }

        .status-interview-scheduled {
          background: #d1fae5;
          color: #065f46;
        }

        .status-applied {
          background: #dbeafe;
          color: #1e40af;
        }

        @media (max-width: 768px) {
          .application-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .application-status {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
        </div>
    );
};

export default SeekerDashboard;
