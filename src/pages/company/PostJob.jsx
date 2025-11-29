import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './PostJob.css';

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
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/myjobs`, config);
        setRecentJobs(data.slice(0, 5)); // Keep only 5 most recent
      } catch (error) {
        console.error('Error fetching recent jobs:', error);
      }
    };
    fetchRecentJobs();
  }, []);

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

      <div className="recent-jobs-section">
        <h2 className="section-title">Your Recent Job Posts</h2>
        <div className="recent-jobs-list">
          {recentJobs.length > 0 ? (
            recentJobs.map((job) => (
              <div key={job._id} className="recent-job-card">
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-meta">{job.location} • {job.jobType}</p>
                </div>
                <div className="job-status">
                  <span className="status-badge">{job.status || 'Active'}</span>
                  <span className="job-date">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-jobs-msg">No jobs posted yet.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default PostJob;
