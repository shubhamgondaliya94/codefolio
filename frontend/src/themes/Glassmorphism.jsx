import React from 'react';
import { Mail, FileText, Globe, Layers } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';

const Glassmorphism = ({ data, isPreview = false }) => {
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
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden font-sans">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '8s' }}></div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 max-w-5xl mx-auto z-10">
        <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.07] border border-white/[0.1] text-indigo-300 rounded-full text-xs font-medium">
              <Layers className="w-3.5 h-3.5" />
              <span>Glassmorphism Theme</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {fullName}
            </h1>

            <p className="text-xl text-indigo-300 font-semibold">
              {role}
            </p>

            <p className="text-slate-300 leading-relaxed text-sm">
              {bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 text-xs">
              {resumeURL && (
                <a
                  href={resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-5 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-white/5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume PDF</span>
                </a>
              )}
              {uploadedPPT && (
                <a
                  href={uploadedPPT}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-100 font-semibold rounded-xl transition-all"
                >
                  <span>Pitch Deck</span>
                </a>
              )}
              <div className="flex items-center gap-3">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="p-3 bg-white/[0.03] hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/[0.03] hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl p-2 bg-white/[0.02]">
              {profileImage ? (
                <img src={profileImage} alt={fullName} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 font-extrabold text-5xl">
                  ✨
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-lg p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold tracking-wide text-white mb-6 text-center md:text-left">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] text-slate-200 rounded-xl text-xs font-semibold backdrop-blur"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="space-y-4 mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">Work History</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:bg-white/[0.05] transition-all hover:scale-[1.01] duration-300"
              >
                <div className="space-y-4">
                  <div className="aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/[0.05]">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-contain bg-black/5" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700 text-sm">
                        [Screenshot]
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/[0.04] text-xs">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors font-semibold">
                      Demo Web
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors">
                      Repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-bold text-white">Send Message</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Have an opening or project idea? Drop a note right into my inbox.
            </p>
            {email && (
              <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-xs space-y-1 inline-block">
                <span className="text-slate-400 font-medium">Forwarding mail destination:</span>
                <p className="text-indigo-300 font-semibold">{email}</p>
              </div>
            )}
          </div>
          <div className="md:col-span-7 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl">
            <ThemeContactForm username={username} themeVariant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-white/[0.04] max-w-5xl mx-auto relative z-10">
        <p>&copy; {new Date().getFullYear()} {fullName}. Built using Glassmorphism concepts.</p>
      </footer>
    </div>
  );
};

export default Glassmorphism;
