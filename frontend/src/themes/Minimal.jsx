import React from 'react';
import { Mail, FileText, Globe, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';

const Minimal = ({ data, isPreview = false }) => {
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
    <div className="bg-[#FAF9F6] text-slate-900 min-h-screen selection:bg-slate-900 selection:text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-[75vh] flex items-center py-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-light tracking-tight font-serif text-slate-900 leading-tight">
              {fullName}
            </h1>
            <p className="text-lg sm:text-xl font-normal text-slate-600 uppercase tracking-widest">
              {role}
            </p>
          </div>
          
          <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed font-light font-serif border-l-2 border-slate-900 pl-6 max-w-2xl">
            {bio}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-semibold">
            {resumeURL && (
              <a
                href={resumeURL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity"
              >
                <span>Read CV</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {uploadedPPT && (
              <a
                href={uploadedPPT}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity"
              >
                <span>Pitch Slides</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Profile Image Banner if available */}
      {profileImage && (
        <section className="px-6 max-w-4xl mx-auto pb-20">
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-slate-200">
            <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto border-t border-slate-200/80">
          <div className="grid md:grid-cols-3 gap-6">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-slate-500 font-serif">Focus</h2>
            <div className="md:col-span-2 flex flex-wrap gap-x-8 gap-y-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-lg text-slate-800 font-light border-b border-slate-200 pb-1"
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
        <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto border-t border-slate-200/80">
          <div className="space-y-12">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-slate-500 font-serif mb-8">Works</h2>
            <div className="grid gap-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-8 items-center border-b border-slate-200 pb-12 last:border-0 last:pb-0"
                >
                  <div className="aspect-video bg-slate-100 border border-slate-200 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif font-light">
                        [Project Image]
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-normal font-serif text-slate-900">{project.title}</h3>
                    <p className="text-slate-600 font-light text-sm leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-6 text-sm pt-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 border-b border-slate-900 pb-0.5 hover:opacity-70 font-semibold"
                        >
                          <span>Live Site</span>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto border-t border-slate-200/80">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-slate-500 font-serif">Contact</h2>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              Have an idea? Let's discuss and bring it to life.
            </p>
            {email && (
              <div className="pt-2">
                <a href={`mailto:${email}`} className="text-sm font-semibold border-b border-slate-900 pb-0.5">
                  {email}
                </a>
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <ThemeContactForm username={username} themeVariant="light" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200/80 text-center text-xs text-slate-400 max-w-4xl mx-auto">
        <p>&copy; {new Date().getFullYear()} {fullName}. Minimal Design Concept.</p>
      </footer>
    </div>
  );
};

export default Minimal;
