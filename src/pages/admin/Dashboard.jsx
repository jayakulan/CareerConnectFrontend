import React from 'react';
import { Users, Briefcase, Building2, FileText, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
        { title: 'Companies', value: '56', icon: Building2, color: 'purple' },
        { title: 'Active Jobs', value: '892', icon: Briefcase, color: 'green' },
        { title: 'Total Applications', value: '5.6k', icon: FileText, color: 'orange' },
    ];

    const activities = [
        { id: 1, type: 'user', text: 'New user registration: John Doe', time: '5 mins ago', icon: '👤' },
        { id: 2, type: 'company', text: 'TechCorp posted a new job: Senior React Dev', time: '15 mins ago', icon: '🏢' },
        { id: 3, type: 'job', text: 'Job "Backend Engineer" was approved', time: '1 hour ago', icon: '✅' },
        { id: 4, type: 'user', text: 'New user registration: Jane Smith', time: '2 hours ago', icon: '👤' },
        { id: 5, type: 'company', text: 'StartupInc updated their profile', time: '3 hours ago', icon: '✏️' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Admin Overview</h1>
                <p className="dashboard-subtitle">Monitor platform activity and performance.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`stat-card stat-card-${stat.color}`}>
                            <div className="stat-icon">
                                <Icon size={24} />
                            </div>
                            <div className="stat-content">
                                <p className="stat-label">{stat.title}</p>
                                <p className="stat-value">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="content-grid">
                <div className="section-card">
                    <h2 className="section-title">Recent Activity</h2>
                    <div className="activity-list">
                        {activities.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon activity-icon-${activity.type}`}>
                                    {activity.icon}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-text">{activity.text}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-card">
                    <h2 className="section-title">System Health</h2>
                    <div className="health-metrics">
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-label">Server Load</span>
                                <span className="metric-value">45%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill progress-blue" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-label">Memory Usage</span>
                                <span className="metric-value">60%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill progress-purple" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-label">Database Connections</span>
                                <span className="metric-value">28%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill progress-green" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .admin-dashboard {
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
          border-left: 4px solid;
        }

        .stat-card-blue {
          border-left-color: #3b82f6;
        }

        .stat-card-purple {
          border-left-color: #a855f7;
        }

        .stat-card-green {
          border-left-color: #10b981;
        }

        .stat-card-orange {
          border-left-color: #f59e0b;
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
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .stat-card-purple .stat-icon {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }

        .stat-card-green .stat-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .activity-icon-user {
          background: #dbeafe;
        }

        .activity-icon-company {
          background: #fce7f3;
        }

        .activity-icon-job {
          background: #d1fae5;
        }

        .activity-content {
          flex: 1;
        }

        .activity-text {
          font-size: 14px;
          color: #4b5563;
          font-weight: 500;
          margin: 0 0 4px 0;
        }

        .activity-time {
          font-size: 12px;
          color: #9ca3af;
        }

        .health-metrics {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-label {
          font-size: 14px;
          font-weight: 500;
          color: #4b5563;
        }

        .metric-value {
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .progress-blue {
          background: #3b82f6;
        }

        .progress-purple {
          background: #a855f7;
        }

        .progress-green {
          background: #10b981;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
