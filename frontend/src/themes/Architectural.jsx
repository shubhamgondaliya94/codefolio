import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const Architectural = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#11100F] text-blue-500 font-mono selection:bg-blue-500 selection:text-white"
         style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      
      <div className="max-w-6xl mx-auto border-x border-blue-500/30 min-h-screen bg-[#11100F]/90 backdrop-blur-sm">
        
        {/* Header Section */}
        <header className="p-8 sm:p-16 border-b border-blue-500/30 relative">
          <div className="absolute top-4 left-4 text-xs opacity-50 border border-blue-500/30 px-2 py-1">SEC-01 // IDENTITY_MATRIX</div>
          <div className="absolute top-4 right-4 text-xs opacity-50 border border-blue-500/30 px-2 py-1">SCALE 1:1</div>
          
          <div className="mt-12 flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl uppercase tracking-widest font-bold">
                {fullName || 'Name'}
              </h1>
              <div className="h-px w-full bg-blue-500/50"></div>
              <h2 className="text-xl sm:text-2xl uppercase tracking-widest opacity-80">
                {role || 'Role'}
              </h2>
            </div>
            
            {profileImage && (
              <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 border border-blue-500 p-2 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500 -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500 translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500 -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500 translate-x-1 translate-y-1"></div>
                <img src={profileImage} alt={fullName} className="w-full h-full object-cover filter sepia hue-rotate-[180deg] saturate-[3] brightness-[0.7]" />
              </div>
            )}
          </div>
        </header>

        {/* Bio & Skills */}
        <div className="grid md:grid-cols-2 border-b border-blue-500/30">
          <section className="p-8 sm:p-12 border-b md:border-b-0 md:border-r border-blue-500/30 relative">
            <div className="absolute top-4 left-4 text-xs opacity-50">SEC-02 // BIO_DATA</div>
            <p className="mt-6 text-sm leading-relaxed uppercase tracking-wider opacity-90">
              {bio || 'Bio statement goes here.'}
            </p>
          </section>

          <section className="p-8 sm:p-12 relative">
             <div className="absolute top-4 left-4 text-xs opacity-50">SEC-03 // TECH_SPECS</div>
            <div className="mt-6 flex flex-wrap gap-4">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 border border-blue-500/50 text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-[#11100F] transition-colors cursor-crosshair">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs uppercase opacity-50">No data found</span>
              )}
            </div>
          </section>
        </div>

        {/* Projects */}
        <section className="border-b border-blue-500/30 relative">
           <div className="absolute top-4 left-4 text-xs opacity-50">SEC-04 // DEPLOYMENTS</div>
           
           <div className="pt-16 pb-8 px-8 sm:px-12 grid sm:grid-cols-2 gap-12">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className="border border-blue-500/30 p-6 relative group">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500"></div>
                  
                  <h4 className="text-xl uppercase tracking-widest font-bold mb-4">{proj.title || 'Untitled'}</h4>
                  
                  {proj.image && (
                    <div className="mb-6 border border-blue-500/30 aspect-video overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover filter sepia hue-rotate-[180deg] saturate-[3] brightness-[0.7] group-hover:brightness-100 transition-all" />
                    </div>
                  )}
                  
                  <p className="text-xs uppercase tracking-widest leading-relaxed opacity-80 mb-6">
                    {proj.description || 'Description'}
                  </p>
                  
                  <div className="flex gap-4">
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest border-b border-blue-500/50 hover:border-blue-500 pb-1">Live Demo</a>}
                    {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest border-b border-blue-500/50 hover:border-blue-500 pb-1">Source</a>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs uppercase opacity-50">No deployments found</div>
            )}
           </div>
        </section>

        {/* Contact Footer */}
        <footer className="p-8 sm:p-12 relative grid md:grid-cols-2 gap-12">
           <div className="absolute top-4 left-4 text-xs opacity-50">SEC-05 // COMM_LINK</div>
           
           <div className="mt-6 space-y-6">
             <h3 className="text-2xl uppercase tracking-widest font-bold">Transmit Signal</h3>
             <div className="space-y-4 text-sm uppercase tracking-widest">
               {email && <div className="flex items-center gap-4"><span className="opacity-50">TX:</span> <a href={`mailto:${email}`} className="hover:underline">{email}</a></div>}
               {contactDetails.phone && <div className="flex items-center gap-4"><span className="opacity-50">FREQ:</span> {contactDetails.phone}</div>}
               {contactDetails.address && <div className="flex items-center gap-4"><span className="opacity-50">COORD:</span> {contactDetails.address}</div>}
             </div>
             
             <div className="flex gap-6 pt-4">
                {github && <a href={github} target="_blank" rel="noreferrer" className="border border-blue-500/50 px-4 py-2 text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-[#11100F] transition-colors">GitHub</a>}
                {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="border border-blue-500/50 px-4 py-2 text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-[#11100F] transition-colors">LinkedIn</a>}
             </div>
           </div>
           
           <div className="mt-6">
             <ThemeContactForm email={email} themeName="Architectural" />
           </div>
        </footer>

      </div>
    </div>
  );
};

export default Architectural;
