import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';

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

            <style jsx>{`
        .ai-analyze-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ai-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .ai-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .ai-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .upload-section {
          background: white;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 48px 32px;
          text-align: center;
          background: #f9fafb;
          transition: all 0.3s;
          cursor: pointer;
        }

        .upload-area:hover {
          border-color: #a855f7;
          background: #faf5ff;
        }

        .upload-icon {
          color: #a855f7;
          margin: 0 auto 16px;
        }

        .upload-text {
          font-size: 16px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .upload-hint {
          font-size: 14px;
          color: #9ca3af;
        }

        .analyze-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 16px;
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }

        .analyze-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .spinner {
          color: #a855f7;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-text {
          margin-top: 16px;
          color: #718096;
          font-weight: 500;
        }

        .results-section {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .results-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
        }

        .results-count {
          font-size: 14px;
          color: #718096;
        }

        .candidate-result {
          background: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 16px;
          border-left: 4px solid #a855f7;
        }

        .candidate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .candidate-name {
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
          margin: 0;
        }

        .match-score {
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
        }

        .score-high {
          background: #d1fae5;
          color: #065f46;
        }

        .score-medium {
          background: #fef3c7;
          color: #92400e;
        }

        .score-low {
          background: #fee2e2;
          color: #991b1b;
        }

        .analysis-text {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .skills-section {
          margin-bottom: 16px;
        }

        .skills-label {
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .skills-match {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .skill-matched {
          background: #d1fae5;
          color: #065f46;
        }

        .skill-missing {
          background: #fee2e2;
          color: #991b1b;
        }

        .candidate-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .action-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-view {
          background: #4f46e5;
          color: white;
        }

        .btn-view:hover {
          background: #4338ca;
        }

        .btn-interview {
          background: #10b981;
          color: white;
        }

        .btn-interview:hover {
          background: #059669;
        }

        @media (max-width: 768px) {
          .candidate-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .candidate-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default AIAnalyzeCandidates;
