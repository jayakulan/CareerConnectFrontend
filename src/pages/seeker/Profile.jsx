import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Upload, Save, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);

  // New state for adding experience/education
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', description: '' });
  const [newEducation, setNewEducation] = useState({ degree: '', school: '', year: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };

          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, config);

          setProfile({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            title: data.title || 'Job Seeker',
            bio: data.bio || 'No bio yet.',
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || [],
          });
        }
      } catch (error) {
        console.error("Error loading profile", error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        profile,
        config
      );

      // Update localStorage with new data
      const updatedUser = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));

      setIsEditing(false);
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
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

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setProfile({
        ...profile,
        experience: [...profile.experience, { ...newExperience, id: Date.now() }]
      });
      setNewExperience({ title: '', company: '', duration: '', description: '' });
    }
  };

  const removeExperience = (id) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.school) {
      setProfile({
        ...profile,
        education: [...profile.education, { ...newEducation, id: Date.now() }]
      });
      setNewEducation({ degree: '', school: '', year: '' });
    }
  };

  const removeEducation = (id) => {
    setProfile({
      ...profile,
      education: profile.education.filter(edu => edu.id !== id)
    });
  };

  if (loading) return <div className="profile-page"><div>Loading...</div></div>;

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
            {profile.name.charAt(0) || 'U'}
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
              <p className="info-value">{profile.phone || 'Not provided'}</p>
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
              <p className="info-value">{profile.location || 'Not provided'}</p>
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
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="experience-list">
          {profile.experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-content">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  {isEditing && (
                    <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="experience-duration">{exp.duration}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="add-item-form">
            <h3 className="text-lg font-semibold mb-3">Add Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Job Title"
                className="info-input"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Company"
                className="info-input"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration (e.g. 2020 - 2022)"
                className="info-input"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                className="info-input"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              />
            </div>
            <button className="add-skill-btn flex items-center gap-2" onClick={addExperience}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-list">
          {profile.education.map((edu) => (
            <div key={edu.id} className="education-item">
              <div className="education-icon">🎓</div>
              <div className="education-content">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-school">{edu.school}</p>
                  </div>
                  {isEditing && (
                    <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="education-year">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="add-item-form">
            <h3 className="text-lg font-semibold mb-3">Add Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Degree"
                className="info-input"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              />
              <input
                type="text"
                placeholder="School/University"
                className="info-input"
                value={newEducation.school}
                onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
              />
              <input
                type="text"
                placeholder="Year (e.g. 2018 - 2022)"
                className="info-input"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              />
            </div>
            <button className="add-skill-btn flex items-center gap-2" onClick={addEducation}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
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
    </div>
  );
};

export default Profile;
