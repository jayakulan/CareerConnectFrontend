import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './PostJob.css'; // Reuse styles

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Full-time',
        location: '',
        salary: '',
        description: '',
        status: 'published'
    });

    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');

    useEffect(() => {
        console.log('EditJob component mounted with ID:', id);
        console.log('API URL:', import.meta.env.VITE_API_URL);

        const fetchJob = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token');

                if (!token) {
                    toast.error('Please login to edit jobs');
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                console.log('Fetching job with ID:', id);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`, config);
                console.log('Job data received:', data);

                setFormData({
                    title: data.title || '',
                    type: data.jobType || 'Full-time',
                    location: data.location || '',
                    salary: data.salary?.min ? `$${data.salary.min} - $${data.salary.max}` : '',
                    description: data.description || '',
                    status: data.status || 'published'
                });
                setSkills(data.skills || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job:', error);
                setError(error.response?.data?.message || 'Failed to load job details');
                toast.error('Failed to load job details');
                setLoading(false);
                // Don't navigate away immediately, show error
            }
        };

        if (id) {
            fetchJob();
        } else {
            setError('No job ID provided');
            setLoading(false);
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' && currentSkill.trim()) {
            e.preventDefault();
            if (!skills.includes(currentSkill.trim())) {
                setSkills([...skills, currentSkill.trim()]);
            }
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const jobData = {
                title: formData.title,
                jobType: formData.type,
                location: formData.location,
                description: formData.description,
                skills: skills,
                remote: formData.type === 'Remote',
                status: formData.status
            };

            console.log('Updating job with data:', jobData);
            await axios.put(`${import.meta.env.VITE_API_URL}/jobs/${id}`, jobData, config);
            toast.success('Job updated successfully!');
            navigate('/company/dashboard');
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update job');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="post-job-container">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Loading job details...</h2>
                    <p>Please wait while we fetch the job information.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="post-job-container">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2 style={{ color: '#ef4444' }}>Error Loading Job</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/company/dashboard')}
                        className="submit-btn"
                        style={{ marginTop: '20px' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="post-job-container">
            <button onClick={() => navigate('/company/dashboard')} className="back-btn">
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="form-header">
                <h1 className="form-title">Edit Job Posting</h1>
                <p className="form-subtitle">Update job details and requirements.</p>
            </div>

            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Job Type</label>
                        <select
                            name="type"
                            className="form-select"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                            <option>Remote</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="published">Published (Active)</option>
                        <option value="closed">Closed (No new applicants)</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Required Skills (Press Enter to add)</label>
                    <div className="tags-input-container">
                        {skills.map((skill, index) => (
                            <span key={index} className="tag-badge">
                                {skill}
                                <X size={14} className="tag-remove" onClick={() => removeSkill(skill)} />
                            </span>
                        ))}
                        <input
                            type="text"
                            className="tag-input"
                            placeholder="Add a skill..."
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Job Description</label>
                    <textarea
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={10}
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/company/dashboard')} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={saving}>
                        {saving ? 'Saving...' : 'Update Job'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditJob;
