import React from 'react';
import { Mail, FileText, Globe, Terminal } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import ThemeContactForm from './ThemeContactForm';

const DarkProfessional = ({ data, isPreview = false }) => {
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
    <div className="bg-[#080B10] text-[#E2E8F0] min-h-screen selection:bg-emerald-500 selection:text-slate-950 font-mono">
      {/* Top Console bar decoration */}
      <div className="bg-[#0d1117] border-b border-emerald-500/25 px-4 py-2 flex items-center justify-between text-xs text-emerald-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 opacity-70">terminal@codefolio: ~/{username}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse"></span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <Terminal className="w-4 h-4" />
              <span>const developer = new Professional();</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white border-r-2 border-emerald-500 pr-4 inline-block animate-pulse">
              {fullName}
            </h1>
            
            <p className="text-lg text-emerald-400 font-semibold uppercase">
              &gt; {role}
            </p>

            <div className="bg-[#0D131E] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              <p className="text-slate-300 leading-relaxed text-sm">
                {bio}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs">
              {resumeURL && (
                <a
                  href={resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>DOWNLOAD_CV</span>
                </a>
              )}
              {uploadedPPT && (
                <a
                  href={uploadedPPT}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 font-semibold rounded-lg transition-all"
                >
                  <span>SLIDESHOW_PITCH</span>
                </a>
              )}
              <div className="flex items-center gap-3">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-emerald-400 rounded-lg border border-slate-800 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-emerald-400 rounded-lg border border-slate-800 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="border-2 border-emerald-500/30 p-2 rounded-2xl relative group">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                LIVE
              </div>
              <div className="w-56 h-56 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                {profileImage ? (
                  <img src={profileImage} alt={fullName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-emerald-500/30 font-extrabold text-5xl">
                    &lt;/&gt;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-900">
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-emerald-400">&gt; cat skills.txt</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-3 bg-slate-900/40 border border-slate-850/80 rounded-lg flex items-center gap-2 hover:border-emerald-500/30 transition-all"
              >
                <span className="text-emerald-500 text-xs">■</span>
                <span className="text-slate-300 text-xs">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-900">
          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-emerald-400">&gt; ls ./projects/</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#0A0E15] border border-slate-850 hover:border-emerald-500/30 transition-all rounded-xl p-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] w-full bg-slate-950 rounded-lg overflow-hidden border border-slate-900">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-contain bg-slate-900 group-hover:scale-102 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs">
                        [NO_PREVIEW]
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 text-xs font-bold border-t border-slate-900 mt-4">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      DEMO_LINK
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors">
                      SRC_CODE
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-emerald-400">&gt; mail -s "hi"</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dispatch an encrypted callback frame. The target recipient will response once available.
            </p>
            {email && (
              <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-lg text-xs space-y-2">
                <div className="text-emerald-500 font-bold">RECIPIENT_CONTACT:</div>
                <div className="text-slate-300">{email}</div>
              </div>
            )}
          </div>
          <div className="bg-[#0A0D15] border border-slate-855 p-6 rounded-xl">
            <ThemeContactForm username={username} themeVariant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900/60 text-center text-xs text-slate-600 max-w-5xl mx-auto">
        <p>CONSOLE.LOG('DONE'); // &copy; {new Date().getFullYear()} {fullName}</p>
      </footer>
    </div>
  );
};

export default DarkProfessional;
