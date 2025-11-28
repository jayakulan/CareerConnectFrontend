import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Full-time',
        location: '',
        salary: '',
        description: '',
        experience: { min: 0, max: 5 }, // Default values
        education: 'Bachelor', // Default
    });

    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');

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
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const jobData = {
                title: formData.title,
                jobType: formData.type, // Backend expects jobType
                location: formData.location,
                salary: { min: 0, max: 0, currency: 'USD', period: 'year' }, // Simplified for now, backend expects object
                // We can parse the salary string or just send it as description if backend allowed string. 
                // Backend Job.js has salary as object. Let's adjust backend or frontend.
                // For now, let's just send the string in description or handle it.
                // Actually, let's update backend model to allow string or parse it here.
                // To keep it simple, I'll send dummy salary object and put the text in description or add a salaryText field.
                // Let's try to parse "100k - 140k" roughly or just send defaults.
                description: formData.description + `\n\nSalary: ${formData.salary}`,
                skills: skills,
                remote: formData.type === 'Remote',
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, jobData, config);
            toast.success('Job posted successfully!');
            navigate('/company/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-job-container">
            <div className="form-header">
                <h1 className="form-title">Post a New Job</h1>
                <p className="form-subtitle">Find the perfect candidate for your team.</p>
            </div>

            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        placeholder="e.g. Senior Frontend Developer"
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
                            placeholder="e.g. San Francisco, CA"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Salary Range</label>
                    <input
                        type="text"
                        name="salary"
                        className="form-input"
                        placeholder="e.g. $100k - $140k"
                        value={formData.salary}
                        onChange={handleChange}
                    />
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
                        placeholder="Describe the role and responsibilities..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>

            <style jsx>{`
        .post-job-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 24px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .job-form {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
          font-family: inherit;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .tags-input-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          min-height: 48px;
        }

        .tags-input-container:focus-within {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .tag-badge {
          background: #fce7f3;
          color: #be185d;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tag-remove {
          cursor: pointer;
          flex-shrink: 0;
        }

        .tag-remove:hover {
          color: #9d174d;
        }

        .tag-input {
          border: none;
          outline: none;
          flex: 1;
          min-width: 120px;
          font-size: 14px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default PostJob;
