import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactUsPopup from './ContactUsPopup';
import InfoPopup from './InfoPopup';
import { aboutUsContent, termsOfServiceContent, privacyPolicyContent, careersContent } from './popupContent';
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
        phone: '',
        address: '',
        industry: '',
    });

    // Popup states
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
    const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
    const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
    const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);
    const [isCareersPopupOpen, setIsCareersPopupOpen] = useState(false);

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
                phone: formData.phone,
                address: formData.address,
                industry: formData.industry,
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
                onAboutClick={() => setIsAboutPopupOpen(true)}
                onContactClick={() => setIsContactPopupOpen(true)}
            />

            <div className="company-signup-container">
                {/* Left Side - Form */}
                <div className="signup-left">
                    <div className="signup-form-wrapper">
                        <div className="signup-header">
                            <div className="signup-logo">
                                <Building2 size={28} />
                            </div>
                            <h1 className="signup-title">Hire Top Talent</h1>
                            <p className="signup-subtitle">Post jobs and connect with the best candidates for your team.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Company Name *</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        className="form-input"
                                        placeholder="Your Company"
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

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Company Account'}
                            </button>
                        </form>

                        <div className="login-link">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Visual/Branding */}
                <div className="signup-right">
                    <div className="signup-visual-content">
                        <h2 className="visual-title">Find Your Perfect Candidates</h2>
                        <p className="visual-description">
                            Join leading companies using CareerConnect to build exceptional teams
                        </p>
                        <div className="visual-features">
                            <div className="visual-feature">
                                <div className="feature-icon">🎯</div>
                                <div className="feature-text">
                                    <h3>Smart Candidate Matching</h3>
                                    <p>AI-powered screening to find the best fit for your roles</p>
                                </div>
                            </div>
                            <div className="visual-feature">
                                <div className="feature-icon">📊</div>
                                <div className="feature-text">
                                    <h3>Analytics Dashboard</h3>
                                    <p>Track applications and hiring metrics in real-time</p>
                                </div>
                            </div>
                            <div className="visual-feature">
                                <div className="feature-icon">⚡</div>
                                <div className="feature-text">
                                    <h3>Quick Hiring Process</h3>
                                    <p>Streamline your recruitment with our ATS system</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                onContactClick={() => setIsContactPopupOpen(true)}
                onAboutClick={() => setIsAboutPopupOpen(true)}
                onTermsClick={() => setIsTermsPopupOpen(true)}
                onPrivacyClick={() => setIsPrivacyPopupOpen(true)}
                onCareersClick={() => setIsCareersPopupOpen(true)}
            />

            {/* All Popups */}
            <ContactUsPopup
                isOpen={isContactPopupOpen}
                onClose={() => setIsContactPopupOpen(false)}
            />
            <InfoPopup
                isOpen={isAboutPopupOpen}
                onClose={() => setIsAboutPopupOpen(false)}
                title="About Us"
                content={aboutUsContent}
            />
            <InfoPopup
                isOpen={isTermsPopupOpen}
                onClose={() => setIsTermsPopupOpen(false)}
                title="Terms of Service"
                content={termsOfServiceContent}
            />
            <InfoPopup
                isOpen={isPrivacyPopupOpen}
                onClose={() => setIsPrivacyPopupOpen(false)}
                title="Privacy Policy"
                content={privacyPolicyContent}
            />
            <InfoPopup
                isOpen={isCareersPopupOpen}
                onClose={() => setIsCareersPopupOpen(false)}
                title="Career Opportunities"
                content={careersContent}
            />
        </div>
    );
};

export default CompanySignup;
