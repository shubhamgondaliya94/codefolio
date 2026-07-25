import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from '../components/DarkModeToggle';
import API from '../services/api';
import Toast from '../components/Toast';
import { PortfolioRenderer } from '../themes';
import {
  User,
  Briefcase,
  Mail,
  Plus,
  Trash2,
  Upload,
  Globe,
  Monitor,
  Phone,
  MapPin,
  Save,
  Rocket,
  LogOut,
  ExternalLink,
  Copy,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { logout } = useAuth();
  
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    role: '',
    github: '',
    linkedin: '',
    email: '',
    skills: [],
    resumeURL: '',
    profileImage: '',
    projects: [],
    uploadedPPT: '',
    selectedTheme: 'Modern Developer',
    socialLinks: { twitter: '', facebook: '', instagram: '', youtube: '' },
    contactDetails: { phone: '', address: '' },
  });

  // UI state
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // { profile: false, resume: false, ppt: false, projectImage: { index: false } }
  const [toast, setToast] = useState(null); // { message, type }
  const [skillInput, setSkillInput] = useState('');
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop | mobile

  // Load dashboard details on mount
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get('/api/dashboard');
        if (response.data && response.data.success) {
          const fetched = response.data.data;
          setFormData({
            fullName: fetched.fullName || '',
            bio: fetched.bio || '',
            role: fetched.role || '',
            github: fetched.github || '',
            linkedin: fetched.linkedin || '',
            email: fetched.email || '',
            skills: fetched.skills || [],
            resumeURL: fetched.resumeURL || '',
            profileImage: fetched.profileImage || '',
            projects: fetched.projects || [],
            uploadedPPT: fetched.uploadedPPT || '',
            selectedTheme: fetched.selectedTheme || 'Modern Developer',
            socialLinks: fetched.socialLinks || { twitter: '', facebook: '', instagram: '', youtube: '' },
            contactDetails: fetched.contactDetails || { phone: '', address: '' },
          });
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
        setToast({ message: 'Failed to load portfolio details.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedInputChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value,
      },
    });
  };

  // Upload handler helper
  const handleFileUpload = async (e, endpoint, fieldName, projectIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set loading state
    if (projectIndex !== null) {
      setUploadProgress({ ...uploadProgress, [`project-${projectIndex}`]: true });
    } else {
      setUploadProgress({ ...uploadProgress, [fieldName]: true });
    }

    const uploadForm = new FormData();
    uploadForm.append(fieldName, file);

    try {
      const response = await API.post(`/api/dashboard/upload/${endpoint}`, uploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.success) {
        const fileUrl = response.data.url;

        if (projectIndex !== null) {
          // Update specific project image URL
          const updatedProjects = [...formData.projects];
          updatedProjects[projectIndex].image = fileUrl;
          setFormData({ ...formData, projects: updatedProjects });
        } else {
          // Update generic field URL
          setFormData({ ...formData, [fieldName]: fileUrl });
        }
        setToast({ message: `${file.name} uploaded successfully!`, type: 'success' });
      }
    } catch (error) {
      console.error('File upload error:', error);
      setToast({
        message: error.response?.data?.message || 'File upload failed. Check file type and size limit.',
        type: 'error',
      });
    } finally {
      if (projectIndex !== null) {
        setUploadProgress({ ...uploadProgress, [`project-${projectIndex}`]: false });
      } else {
        setUploadProgress({ ...uploadProgress, [fieldName]: false });
      }
    }
  };

  // Skill tags operations
  const addSkill = (e) => {
    e.preventDefault();
    const skill = skillInput.trim();
    if (!skill) return;
    if (formData.skills.includes(skill)) {
      setToast({ message: 'Skill already exists!', type: 'info' });
      return;
    }
    setFormData({ ...formData, skills: [...formData.skills, skill] });
    setSkillInput('');
  };

  const removeSkill = (indexToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, idx) => idx !== indexToRemove),
    });
  };

  // Project list operations
  const addProject = () => {
    const newProject = { title: 'New Project', description: 'Describe your project case study', liveLink: '', githubLink: '', image: '' };
    setFormData({ ...formData, projects: [...formData.projects, newProject] });
  };

  const removeProject = (indexToRemove) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const updateProjectField = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Save changes handler
  const saveDashboard = async () => {
    setSaveLoading(true);
    try {
      const response = await API.put('/api/dashboard', formData);
      if (response.data && response.data.success) {
        setToast({ message: 'Changes saved successfully to database.', type: 'success' });
      }
    } catch (error) {
      console.error('Error saving dashboard:', error);
      setToast({ message: error.response?.data?.message || 'Failed to save changes.', type: 'error' });
    } finally {
      setSaveLoading(false);
    }
  };

  // Publish handler
  const publishPortfolio = async () => {
    setSaveLoading(true);
    try {
      const response = await API.put('/api/dashboard', formData);
      if (response.data && response.data.success) {
        // Trigger celebratory confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        setToast({ message: 'Portfolio published live!', type: 'success' });
      }
    } catch (error) {
      console.error('Publish error:', error);
      setToast({ message: 'Failed to publish portfolio.', type: 'error' });
    } finally {
      setSaveLoading(false);
    }
  };

  // Link utilities
  const getPublicUrl = () => {
    return `${window.location.origin}/${formData.username || ''}`;
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(getPublicUrl());
    setToast({ message: 'Portfolio link copied to clipboard!', type: 'success' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-noise bg-background flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noise bg-background text-text flex flex-col font-sans">
      {/* Top dashboard nav */}
      <nav className="brutalist-card border-b border-muted py-4 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-extrabold text-lg text-white">
            <span className="bg-accent text-black border border-accent px-2 py-1 rounded-lg text-sm">CF</span>
            <span>CodeFolio</span>
          </div>
          <span className="text-muted">|</span>
          <span className="text-xs font-semibold text-muted bg-surface px-3 py-1 rounded-lg">
            Dashboard Panel
          </span>
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={saveDashboard}
            disabled={saveLoading}
            className="flex items-center gap-1.5 px-4 py-2 bg-surface border border-slate-800 hover:border-slate-700 text-text rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={publishPortfolio}
            disabled={saveLoading}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent text-black hover:bg-[#ffffff] hover:text-black text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
          <button
            onClick={logout}
            className="p-2 hover:bg-white/5 hover:text-rose-400 rounded-xl transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Split builder content area */}
      <div className="flex-1 grid lg:grid-cols-12 overflow-hidden h-[calc(100vh-69px)]">
        
        {/* Left Side: Forms Editor */}
        <aside className="lg:col-span-5 border-r border-muted overflow-y-auto p-6 space-y-6">
          {/* Tabs header */}
          <div className="flex border-b border-muted pb-2 scrollbar-none overflow-x-auto gap-2">
            {['profile', 'projects', 'skills_theme', 'publish'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-accent text-black border border-accent/15 border border-accent text-accent'
                    : 'text-muted hover:text-text'
                }`}
              >
                {tab.replace('_', ' & ')}
              </button>
            ))}
          </div>

          {/* TAB 1: PROFILE INFORMATION */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Personal Identity</h3>

              <div className="flex items-center gap-6 p-4 bg-surface/30 border border-slate-900 rounded-2xl">
                <div className="relative w-20 h-20 bg-surface rounded-2xl border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center text-muted">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                  {uploadProgress.profileImage && (
                    <div className="absolute inset-0 bg-noise bg-background/70 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted font-semibold">Profile Photograph</span>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-surface hover:bg-slate-705 border border-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors max-w-max">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'profile', 'profileImage')}
                        className="hidden"
                      />
                    </label>
                    {formData.profileImage && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profileImage: '' })}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-surface/50 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-text"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Role Title
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-surface/50 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-text"
                  placeholder="e.g. Full Stack Architect"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Personal Biography (Bio)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-surface/50 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all resize-none text-text"
                  placeholder="Write a brief overview describing your expertise..."
                ></textarea>
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-4 border-t border-muted">Socials & Contact Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Contact Email (Visible on page)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface/50 border border-slate-850 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
                      placeholder="hello@john.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
                    <input
                      type="text"
                      value={formData.contactDetails.phone}
                      onChange={(e) => handleNestedInputChange('contactDetails', 'phone', e.target.value)}
                      className="w-full bg-surface/50 border border-slate-850 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
                      placeholder="+1 555-0199"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    GitHub Profile URL
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full bg-surface/50 border border-slate-850 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full bg-surface/50 border border-slate-850 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Office Location (Address)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
                  <input
                    type="text"
                    value={formData.contactDetails.address}
                    onChange={(e) => handleNestedInputChange('contactDetails', 'address', e.target.value)}
                    className="w-full bg-surface/50 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS SECTION */}
          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Featured Projects</h3>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-black/10 border border-accent text-accent rounded-xl text-xs font-bold transition-all hover:bg-accent text-black border border-accent/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {formData.projects.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-850 rounded-3xl space-y-2 text-muted">
                  <FileSpreadsheet className="w-8 h-8 mx-auto stroke-1" />
                  <p className="text-xs">No project cards configured yet. Let's create one!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-5 bg-surface/20 border border-slate-900 rounded-2xl relative space-y-4 group/card"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-accent uppercase tracking-widest">
                          Project #{index + 1}
                        </span>
                        <button
                          onClick={() => removeProject(index)}
                          className="p-1 text-muted hover:text-rose-455 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProjectField(index, 'title', e.target.value)}
                            className="w-full bg-noise bg-background/50 border border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                            placeholder="Project title"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                            Live Demo Link
                          </label>
                          <input
                            type="url"
                            value={project.liveLink}
                            onChange={(e) => updateProjectField(index, 'liveLink', e.target.value)}
                            className="w-full bg-noise bg-background/50 border border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                          Description
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                          rows="2"
                          className="w-full bg-noise bg-background/50 border border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent resize-none"
                          placeholder="Brief case study summary..."
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center pt-2">
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                            GitHub Repository
                          </label>
                          <input
                            type="url"
                            value={project.githubLink}
                            onChange={(e) => updateProjectField(index, 'githubLink', e.target.value)}
                            className="w-full bg-noise bg-background/50 border border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                            placeholder="GitHub Link"
                          />
                        </div>

                        <div>
                          <span className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                            Screenshot
                          </span>
                          <label className="flex items-center gap-1.5 px-3 py-2 bg-surface border border-slate-800 hover:border-slate-700 text-slate-350 text-xs font-medium rounded-xl cursor-pointer transition-colors max-w-max">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{project.image ? 'Replace Image' : 'Add Image'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'project-image', 'projectImage', index)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {project.image && (
                        <div className="w-full aspect-video border border-slate-850 rounded-xl overflow-hidden relative">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SKILLS AND THEMES */}
          {activeTab === 'skills_theme' && (
            <div className="space-y-6 animate-fade-in">
              {/* Skills Area */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Expertise & Skills</h3>
                <form onSubmit={addSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 bg-surface/50 border border-slate-850 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent"
                    placeholder="Add e.g. TypeScript, AWS"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-accent text-black hover:bg-[#ffffff] hover:text-black text-white rounded-xl transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface/50 border border-slate-850 text-slate-350 rounded-lg text-xs font-semibold cursor-default"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-muted hover:text-rose-455 transition-colors font-bold text-[10px]"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Theme selection */}
              <div className="space-y-4 border-t border-muted pt-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Choose Theme Preset</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Modern Developer',
                    'Minimal',
                    'Dark Professional',
                    'Creative Designer',
                    'Glassmorphism',
                    'Corporate',
                  ].map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => setFormData({ ...formData, selectedTheme: themeName })}
                      className={`p-4 border rounded-2xl text-left transition-all ${
                        formData.selectedTheme === themeName
                          ? 'bg-accent text-black border border-accent/10 border-indigo-500 text-indigo-300'
                          : 'bg-surface/30 border-slate-900 hover:border-slate-800 text-slate-350'
                      }`}
                    >
                      <h4 className="text-xs font-extrabold tracking-wide uppercase">{themeName}</h4>
                    </button>
                  ))}
                </div>
              </div>

              {/* PDF & PPT Files upload */}
              <div className="space-y-4 border-t border-muted pt-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Document Uploads</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* CV Upload */}
                  <div className="p-4 bg-surface/30 border border-slate-900 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-slate-350 block">Resume (PDF/Word Doc)</span>
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-slate-705 border border-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors w-full">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{formData.resumeURL ? 'Replace PDF' : 'Upload PDF'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'resume', 'resumeURL')}
                        className="hidden"
                      />
                    </label>
                    {formData.resumeURL && (
                      <p className="text-[10px] text-emerald-455 truncate">✓ {formData.resumeURL.split('/').pop()}</p>
                    )}
                  </div>

                  {/* PPT Upload */}
                  <div className="p-4 bg-surface/30 border border-slate-900 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-slate-350 block">PowerPoint Deck (PPT/PPTX)</span>
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-slate-705 border border-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors w-full">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{formData.uploadedPPT ? 'Replace Slide' : 'Upload Slides'}</span>
                      <input
                        type="file"
                        accept=".ppt,.pptx"
                        onChange={(e) => handleFileUpload(e, 'ppt', 'uploadedPPT')}
                        className="hidden"
                      />
                    </label>
                    {formData.uploadedPPT && (
                      <p className="text-[10px] text-emerald-455 truncate">✓ {formData.uploadedPPT.split('/').pop()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PUBLISH ACTIONS */}
          {activeTab === 'publish' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Publish Settings</h3>

              <div className="p-5 bg-surface/30 border border-slate-900 rounded-2xl space-y-4">
                <span className="text-xs text-muted font-semibold block">Public Access Address (URL)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getPublicUrl()}
                    className="flex-1 bg-noise bg-background/60 border border-slate-850 text-muted text-xs px-3 py-2 rounded-xl focus:outline-none"
                  />
                  <button
                    onClick={copyUrlToClipboard}
                    className="p-2 bg-surface hover:bg-slate-750 text-text border border-slate-700 rounded-xl transition-all"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={getPublicUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-accent text-black hover:bg-[#ffffff] hover:text-black text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </aside>

        {/* Right Side: Instant Live Preview */}
        <section className="lg:col-span-7 bg-surface/20 flex flex-col h-full overflow-hidden">
          {/* Header controls for Preview Window */}
          <div className="bg-noise bg-background border-b border-muted py-3 px-6 flex items-center justify-between z-10 shrink-0">
            <span className="text-xs font-bold text-muted tracking-wider uppercase flex items-center gap-1.5">
              <Monitor className="w-4 h-4" />
              <span>Interactive Live Preview</span>
            </span>

            <div className="flex gap-1.5">
              {['desktop', 'mobile'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-lg border transition-all ${
                    previewMode === mode
                      ? 'bg-surface border-slate-700 text-white'
                      : 'border-transparent text-muted hover:text-slate-350'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Device Mockup Wrapper */}
          <div className="flex-1 bg-noise bg-background/80 p-6 overflow-y-auto flex justify-center items-start">
            <div
              className={`w-full transition-all duration-300 bg-noise bg-background shadow-2xl overflow-hidden border border-slate-850 ${
                previewMode === 'mobile' ? 'max-w-[360px] rounded-[2.5rem] min-h-[640px]' : 'w-full rounded-2xl min-h-[85%]'
              }`}
            >
              {/* Rerender theme in real-time as state elements mutate */}
              <PortfolioRenderer selectedTheme={formData.selectedTheme} data={formData} isPreview={true} />
            </div>
          </div>
        </section>

      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Dashboard;
