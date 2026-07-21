import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const EditorialSerif = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#F4F1ED] text-[#11100F] font-serif selection:bg-[#11100F] selection:text-[#F4F1ED]">
      <div className="max-w-5xl mx-auto px-6 py-24 min-h-screen flex flex-col">
        
        {/* Header Section */}
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-light italic tracking-tight mb-6">
            {fullName || 'Full Name'}
          </h1>
          <div className="w-16 h-px bg-[#11100F] mx-auto mb-6"></div>
          <h2 className="text-xl sm:text-2xl uppercase tracking-widest font-sans text-[#555]">
            {role || 'Role Title'}
          </h2>
        </header>

        {/* Bio & Profile Image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {profileImage && (
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img src={profileImage} alt={fullName} className="w-full h-full object-cover grayscale sepia-[0.3]" />
            </div>
          )}
          <div className={profileImage ? '' : 'col-span-2 text-center max-w-3xl mx-auto'}>
            <p className="text-xl sm:text-3xl leading-relaxed font-light mb-12 text-[#333]">
              "{bio || 'A thoughtful statement regarding your professional ethos and vision for the future of digital craftsmanship.'}"
            </p>
            
            <div className="space-y-4">
               <h3 className="uppercase tracking-widest font-sans text-xs font-bold text-[#888]">Areas of Expertise</h3>
               <div className="flex flex-wrap gap-2 justify-start">
                  {skills.length > 0 ? (
                    skills.map((skill, idx) => (
                      <span key={idx} className="text-sm font-sans px-3 py-1 bg-[#EAE5DF] rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#888] italic text-sm">No skills inputted.</span>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <section className="mb-32 border-t border-[#D5D0C8] pt-16">
          <h3 className="text-3xl font-light italic text-center mb-16">Selected Case Studies</h3>
          
          <div className="space-y-24">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                  {proj.image && (
                    <div className={`overflow-hidden aspect-[4/3] ${idx % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className={`space-y-6 ${proj.image && idx % 2 !== 0 ? 'md:col-start-1' : ''} ${!proj.image ? 'md:col-span-2 text-center' : ''}`}>
                    <h4 className="text-4xl font-light">{proj.title || 'Untitled'}</h4>
                    <p className="text-lg text-[#555] leading-relaxed font-light">
                      {proj.description || 'No description available for this case study.'}
                    </p>
                    <div className={`flex gap-6 font-sans text-xs uppercase tracking-widest font-bold ${!proj.image ? 'justify-center' : ''}`}>
                      {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="hover:text-[#888] transition-colors border-b border-[#11100F] pb-1">View Live</a>}
                      {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:text-[#888] transition-colors border-b border-[#11100F] pb-1">Source Code</a>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-[#888] italic">No projects uploaded.</div>
            )}
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="mt-auto border-t border-[#D5D0C8] pt-16 grid md:grid-cols-2 gap-16">
          <div className="space-y-8 font-sans">
            <h3 className="text-2xl font-serif italic font-light">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              {email && <div><span className="text-[#888] uppercase tracking-widest text-xs mr-4">Email</span> <a href={`mailto:${email}`} className="hover:underline">{email}</a></div>}
              {contactDetails.phone && <div><span className="text-[#888] uppercase tracking-widest text-xs mr-4">Phone</span> {contactDetails.phone}</div>}
              {contactDetails.address && <div><span className="text-[#888] uppercase tracking-widest text-xs mr-4">Location</span> {contactDetails.address}</div>}
            </div>
            <div className="flex gap-4 pt-4">
              {github && <a href={github} target="_blank" rel="noreferrer" className="text-sm hover:underline">GitHub</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="text-sm hover:underline">LinkedIn</a>}
            </div>
          </div>
          <div>
            <ThemeContactForm email={email} themeName="Editorial Serif" />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default EditorialSerif;
