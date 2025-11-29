import React, { useState } from 'react';
import { Search, Eye, Check, X } from 'lucide-react';
import './Applicants.css';

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const applicants = [
    { id: 1, name: 'Sarah Johnson', role: 'Senior Frontend Dev', date: '2023-11-20', status: 'New', experience: '5 years' },
    { id: 2, name: 'Michael Chen', role: 'Backend Engineer', date: '2023-11-19', status: 'Reviewing', experience: '3 years' },
    { id: 3, name: 'Emily Davis', role: 'Product Designer', date: '2023-11-18', status: 'Interview', experience: '4 years' },
    { id: 4, name: 'James Wilson', role: 'DevOps Engineer', date: '2023-11-17', status: 'Rejected', experience: '2 years' },
    { id: 5, name: 'David Brown', role: 'Senior Frontend Dev', date: '2023-11-16', status: 'New', experience: '6 years' },
  ];

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="applicants-container">
      <div className="applicants-header">
        <h1 className="applicants-title">Job Applicants</h1>
      </div>

      <div className="filter-bar">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Reviewing">Reviewing</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="applicants-list">
        {filteredApplicants.map((applicant) => (
          <div key={applicant.id} className="applicant-card">
            <div className="applicant-info">
              <div className="applicant-avatar">
                {applicant.name.charAt(0)}
              </div>
              <div className="applicant-details">
                <h3 className="applicant-name">{applicant.name}</h3>
                <p className="applicant-role">{applicant.role}</p>
              </div>
            </div>

            <div className="applicant-meta">
              <div className="meta-item">
                <span className="meta-label">Applied Date</span>
                <span className="meta-value">{applicant.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Experience</span>
                <span className="meta-value">{applicant.experience}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className={`status-badge status-${applicant.status.toLowerCase()}`}>
                  {applicant.status}
                </span>
              </div>
            </div>

            <div className="applicant-actions">
              <button className="btn-icon" title="View Profile">
                <Eye size={18} />
              </button>
              <button className="btn-icon btn-approve" title="Shortlist">
                <Check size={18} />
              </button>
              <button className="btn-icon btn-reject" title="Reject">
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Applicants;
