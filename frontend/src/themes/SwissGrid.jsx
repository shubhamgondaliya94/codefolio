import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const SwissGrid = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-black font-sans selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto min-h-screen border-l border-r border-black grid lg:grid-cols-12">
        
        {/* Left Column / Header */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-black flex flex-col">
          <header className="p-8 border-b border-black">
            <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
              {fullName || 'Name'}
            </h1>
            <h2 className="text-xl font-medium uppercase tracking-tight">
              {role || 'Role'}
            </h2>
          </header>

          {profileImage && (
            <div className="border-b border-black aspect-square overflow-hidden">
              <img src={profileImage} alt={fullName} className="w-full h-full object-cover filter grayscale" />
            </div>
          )}

          <div className="p-8 border-b border-black flex-1">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Bio</h3>
            <p className="text-base leading-snug font-medium">
              {bio || 'Bio statement goes here.'}
            </p>
          </div>

          <footer className="p-8 mt-auto bg-black text-white">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white/50">Contact</h3>
            <div className="space-y-2 text-sm font-bold">
              {email && <a href={`mailto:${email}`} className="block hover:underline">{email}</a>}
              {contactDetails.phone && <div className="block">{contactDetails.phone}</div>}
              {contactDetails.address && <div className="block">{contactDetails.address}</div>}
            </div>
            <div className="flex gap-4 mt-8">
              {github && <a href={github} target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline">GitHub</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline">LinkedIn</a>}
            </div>
          </footer>
        </div>

        {/* Right Column / Content */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Skills */}
          <section className="border-b border-black flex flex-col sm:flex-row">
            <div className="p-8 border-b sm:border-b-0 sm:border-r border-black sm:w-1/3 shrink-0">
               <h3 className="text-sm font-bold uppercase tracking-widest">Skills</h3>
            </div>
            <div className="p-8 flex-1">
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-black text-white text-xs font-bold uppercase">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm">No skills</span>
                )}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="flex-1 flex flex-col">
            <div className="p-8 border-b border-black">
              <h3 className="text-sm font-bold uppercase tracking-widest">Projects</h3>
            </div>
            <div className="grid sm:grid-cols-2 flex-1">
              {projects.length > 0 ? (
                projects.map((proj, idx) => (
                  <div key={idx} className="border-b sm:border-r sm:[&:nth-child(even)]:border-r-0 border-black flex flex-col">
                    {proj.image && (
                      <div className="border-b border-black aspect-video overflow-hidden">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all" />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">{proj.title || 'Untitled'}</h4>
                        <p className="text-sm font-medium leading-snug">
                          {proj.description || 'Description.'}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-8 pt-4 border-t border-black">
                        {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase hover:underline">Live</a>}
                        {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase hover:underline">Source</a>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8">No projects</div>
              )}
            </div>
          </section>

          <div className="p-8 border-t border-black bg-white">
            <ThemeContactForm email={email} themeName="Swiss Grid" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default SwissGrid;
