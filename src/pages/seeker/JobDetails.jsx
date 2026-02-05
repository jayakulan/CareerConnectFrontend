import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, ArrowLeft, Building, Globe, CheckCircle } from 'lucide-react';
import './JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch job details');
            }

            const data = await response.json();
            setJob(data);
        } catch (error) {
            console.error('Error fetching job details:', error);
            setError('Failed to load job details');
        } finally {
            setLoading(false);
        }
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const posted = new Date(date);
        const diffInMs = now - posted;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return `${Math.floor(diffInDays / 7)} weeks ago`;
    };

    if (loading) return <div className="loading-state"><div className="spinner"></div>Loading job details...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!job) return <div className="error-state">Job not found</div>;

    return (
        <div className="job-details-page">
            <button className="back-button" onClick={() => navigate('/seeker/jobs')}>
                <ArrowLeft size={20} />
                Back to Jobs
            </button>

            <div className="job-details-container">
                {/* Header Section */}
                <div className="job-details-header">
                    <div className="header-main">
                        <div className="company-logo-large">
                            {job.company?.companyName?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <div className="header-info">
                            <h1 className="job-title-large">{job.title}</h1>
                            <div className="company-info">
                                <span className="company-name">{job.company?.companyName}</span>
                                {job.company?.website && (
                                    <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="company-website">
                                        <Globe size={14} />
                                        Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="btn-apply-large">Apply Now</button>
                    </div>
                </div>

                {/* Meta Info Grid */}
                <div className="job-meta-grid">
                    <div className="meta-card">
                        <Briefcase className="meta-icon" />
                        <div>
                            <p className="meta-label">Job Type</p>
                            <p className="meta-value">{job.jobType}</p>
                        </div>
                    </div>
                    <div className="meta-card">
                        <MapPin className="meta-icon" />
                        <div>
                            <p className="meta-label">Location</p>
                            <p className="meta-value">{job.remote ? 'Remote' : job.location}</p>
                        </div>
                    </div>
                    <div className="meta-card">
                        <DollarSign className="meta-icon" />
                        <div>
                            <p className="meta-label">Salary</p>
                            <p className="meta-value">
                                {job.salary ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}` : 'Not specified'}
                            </p>
                        </div>
                    </div>
                    <div className="meta-card">
                        <Clock className="meta-icon" />
                        <div>
                            <p className="meta-label">Posted</p>
                            <p className="meta-value">{getTimeAgo(job.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="job-content-grid">
                    <div className="job-main-content">
                        <section className="content-section">
                            <h2 className="section-heading">Description</h2>
                            <p className="job-description-text">{job.description}</p>
                        </section>

                        <section className="content-section">
                            <h2 className="section-heading">Requirements</h2>
                            <ul className="requirements-list">
                                {job.requirements && job.requirements.map((req, index) => (
                                    <li key={index} className="requirement-item">
                                        <CheckCircle size={18} className="check-icon" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="job-sidebar">
                        <div className="sidebar-card">
                            <h3 className="sidebar-heading">Required Skills</h3>
                            <div className="skills-container">
                                {job.skills && job.skills.map((skill, index) => (
                                    <span key={index} className="skill-badge">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-card">
                            <h3 className="sidebar-heading">About Company</h3>
                            <div className="company-sidebar-info">
                                <Building size={24} className="company-icon-small" />
                                <div>
                                    <p className="company-name-small">{job.company?.companyName}</p>
                                    <p className="company-location-small">{job.company?.location || 'Location not specified'}</p>
                                </div>
                            </div>
                            <p className="company-description-small">
                                {job.company?.description || 'No company description available.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
