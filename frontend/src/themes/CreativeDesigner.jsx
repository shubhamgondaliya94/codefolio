import React from 'react';
import { Mail, FileText, Globe, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';

const CreativeDesigner = ({ data, isPreview = false }) => {
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
    <div className="bg-[#FFF8F3] text-slate-800 min-h-screen selection:bg-pink-300 selection:text-slate-900 font-sans">
      {/* Background Blobs decoration */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 order-2 md:order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creative Builder</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
              Hey, I'm <br />
              <span className="relative inline-block text-pink-600">
                {fullName}
                <span className="absolute bottom-1 left-0 w-full h-3 bg-pink-100 -z-10 rounded"></span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-amber-700">
              {role}
            </p>

            <p className="text-slate-600 leading-relaxed text-base max-w-lg">
              {bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              {resumeURL && (
                <a
                  href={resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_#EC4899]"
                >
                  Download Resume
                </a>
              )}
              {uploadedPPT && (
                <a
                  href={uploadedPPT}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-200 rounded-2xl font-bold text-sm transition-transform hover:-translate-y-1"
                >
                  View Pitch Deck
                </a>
              )}
              <div className="flex items-center gap-3">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="p-3 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-2xl transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-2xl transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center order-1 md:order-2">
            <div className="relative">
              {/* Decorative behind border */}
              <div className="absolute top-4 left-4 w-60 h-60 sm:w-72 sm:h-72 border-4 border-slate-950 rounded-[2.5rem] bg-amber-400"></div>
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 border-4 border-slate-950 bg-white rounded-[2.5rem] overflow-hidden transition-transform hover:-translate-x-2 hover:-translate-y-2 duration-300">
                {profileImage ? (
                  <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-pink-500 font-extrabold text-5xl">
                    ✏️
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200">
          <div className="space-y-4 mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900">What I Do</h2>
            <p className="text-slate-500 text-sm">A list of technical and creative disciplines</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-5 py-3 bg-white border-2 border-slate-900 text-slate-800 rounded-2xl text-sm font-extrabold shadow-[3px_3px_0px_#F59E0B] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#F59E0B] transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200">
          <div className="space-y-4 mb-12 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900">Recent Creations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border-4 border-slate-950 rounded-[2rem] p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] w-full bg-slate-100 border-2 border-slate-900 rounded-2xl overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-bold">
                        🎨 Artwork
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900">{project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-6 mt-4 border-t border-slate-100">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-pink-100 border-2 border-slate-950 text-pink-700 font-extrabold text-xs rounded-xl hover:-translate-y-0.5 transition-transform"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-slate-900 font-extrabold text-xs transition-colors"
                    >
                      View Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">Say Hello!</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Got a creative project in mind or need assistance with software engineering? Send over a message, I'd love to chat.
            </p>
            {email && (
              <div className="p-4 bg-amber-100/50 border-2 border-slate-900 rounded-2xl inline-block">
                <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800 block mb-1">Direct Address</span>
                <span className="text-slate-800 font-bold">{email}</span>
              </div>
            )}
          </div>
          <div className="bg-white border-4 border-slate-950 p-6 sm:p-8 rounded-[2rem] shadow-[8px_8px_0px_#F59E0B]">
            <ThemeContactForm username={username} themeVariant="light" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-xs font-bold text-slate-400 max-w-5xl mx-auto">
        <p>&copy; {new Date().getFullYear()} {fullName}. Built with Sparkles.</p>
      </footer>
    </div>
  );
};

export default CreativeDesigner;
