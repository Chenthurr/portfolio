import { useState, useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';
import { useNavigate } from 'react-router-dom';

// Stable input components defined at module scope — NEVER remounted
function AdminInput({ label, value, onChange, type = 'text' }) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-xs text-cream mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none"
      />
    </div>
  );
}

function AdminTextarea({ label, value, onChange, rows = 4 }) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-xs text-cream mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none resize-vertical"
      />
    </div>
  );
}

function AdminCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 mb-4 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-mustard" />
      <span className="font-mono text-xs text-cream">{label}</span>
    </label>
  );
}

export default function Admin() {
  const data = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Draft states — CRITICAL: local only until explicit save
  const [draftProfile, setDraftProfile] = useState(data.profile);
  const [draftProjects, setDraftProjects] = useState(data.projects);
  const [draftSkills, setDraftSkills] = useState(data.skills);
  const [draftExperience, setDraftExperience] = useState(data.experience);
  const [draftAchievements, setDraftAchievements] = useState(data.achievements);
  const [draftCertifications, setDraftCertifications] = useState(data.certifications);
  const [draftSettings, setDraftSettings] = useState(data.settings);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sync drafts when data changes (initial load)
  useEffect(() => {
    setDraftProfile(data.profile);
    setDraftProjects(data.projects);
    setDraftSkills(data.skills);
    setDraftExperience(data.experience);
    setDraftAchievements(data.achievements);
    setDraftCertifications(data.certifications);
    setDraftSettings(data.settings);
  }, [data.profile, data.projects, data.skills, data.experience, data.achievements, data.certifications, data.settings]);

  const showSave = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPassword === data.adminPassword) {
      data.setIsAdmin(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    data.setIsAdmin(false);
    navigate('/');
  };

  const handleChangePassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      data.setAdminPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      showSave('Password updated');
    } else {
      showSave('Passwords do not match');
    }
  };

  // Profile save
  const saveProfile = () => {
    data.setProfile(draftProfile);
    showSave('Profile saved');
  };

  // Projects save
  const saveProjects = () => {
    data.setProjects(draftProjects);
    showSave('Projects saved');
  };

  const updateProjectField = (id, field, value) => {
    setDraftProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    setDraftProjects((prev) => [
      ...prev,
      {
        id: newId,
        number: String(prev.length + 1).padStart(2, '0'),
        name: 'New Project',
        slug: 'new-project',
        category: 'AI / ML',
        filter: 'ai-ml',
        shortDescription: '',
        fullDescription: '',
        technologies: [],
        metrics: [],
        engineeringHighlights: [],
        architecture: [],
        githubUrl: '',
        liveDemoUrl: '',
        featured: false,
        published: true,
        image: '',
      },
    ]);
  };

  const deleteProject = (id) => {
    if (confirm('Delete this project?')) {
      setDraftProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Skills save
  const saveSkills = () => {
    data.setSkills(draftSkills);
    showSave('Skills saved');
  };

  const updateSkill = (id, field, value) => {
    setDraftSkills((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSkill = () => {
    const newId = `sk-${Date.now()}`;
    setDraftSkills((prev) => [...prev, { id: newId, name: 'New Skill', category: 'LANGUAGES' }]);
  };

  const deleteSkill = (id) => {
    setDraftSkills((prev) => prev.filter((s) => s.id !== id));
  };

  // Experience save
  const saveExperience = () => {
    data.setExperience(draftExperience);
    showSave('Experience saved');
  };

  const updateExp = (id, field, value) => {
    setDraftExperience((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    setDraftExperience((prev) => [
      ...prev,
      { id: newId, role: 'Role', company: 'Company', dates: 'Dates', achievements: [] },
    ]);
  };

  const deleteExperience = (id) => {
    setDraftExperience((prev) => prev.filter((e) => e.id !== id));
  };

  // Achievements save
  const saveAchievements = () => {
    data.setAchievements(draftAchievements);
    showSave('Achievements saved');
  };

  const updateAch = (id, field, value) => {
    setDraftAchievements((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const addAchievement = () => {
    const newId = `ach-${Date.now()}`;
    setDraftAchievements((prev) => [
      ...prev,
      { id: newId, title: 'Title', detail: 'Detail', organizer: 'Organizer' },
    ]);
  };

  const deleteAchievement = (id) => {
    setDraftAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  // Certifications save
  const saveCertifications = () => {
    data.setCertifications(draftCertifications);
    showSave('Certifications saved');
  };

  const updateCert = (id, field, value) => {
    setDraftCertifications((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addCertification = () => {
    const newId = `cert-${Date.now()}`;
    setDraftCertifications((prev) => [
      ...prev,
      { id: newId, title: 'Title', issuer: 'Issuer', year: '2025' },
    ]);
  };

  const deleteCertification = (id) => {
    setDraftCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  // Settings save
  const saveSettings = () => {
    data.setSettings(draftSettings);
    showSave('Settings saved');
  };

  // Portrait handling
  const handlePortraitUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showSave('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      data.setPortraitDataUrl(ev.target.result);
      showSave('Portrait updated');
    };
    reader.readAsDataURL(file);
  };

  const resetPortrait = () => {
    data.setPortraitDataUrl(null);
    showSave('Portrait reset to default');
  };

  // Resume handling
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showSave('Please upload a PDF');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showSave('File too large (max 5MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      data.setResumeDataUrl(ev.target.result);
      showSave('Resume updated');
    };
    reader.readAsDataURL(file);
  };

  // Import / Export
  const exportData = () => {
    const payload = {
      profile: data.profile,
      projects: data.projects,
      skills: data.skills,
      experience: data.experience,
      achievements: data.achievements,
      certifications: data.certifications,
      education: data.education,
      settings: data.settings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chenthurr-portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showSave('Data exported');
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const payload = JSON.parse(ev.target.result);
        if (payload.profile) data.setProfile(payload.profile);
        if (payload.projects) data.setProjects(payload.projects);
        if (payload.skills) data.setSkills(payload.skills);
        if (payload.experience) data.setExperience(payload.experience);
        if (payload.achievements) data.setAchievements(payload.achievements);
        if (payload.certifications) data.setCertifications(payload.certifications);
        if (payload.education) data.setEducation(payload.education);
        if (payload.settings) data.setSettings(payload.settings);
        showSave('Data imported successfully. Refreshing...');
        setTimeout(() => window.location.reload(), 500);
      } catch (err) {
        showSave('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  if (!data.isAdmin) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center pt-20">
        <div className="bg-navy-light border border-cream/10 p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-cream mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-mono text-xs text-cream mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-mono text-xs text-cream mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none"
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm mb-4">{loginError}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-navy text-cream font-semibold hover:bg-mustard hover:text-navy transition-colors"
            >
              LOGIN
            </button>
          </form>
          <p className="text-xs text-cream/50 mt-4">Default password: admin123</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'profile', label: 'Profile' },
    { key: 'about', label: 'About' },
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'resume', label: 'Resume' },
    { key: 'social', label: 'Social Links' },
    { key: 'settings', label: 'Settings' },
    { key: 'password', label: 'Change Password' },
    { key: 'importexport', label: 'Import / Export' },
  ];

  return (
    <div className="min-h-screen bg-navy pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-cream flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="font-bold text-lg mb-6">ADMIN PANEL</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activeTab === tab.key ? 'bg-mustard text-navy font-semibold' : 'hover:bg-navy-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-cream/60 hover:text-cream hover:bg-navy-light transition-colors mt-4"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile tab selector */}
      <div className="md:hidden fixed top-16 left-0 right-0 bg-navy z-40 overflow-x-auto">
        <div className="flex gap-2 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1 text-xs whitespace-nowrap ${
                activeTab === tab.key ? 'bg-mustard text-navy' : 'text-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {saveMessage && (
          <div className="mb-4 px-4 py-2 bg-mustard text-navy font-semibold text-sm">
            {saveMessage}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-navy-light border border-cream/10 p-4">
                <p className="font-mono text-xs text-mustard">PUBLISHED PROJECTS</p>
                <p className="text-2xl font-bold text-cream">{data.projects.filter((p) => p.published).length}</p>
              </div>
              <div className="bg-navy-light border border-cream/10 p-4">
                <p className="font-mono text-xs text-mustard">SKILLS</p>
                <p className="text-2xl font-bold text-cream">{data.skills.length}</p>
              </div>
              <div className="bg-navy-light border border-cream/10 p-4">
                <p className="font-mono text-xs text-mustard">PROFILE STATUS</p>
                <p className="text-2xl font-bold text-cream">ACTIVE</p>
              </div>
              <div className="bg-navy-light border border-cream/10 p-4">
                <p className="font-mono text-xs text-mustard">LAST UPDATED</p>
                <p className="text-sm font-bold text-cream">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Profile Image</h2>
            <div className="bg-navy-light border border-cream/10 p-6 mb-6">
              <img
                src={data.portraitDataUrl || data.profile.portrait}
                alt="Current portrait"
                className="w-40 aspect-[2/3] object-cover object-top border border-cream/10 mb-4"
              />
              <div className="flex gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePortraitUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
                >
                  Replace Image
                </button>
                <button
                  onClick={resetPortrait}
                  className="px-4 py-2 border border-cream text-cream text-sm font-semibold hover:bg-cream hover:text-navy transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">About / Profile</h2>
            <div className="bg-navy-light border border-cream/10 p-6">
              <AdminInput
                label="Name"
                value={draftProfile.name}
                onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
              />
              <AdminInput
                label="Title"
                value={draftProfile.title}
                onChange={(e) => setDraftProfile({ ...draftProfile, title: e.target.value })}
              />
              <AdminInput
                label="Headline"
                value={draftProfile.headline}
                onChange={(e) => setDraftProfile({ ...draftProfile, headline: e.target.value })}
              />
              <AdminTextarea
                label="Subheadline"
                value={draftProfile.subheadline}
                onChange={(e) => setDraftProfile({ ...draftProfile, subheadline: e.target.value })}
              />
              <AdminTextarea
                label="About Text"
                value={draftProfile.about}
                onChange={(e) => setDraftProfile({ ...draftProfile, about: e.target.value })}
                rows={6}
              />
              <AdminInput
                label="Email"
                value={draftProfile.email}
                onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
              />
              <AdminInput
                label="Location"
                value={draftProfile.location}
                onChange={(e) => setDraftProfile({ ...draftProfile, location: e.target.value })}
              />
              <AdminInput
                label="GitHub URL"
                value={draftProfile.github}
                onChange={(e) => setDraftProfile({ ...draftProfile, github: e.target.value })}
              />
              <AdminInput
                label="LinkedIn URL"
                value={draftProfile.linkedin}
                onChange={(e) => setDraftProfile({ ...draftProfile, linkedin: e.target.value })}
              />
              <AdminInput
                label="Role"
                value={draftProfile.role}
                onChange={(e) => setDraftProfile({ ...draftProfile, role: e.target.value })}
              />
              <AdminInput
                label="Education"
                value={draftProfile.education}
                onChange={(e) => setDraftProfile({ ...draftProfile, education: e.target.value })}
              />
              <AdminInput
                label="CGPA"
                value={draftProfile.cgpa}
                onChange={(e) => setDraftProfile({ ...draftProfile, cgpa: e.target.value })}
              />
              <AdminInput
                label="Focus"
                value={draftProfile.focus}
                onChange={(e) => setDraftProfile({ ...draftProfile, focus: e.target.value })}
              />
              <button
                onClick={saveProfile}
                className="px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cream">Projects</h2>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
              >
                + Add Project
              </button>
            </div>
            <div className="space-y-6">
              {draftProjects.map((project) => (
                <div key={project.id} className="bg-navy-light border border-cream/10 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-cream">{project.name || 'Untitled'}</h3>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <AdminInput
                      label="Project Name"
                      value={project.name}
                      onChange={(e) => updateProjectField(project.id, 'name', e.target.value)}
                    />
                    <AdminInput
                      label="Category"
                      value={project.category}
                      onChange={(e) => updateProjectField(project.id, 'category', e.target.value)}
                    />
                    <AdminInput
                      label="Filter Key"
                      value={project.filter}
                      onChange={(e) => updateProjectField(project.id, 'filter', e.target.value)}
                    />
                    <AdminInput
                      label="GitHub URL"
                      value={project.githubUrl}
                      onChange={(e) => updateProjectField(project.id, 'githubUrl', e.target.value)}
                    />
                    <AdminInput
                      label="Live Demo URL"
                      value={project.liveDemoUrl}
                      onChange={(e) => updateProjectField(project.id, 'liveDemoUrl', e.target.value)}
                    />
                    <AdminCheckbox
                      label="Featured"
                      checked={project.featured}
                      onChange={(e) => updateProjectField(project.id, 'featured', e.target.checked)}
                    />
                    <AdminCheckbox
                      label="Published"
                      checked={project.published}
                      onChange={(e) => updateProjectField(project.id, 'published', e.target.checked)}
                    />
                  </div>
                  <AdminTextarea
                    label="Short Description"
                    value={project.shortDescription}
                    onChange={(e) => updateProjectField(project.id, 'shortDescription', e.target.value)}
                  />
                  <AdminTextarea
                    label="Full Description"
                    value={project.fullDescription}
                    onChange={(e) => updateProjectField(project.id, 'fullDescription', e.target.value)}
                    rows={5}
                  />
                  <AdminInput
                    label="Technologies (comma separated)"
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProjectField(project.id, 'technologies', e.target.value.split(',').map((s) => s.trim()))
                    }
                  />
                  <AdminTextarea
                    label="Engineering Highlights (one per line)"
                    value={project.engineeringHighlights.join('\n')}
                    onChange={(e) =>
                      updateProjectField(
                        project.id,
                        'engineeringHighlights',
                        e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    rows={4}
                  />
                  <AdminTextarea
                    label="Architecture Steps (one per line)"
                    value={project.architecture.join('\n')}
                    onChange={(e) =>
                      updateProjectField(
                        project.id,
                        'architecture',
                        e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    rows={4}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={saveProjects}
              className="mt-6 px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
            >
              Save All Projects
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cream">Skills</h2>
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
              >
                + Add Skill
              </button>
            </div>
            <div className="space-y-3">
              {draftSkills.map((skill) => (
                <div key={skill.id} className="bg-navy-light border border-cream/10 p-4 flex gap-4 items-end">
                  <div className="flex-1">
                    <AdminInput
                      label="Skill Name"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <AdminInput
                      label="Category"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="px-3 py-2 text-red-600 text-sm hover:underline mb-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={saveSkills}
              className="mt-6 px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
            >
              Save Skills
            </button>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cream">Experience</h2>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
              >
                + Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {draftExperience.map((exp) => (
                <div key={exp.id} className="bg-navy-light border border-cream/10 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-cream">{exp.role} at {exp.company}</h3>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <AdminInput
                      label="Role"
                      value={exp.role}
                      onChange={(e) => updateExp(exp.id, 'role', e.target.value)}
                    />
                    <AdminInput
                      label="Company"
                      value={exp.company}
                      onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
                    />
                    <AdminInput
                      label="Dates"
                      value={exp.dates}
                      onChange={(e) => updateExp(exp.id, 'dates', e.target.value)}
                    />
                  </div>
                  <AdminTextarea
                    label="Achievements (one per line)"
                    value={exp.achievements.join('\n')}
                    onChange={(e) =>
                      updateExp(exp.id, 'achievements', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
                    }
                    rows={5}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={saveExperience}
              className="mt-6 px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
            >
              Save Experience
            </button>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cream">Achievements</h2>
              <button
                onClick={addAchievement}
                className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
              >
                + Add Achievement
              </button>
            </div>
            <div className="space-y-4">
              {draftAchievements.map((ach) => (
                <div key={ach.id} className="bg-navy-light border border-cream/10 p-4 flex gap-4 items-end">
                  <div className="flex-1">
                    <AdminInput
                      label="Title"
                      value={ach.title}
                      onChange={(e) => updateAch(ach.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <AdminInput
                      label="Detail"
                      value={ach.detail}
                      onChange={(e) => updateAch(ach.id, 'detail', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <AdminInput
                      label="Organizer"
                      value={ach.organizer}
                      onChange={(e) => updateAch(ach.id, 'organizer', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => deleteAchievement(ach.id)}
                    className="px-3 py-2 text-red-600 text-sm hover:underline mb-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={saveAchievements}
              className="mt-6 px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
            >
              Save Achievements
            </button>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cream">Certifications</h2>
              <button
                onClick={addCertification}
                className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
              >
                + Add Certification
              </button>
            </div>
            <div className="space-y-4">
              {draftCertifications.map((cert) => (
                <div key={cert.id} className="bg-navy-light border border-cream/10 p-4 flex gap-4 items-end">
                  <div className="flex-1">
                    <AdminInput
                      label="Title"
                      value={cert.title}
                      onChange={(e) => updateCert(cert.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <AdminInput
                      label="Issuer"
                      value={cert.issuer}
                      onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <AdminInput
                      label="Year"
                      value={cert.year}
                      onChange={(e) => updateCert(cert.id, 'year', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="px-3 py-2 text-red-600 text-sm hover:underline mb-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={saveCertifications}
              className="mt-6 px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
            >
              Save Certifications
            </button>
          </div>
        )}

        {activeTab === 'resume' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Resume Management</h2>
            <div className="bg-navy-light border border-cream/10 p-6">
              <p className="text-sm text-cream/70 mb-4">
                Current resume: {data.resumeDataUrl ? 'Custom PDF upload (inline preview enabled)' : 'Google Drive link (external)'}
              </p>
              <p className="text-xs text-cream/40 mb-4 font-mono break-all">
                Drive link: {data.settings.resumeDriveUrl}
              </p>
              <input
                type="file"
                accept=".pdf"
                ref={resumeInputRef}
                onChange={handleResumeUpload}
                className="hidden"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => resumeInputRef.current?.click()}
                  className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
                >
                  Upload New PDF
                </button>
                <a
                  href={data.resumeDataUrl || data.settings.resumeDriveUrl}
                  {...(data.resumeDataUrl ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="px-4 py-2 border border-cream text-cream text-sm font-semibold hover:bg-cream hover:text-navy transition-colors"
                >
                  {data.resumeDataUrl ? 'Download Current' : 'Open Drive Link'}
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Social Links</h2>
            <div className="bg-navy-light border border-cream/10 p-6">
              <AdminInput
                label="GitHub"
                value={draftProfile.github}
                onChange={(e) => setDraftProfile({ ...draftProfile, github: e.target.value })}
              />
              <AdminInput
                label="LinkedIn"
                value={draftProfile.linkedin}
                onChange={(e) => setDraftProfile({ ...draftProfile, linkedin: e.target.value })}
              />
              <AdminInput
                label="Email"
                value={draftProfile.email}
                onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
              />
              <button
                onClick={saveProfile}
                className="px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
              >
                Save Social Links
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Site Settings</h2>
            <div className="bg-navy-light border border-cream/10 p-6">
              <AdminInput
                label="Site Title"
                value={draftSettings.siteTitle}
                onChange={(e) => setDraftSettings({ ...draftSettings, siteTitle: e.target.value })}
              />
              <AdminTextarea
                label="Site Description"
                value={draftSettings.siteDescription}
                onChange={(e) => setDraftSettings({ ...draftSettings, siteDescription: e.target.value })}
              />
              <AdminInput
                label="Footer Text"
                value={draftSettings.footerText}
                onChange={(e) => setDraftSettings({ ...draftSettings, footerText: e.target.value })}
              />
              <AdminInput
                label="Resume Google Drive Link"
                value={draftSettings.resumeDriveUrl}
                onChange={(e) => setDraftSettings({ ...draftSettings, resumeDriveUrl: e.target.value })}
              />
              <button
                onClick={saveSettings}
                className="px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Change Password</h2>
            <div className="bg-navy-light border border-cream/10 p-6 max-w-md">
              <div className="mb-4">
                <label className="block font-mono text-xs text-cream mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block font-mono text-xs text-cream mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-light border border-cream/20 text-cream focus:border-mustard focus:outline-none"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="px-6 py-2 bg-mustard text-navy font-semibold hover:bg-mustard-dark transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {activeTab === 'importexport' && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">Import / Export</h2>
            <div className="bg-navy-light border border-cream/10 p-6">
              <p className="text-sm text-cream/70 mb-4">
                Export all portfolio data to a JSON file for backup, or import a previously exported file.
              </p>
              <div className="flex gap-3 mb-6">
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-navy text-cream text-sm font-semibold hover:bg-mustard hover:text-navy transition-colors"
                >
                  Export Data
                </button>
              </div>
              <div className="border-t border-cream/10 pt-6">
                <p className="font-mono text-xs text-cream mb-2">Import Data</p>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="block w-full text-sm text-cream file:mr-4 file:py-2 file:px-4 file:bg-navy file:text-cream file:border-0 file:text-sm file:font-semibold hover:file:bg-mustard hover:file:text-navy"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
