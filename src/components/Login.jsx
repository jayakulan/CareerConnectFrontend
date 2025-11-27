"use client"

import { useState } from "react"
import "./login.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      {/* Left Side - Image Section */}
      <div className="login-left">
        <div className="login-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop"
            alt="Professional woman at desk"
            className="login-image"
          />
        </div>
        <div className="login-left-content">
          <h2 className="login-left-title">Your Next Opportunity Awaits.</h2>
          <p className="login-left-description">Connect with top companies and find the job that fits your life.</p>
        </div>
      </div>

      {/* Right Side - Login Form Section */}
      <div className="login-right">
        <div className="login-form-wrapper">
          {/* Logo */}
          <div className="login-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#6366F1" />
              <path
                d="M10 16L14 20L22 12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="logo-text">CareerConnect</span>
          </div>

          {/* Heading */}
          <h1 className="login-heading">Log in to your Account</h1>
          <p className="login-subheading">Welcome back! Please enter your details.</p>

          {/* Login Form */}
          <form className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input type="email" id="email" placeholder="Enter your email" className="form-input" required />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-footer">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="checkbox-label">Remember Me</span>
              </label>
              <a href="#forgot-password" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="signup-section">
            <p className="signup-text">
              New to CareerConnect?{" "}
              <a href="#signup" className="signup-link">
                Create an account
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="login-footer-links">
            <a href="#terms">Terms of Service</a>
            <span className="separator">·</span>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
