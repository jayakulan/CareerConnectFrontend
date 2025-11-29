import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Calendar, Eye, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Active Jobs', value: '0', icon: Briefcase, trend: 'Loading...', color: 'blue' },
    { title: 'Total Applicants', value: '0', icon: Users, trend: 'Loading...', color: 'green' },
    { title: 'Interviews', value: '0', icon: Calendar, trend: 'Coming soon', color: 'purple' },
    { title: 'Views', value: '0', icon: Eye, trend: 'Coming soon', color: 'orange' },
  ]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
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
        setMyJobs(jobs);

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
          <h2 className="section-title">Your Job Postings</h2>
          <Link to="/company/post-job" className="view-all-btn">Post New Job →</Link>
        </div>
        <div className="applicants-table-container">
          {myJobs.length > 0 ? (
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Posted Date</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <div className="font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td>{job.location}</td>
                    <td>{job.jobType}</td>
                    <td>{job.applications.length}</td>
                    <td>
                      <span className={`status-badge status-${job.status === 'published' ? 'active' : 'inactive'}`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">You haven't posted any jobs yet.</p>
          )}
        </div>
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


    </div>
  );
};

export default Dashboard;
