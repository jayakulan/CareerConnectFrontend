import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CompanySignup.css';

const CompanySignup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
        website: '',
        industry: '',
        companySize: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                name: formData.companyName,
                email: formData.email,
                password: formData.password,
                role: 'company',
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Company registered successfully!');
            navigate('/company/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="company-signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo">
                        <Building2 size={32} />
                    </div>
                    <h1 className="signup-title">Create Company Account</h1>
                    <p className="signup-subtitle">Join CareerConnect and find top talent</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label className="form-label">Company Name *</label>
                        <input
                            type="text"
                            name="companyName"
                            className="form-input"
                            placeholder="Enter your company name"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="company@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password *</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-input"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-input"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Website</label>
                        <input
                            type="url"
                            name="website"
                            className="form-input"
                            placeholder="https://yourcompany.com"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Industry</label>
                        <select
                            name="industry"
                            className="form-select"
                            value={formData.industry}
                            onChange={handleChange}
                        >
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company Size</label>
                        <select
                            name="companySize"
                            className="form-select"
                            value={formData.companySize}
                            onChange={handleChange}
                        >
                            <option value="">Select Company Size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company Description</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Tell us about your company..."
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Company Account'}
                    </button>
                </form>

                <div className="login-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default CompanySignup;
