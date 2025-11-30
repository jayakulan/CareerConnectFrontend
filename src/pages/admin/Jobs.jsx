import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Building2 } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // In a real app, you would call DELETE API here
      setJobs(jobs.filter(job => job._id !== id));
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1 className="jobs-title">Job Listings</h1>
        <div className="header-actions">
          <div className="search-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search jobs..." className="search-input" />
          </div>
          <button className="btn-filter">Filter</button>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <div className="job-header">
              <div className="company-logo">
                {job.company?.companyName ? (
                  <div className="logo-text">{job.company.companyName.charAt(0).toUpperCase()}</div>
                ) : (
                  <Building2 size={24} />
                )}
              </div>
              <span className={`job-status ${job.status === 'published' ? 'status-active' : 'status-closed'}`}>
                {job.status === 'published' ? 'Active' : job.status}
              </span>
            </div>

            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company?.companyName || 'Unknown Company'}</p>

            <div className="job-details">
              <span className="detail-tag">{job.jobType}</span>
              <span className="detail-tag">{job.location}</span>
              <span className="detail-tag">
                {job.salary ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}` : 'Salary N/A'}
              </span>
            </div>

            <div className="job-footer">
              <span className="posted-date">Posted {getTimeAgo(job.createdAt)}</span>
              <div className="job-actions">
                <button className="btn-icon btn-edit" title="Edit">
                  <Edit size={16} />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(job._id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
