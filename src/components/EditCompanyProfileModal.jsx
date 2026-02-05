import { useState, useEffect } from 'react';
import { X, Building, Globe, MapPin, Users, FileText } from 'lucide-react';
import './EditCompanyProfileModal.css';

const EditCompanyProfileModal = ({ isOpen, onClose, onUpdate, initialData }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        website: '',
        description: '',
        industry: '',
        companySize: '',
        location: {
            city: '',
            country: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                companyName: initialData.companyName || initialData.name || '',
                website: initialData.website || '',
                description: initialData.description || '',
                industry: initialData.industry || '',
                companySize: initialData.companySize || '',
                location: {
                    city: initialData.location?.city || (typeof initialData.location === 'string' ? initialData.location : '') || '',
                    country: initialData.location?.country || ''
                }
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedData = await response.json();
            onUpdate(updatedData);
            onClose();
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content edit-profile-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Edit Company Profile</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="form-group">
                        <label className="form-label">
                            <Building size={16} /> Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            className="form-input"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <Globe size={16} /> Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                className="form-input"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <Users size={16} /> Company Size
                            </label>
                            <select
                                name="companySize"
                                className="form-select"
                                value={formData.companySize}
                                onChange={handleChange}
                            >
                                <option value="">Select Size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501-1000">501-1000 employees</option>
                                <option value="1000+">1000+ employees</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <FileText size={16} /> Industry
                        </label>
                        <input
                            type="text"
                            name="industry"
                            className="form-input"
                            value={formData.industry}
                            onChange={handleChange}
                            placeholder="e.g. Technology, Healthcare"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <MapPin size={16} /> City
                            </label>
                            <input
                                type="text"
                                name="location.city"
                                className="form-input"
                                value={formData.location.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <Globe size={16} /> Country
                            </label>
                            <input
                                type="text"
                                name="location.country"
                                className="form-input"
                                value={formData.location.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <FileText size={16} /> Description
                        </label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about your company..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCompanyProfileModal;
