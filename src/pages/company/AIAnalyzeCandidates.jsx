import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import './AIAnalyzeCandidates.css';

const AIAnalyzeCandidates = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setResults([
        {
          id: 1,
          name: 'Sarah Johnson',
          score: 95,
          analysis: 'Excellent match with strong technical skills in React, Node.js, and MongoDB. 5+ years of relevant experience in full-stack development. Leadership experience and proven track record of delivering complex projects.',
          matchedSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
          missingSkills: ['GraphQL']
        },
        {
          id: 2,
          name: 'Michael Chen',
          score: 78,
          analysis: 'Good candidate with solid backend experience. Strong knowledge of Node.js and database systems. Some frontend experience but could benefit from more React expertise.',
          matchedSkills: ['Node.js', 'MongoDB', 'JavaScript'],
          missingSkills: ['React', 'TypeScript', 'GraphQL']
        },
        {
          id: 3,
          name: 'Emily Davis',
          score: 62,
          analysis: 'Moderate match. Has foundational skills but lacks experience with the full tech stack. Would require training in several key areas.',
          matchedSkills: ['JavaScript', 'React'],
          missingSkills: ['Node.js', 'MongoDB', 'TypeScript', 'GraphQL']
        }
      ]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="ai-analyze-container">
      <div className="ai-header">
        <h1 className="ai-title">🤖 AI-Powered Candidate Analysis</h1>
        <p className="ai-subtitle">Upload resumes and let AI find the best matches for your job posting</p>
      </div>

      <div className="upload-section">
        <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
          <Upload size={48} className="upload-icon" />
          <p className="upload-text">
            {selectedFile ? selectedFile.name : 'Click to upload resumes'}
          </p>
          <p className="upload-hint">Supports PDF, DOC, DOCX (Max 10MB)</p>
          <input
            id="fileInput"
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Candidates with AI'}
        </button>
      </div>

      {isAnalyzing && (
        <div className="loading-spinner">
          <Loader size={48} className="spinner" />
          <p className="loading-text">AI is analyzing candidates...</p>
        </div>
      )}

      {results && !isAnalyzing && (
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">Analysis Results</h2>
            <span className="results-count">{results.length} candidates analyzed</span>
          </div>

          {results.map((candidate) => (
            <div key={candidate.id} className="candidate-result">
              <div className="candidate-header">
                <h3 className="candidate-name">{candidate.name}</h3>
                <span className={`match-score ${getScoreClass(candidate.score)}`}>
                  {candidate.score}% Match
                </span>
              </div>

              <p className="analysis-text">{candidate.analysis}</p>

              <div className="skills-section">
                <p className="skills-label">Matched Skills:</p>
                <div className="skills-match">
                  {candidate.matchedSkills.map((skill, index) => (
                    <span key={index} className="skill-tag skill-matched">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {candidate.missingSkills.length > 0 && (
                <div className="skills-section">
                  <p className="skills-label">Missing Skills:</p>
                  <div className="skills-match">
                    {candidate.missingSkills.map((skill, index) => (
                      <span key={index} className="skill-tag skill-missing">
                        ✕ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="candidate-actions">
                <button className="action-btn btn-view">View Full Profile</button>
                <button className="action-btn btn-interview">Schedule Interview</button>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default AIAnalyzeCandidates;
