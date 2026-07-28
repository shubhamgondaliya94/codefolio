import React from 'react';
import { Mail, FileText, Globe, Code } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';
import { motion } from 'framer-motion';

const ModernDeveloper = ({ data, isPreview = false }) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl z-0"></div>
        
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 uppercase inline-block">
              Available for Projects
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{fullName}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-300">
              {role}
            </p>
            <p className="text-base text-slate-400 max-w-xl leading-relaxed">
              {bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              {resumeURL && (
                <a
                  href={resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all hover:translate-y-[-2px] shadow-lg shadow-indigo-600/25"
                >
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </a>
              )}
              {uploadedPPT && (
                <a
                  href={uploadedPPT}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all hover:translate-y-[-2px]"
                >
                  <Code className="w-5 h-5" />
                  <span>Download Pitch</span>
                </a>
              )}
              <div className="flex items-center gap-3 ml-2">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="p-3 bg-slate-900/80 hover:bg-indigo-950/85 hover:text-indigo-400 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-900/80 hover:bg-indigo-950/85 hover:text-indigo-400 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative border border-slate-800 bg-slate-900 p-3 rounded-[2rem] w-64 h-64 sm:w-80 sm:h-80 overflow-hidden shadow-2xl">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={fullName}
                    className="w-full h-full object-cover rounded-[1.6rem]"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 rounded-[1.6rem] flex items-center justify-center text-slate-500 font-extrabold text-5xl">
                    {fullName.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
          <div className="space-y-4 mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Core Competencies</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-900/60 border border-slate-800/80 text-slate-300 rounded-xl text-sm font-medium hover:border-indigo-500/30 hover:text-indigo-300 hover:bg-slate-900 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
          <div className="space-y-4 mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group border border-slate-800 bg-slate-900/30 rounded-2xl overflow-hidden hover:border-slate-700/80 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video bg-slate-950 overflow-hidden relative border-b border-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain bg-slate-950 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700 font-bold">
                      No Preview Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-slate-200 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Codebase</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
            <p className="text-slate-400 leading-relaxed">
              If you have any questions, want to start a project, or simply want to say hello, feel free to drop a message!
            </p>
            <div className="space-y-4 pt-4">
              {email && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium">{email}</span>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-7 bg-slate-900/35 border border-slate-800 p-6 sm:p-8 rounded-2xl">
            <ThemeContactForm username={username} themeVariant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900/60 max-w-5xl mx-auto">
        <p>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ModernDeveloper;
