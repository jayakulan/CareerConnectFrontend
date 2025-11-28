import React, { useState } from 'react';
import { Search, Eye, Check, X } from 'lucide-react';

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

            <style jsx>{`
        .applicants-container {
          padding: 24px;
        }

        .applicants-header {
          margin-bottom: 24px;
        }

        .applicants-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
        }

        .filter-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .filter-select {
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .applicants-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .applicant-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .applicant-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .applicant-info {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .applicant-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }

        .applicant-details {
          flex: 1;
        }

        .applicant-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          margin: 0 0 4px 0;
        }

        .applicant-role {
          font-size: 14px;
          color: #718096;
          margin: 0;
        }

        .applicant-meta {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          font-size: 12px;
          color: #9ca3af;
          text-transform: uppercase;
          font-weight: 600;
        }

        .meta-value {
          font-size: 14px;
          font-weight: 500;
          color: #4b5563;
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

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .applicant-actions {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
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
          color: #1f2937;
          border-color: #d1d5db;
        }

        .btn-approve {
          color: #059669;
          border-color: #d1fae5;
          background: #ecfdf5;
        }

        .btn-approve:hover {
          background: #d1fae5;
          color: #047857;
        }

        .btn-reject {
          color: #dc2626;
          border-color: #fee2e2;
          background: #fef2f2;
        }

        .btn-reject:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .applicant-meta {
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .applicant-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .applicant-meta {
            width: 100%;
            flex-wrap: wrap;
          }

          .applicant-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
        </div>
    );
};

export default Applicants;
