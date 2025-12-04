import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck, X, Upload, FileText, CheckCircle } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Application modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applicationError, setApplicationError] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return; // User not logged in

      // Fetch applied jobs
      const response = await fetch('http://localhost:5000/api/applications/seeker', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const applications = await response.json();
        const jobIds = new Set(applications.map(app => app.job._id));
        setAppliedJobIds(jobIds);
      }

      // Fetch saved jobs
      const savedResponse = await fetch('http://localhost:5000/api/jobs/saved', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (savedResponse.ok) {
        const saved = await savedResponse.json();
        const savedIds = new Set(saved.map(job => job._id));
        setSavedJobs(savedIds);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchJobs = async (keyword = '') => {
    try {
      setLoading(true);
      setError(null);

      const url = keyword
        ? `http://localhost:5000/api/jobs?keyword=${encodeURIComponent(keyword)}`
        : 'http://localhost:5000/api/jobs';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to save jobs');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedJobs(prev => {
          const newSet = new Set(prev);
          if (data.isSaved) {
            newSet.add(jobId);
          } else {
            newSet.delete(jobId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error toggling saved job:', error);
    }
  };

  // Helper function to format time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  // Filter jobs based on search criteria and exclude applied jobs
  const filteredJobs = jobs.filter(job => {
    // Exclude already applied jobs
    if (appliedJobIds.has(job._id)) return false;

    const matchesSearch = searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company?.companyName && job.company.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = location === '' ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesJobType = jobType === '' || job.jobType === jobType;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Application modal handlers
  const openApplicationModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setResumeFile(null);
    setCoverLetter('');
    setApplicationError('');
    setApplicationSuccess(false);
  };

  const closeApplicationModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setResumeFile(null);
    setCoverLetter('');
    setApplicationError('');
    setApplicationSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setApplicationError('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setApplicationError('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
      setApplicationError('');
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setApplicationError('Please upload your resume');
      return;
    }

    setApplying(true);
    setApplicationError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setApplicationError('Please login to apply for jobs');
        return;
      }

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('coverLetter', coverLetter);

      const response = await fetch(`http://localhost:5000/api/applications/apply/${selectedJob._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setApplicationSuccess(true);

      // Add the job to applied jobs list
      setAppliedJobIds(prev => new Set([...prev, selectedJob._id]));

      setTimeout(() => {
        closeApplicationModal();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setApplicationError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1 className="jobs-title">Find Your Dream Job</h1>
        <p className="jobs-subtitle">Discover opportunities that match your skills and aspirations</p>
      </div>

      {/* Search Filters */}
      <div className="search-section">
        <div className="search-grid">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Job title or company"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-input-wrapper">
            <MapPin className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Location"
              className="search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <select
            className="search-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>

          <button
            className="search-button"
            onClick={() => fetchJobs(searchTerm)}
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p className="results-count">
          Showing <strong>{filteredJobs.length}</strong> job{filteredJobs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading jobs...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => fetchJobs()} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {/* Jobs List */}
      {!loading && !error && (
        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs-state">
              <p>No jobs found matching your criteria.</p>
              <p>Try adjusting your search filters.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-card-header">
                  <div className="job-company-logo">
                    {job.company?.companyName ? job.company.companyName.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div className="job-header-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company?.companyName || 'Company Name'}</p>
                  </div>
                  <button
                    className="save-job-btn"
                    onClick={() => toggleSaveJob(job._id)}
                    title={savedJobs.has(job._id) ? 'Remove from saved' : 'Save job'}
                  >
                    {savedJobs.has(job._id) ? (
                      <BookmarkCheck size={20} className="bookmark-filled" />
                    ) : (
                      <Bookmark size={20} />
                    )}
                  </button>
                </div>

                <div className="job-meta">
                  <span className="job-meta-item">
                    <MapPin size={16} />
                    {job.remote ? 'Remote' : job.location}
                  </span>
                  <span className="job-meta-item">
                    <Briefcase size={16} />
                    {job.jobType}
                  </span>
                  {job.salary && job.salary.min && job.salary.max && (
                    <span className="job-meta-item">
                      <DollarSign size={16} />
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      {job.salary.period ? `/${job.salary.period}` : ''}
                    </span>
                  )}
                  <span className="job-meta-item">
                    <Clock size={16} />
                    {getTimeAgo(job.createdAt)}
                  </span>
                </div>

                <p className="job-description">
                  {job.description.length > 200
                    ? `${job.description.substring(0, 200)}...`
                    : job.description}
                </p>

                {job.skills && job.skills.length > 0 && (
                  <div className="job-skills">
                    {job.skills.slice(0, 6).map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 6 && (
                      <span className="skill-tag">+{job.skills.length - 6} more</span>
                    )}
                  </div>
                )}

                <div className="job-actions">
                  <button className="btn-apply" onClick={() => openApplicationModal(job)}>Apply Now</button>
                  <button className="btn-details" onClick={() => navigate(`/seeker/jobs/${job._id}`)}>View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Application Modal */}
      {showModal && selectedJob && (
        <div className="modal-overlay" onClick={closeApplicationModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Apply for Job</h2>
              <button className="modal-close" onClick={closeApplicationModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-job-info">
              <h3 className="modal-job-title">{selectedJob.title}</h3>
              <p className="modal-job-company">{selectedJob.company?.companyName || 'Company Name'}</p>
            </div>

            {applicationSuccess && (
              <div className="success-message">
                <CheckCircle size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Application submitted successfully!
              </div>
            )}

            {applicationError && (
              <div className="error-message">
                {applicationError}
              </div>
            )}

            <form onSubmit={handleSubmitApplication}>
              <div className="form-group">
                <label className="form-label">
                  Resume <span className="required">*</span>
                </label>
                <div
                  className={`file-upload-area ${resumeFile ? 'has-file' : ''}`}
                  onClick={() => document.getElementById('resume-upload').click()}
                >
                  <input
                    id="resume-upload"
                    type="file"
                    className="file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {resumeFile ? (
                    <>
                      <FileText className="upload-icon" size={32} />
                      <p className="file-name">
                        <CheckCircle size={16} />
                        {resumeFile.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="upload-icon" size={32} />
                      <p className="upload-text">Click to upload your resume</p>
                      <p className="upload-hint">PDF, DOC, or DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Cover Letter (Optional)
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeApplicationModal}
                  disabled={applying}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={applying || !resumeFile}
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
