import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const HighContrast = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Header */}
      <header className="p-8 sm:p-16 max-w-7xl mx-auto">
        <h1 className="text-[12vw] font-display font-black leading-[0.8] tracking-tighter uppercase mb-8">
          {fullName || 'Name'}
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 justify-between items-start border-t-8 border-white pt-8">
           <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight max-w-xl">
             {role || 'Role'}
           </h2>
           {profileImage && (
             <img src={profileImage} alt={fullName} className="w-48 h-48 object-cover filter grayscale contrast-150" />
           )}
        </div>
      </header>

      {/* Bio & Skills */}
      <section className="bg-white text-black p-8 sm:p-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-4xl font-display font-black uppercase mb-8 border-b-8 border-black pb-4">Bio</h3>
            <p className="text-xl sm:text-2xl font-bold leading-tight">
              {bio || 'Biography.'}
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-display font-black uppercase mb-8 border-b-8 border-black pb-4">Skills</h3>
            <div className="flex flex-wrap gap-4">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="text-2xl font-display font-bold uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xl font-bold">No skills</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="p-8 sm:p-16 max-w-7xl mx-auto">
        <h3 className="text-6xl sm:text-8xl font-display font-black uppercase mb-16 border-b-8 border-white pb-8">Works</h3>
        
        <div className="space-y-32">
          {projects.length > 0 ? (
            projects.map((proj, idx) => (
              <div key={idx} className="grid lg:grid-cols-2 gap-16 items-center">
                <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                  <h4 className="text-5xl sm:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-8">{proj.title || 'Untitled'}</h4>
                  <p className="text-xl sm:text-2xl font-bold leading-tight mb-12">
                    {proj.description || 'Description'}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-2xl font-display font-black uppercase border-b-4 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">Live Site</a>}
                    {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-2xl font-display font-black uppercase border-b-4 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">Source</a>}
                  </div>
                </div>
                {proj.image && (
                  <div className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                    <img src={proj.image} alt={proj.title} className="w-full h-auto filter grayscale contrast-150" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-3xl font-bold">No works</div>
          )}
        </div>
      </section>

      {/* Contact */}
      <footer className="bg-white text-black p-8 sm:p-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-6xl sm:text-8xl font-display font-black uppercase mb-12">Contact</h3>
            <div className="space-y-6 text-2xl font-bold uppercase">
              {email && <div><span className="opacity-50 block text-sm">EMAIL</span> <a href={`mailto:${email}`} className="hover:underline">{email}</a></div>}
              {contactDetails.phone && <div><span className="opacity-50 block text-sm">PHONE</span> {contactDetails.phone}</div>}
              {contactDetails.address && <div><span className="opacity-50 block text-sm">LOCATION</span> {contactDetails.address}</div>}
            </div>
            <div className="flex gap-8 mt-12 text-3xl font-display font-black uppercase">
              {github && <a href={github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
            </div>
          </div>
          <div>
            <ThemeContactForm email={email} themeName="High Contrast" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HighContrast;
