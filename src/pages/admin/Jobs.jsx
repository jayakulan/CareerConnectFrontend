import React, { useState } from 'react';
import { Search, Edit, Trash2, Building2 } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', type: 'Full-time', location: 'Remote', salary: '$120k - $150k', status: 'Active', posted: '2 days ago' },
    { id: 2, title: 'Backend Engineer', company: 'StartupHub', type: 'Contract', location: 'New York, NY', salary: '$80/hr', status: 'Active', posted: '5 days ago' },
    { id: 3, title: 'Product Designer', company: 'DesignStudio', type: 'Full-time', location: 'London, UK', salary: '£60k - £80k', status: 'Closed', posted: '1 week ago' },
    { id: 4, title: 'DevOps Specialist', company: 'CloudSystems', type: 'Full-time', location: 'Austin, TX', salary: '$130k - $160k', status: 'Active', posted: '1 day ago' },
    { id: 5, title: 'Marketing Manager', company: 'GrowthCo', type: 'Part-time', location: 'Remote', salary: '$40k - $60k', status: 'Active', posted: '3 days ago' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

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
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="company-logo">
                <Building2 size={24} />
              </div>
              <span className={`job-status ${job.status === 'Active' ? 'status-active' : 'status-closed'}`}>
                {job.status}
              </span>
            </div>

            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>

            <div className="job-details">
              <span className="detail-tag">{job.type}</span>
              <span className="detail-tag">{job.location}</span>
              <span className="detail-tag">{job.salary}</span>
            </div>

            <div className="job-footer">
              <span className="posted-date">Posted {job.posted}</span>
              <div className="job-actions">
                <button className="btn-icon btn-edit" title="Edit">
                  <Edit size={16} />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(job.id)}
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
