import { useState } from 'react';
import { X, Mail, User, Phone, MessageSquare, Send } from 'lucide-react';
import './ContactUsPopup.css';

export default function ContactUsPopup({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                // Close popup after 2 seconds
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.message || 'Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="contact-popup-overlay" onClick={onClose}>
            <div className="contact-popup-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="contact-popup-close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="contact-popup-header">
                    <div className="contact-popup-icon">
                        <Mail size={32} />
                    </div>
                    <h2 className="contact-popup-title">Get In Touch</h2>
                    <p className="contact-popup-subtitle">
                        Have a question or feedback? We'd love to hear from you!
                    </p>
                </div>

                {/* Form */}
                <form className="contact-popup-form" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="contact-form-group">
                        <label htmlFor="name" className="contact-form-label">
                            <User size={18} />
                            Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="contact-form-input"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="contact-form-group">
                        <label htmlFor="email" className="contact-form-label">
                            <Mail size={18} />
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="contact-form-input"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="contact-form-group">
                        <label htmlFor="phone" className="contact-form-label">
                            <Phone size={18} />
                            Phone (Optional)
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="contact-form-input"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    {/* Subject Field */}
                    <div className="contact-form-group">
                        <label htmlFor="subject" className="contact-form-label">
                            <MessageSquare size={18} />
                            Subject <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="contact-form-input"
                            placeholder="What is this regarding?"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div className="contact-form-group">
                        <label htmlFor="message" className="contact-form-label">
                            <MessageSquare size={18} />
                            Message <span className="required">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="contact-form-textarea"
                            placeholder="Tell us more about your inquiry..."
                            rows="5"
                            required
                        />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="contact-status-message success">
                            ✓ Thank you! Your message has been sent successfully.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="contact-status-message error">
                            ✗ {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="contact-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
