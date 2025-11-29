import React from 'react';
import { Users, Briefcase, Building2, FileText, Activity, TrendingUp } from 'lucide-react';
import './Dashboard.css';

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


    </div>
  );
};

export default Dashboard;
