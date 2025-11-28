import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Upload, Save } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience in building web applications.',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
        experience: [
            {
                id: 1,
                title: 'Senior Developer',
                company: 'TechCorp',
                duration: '2021 - Present',
                description: 'Leading development of enterprise applications',
            },
            {
                id: 2,
                title: 'Full Stack Developer',
                company: 'StartupX',
                duration: '2019 - 2021',
                description: 'Built and maintained multiple web applications',
            },
        ],
        education: [
            {
                id: 1,
                degree: 'Bachelor of Computer Science',
                school: 'University of California',
                year: '2015 - 2019',
            },
        ],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [newSkill, setNewSkill] = useState('');

    const handleSave = () => {
        setIsEditing(false);
        // Here you would save to backend
        console.log('Saving profile:', profile);
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            setProfile({
                ...profile,
                skills: [...profile.skills, newSkill.trim()],
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter(skill => skill !== skillToRemove),
        });
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1 className="profile-title">My Profile</h1>
                <button
                    className="edit-btn"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                    {isEditing ? (
                        <>
                            <Save size={20} />
                            Save Changes
                        </>
                    ) : (
                        'Edit Profile'
                    )}
                </button>
            </div>

            {/* Profile Card */}
            <div className="profile-card">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        {profile.name.charAt(0)}
                    </div>
                    {isEditing && (
                        <button className="upload-avatar-btn">
                            <Upload size={16} />
                            Change Photo
                        </button>
                    )}
                </div>

                <div className="profile-info-grid">
                    <div className="info-group">
                        <label className="info-label">
                            <User size={18} />
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="info-input"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.name}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label className="info-label">
                            <Mail size={18} />
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                className="info-input"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.email}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label className="info-label">
                            <Phone size={18} />
                            Phone
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                className="info-input"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.phone}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label className="info-label">
                            <MapPin size={18} />
                            Location
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="info-input"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.location}</p>
                        )}
                    </div>

                    <div className="info-group full-width">
                        <label className="info-label">
                            <Briefcase size={18} />
                            Professional Title
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="info-input"
                                value={profile.title}
                                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.title}</p>
                        )}
                    </div>

                    <div className="info-group full-width">
                        <label className="info-label">Bio</label>
                        {isEditing ? (
                            <textarea
                                className="info-textarea"
                                rows="4"
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            />
                        ) : (
                            <p className="info-value">{profile.bio}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="section-card">
                <h2 className="section-title">Skills</h2>
                <div className="skills-container">
                    {profile.skills.map((skill, index) => (
                        <div key={index} className="skill-badge">
                            {skill}
                            {isEditing && (
                                <button
                                    className="remove-skill-btn"
                                    onClick={() => removeSkill(skill)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    {isEditing && (
                        <div className="add-skill-form">
                            <input
                                type="text"
                                className="skill-input"
                                placeholder="Add skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            />
                            <button className="add-skill-btn" onClick={addSkill}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Experience Section */}
            <div className="section-card">
                <h2 className="section-title">Experience</h2>
                <div className="experience-list">
                    {profile.experience.map((exp) => (
                        <div key={exp.id} className="experience-item">
                            <div className="experience-dot"></div>
                            <div className="experience-content">
                                <h3 className="experience-title">{exp.title}</h3>
                                <p className="experience-company">{exp.company}</p>
                                <p className="experience-duration">{exp.duration}</p>
                                <p className="experience-description">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <div className="section-card">
                <h2 className="section-title">Education</h2>
                <div className="education-list">
                    {profile.education.map((edu) => (
                        <div key={edu.id} className="education-item">
                            <div className="education-icon">🎓</div>
                            <div className="education-content">
                                <h3 className="education-degree">{edu.degree}</h3>
                                <p className="education-school">{edu.school}</p>
                                <p className="education-year">{edu.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resume Section */}
            <div className="section-card">
                <h2 className="section-title">Resume</h2>
                <div className="resume-upload">
                    <div className="resume-info">
                        <Upload size={24} />
                        <div>
                            <p className="resume-text">Upload your resume</p>
                            <p className="resume-subtext">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                    </div>
                    <button className="upload-resume-btn">Choose File</button>
                </div>
            </div>

            <style jsx>{`
        .profile-page {
          padding: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .profile-title {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .edit-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .profile-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .profile-avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 16px;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
        }

        .upload-avatar-btn {
          padding: 8px 16px;
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .upload-avatar-btn:hover {
          background: #667eea;
          color: white;
        }

        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .profile-info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-group.full-width {
          grid-column: 1 / -1;
        }

        .info-label {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .info-value {
          font-size: 16px;
          color: #1a202c;
          font-weight: 500;
        }

        .info-input,
        .info-textarea {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .info-input:focus,
        .info-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .section-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 24px;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill-badge {
          padding: 10px 18px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          color: #667eea;
          border-radius: 10px;
          font-weight: 600;
          border: 2px solid rgba(102, 126, 234, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remove-skill-btn {
          background: transparent;
          border: none;
          color: #667eea;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .remove-skill-btn:hover {
          background: rgba(102, 126, 234, 0.2);
        }

        .add-skill-form {
          display: flex;
          gap: 8px;
        }

        .skill-input {
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
        }

        .skill-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .add-skill-btn {
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-skill-btn:hover {
          background: #764ba2;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .experience-item {
          display: flex;
          gap: 20px;
          position: relative;
        }

        .experience-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 40px;
          bottom: -32px;
          width: 2px;
          background: linear-gradient(180deg, #667eea 0%, rgba(102, 126, 234, 0.2) 100%);
        }

        .experience-dot {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }

        .experience-content {
          flex: 1;
        }

        .experience-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .experience-company {
          font-size: 16px;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .experience-duration {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .experience-description {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.6;
        }

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .education-item {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-radius: 12px;
          border: 2px solid rgba(102, 126, 234, 0.1);
        }

        .education-icon {
          font-size: 32px;
        }

        .education-content {
          flex: 1;
        }

        .education-degree {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .education-school {
          font-size: 16px;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .education-year {
          font-size: 14px;
          color: #6b7280;
        }

        .resume-upload {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border: 2px dashed rgba(102, 126, 234, 0.3);
          border-radius: 12px;
        }

        .resume-info {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #667eea;
        }

        .resume-text {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
        }

        .resume-subtext {
          font-size: 14px;
          color: #6b7280;
        }

        .upload-resume-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .upload-resume-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
      `}</style>
        </div>
    );
};

export default Profile;
