import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Calendar, Eye, TrendingUp } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { title: 'Active Jobs', value: '0', icon: Briefcase, trend: 'Loading...', color: 'blue' },
        { title: 'Total Applicants', value: '0', icon: Users, trend: 'Loading...', color: 'green' },
        { title: 'Interviews', value: '0', icon: Calendar, trend: 'Coming soon', color: 'purple' },
        { title: 'Views', value: '0', icon: Eye, trend: 'Coming soon', color: 'orange' },
    ]);
    const [recentApplicants, setRecentApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };

                // Use the correct API URL without double /api if VITE_API_URL has it
                // Assuming VITE_API_URL includes /api based on previous checks
                const { data: jobs } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/myjobs`, config);

                const activeJobsCount = jobs.filter(job => job.status === 'published').length;

                let totalApplicants = 0;
                let allApplicants = [];

                jobs.forEach(job => {
                    totalApplicants += job.applications.length;
                    job.applications.forEach(app => {
                        allApplicants.push({
                            id: app._id,
                            name: app.user ? app.user.name : 'Unknown Candidate',
                            role: job.title,
                            date: new Date(app.appliedAt).toLocaleDateString(),
                            status: app.status,
                            jobId: job._id
                        });
                    });
                });

                // Sort applicants by date (newest first)
                allApplicants.sort((a, b) => new Date(b.date) - new Date(a.date));

                setStats([
                    { title: 'Active Jobs', value: activeJobsCount, icon: Briefcase, trend: 'Updated just now', color: 'blue' },
                    { title: 'Total Applicants', value: totalApplicants, icon: Users, trend: 'Updated just now', color: 'green' },
                    { title: 'Interviews', value: '0', icon: Calendar, trend: 'Coming soon', color: 'purple' },
                    { title: 'Views', value: '0', icon: Eye, trend: 'Coming soon', color: 'orange' },
                ]);

                setRecentApplicants(allApplicants.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="dashboard-container">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Company Dashboard</h1>
                <p className="dashboard-subtitle">Overview of your recruitment activity.</p>
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
                                <p className="stat-trend">{stat.trend}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="section-card">
                <div className="section-header">
                    <h2 className="section-title">Recent Applicants</h2>
                    <Link to="/company/applicants" className="view-all-btn">View All Applications →</Link>
                </div>
                <div className="applicants-table-container">
                    {recentApplicants.length > 0 ? (
                        <table className="applicants-table">
                            <thead>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Applied For</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentApplicants.map((applicant) => (
                                    <tr key={applicant.id}>
                                        <td>
                                            <div className="font-medium text-gray-900">{applicant.name}</div>
                                        </td>
                                        <td>{applicant.role}</td>
                                        <td>{applicant.date}</td>
                                        <td>
                                            <span className={`status-badge status-${applicant.status.toLowerCase()}`}>
                                                {applicant.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="view-profile-btn">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-data-message">No applicants yet.</p>
                    )}
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
          margin-bottom: 4px;
        }

        .stat-trend {
          font-size: 13px;
          color: #10b981;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
        }

        .view-all-btn {
          color: #4f46e5;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
        }

        .view-all-btn:hover {
          color: #4338ca;
        }

        .applicants-table-container {
          overflow-x: auto;
        }

        .applicants-table {
          width: 100%;
          border-collapse: collapse;
        }

        .applicants-table th {
          text-align: left;
          padding: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #718096;
          border-bottom: 1px solid #e5e7eb;
        }

        .applicants-table td {
          padding: 16px 12px;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
        }

        .applicants-table tr:last-child td {
          border-bottom: none;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .status-new {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-reviewing {
          background: #fef3c7;
          color: #92400e;
        }

        .status-interview {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-applied {
          background: #e0e7ff;
          color: #4338ca;
        }

        .view-profile-btn {
          color: #4f46e5;
          font-weight: 500;
          font-size: 14px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .view-profile-btn:hover {
          color: #4338ca;
        }
        
        .no-data-message {
            color: #718096;
            font-style: italic;
            padding: 20px;
            text-align: center;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
