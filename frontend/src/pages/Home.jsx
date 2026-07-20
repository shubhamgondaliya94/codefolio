import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Monitor, Layout, Lock, Mail, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const themesShowcase = [
    { name: 'Modern Developer', desc: 'Gradients and code vibes.', style: 'from-indigo-650 to-purple-650' },
    { name: 'Minimal', desc: 'Serif fonts and vast whitespace.', style: 'from-slate-100 to-slate-200 text-slate-800' },
    { name: 'Dark Professional', desc: 'Cyberpunk console styling.', style: 'from-emerald-950 to-slate-900 border-emerald-500/25 border' },
    { name: 'Creative Designer', desc: 'Warm palettes and rounded offset borders.', style: 'from-amber-100 to-rose-100 text-slate-800' },
    { name: 'Glassmorphism', desc: 'Frosted panels and glowing shapes.', style: 'from-indigo-950/50 to-pink-950/50 backdrop-blur border border-white/10' },
    { name: 'Corporate', desc: 'Structured columns and formal navy grids.', style: 'from-blue-900 to-slate-800' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-50 py-4 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white">
            <span className="bg-indigo-600 p-1.5 rounded-lg text-sm">CF</span>
            <span>CodeFolio</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-350 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-28 px-6 text-center max-w-4xl mx-auto">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5" />
            <span>Build, Customize, and Host instantly</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            Create Your Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Developer Portfolio
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Choose from beautiful responsive themes, customize details in a live-updating builder, upload documents, and publish to a custom URL in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all hover:translate-y-[-2px] shadow-lg shadow-indigo-600/30 text-base"
            >
              <span>Build For Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Split Builder</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Edit profiles, add skills, and attach project slide decks. Watch the preview update instantly without reloading.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">6 Distinct Themes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Toggle between Minimal, Corporate, Glassmorphism, and Developer aesthetics. Customize to match your specific style.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Secure Host</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Includes JWT protection, input sanitization, dynamic SEO tags, and Nodemailer integration to hide your contact details.
            </p>
          </div>
        </div>
      </section>

      {/* Themes Showcases */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900 space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Multiple Curated Presets</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Every theme automatically handles projects grids, responsive about sections, resume links, and contact mailers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themesShowcase.map((theme, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-gradient-to-br ${theme.style} flex flex-col justify-between aspect-[4/3] shadow-lg`}
            >
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Preset {index + 1}</span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{theme.name}</h3>
                <p className="text-xs opacity-80 leading-relaxed font-light">{theme.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-6 text-center border-t border-slate-900 bg-slate-950 relative">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Create Your Profile Today</h2>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Publish your portfolio under a customized public route (e.g. localhost:3000/username). Share your URL with hiring managers and teams!
          </p>
          <div>
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-semibold hover:bg-slate-100 transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-655 mt-16">&copy; {new Date().getFullYear()} CodeFolio. Crafted for developers.</p>
      </footer>
    </div>
  );
};

export default Home;
