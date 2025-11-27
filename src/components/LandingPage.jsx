"use client"

import { Link } from "react-router-dom";
import { Users, Briefcase, Shield, Facebook, Twitter, Linkedin } from "lucide-react"
import "./landingpage.css"
import Navbar from "./Navbar";

// ===== TESTIMONIALS DATA =====
const testimonials = [
  {
    name: "Jane Doe",
    role: "Senior Developer",
    company: "TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    quote:
      '"CareerConnect was a game-changer for my job search. I found a Senior Developer role at a company I love within weeks!"',
  },
  {
    name: "John Smith",
    role: "Hiring Manager",
    company: "Innovate LLC",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    quote:
      '"The platform\'s interface is incredibly intuitive. As a recruiter, I was able to find qualified candidates faster than ever before."',
  },
  {
    name: "Samuel Lee",
    role: "Full-Stack Engineer",
    company: "StartupX",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    quote:
      '"I landed my first full-stack role thanks to this site. The resources and job listings are top-notch for MERN developers."',
  },
]

const roles = [
  {
    icon: Users,
    title: "For Job Seekers",
    description: "Find and apply for your next job with ease. Let us connect you with your dream company.",
  },
  {
    icon: Briefcase,
    title: "For Companies",
    description: "Post jobs and find the best talent. Our platform makes hiring simple and efficient.",
  },
  {
    icon: Shield,
    title: "For Admins",
    description: "Manage the platform, oversee settings, and ensure a seamless experience for all users.",
  },
]

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
  ],
}


// ===== HERO COMPONENT =====
function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job or Candidate</h1>
          <p className="hero-description">
            Connecting top talent with leading companies. Whether you're searching for your next opportunity or looking
            to hire, we're here to help.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-large btn-primary">Browse Jobs</button>
            <button className="btn btn-large btn-outline">Post a Job</button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hero-illustration">
          <div className="illustration-box">
            {/* Network dots illustration */}
            <svg className="illustration-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Connection lines */}
              <line x1="80" y1="100" x2="150" y2="150" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="150" y1="150" x2="220" y2="120" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="150" y1="150" x2="180" y2="250" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="220" y1="120" x2="280" y2="200" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="280" y1="200" x2="300" y2="300" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="180" y1="250" x2="280" y2="200" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="100" y1="300" x2="180" y2="250" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />
              <line x1="100" y1="300" x2="300" y2="300" stroke="#4b5563" strokeWidth="1.5" opacity="0.4" />

              {/* Dots */}
              <circle cx="80" cy="100" r="4" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="150" cy="150" r="5" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="220" cy="120" r="3.5" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="180" cy="250" r="4" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="280" cy="200" r="4.5" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="300" cy="300" r="3" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="100" cy="300" r="3.5" fill="#4b5563" filter="url(#shadow)" />
              <circle cx="50" cy="80" r="2.5" fill="#4b5563" opacity="0.6" />
              <circle cx="330" cy="140" r="3" fill="#4b5563" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== ROLE CARDS COMPONENT =====
function RoleCards() {
  return (
    <section className="role-cards">
      <div className="role-cards-container">
        {roles.map((role, index) => {
          const Icon = role.icon
          return (
            <div key={index} className="role-card">
              <div className="role-card-icon">
                <Icon />
              </div>
              <h3 className="role-card-title">{role.title}</h3>
              <p className="role-card-description">{role.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ===== TESTIMONIALS COMPONENT =====
function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Success Stories</h2>
          <p className="testimonials-subtitle">See how CareerConnect has helped professionals land their dream jobs.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-author">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== NEWSLETTER COMPONENT =====
function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Ahead in Your Career</h2>
          <p className="newsletter-description">
            Subscribe to our newsletter for the latest job alerts, career tips, and industry insights.
          </p>
        </div>

        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <button className="btn btn-subscribe">Subscribe</button>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER COMPONENT =====
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <div className="footer-brand-circle">C</div>
              <span className="footer-brand-text">CareerConnect</span>
            </div>
            <p className="footer-brand-description">Connecting talent with opportunity.</p>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link, index) => (
                <li key={index} className="footer-link">
                  <Link href={link.href}>{link.label}</Link>
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
                  <Link href={link.href}>{link.label}</Link>
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
                  <Link href={link.href}>{link.label}</Link>
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
            <Link href="#" className="footer-social-link">
              <Twitter />
            </Link>
            <Link href="#" className="footer-social-link">
              <Facebook />
            </Link>
            <Link href="#" className="footer-social-link">
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===== MAIN LANDING PAGE COMPONENT =====
export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RoleCards />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
