import React, { useState } from 'react';
import { Search, Edit, Trash2, Building2 } from 'lucide-react';

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

            <style jsx>{`
        .jobs-container {
          padding: 24px;
        }

        .jobs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 20px;
        }

        .jobs-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 250px;
          padding: 10px 12px 10px 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .btn-filter {
          padding: 10px 20px;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-filter:hover {
          background: #f9fafb;
          border-color: #3b82f6;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .job-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .company-logo {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }

        .job-status {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-closed {
          background: #fee2e2;
          color: #991b1b;
        }

        .job-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 8px 0;
        }

        .company-name {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 16px 0;
        }

        .job-details {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .detail-tag {
          background: #f3f4f6;
          color: #4b5563;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .job-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .posted-date {
          font-size: 12px;
          color: #9ca3af;
        }

        .job-actions {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon:hover {
          background: #f9fafb;
        }

        .btn-edit:hover {
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .btn-delete {
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fee2e2;
          border-color: #dc2626;
        }

        @media (max-width: 768px) {
          .jobs-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .search-input {
            width: 100%;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Jobs;
