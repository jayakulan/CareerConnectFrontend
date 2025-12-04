import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Building2, FileText, Activity, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Users', value: '0', icon: Users, color: 'blue' },
    { title: 'Companies', value: '0', icon: Building2, color: 'purple' },
    { title: 'Active Jobs', value: '0', icon: Briefcase, color: 'green' },
    { title: 'Total Applications', value: '0', icon: FileText, color: 'orange' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats([
            { title: 'Total Users', value: data.stats.totalUsers, icon: Users, color: 'blue' },
            { title: 'Companies', value: data.stats.totalCompanies, icon: Building2, color: 'purple' },
            { title: 'Active Jobs', value: data.stats.activeJobs, icon: Briefcase, color: 'green' },
            { title: 'Total Applications', value: data.stats.totalApplications, icon: FileText, color: 'orange' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

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
    </div>
  );
};

export default Dashboard;
