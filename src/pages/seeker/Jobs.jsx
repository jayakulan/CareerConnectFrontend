import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

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

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
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

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company?.companyName && job.company.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = location === '' ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesJobType = jobType === '' || job.jobType === jobType;

    return matchesSearch && matchesLocation && matchesJobType;
  });

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
                  <button className="btn-apply">Apply Now</button>
                  <button className="btn-details">View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
