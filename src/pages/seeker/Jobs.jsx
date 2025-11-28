import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';

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

            <style jsx>{`
        .jobs-page {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .jobs-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .jobs-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }

        .jobs-subtitle {
          font-size: 18px;
          color: #6b7280;
        }

        .search-section {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 32px;
        }

        .search-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .search-grid {
            grid-template-columns: 2fr 2fr 1.5fr 1fr;
          }
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-select {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-button {
          padding: 14px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .search-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .results-info {
          margin-bottom: 24px;
        }

        .results-count {
          font-size: 16px;
          color: #4b5563;
        }

        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .job-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
          border-color: rgba(102, 126, 234, 0.2);
        }

        .job-card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .job-company-logo {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .job-header-info {
          flex: 1;
        }

        .job-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .job-company {
          font-size: 16px;
          color: #6b7280;
        }

        .save-job-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          transition: all 0.3s ease;
          padding: 8px;
        }

        .save-job-btn:hover {
          color: #667eea;
          transform: scale(1.1);
        }

        .bookmark-filled {
          color: #667eea;
          fill: #667eea;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 16px;
        }

        .job-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #6b7280;
        }

        .job-description {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .job-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .skill-tag {
          padding: 6px 14px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          color: #667eea;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .job-actions {
          display: flex;
          gap: 12px;
        }

        .btn-apply {
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-apply:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-details {
          padding: 12px 28px;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-details:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .job-meta {
            flex-direction: column;
            gap: 12px;
          }

          .job-actions {
            flex-direction: column;
          }

          .btn-apply,
          .btn-details {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default Jobs;
