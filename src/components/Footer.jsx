import { Link } from 'react-router-dom';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';
import logo from '../assets/image.png';

export default function Footer({ onContactClick, onAboutClick, onTermsClick, onPrivacyClick, onCareersClick }) {
    const footerLinks = {
        company: [
            { label: "About Us", action: onAboutClick },
            { label: "Contact", action: onContactClick },
            { label: "Careers", action: onCareersClick },
        ],
        legal: [
            { label: "Terms of Service", action: onTermsClick },
            { label: "Privacy Policy", action: onPrivacyClick },
        ],
        resources: [
            { label: "Blog", href: "#" },
            { label: "Help Center", href: "#" },
        ],
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-brand-logo">
                            <img src={logo} alt="CareerConnect Logo" className="footer-brand-image" />
                            <span className="footer-brand-text">CareerConnect</span>
                        </div>
                        <p className="footer-brand-description">
                            Connecting talent with opportunity. The #1 platform for modern professionals.
                        </p>
                    </div>

                    {/* Company */}
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul className="footer-links">
                            {footerLinks.company.map((link, index) => (
                                <li key={index} className="footer-link">
                                    <button
                                        onClick={link.action}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                            padding: 0,
                                            font: 'inherit'
                                        }}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul className="footer-links">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index} className="footer-link">
                                    <button
                                        onClick={link.action}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                            padding: 0,
                                            font: 'inherit'
                                        }}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul className="footer-links">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index} className="footer-link">
                                    <Link to={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider">
                    <p className="footer-copyright">© 2025 CareerConnect. All rights reserved.</p>

                    {/* Social Icons */}
                    <div className="footer-socials">
                        <Link to="#" className="footer-social-link">
                            <Twitter size={20} />
                        </Link>
                        <Link to="#" className="footer-social-link">
                            <Facebook size={20} />
                        </Link>
                        <Link to="#" className="footer-social-link">
                            <Linkedin size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
