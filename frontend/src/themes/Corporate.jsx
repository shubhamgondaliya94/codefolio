import React from 'react';
import { Mail, FileText, Globe, Briefcase } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';

const Corporate = ({ data, isPreview = false }) => {
  const {
    fullName = 'John Doe',
    bio = 'Developer Bio',
    role = 'Software Developer',
    github = '',
    linkedin = '',
    email = '',
    skills = [],
    resumeURL = '',
    profileImage = '',
    projects = [],
    uploadedPPT = '',
    username = 'portfolio',
  } = data;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen selection:bg-blue-600 selection:text-white font-sans">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-12 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-blue-900 tracking-tight">
            <Briefcase className="w-5 h-5 text-blue-700" />
            <span>{fullName}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-700 transition-colors">ABOUT</a>
            <a href="#skills" className="hover:text-blue-700 transition-colors">EXPERTISE</a>
            <a href="#projects" className="hover:text-blue-700 transition-colors">PORTFOLIO</a>
            <a href="#contact" className="hover:text-blue-700 transition-colors">CONTACT</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="bg-white py-20 px-6 sm:px-12 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {fullName}
            </h1>
            <p className="text-xl font-bold text-blue-700">
              {role}
            </p>
            <p className="text-slate-600 leading-relaxed text-base max-w-2xl">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {resumeURL && (
                <a
                  href={resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-750 hover:bg-blue-800 text-white font-bold rounded-lg text-sm transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Curriculum</span>
                </a>
              )}
              {uploadedPPT && (
                <a
                  href={uploadedPPT}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:border-blue-750 text-slate-700 hover:text-blue-750 font-bold rounded-lg text-sm transition-colors"
                >
                  <span>Briefing Slides</span>
                </a>
              )}
              <div className="flex items-center gap-3">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors">
                    <Github className="w-4.5 h-4.5" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors">
                    <Linkedin className="w-4.5 h-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
              {profileImage ? (
                <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-extrabold text-5xl">
                  💼
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="space-y-3 mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Areas of Expertise</h2>
            <div className="h-1 w-12 bg-blue-700 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
                <p className="text-sm font-bold text-slate-700">{skill}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-20 px-6 sm:px-12 bg-white border-t border-b border-slate-200">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Project Portfolio</h2>
              <div className="h-1 w-12 bg-blue-700 rounded-full mx-auto"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-video w-full bg-slate-200 overflow-hidden border-b border-slate-250">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-contain bg-black/5" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">
                          Corporate Case Study
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                      <p className="text-slate-550 text-xs leading-relaxed line-clamp-3">{project.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-800 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Visit Site</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-700">
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Request Briefing</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Submit your inquiry details below. Our response will be routed to your email target.
            </p>
            {email && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-1 shadow-sm">
                <span className="text-slate-400 font-bold">RECIPIENT CONTACT POINT:</span>
                <p className="text-slate-800 font-semibold">{email}</p>
              </div>
            )}
          </div>
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
            <ThemeContactForm username={username} themeVariant="light" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-xs text-slate-400 max-w-6xl mx-auto">
        <p>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Corporate;
