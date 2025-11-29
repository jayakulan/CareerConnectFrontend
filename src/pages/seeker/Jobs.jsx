import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());

  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      jobType: 'Full-time',
      salary: { min: 80000, max: 120000 },
      skills: ['React', 'TypeScript', 'Node.js'],
      postedAt: '2 days ago',
      description: 'We are looking for an experienced React developer...',
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      jobType: 'Full-time',
      salary: { min: 100000, max: 150000 },
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      postedAt: '1 week ago',
      description: 'Join our fast-growing startup as a full stack engineer...',
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'New York, NY',
      jobType: 'Contract',
      salary: { min: 60000, max: 90000 },
      skills: ['JavaScript', 'React', 'CSS'],
      postedAt: '3 days ago',
      description: 'Looking for a creative frontend developer...',
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'CloudTech',
      location: 'Austin, TX',
      jobType: 'Full-time',
      salary: { min: 90000, max: 130000 },
      skills: ['Node.js', 'Express', 'PostgreSQL'],
      postedAt: '5 days ago',
      description: 'Backend developer needed for cloud infrastructure...',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'InfraCo',
      location: 'Remote',
      jobType: 'Full-time',
      salary: { min: 110000, max: 160000 },
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      postedAt: '1 day ago',
      description: 'Experienced DevOps engineer to manage our infrastructure...',
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      company: 'DesignHub',
      location: 'Los Angeles, CA',
      jobType: 'Part-time',
      salary: { min: 50000, max: 80000 },
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      postedAt: '4 days ago',
      description: 'Creative UI/UX designer for modern web applications...',
    },
  ];

  useEffect(() => {
    setJobs(mockJobs);
  }, []);

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
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
          </select>

          <button className="search-button">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p className="results-count">
          Showing <strong>{filteredJobs.length}</strong> jobs
        </p>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="job-company-logo">
                {job.company.charAt(0)}
              </div>
              <div className="job-header-info">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <button
                className="save-job-btn"
                onClick={() => toggleSaveJob(job.id)}
              >
                {savedJobs.has(job.id) ? (
                  <BookmarkCheck size={20} className="bookmark-filled" />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
            </div>

            <div className="job-meta">
              <span className="job-meta-item">
                <MapPin size={16} />
                {job.location}
              </span>
              <span className="job-meta-item">
                <Briefcase size={16} />
                {job.jobType}
              </span>
              <span className="job-meta-item">
                <DollarSign size={16} />
                ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
              </span>
              <span className="job-meta-item">
                <Clock size={16} />
                {job.postedAt}
              </span>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="job-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <div className="job-actions">
              <button className="btn-apply">Apply Now</button>
              <button className="btn-details">View Details</button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Jobs;
