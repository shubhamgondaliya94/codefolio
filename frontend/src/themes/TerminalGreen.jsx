import React from 'react';
import ThemeContactForm from './ThemeContactForm';

const TerminalGreen = ({ data, isPreview }) => {
  const { fullName, role, bio, skills = [], projects = [], email, github, linkedin, profileImage, contactDetails = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#050505] text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 min-h-screen flex flex-col">
        
        {/* Header Section */}
        <header className="mb-12 border border-[#00FF41] p-6 relative">
          <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-xs">USER_INIT</div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {profileImage && (
              <div className="w-24 h-24 shrink-0 border border-[#00FF41] overflow-hidden">
                <img src={profileImage} alt={fullName} className="w-full h-full object-cover filter brightness-75 contrast-125 sepia hue-rotate-90 saturate-200" />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold uppercase mb-2">
                &gt; {fullName || 'root_user'}
              </h1>
              <h2 className="text-lg uppercase text-[#00FF41]/80">
                $ {role || 'execute_role'}
              </h2>
            </div>
          </div>
        </header>

        {/* Bio & Skills */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <section className="border border-[#00FF41] p-6 relative">
             <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-xs">/SYS/BIO.TXT</div>
            <p className="text-sm leading-relaxed">
              {bio || 'System awaiting input. No biological data found.'}
            </p>
          </section>

          <section className="border border-[#00FF41] p-6 relative">
             <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-xs">/SYS/SKILLS.DAT</div>
            <ul className="list-disc list-inside space-y-1">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <li key={idx} className="text-sm uppercase">
                    {skill}
                  </li>
                ))
              ) : (
                <li className="text-sm italic opacity-70">Array empty.</li>
              )}
            </ul>
          </section>
        </div>

        {/* Projects */}
        <section className="mb-12 border border-[#00FF41] p-6 relative">
          <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-xs">/USR/BIN/PROJECTS</div>
          
          <div className="space-y-8 mt-4">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className="border-l-2 border-[#00FF41]/50 pl-4">
                  <h4 className="text-xl font-bold mb-2">&gt; ./{proj.title ? proj.title.replace(/\s+/g, '_').toLowerCase() : 'untitled'}.sh</h4>
                  <p className="text-sm mb-4 text-[#00FF41]/80">
                    {proj.description || 'No execution details.'}
                  </p>
                  
                  {proj.image && (
                    <div className="mb-4 border border-[#00FF41]/30 p-1 w-full max-w-sm">
                      <img src={proj.image} alt={proj.title} className="w-full h-auto filter sepia hue-rotate-90 saturate-200" />
                    </div>
                  )}

                  <div className="flex gap-4 text-xs">
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="hover:bg-[#00FF41] hover:text-black px-2 py-1 border border-[#00FF41]">[ EXECUTE LIVE ]</a>}
                    {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:bg-[#00FF41] hover:text-black px-2 py-1 border border-[#00FF41]">[ VIEW SOURCE ]</a>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm opacity-70">0 processes found.</div>
            )}
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="mt-auto border border-[#00FF41] p-6 relative grid sm:grid-cols-2 gap-8">
          <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-xs">/ETC/CONTACT</div>
          
          <div className="space-y-2 text-sm mt-4">
            <div className="opacity-70 mb-4">// ESTABLISH HANDSHAKE</div>
            {email && <div><span className="opacity-70">MAIL:</span> <a href={`mailto:${email}`} className="hover:underline">{email}</a></div>}
            {contactDetails.phone && <div><span className="opacity-70">TEL:</span> {contactDetails.phone}</div>}
            {contactDetails.address && <div><span className="opacity-70">LOC:</span> {contactDetails.address}</div>}
            
            <div className="pt-4 flex gap-4">
              {github && <a href={github} target="_blank" rel="noreferrer" className="hover:underline hover:bg-[#00FF41] hover:text-black">GITHUB</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="hover:underline hover:bg-[#00FF41] hover:text-black">LINKEDIN</a>}
            </div>
          </div>
          <div className="mt-4">
            <ThemeContactForm email={email} themeName="Terminal Green" />
          </div>
        </footer>

        <div className="text-center text-xs mt-8 opacity-50">
          EOF
        </div>

      </div>
    </div>
  );
};

export default TerminalGreen;
