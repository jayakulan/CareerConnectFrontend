import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="navbar-logo-circle">C</div>
          <span className="navbar-logo-text">CareerConnect</span>
        </div>

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
          <Link to="/about" className="navbar-nav-link">
            About
          </Link>
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