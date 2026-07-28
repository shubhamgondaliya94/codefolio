import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from '../components/DarkModeToggle';

const Home = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themesShowcase = [
    { name: 'Modern Developer', desc: 'Gradients and code vibes.', style: 'bg-background border border-accent text-accent' },
    { name: 'Minimal', desc: 'Serif fonts and vast whitespace.', style: 'bg-[#ffffff] border border-surface text-[#424769]' },
    { name: 'Dark Professional', desc: 'Cyberpunk console styling.', style: 'bg-background border border-muted text-text' },
    { name: 'Creative Designer', desc: 'Warm palettes and rounded offset borders.', style: 'bg-[#E5E5E5] border border-black text-black' },
    { name: 'Glassmorphism', desc: 'Frosted panels and glowing shapes.', style: 'bg-black border-4 border-white text-white' },
    { name: 'Corporate', desc: 'Structured columns and formal navy grids.', style: 'bg-surface border border-blue-500 text-blue-500' },
  ];

  return (
    <div className="bg-noise bg-background text-text min-h-screen font-sans overflow-hidden selection:bg-accent selection:text-background">
      
      {/* Navbar - Brutalist Header */}
      <nav className="sticky top-0 z-50 py-4 px-6 border-b border-muted bg-background">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent border border-accent flex items-center justify-center font-display font-bold text-black text-lg">
              CF
            </div>
            <span className="font-display font-bold tracking-tight text-xl text-text">CODEFOLIO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <DarkModeToggle />
            {user ? (
              <Link to="/dashboard" className="brutalist-button px-6 py-2.5 text-sm">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold uppercase tracking-widest text-text hover:text-accent transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="brutalist-button px-6 py-2.5 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-muted flex flex-col gap-4 pb-2">
            {user ? (
              <Link to="/dashboard" className="brutalist-button px-6 py-3 text-center">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-center py-2 text-sm font-bold uppercase tracking-widest text-text hover:text-accent transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="brutalist-button px-6 py-3 text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section - Asymmetric Editorial */}
      <header className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center border-b border-muted">
        <div className="lg:col-span-8 space-y-8 relative z-10">
          <div className="inline-block border border-muted px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted">
            01 / Identity Builder
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter text-text uppercase">
            Not Another <br/>
            <span className="text-accent">Generic</span> <br/>
            Portfolio.
          </h1>
          <p className="text-xl sm:text-2xl text-muted max-w-2xl font-light leading-relaxed">
            Craft a developer presence with actual taste. Bold typography, strict grids, and instantaneous deployment.
          </p>

          <div className="flex flex-wrap gap-4 pt-8">
            <Link to={user ? "/dashboard" : "/signup"} className="brutalist-button px-8 py-4 text-base">
              Start Building
            </Link>
            <a href="#showcase" className="brutalist-button-secondary px-8 py-4 text-base">
              View Aesthetics
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
           {/* Abstract Geometric Element replacing standard illustrations */}
           <div className="aspect-[3/4] border border-muted relative overflow-hidden bg-surface brutalist-card group">
              <div className="absolute top-4 left-4 w-12 h-12 border border-muted group-hover:border-accent transition-colors"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-accent group-hover:bg-[#ffffff] transition-colors"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] leading-none opacity-5 group-hover:opacity-10 transition-opacity">
                CF
              </div>
           </div>
        </div>
      </header>

      {/* Features - Brutalist Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-muted">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="brutalist-card p-10 space-y-8 flex flex-col justify-between aspect-square">
            <div className="text-4xl font-display text-accent">01</div>
            <div>
              <h3 className="text-2xl font-display font-bold text-text uppercase tracking-tight mb-4">Live Split Engine</h3>
              <p className="text-muted text-sm leading-relaxed">
                Edit raw data and witness the architectural preview update instantly. No loading states, just immediate feedback.
              </p>
            </div>
          </div>

          <div className="brutalist-card p-10 space-y-8 flex flex-col justify-between aspect-square bg-accent">
            <div className="text-4xl font-display text-background">02</div>
            <div>
              <h3 className="text-2xl font-display font-bold text-background uppercase tracking-tight mb-4">Opinionated Design</h3>
              <p className="text-muted text-sm leading-relaxed font-medium">
                We eliminated the generic purple gradients. Choose from strict brutalist, editorial, or pure high-contrast layouts.
              </p>
            </div>
          </div>

          <div className="brutalist-card p-10 space-y-8 flex flex-col justify-between aspect-square">
            <div className="text-4xl font-display text-text">03</div>
            <div>
              <h3 className="text-2xl font-display font-bold text-text uppercase tracking-tight mb-4">Immutable Hosting</h3>
              <p className="text-muted text-sm leading-relaxed">
                Your portfolio is deployed to a secure, public route instantly. Protected routes, raw performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Showcases */}
      <section id="showcase" className="py-32 px-6 max-w-7xl mx-auto border-b border-muted space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
             <div className="inline-block border border-muted px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted">
              02 / Aesthetic Control
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-text uppercase">
              Curated <br/> Foundations
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm leading-relaxed">
            Six starting points. None of them look like a standard SaaS template. Choose your visual language.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themesShowcase.map((theme, index) => (
            <div
              key={index}
              className={`p-8 flex flex-col justify-between aspect-[4/3] ${theme.style} transition-transform hover:-translate-y-2`}
            >
              <div className="font-display text-2xl font-bold">{String(index + 1).padStart(2, '0')}</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-display uppercase tracking-tight">{theme.name}</h3>
                <p className="text-xs opacity-70 leading-relaxed font-sans uppercase tracking-widest">{theme.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-32 px-6 border-t border-muted bg-accent text-background relative selection:bg-black selection:text-accent">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <h2 className="text-5xl sm:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.9]">
            Deploy Your <br/> Identity.
          </h2>
          <div>
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="inline-block border-2 border-[#2d3250] bg-background text-accent px-10 py-5 font-bold uppercase tracking-widest text-lg hover:bg-transparent hover:text-background transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 font-display font-bold text-sm tracking-widest uppercase">
          &copy; {new Date().getFullYear()} CF
        </div>
        <div className="absolute bottom-6 right-6 font-display font-bold text-sm tracking-widest uppercase">
          Sys_Ready
        </div>
      </footer>
    </div>
  );
};

export default Home;
