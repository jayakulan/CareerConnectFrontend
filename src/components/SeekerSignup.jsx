import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './SeekerSignup.css';

const SeekerSignup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
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
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
                role: 'seeker',
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Account created successfully!');
            navigate('/seeker/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        toast.info('Google signup coming soon!');
    };

    return (
        <div className="seeker-signup-container">
            {/* Left Side - Form */}
            <div className="signup-left">
                <div className="signup-form-wrapper">
                    <div className="signup-header">
                        <div className="signup-logo">
                            <User size={28} />
                        </div>
                        <h1 className="signup-title">Find Your Next Opportunity</h1>
                        <p className="signup-subtitle">Join CareerConnect and get one step closer to your dream job.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="John Doe"
                                    value={formData.name}
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
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Password *</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="form-input"
                                        placeholder="Min. 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password *</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Re-enter password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-input"
                                    placeholder="City, State"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="google-btn" onClick={handleGoogleSignup}>
                        <svg width="18" height="18" viewBox="0 0 20 20">
                            <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" />
                            <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" />
                            <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" />
                            <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="login-link">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual/Branding */}
            <div className="signup-right">
                <div className="signup-visual-content">
                    <h2 className="visual-title">Start Your Career Journey Today</h2>
                    <p className="visual-description">
                        Join thousands of professionals who have found their dream jobs through CareerConnect
                    </p>
                    <div className="visual-features">
                        <div className="visual-feature">
                            <div className="feature-icon">🎯</div>
                            <div className="feature-text">
                                <h3>Smart Job Matching</h3>
                                <p>AI-powered recommendations tailored to your skills</p>
                            </div>
                        </div>
                        <div className="visual-feature">
                            <div className="feature-icon">📊</div>
                            <div className="feature-text">
                                <h3>Career Insights</h3>
                                <p>Track your applications and get valuable feedback</p>
                            </div>
                        </div>
                        <div className="visual-feature">
                            <div className="feature-icon">🚀</div>
                            <div className="feature-text">
                                <h3>Fast & Easy</h3>
                                <p>Apply to multiple jobs with just one click</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerSignup;
