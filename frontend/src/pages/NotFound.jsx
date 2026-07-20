import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 text-center font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-white font-mono tracking-wider">404</h1>
          <h2 className="text-xl font-bold text-slate-200">Lost in Cyberspace?</h2>
          <p className="text-sm text-slate-450 leading-relaxed">
            The page you are looking for does not exist or has been moved. Use the navigation below to get back on track.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/10"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
