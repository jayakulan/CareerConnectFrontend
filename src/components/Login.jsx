import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactUsPopup from "./ContactUsPopup";
import InfoPopup from "./InfoPopup";
import { aboutUsContent, termsOfServiceContent, privacyPolicyContent, careersContent } from "./popupContent";
import "./Login.css";
import logo from "../assets/image.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Popup states
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);
  const [isCareersPopupOpen, setIsCareersPopupOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data); // Use context login
        toast.success("Login successful!");
        redirectUser(data.role);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data); // Use context login
        toast.success("Google Login successful!");
        redirectUser(data.role);
      } else {
        toast.error(data.message || "Google Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong with Google Login");
    }
  };

  const redirectUser = (role) => {
    if (role === "seeker") navigate("/seeker/dashboard");
    else if (role === "company") navigate("/company/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onAboutClick={() => setIsAboutPopupOpen(true)}
        onContactClick={() => setIsContactPopupOpen(true)}
      />

      <div className="login-container">
        {/* Left Side - Image/Brand Section */}
        <div className="login-left">
          <div className="login-left-content">
            <h2 className="login-left-title">Welcome to CareerConnect</h2>
            <p className="login-left-description">
              Your gateway to endless career opportunities. Connect with top companies and find your dream job today.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form Section */}
        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <div className="login-logo">
                <img src={logo} alt="CareerConnect Logo" className="login-logo-image" />
                <span className="logo-text">CareerConnect</span>
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Log in to your account to continue</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-footer">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-button">
                Log In
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
                useOneTap
              />
            </div>

            <div className="signup-section">
              Don't have an account?
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
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
}
