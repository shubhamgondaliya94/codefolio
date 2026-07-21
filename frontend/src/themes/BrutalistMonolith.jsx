import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const BrutalistMonolith = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-noise text-[#F4F1ED] font-sans selection:bg-[#D1FF36] selection:text-black">
      <div className="max-w-6xl mx-auto border-x border-[#333] min-h-screen">
        
        {/* Header Section */}
        <header className="border-b border-[#333] p-12 lg:p-24 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="inline-block border border-[#D1FF36] bg-[#D1FF36] text-black px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                Identity Profile
              </div>
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter uppercase text-[#F4F1ED]">
                {fullName || 'Full Name'}
              </h1>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#D1FF36] uppercase tracking-tight">
                {role || 'Role Title'}
              </h2>
            </div>
            
            {profileImage && (
              <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 border border-[#333] p-2 bg-[#11100F]">
                <img src={profileImage} alt={fullName} className="w-full h-full object-cover filter grayscale contrast-125" />
              </div>
            )}
          </div>
          
          <div className="absolute top-0 right-0 p-8 font-display text-[15rem] leading-none opacity-5 select-none pointer-events-none">
            01
          </div>
        </header>

        {/* Bio & Skills */}
        <div className="grid md:grid-cols-2 border-b border-[#333]">
          <section className="p-12 border-b md:border-b-0 md:border-r border-[#333]">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight text-[#D1FF36] mb-6">/ System Abstract</h3>
            <p className="text-lg leading-relaxed text-[#888] font-light">
              {bio || 'Write a brief abstract outlining your primary operational capabilities and directives.'}
            </p>
          </section>

          <section className="p-12">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight text-[#D1FF36] mb-6">/ Core Competencies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 border border-[#333] text-sm uppercase tracking-widest font-bold text-[#F4F1ED] hover:bg-[#D1FF36] hover:text-black transition-colors">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-[#555] italic">No skills inputted.</span>
              )}
            </div>
          </section>
        </div>

        {/* Projects */}
        <section className="border-b border-[#333]">
          <div className="p-12 border-b border-[#333]">
            <h3 className="text-4xl font-display font-bold uppercase tracking-tighter">Selected Works</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className="border-r border-b border-[#333] group relative overflow-hidden bg-[#11100F] hover:bg-[#D1FF36] transition-colors flex flex-col h-full last:border-r-0">
                  {proj.image && (
                    <div className="h-48 border-b border-[#333] group-hover:border-black transition-colors overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col justify-between group-hover:text-black">
                    <div className="space-y-4">
                      <div className="font-display font-bold text-3xl uppercase tracking-tight leading-none">
                        {proj.title || 'Untitled'}
                      </div>
                      <p className="text-sm font-light text-[#888] group-hover:text-black/70">
                        {proj.description || 'No description available.'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#333] group-hover:border-black/20">
                      {proj.liveLink && (
                        <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest hover:underline">
                          Launch Live
                        </a>
                      )}
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest hover:underline">
                          View Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-12 text-[#555] uppercase tracking-widest font-bold">No projects uploaded.</div>
            )}
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="grid md:grid-cols-2">
          <div className="p-12 border-b md:border-b-0 md:border-r border-[#333] bg-[#D1FF36] text-black">
            <h3 className="text-4xl font-display font-bold uppercase tracking-tighter mb-8">Establish Connection</h3>
            <div className="space-y-4 text-sm font-bold uppercase tracking-widest">
              {email && <a href={`mailto:${email}`} className="block border-b border-black/20 pb-2 hover:border-black transition-colors">MAIL: {email}</a>}
              {github && <a href={github} target="_blank" rel="noreferrer" className="block border-b border-black/20 pb-2 hover:border-black transition-colors">GITHUB</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="block border-b border-black/20 pb-2 hover:border-black transition-colors">LINKEDIN</a>}
              {contactDetails.phone && <div className="block border-b border-black/20 pb-2">TEL: {contactDetails.phone}</div>}
              {contactDetails.address && <div className="block border-b border-black/20 pb-2">LOC: {contactDetails.address}</div>}
            </div>
          </div>
          <div className="p-12">
            <ThemeContactForm email={email} themeName="Brutalist Monolith" />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default BrutalistMonolith;
