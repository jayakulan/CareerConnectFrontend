import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Sparkles, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './AIAnalyzeCandidates.css';

const AIAnalyzeCandidates = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if ((!resumeText && !selectedFile) || !jobDescription) {
      alert('Please provide a candidate resume (upload or text) and job description');
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);

    const formData = new FormData();
    if (selectedFile) formData.append('resumeFile', selectedFile);
    if (resumeText) formData.append('resumeText', resumeText);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      let analysisData = response.data.analysis;

      if (typeof analysisData === 'string') {
        const cleanJson = analysisData.replace(/```json|```/g, "");
        analysisData = JSON.parse(cleanJson);
      }

      const matchScore = analysisData.match_score || 0;
      const derivedRecommendation = matchScore >= 80 ? 'Hire' : matchScore >= 60 ? 'Interview' : 'Reject';

      setAnalysis({
        matchPercentage: matchScore,
        recommendation: derivedRecommendation,
        summary: analysisData.verdict || "Analysis complete.",
        strengths: analysisData.strengths || [],
        weaknesses: analysisData.weaknesses || [],
        missingSkills: analysisData.missing_keywords || []
      });
    } catch (error) {
      console.error('Error analyzing resume:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setAnalyzing(false);
    }
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
            <h1 className="page-title">AI Candidate Analyzer</h1>
            <p className="page-subtitle">Analyze candidate resumes against your job requirements with AI</p>
          </div>
        </div>
      </div>

      <div className="analyzer-container">
        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-card">
            <h2 className="section-title">Candidate Resume</h2>

            {/* File Upload UI */}
            <div
              className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume-upload"
                className="file-input"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload" className="file-upload-label">
                <Upload size={48} className="upload-icon" />
                <div className="upload-text">
                  <p className="upload-main-text">
                    {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="upload-sub-text">PDF (Max 5MB)</p>
                </div>
              </label>
            </div>

            <div style={{ textAlign: 'center', margin: '10px 0', color: '#6b7280' }}>OR</div>

            <textarea
              className="job-desc-textarea"
              rows="6"
              placeholder="Paste candidate resume text here..."
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setSelectedFile(null);
              }}
            />
          </div>

          <div className="job-desc-card">
            <h2 className="section-title">Job Requirements</h2>
            <textarea
              className="job-desc-textarea"
              rows="10"
              placeholder="Paste your job description and requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={analyzing || (!resumeText && !selectedFile) || !jobDescription}
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
                💡 These skills are required but not found in the candidate's resume
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyzeCandidates;
