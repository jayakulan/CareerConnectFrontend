import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import './SignupSelection.css';

const SignupSelection = () => {
    return (
        <div className="signup-selection-container">
            <div className="selection-content">
                <div className="selection-header">
                    <div className="selection-logo">C</div>
                    <h1 className="selection-title">Join CareerConnect</h1>
                    <p className="selection-subtitle">Choose how you want to get started</p>
                </div>

                <div className="selection-cards">
                    {/* Job Seeker Card */}
                    <Link to="/signup/seeker" className="selection-card">
                        <div className="card-icon card-icon-seeker">
                            <User size={32} />
                        </div>
                        <h2 className="card-title">I'm a Job Seeker</h2>
                        <p className="card-description">
                            Find your dream job and connect with top companies
                        </p>
                        <div className="card-features">
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>Browse thousands of jobs</span>
                            </div>
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>AI-powered job matching</span>
                            </div>
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>Resume builder & tips</span>
                            </div>
                        </div>
                        <button className="card-button card-button-seeker">
                            Sign Up as Job Seeker <ArrowRight size={20} />
                        </button>
                    </Link>

                    {/* Company Card */}
                    <Link to="/signup/company" className="selection-card">
                        <div className="card-icon card-icon-company">
                            <Building2 size={32} />
                        </div>
                        <h2 className="card-title">I'm a Company</h2>
                        <p className="card-description">
                            Post jobs and find the best talent for your team
                        </p>
                        <div className="card-features">
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>Post unlimited jobs</span>
                            </div>
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>AI candidate screening</span>
                            </div>
                            <div className="card-feature">
                                <CheckCircle size={16} />
                                <span>Applicant tracking system</span>
                            </div>
                        </div>
                        <button className="card-button card-button-company">
                            Sign Up as Company <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>

                <div className="login-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupSelection;
