import React, { useState, useEffect } from 'react';
import { Search, Eye, Check, X, FileText, Download } from 'lucide-react';
import './Applicants.css';

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    type: 'online',
    location: '',
    message: ''
  });

  useEffect(() => {
    fetchApplicants();
  }, [filterStatus]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view applicants');
        return;
      }

      const url = filterStatus !== 'all'
        ? `http://localhost:5000/api/applications/company?status=${filterStatus}`
        : 'http://localhost:5000/api/applications/company';

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applicants');
      }

      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setError('Failed to load applicants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus, details = null) => {
    try {
      setUpdating(true);

      const token = localStorage.getItem('token');
      const body = { status: newStatus };

      if (details) {
        body.interviewDetails = details;
      }

      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh applicants list
      await fetchApplicants();

      // Close modals
      setShowModal(false);
      setShowInterviewModal(false);
      setSelectedApplicant(null);
      setInterviewDetails({
        date: '',
        time: '',
        type: 'online',
        location: '',
        message: ''
      });

      alert(`Application updated successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update application status');
    } finally {
      setUpdating(false);
    }
  };

  const openInterviewModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowInterviewModal(true);
  };

  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedApplicant) return;

    // Combine date and time for the date object if needed, or keep separate as per schema
    // The schema has interviewDetails object with date and time separate

    handleStatusUpdate(selectedApplicant._id, 'interview', interviewDetails);
  };

  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  const handleViewResume = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }

      const data = await response.json();

      // Open in new tab
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No resume URL found');
      }
    } catch (error) {
      console.error('Error viewing resume:', error);
      alert('Failed to load resume. Please try again.');
    }
  };


  const filteredApplicants = applicants.filter(app => {
    const matchesSearch =
      app.seeker?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied':
        return 'status-new';
      case 'reviewing':
        return 'status-reviewing';
      case 'interview':
        return 'status-interview';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-new';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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
            placeholder="Search applicants or jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="reviewing">Reviewing</option>
          <option value="interview">Interview</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading applicants...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="applicants-list">
          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <p>No applicants found</p>
            </div>
          ) : (
            filteredApplicants.map((applicant) => (
              <div key={applicant._id} className="applicant-card">
                <div className="applicant-info">
                  <div className="applicant-avatar">
                    {applicant.seeker?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="applicant-details">
                    <h3 className="applicant-name">{applicant.seeker?.name}</h3>
                    <p className="applicant-role">{applicant.job?.title}</p>
                    <p className="applicant-email">{applicant.seeker?.email}</p>
                  </div>
                </div>

                <div className="applicant-meta">
                  <div className="meta-item">
                    <span className="meta-label">Applied Date</span>
                    <span className="meta-value">{formatDate(applicant.appliedAt)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <span className={`status-badge ${getStatusBadgeClass(applicant.status)}`}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="applicant-actions">
                  <button
                    className="btn-icon"
                    title="View Profile"
                    onClick={() => viewApplicantDetails(applicant)}
                  >
                    <Eye size={18} />
                  </button>
                  {applicant.status !== 'accepted' && applicant.status !== 'rejected' && (
                    <>
                      {applicant.status !== 'interview' ? (
                        <button
                          className="btn-icon btn-approve"
                          title="Schedule Interview"
                          onClick={() => openInterviewModal(applicant)}
                          disabled={updating}
                        >
                          <Check size={18} />
                        </button>
                      ) : (
                        <button
                          className="btn-icon btn-approve"
                          title="Final Accept"
                          onClick={() => handleStatusUpdate(applicant._id, 'accepted')}
                          disabled={updating}
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button
                        className="btn-icon btn-reject"
                        title="Reject"
                        onClick={() => handleStatusUpdate(applicant._id, 'rejected')}
                        disabled={updating}
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Applicant Details Modal */}
      {showModal && selectedApplicant && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Applicant Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="applicant-detail-section">
              <div className="detail-avatar">
                {selectedApplicant.seeker?.name.charAt(0).toUpperCase()}
              </div>
              <h3>{selectedApplicant.seeker?.name}</h3>
              <p className="detail-email">{selectedApplicant.seeker?.email}</p>
            </div>

            <div className="detail-info">
              <div className="info-row">
                <span className="info-label">Applied For:</span>
                <span className="info-value">{selectedApplicant.job?.title}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Applied Date:</span>
                <span className="info-value">{formatDate(selectedApplicant.appliedAt)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-badge ${getStatusBadgeClass(selectedApplicant.status)}`}>
                  {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
                </span>
              </div>
            </div>

            {selectedApplicant.coverLetter && (
              <div className="cover-letter-section">
                <h4>Cover Letter</h4>
                <p>{selectedApplicant.coverLetter}</p>
              </div>
            )}

            {selectedApplicant.resume?.url && (
              <div className="resume-section">
                <h4>Resume</h4>
                <button
                  onClick={() => handleViewResume(selectedApplicant._id)}
                  className="btn-download-resume"
                >
                  <FileText size={18} />
                  <Download size={18} />
                  View/Download Resume
                </button>
              </div>
            )}

            {selectedApplicant.missingSkills && selectedApplicant.missingSkills.length > 0 && (
              <div className="missing-skills-section">
                <h4>Missing Skills</h4>
                <div className="skills-tags">
                  {selectedApplicant.missingSkills.map((skill, index) => (
                    <span key={index} className="skill-tag missing">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              {selectedApplicant.status !== 'accepted' && selectedApplicant.status !== 'rejected' && (
                <>
                  {selectedApplicant.status !== 'interview' ? (
                    <button
                      className="btn-accept"
                      onClick={() => {
                        setShowModal(false);
                        openInterviewModal(selectedApplicant);
                      }}
                      disabled={updating}
                    >
                      <Check size={18} />
                      Schedule Interview
                    </button>
                  ) : (
                    <button
                      className="btn-accept"
                      onClick={() => handleStatusUpdate(selectedApplicant._id, 'accepted')}
                      disabled={updating}
                    >
                      <Check size={18} />
                      Final Accept
                    </button>
                  )}
                  <button
                    className="btn-reject-full"
                    onClick={() => handleStatusUpdate(selectedApplicant._id, 'rejected')}
                    disabled={updating}
                  >
                    <X size={18} />
                    Reject
                  </button>
                </>
              )}
              <button className="btn-close" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Interview Details Modal */}
      {showInterviewModal && selectedApplicant && (
        <div className="modal-overlay" onClick={() => setShowInterviewModal(false)}>
          <div className="modal-content interview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Schedule Interview</h2>
              <button className="modal-close" onClick={() => setShowInterviewModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleInterviewSubmit} className="interview-form">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  required
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  required
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  value={interviewDetails.type}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, type: e.target.value })}
                >
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="phone">Phone</option>
                </select>
              </div>

              <div className="form-group">
                <label>{interviewDetails.type === 'online' ? 'Meeting Link' : 'Location'}</label>
                <input
                  type="text"
                  required
                  placeholder={interviewDetails.type === 'online' ? 'e.g. Zoom/Google Meet Link' : 'Office Address'}
                  value={interviewDetails.location}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Message to Candidate (Optional)</label>
                <textarea
                  rows="3"
                  value={interviewDetails.message}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, message: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-accept" disabled={updating}>
                  {updating ? 'Scheduling...' : 'Confirm Interview'}
                </button>
                <button type="button" className="btn-close" onClick={() => setShowInterviewModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
