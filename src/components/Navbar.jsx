import { useState } from "react";
import { Link } from "react-router-dom";
import InfoPopup from "./InfoPopup";
import { companiesContent, careersContent } from "./popupContent";
import "./landingpage.css";

function Navbar({ onAboutClick }) {
  const [companiesPopupOpen, setCompaniesPopupOpen] = useState(false);
  const [careersPopupOpen, setCareersPopupOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-circle">C</div>
            <span className="navbar-logo-text">CareerConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            <Link to="/" className="navbar-nav-link">
              Home
            </Link>

            <button
              onClick={() => setCompaniesPopupOpen(true)}
              className="navbar-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                font: 'inherit'
              }}
            >
              Companies
            </button>
            <button
              onClick={() => setCareersPopupOpen(true)}
              className="navbar-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                font: 'inherit'
              }}
            >
              Jobs
            </button>
            <button
              onClick={onAboutClick}
              className="navbar-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                font: 'inherit'
              }}
            >
              About
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="navbar-buttons">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Companies Popup */}
      <InfoPopup
        isOpen={companiesPopupOpen}
        onClose={() => setCompaniesPopupOpen(false)}
        title="Explore Companies"
        content={companiesContent}
      />

      {/* Careers Popup */}
      <InfoPopup
        isOpen={careersPopupOpen}
        onClose={() => setCareersPopupOpen(false)}
        title="Career Opportunities"
        content={careersContent}
      />
    </>
  );
}

export default Navbar;