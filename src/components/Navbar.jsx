import { Link } from "react-router-dom";
import "./landingpage.css";

function Navbar({ onAboutClick }) {
  return (
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
          <Link to="/jobs" className="navbar-nav-link">
            Jobs
          </Link>
          <Link to="/companies" className="navbar-nav-link">
            Companies
          </Link>
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
  );
}

export default Navbar;