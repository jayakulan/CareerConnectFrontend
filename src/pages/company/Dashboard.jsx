import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Calendar, Eye, TrendingUp, Edit, Trash2 } from 'lucide-react';
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
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch jobs data
        const { data: jobs } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/myjobs`, config);
        setMyJobs(jobs);

        const activeJobsCount = jobs.filter(job => job.status === 'published').length;

        // Fetch applications using the same endpoint as Applicants page
        const applicationsResponse = await fetch('http://localhost:5000/api/applications/company', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let allApplicants = [];
        let totalApplicants = 0;
        let interviewCount = 0;

        if (applicationsResponse.ok) {
          const applications = await applicationsResponse.json();
          totalApplicants = applications.length;

          // Count interviews (accepted or interview status)
          interviewCount = applications.filter(app =>
            app.status === 'interview' || app.status === 'accepted'
          ).length;

          // Map applications to recent applicants format
          allApplicants = applications.map(app => ({
            id: app._id,
            name: app.seeker?.name || 'Unknown Candidate',
            role: app.job?.title || 'Unknown Position',
            date: new Date(app.appliedAt).toLocaleDateString(),
            status: app.status,
            jobId: app.job?._id
          }));

          // Sort by date (newest first)
          allApplicants.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setStats([
          { title: 'Active Jobs', value: activeJobsCount, icon: Briefcase, trend: 'Updated just now', color: 'blue' },
          { title: 'Total Applicants', value: totalApplicants, icon: Users, trend: 'Updated just now', color: 'green' },
          { title: 'Interviews', value: interviewCount, icon: Calendar, trend: 'Updated just now', color: 'purple' },
          { title: 'Views', value: '0', icon: Eye, trend: 'Coming soon', color: 'orange' },
        ]);

        setRecentApplicants(allApplicants.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeleteJob = async (jobId, hasApplications) => {
    if (hasApplications) {
      alert('Cannot delete job with existing applications. Please close the job instead.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(jobId);
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete job');
      }

      // Remove job from state
      setMyJobs(myJobs.filter(job => job._id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert(error.message || 'Failed to delete job. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleCloseJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to close this job posting?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'closed' })
      });

      if (!response.ok) {
        throw new Error('Failed to close job');
      }

      // Update job status in state
      setMyJobs(myJobs.map(job =>
        job._id === jobId ? { ...job, status: 'closed' } : job
      ));
      alert('Job closed successfully!');
    } catch (error) {
      console.error('Error closing job:', error);
      alert('Failed to close job. Please try again.');
    }
  };

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
                  <th>Actions</th>
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
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/company/edit-job/${job._id}`}
                          className="btn-action btn-edit"
                          title="Edit Job"
                        >
                          <Edit size={16} />
                        </Link>
                        {job.applications && job.applications.length > 0 ? (
                          <button
                            onClick={() => handleCloseJob(job._id)}
                            className="btn-action btn-close-job"
                            title="Close Job"
                            disabled={job.status === 'closed'}
                          >
                            {job.status === 'closed' ? 'Closed' : 'Close'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDeleteJob(job._id, job.applications?.length > 0)}
                            className="btn-action btn-delete"
                            title="Delete Job"
                            disabled={deleting === job._id}
                          >
                            {deleting === job._id ? '...' : <Trash2 size={16} />}
                          </button>
                        )}
                      </div>
                    </td>
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
          <Link to="/company/applications" className="view-all-btn">View All Applications →</Link>
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
