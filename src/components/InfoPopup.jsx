import { X } from 'lucide-react';
import './InfoPopup.css';

export default function InfoPopup({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div className="info-popup-overlay" onClick={onClose}>
            <div className="info-popup-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="info-popup-close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="info-popup-header">
                    <h2 className="info-popup-title">{title}</h2>
                </div>

                {/* Content */}
                <div className="info-popup-content">
                    {content}
                </div>
            </div>
        </div>
    );
}
