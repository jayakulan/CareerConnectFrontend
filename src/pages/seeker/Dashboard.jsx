import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, CheckCircle, X, Calendar, Trash2 } from 'lucide-react';
import './Dashboard.css';

const SeekerDashboard = () => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    interviews: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [withdrawing, setWithdrawing] = useState(null);
  const [error, setError] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [showProfileAlert, setShowProfileAlert] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch applications
      const response = await fetch('http://localhost:5000/api/applications/seeker', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const applications = await response.json();

        // Fetch saved jobs
        const savedResponse = await fetch(`${import.meta.env.VITE_API_URL}/jobs/saved`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let savedCount = 0;
        if (savedResponse.ok) {
          const savedJobs = await savedResponse.json();
          savedCount = savedJobs.length;
        }

        // Fetch Profile for completion
        const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (profileResponse.ok) {
          const userData = await profileResponse.json();
          // Calculate completion
          let score = 0;
          let total = 6; // Name, Email, Bio, Skills, Experience, Education

          if (userData.name) score++;
          if (userData.email) score++;

          const profile = userData.profile || {};
          if (profile.bio) score++;
          if (profile.skills && profile.skills.length > 0) score++;
          if (profile.experience && profile.experience.length > 0) score++;
          if (profile.education && profile.education.length > 0) score++;

          setProfileCompletion(Math.round((score / total) * 100));
        }

        // Calculate stats
        const appliedCount = applications.length;
        const interviewCount = applications.filter(app =>
          app.status === 'interview' || app.status === 'accepted'
        ).length;

        setStats({
          appliedJobs: appliedCount,
          savedJobs: savedCount,
          interviews: interviewCount,
        });

        // Get recent 5 applications
        setRecentApplications(applications.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      return;
    }

    try {
      setWithdrawing(applicationId);
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to withdraw application');
      }

      // Remove application from state
      setRecentApplications(recentApplications.filter(app => app._id !== applicationId));

      // Update stats
      setStats(prev => ({
        ...prev,
        appliedJobs: prev.appliedJobs - 1
      }));

      alert('Application withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing application:', error);
      alert(error.message || 'Failed to withdraw application. Please try again.');
    } finally {
      setWithdrawing(null);
    }
  };

  const handleInterviewResponse = async (status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/applications/${selectedInterview._id}/interview-response`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const updatedApp = await response.json();

        // Update local state
        setRecentApplications(prev => prev.map(app =>
          app._id === updatedApp._id ? updatedApp : app
        ));

        // Update selected interview to reflect change
        setSelectedInterview(updatedApp);

        alert(`Interview ${status} successfully!`);
      } else {
        throw new Error('Failed to update interview status');
      }
    } catch (error) {
      console.error('Error responding to interview:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied':
        return 'status-applied';
      case 'reviewing':
        return 'status-reviewing';
      case 'interview':
        return 'status-interview';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-applied';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, Job Seeker!</h1>
        <p className="dashboard-subtitle">Here's what's happening with your job search</p>
      </div>

      {/* Profile Completion Alert */}
      {showProfileAlert && profileCompletion < 100 && (
        <div className="profile-alert">
          <div className="profile-alert-content">
            <div className="profile-alert-info">
              <h3>Complete your profile</h3>
              <p>You are {profileCompletion}% there! Complete your profile to get better job recommendations.</p>
            </div>
            <div className="profile-progress-container">
              <div className="profile-progress-bar">
                <div className="profile-progress-fill" style={{ width: `${profileCompletion}%` }}></div>
              </div>
              <span className="profile-progress-text">{profileCompletion}%</span>
            </div>
            <button className="btn-close-alert" onClick={() => setShowProfileAlert(false)}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-blue">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Applied Jobs</p>
            <p className="stat-value">{stats.appliedJobs}</p>
          </div>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Saved Jobs</p>
            <p className="stat-value">{stats.savedJobs}</p>
          </div>
        </div>

        <div className="stat-card stat-card-purple">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Interviews</p>
            <p className="stat-value">{stats.interviews}</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="section-card">
        <h2 className="section-title">Recent Applications</h2>
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet</p>
            <p className="empty-hint">Start applying to jobs to see them here!</p>
          </div>
        ) : (
          <div className="applications-list">
            {recentApplications.map((app) => (
              <div key={app._id} className="application-item">
                <div className="application-main">
                  <h3 className="application-title">{app.job?.title || 'Job Title'}</h3>
                  <p className="application-company">
                    {app.job?.company?.companyName || 'Company Name'}
                  </p>
                  <div className="application-meta">
                    <span className="meta-item">
                      <MapPin size={16} />
                      {app.job?.location || 'Location'}
                    </span>
                    <span className="meta-item">
                      <Clock size={16} />
                      {formatDate(app.appliedAt)}
                    </span>
                  </div>
                </div>
                <div className="application-status">
                  <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  {app.status === 'interview' && app.interviewDetails && (
                    <button
                      className="view-interview-btn"
                      onClick={() => {
                        setSelectedInterview(app);
                        setShowInterviewModal(true);
                      }}
                    >
                      View Details
                    </button>
                  )}
                  {app.status !== 'accepted' && app.status !== 'rejected' && (
                    <button
                      className="withdraw-btn"
                      onClick={() => handleWithdrawApplication(app._id)}
                      disabled={withdrawing === app._id}
                      title="Withdraw Application"
                    >
                      {withdrawing === app._id ? 'Withdrawing...' : <Trash2 size={14} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Interview Details Modal */}
      {
        showInterviewModal && selectedInterview && (
          <div className="modal-overlay" onClick={() => setShowInterviewModal(false)}>
            <div className="modal-content interview-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Interview Details</h2>
                <button className="modal-close" onClick={() => setShowInterviewModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="interview-details-content">
                <div className="interview-company-header">
                  <h3>{selectedInterview.job?.company?.companyName}</h3>
                  <p>{selectedInterview.job?.title}</p>
                </div>

                <div className="interview-info-grid">
                  <div className="interview-info-item">
                    <span className="label">Date</span>
                    <span className="value">
                      <Calendar size={16} />
                      {new Date(selectedInterview.interviewDetails.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="interview-info-item">
                    <span className="label">Time</span>
                    <span className="value">
                      <Clock size={16} />
                      {selectedInterview.interviewDetails.time}
                    </span>
                  </div>
                  <div className="interview-info-item">
                    <span className="label">Type</span>
                    <span className="value capitalize">
                      {selectedInterview.interviewDetails.type}
                    </span>
                  </div>
                  <div className="interview-info-item full-width">
                    <span className="label">Location / Link</span>
                    <span className="value highlight">
                      {selectedInterview.interviewDetails.location}
                    </span>
                  </div>
                  {selectedInterview.interviewDetails.message && (
                    <div className="interview-info-item full-width">
                      <span className="label">Message from Company</span>
                      <p className="message-box">
                        {selectedInterview.interviewDetails.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  {(!selectedInterview.interviewDetails.status || selectedInterview.interviewDetails.status === 'pending') ? (
                    <>
                      <button
                        className="btn-accept"
                        onClick={() => handleInterviewResponse('confirmed')}
                      >
                        Confirm Attendance
                      </button>
                      <button
                        className="btn-reject-full"
                        onClick={() => handleInterviewResponse('declined')}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <div className={`interview-status-banner status-${selectedInterview.interviewDetails.status}`}>
                      Interview {selectedInterview.interviewDetails.status}
                    </div>
                  )}
                  <button className="btn-close" onClick={() => setShowInterviewModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default SeekerDashboard;
