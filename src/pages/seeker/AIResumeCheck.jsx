import { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

            <style jsx>{`
        .ai-resume-page {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 40px;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          color: #667eea;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .page-subtitle {
          font-size: 18px;
          color: #6b7280;
        }

        .analyzer-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 1024px) {
          .analyzer-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .upload-card,
        .job-desc-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .file-upload-area {
          position: relative;
        }

        .file-input {
          display: none;
        }

        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          border: 3px dashed rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-upload-label:hover {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }

        .upload-icon {
          color: #667eea;
          margin-bottom: 16px;
        }

        .upload-text {
          text-align: center;
        }

        .upload-main-text {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .upload-sub-text {
          font-size: 14px;
          color: #6b7280;
        }

        .job-desc-textarea {
          width: 100%;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .job-desc-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .analyze-btn {
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .analyze-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .results-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .results-header {
          margin-bottom: 8px;
        }

        .results-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a202c;
        }

        .match-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .match-score-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        @media (min-width: 640px) {
          .match-score-container {
            flex-direction: row;
            justify-content: space-around;
          }
        }

        .match-circle-wrapper {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .match-circle-svg {
          width: 100%;
          height: 100%;
        }

        .match-circle-progress {
          transition: stroke-dasharray 1s ease-out;
        }

        .match-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .match-number {
          display: block;
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .match-label {
          display: block;
          font-size: 16px;
          color: #6b7280;
          font-weight: 600;
        }

        .recommendation-box {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-radius: 12px;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .recommendation-label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .recommendation-value {
          font-size: 24px;
          font-weight: 800;
          color: #1a202c;
        }

        .summary-card,
        .missing-skills-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .summary-text {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.7;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .insights-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .insights-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .insights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .insight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.6;
        }

        .insight-bullet {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-weight: 700;
          flex-shrink: 0;
        }

        .strength-item {
          color: #065f46;
        }

        .strength-item .insight-bullet {
          background: #d1fae5;
          color: #10b981;
        }

        .weakness-item {
          color: #92400e;
        }

        .weakness-item .insight-bullet {
          background: #fef3c7;
          color: #f59e0b;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }

        .skill-tag {
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
          color: #dc2626;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid rgba(239, 68, 68, 0.2);
        }

        .skills-tip {
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }
      `}</style>
        </div>
    );
};

export default AIResumeCheck;
