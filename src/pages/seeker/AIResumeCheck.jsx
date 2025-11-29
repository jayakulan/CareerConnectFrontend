import { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './AIResumeCheck.css';

const AIResumeCheck = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        matchPercentage: 85,
        recommendation: 'Interview',
        summary: 'Strong candidate with relevant experience in React and Node.js. Skills align well with job requirements.',
        strengths: [
          'Extensive experience with React and modern JavaScript',
          'Strong background in full-stack development',
          'Proven track record of delivering projects',
          'Good understanding of cloud technologies',
        ],
        weaknesses: [
          'Limited experience with TypeScript',
          'No mention of testing frameworks',
          'Could benefit from more DevOps knowledge',
        ],
        missingSkills: ['TypeScript', 'Jest', 'Docker', 'Kubernetes'],
      });
      setAnalyzing(false);
    }, 3000);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'Hire':
        return <CheckCircle size={24} style={{ color: '#10b981' }} />;
      case 'Interview':
        return <AlertCircle size={24} style={{ color: '#f59e0b' }} />;
      case 'Reject':
        return <XCircle size={24} style={{ color: '#ef4444' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="ai-resume-page">
      <div className="page-header">
        <div className="header-content">
          <Sparkles size={32} className="header-icon" />
          <div>
            <h1 className="page-title">AI Resume Analyzer</h1>
            <p className="page-subtitle">Get instant feedback on how well your resume matches a job description</p>
          </div>
        </div>
      </div>

      <div className="analyzer-container">
        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-card">
            <h2 className="section-title">Upload Your Resume</h2>
            <div className="file-upload-area">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="resume-upload" className="file-upload-label">
                <Upload size={48} className="upload-icon" />
                <div className="upload-text">
                  <p className="upload-main-text">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="upload-sub-text">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </label>
            </div>
          </div>

          <div className="job-desc-card">
            <h2 className="section-title">Job Description</h2>
            <textarea
              className="job-desc-textarea"
              rows="10"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={analyzing || !selectedFile || !jobDescription}
          >
            {analyzing ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze with AI
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">Analysis Results</h2>
            </div>

            {/* Match Score */}
            <div className="match-card">
              <div className="match-score-container">
                <div className="match-circle-wrapper">
                  <svg className="match-circle-svg" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={getMatchColor(analysis.matchPercentage)}
                      strokeWidth="12"
                      strokeDasharray={`${analysis.matchPercentage * 5.65} 565`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="match-circle-progress"
                    />
                  </svg>
                  <div className="match-percentage">
                    <span className="match-number">{analysis.matchPercentage}%</span>
                    <span className="match-label">Match</span>
                  </div>
                </div>
                <div className="recommendation-box">
                  {getRecommendationIcon(analysis.recommendation)}
                  <div>
                    <p className="recommendation-label">Recommendation</p>
                    <p className="recommendation-value">{analysis.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="summary-card">
              <h3 className="card-title">Summary</h3>
              <p className="summary-text">{analysis.summary}</p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="insights-grid">
              <div className="insights-card strengths-card">
                <h3 className="card-title">
                  <CheckCircle size={20} style={{ color: '#10b981' }} />
                  Strengths
                </h3>
                <ul className="insights-list">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="insight-item strength-item">
                      <span className="insight-bullet">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="insights-card weaknesses-card">
                <h3 className="card-title">
                  <AlertCircle size={20} style={{ color: '#f59e0b' }} />
                  Areas for Improvement
                </h3>
                <ul className="insights-list">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="insight-item weakness-item">
                      <span className="insight-bullet">!</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Skills */}
            <div className="missing-skills-card">
              <h3 className="card-title">
                <FileText size={20} />
                Missing Skills
              </h3>
              <div className="skills-tags">
                {analysis.missingSkills.map((skill, index) => (
                  <span key={index} className="skill-tag missing">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="skills-tip">
                💡 Consider adding these skills to your resume or highlighting related experience
              </p>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default AIResumeCheck;
