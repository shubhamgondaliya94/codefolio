import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      validationErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      validationErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    const result = await signup(
      formData.username.trim(),
      formData.email.trim(),
      formData.password
    );
    setLoading(false);

    if (result.success) {
      // Redirect to login with success parameters
      navigate('/login?signup=success');
    } else {
      if (result.errors && Object.keys(result.errors).length > 0) {
        setErrors(result.errors);
      } else {
        setGeneralError(result.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 font-extrabold text-2xl tracking-tight text-white mb-2">
            <span className="bg-indigo-600 p-1.5 rounded-lg text-sm">CF</span>
            <span>CodeFolio</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">Create your developer account</h2>
          <p className="text-sm text-slate-400">Launch a beautiful responsive portfolio page</p>
        </div>

        {generalError && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-350 text-xs rounded-xl flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.username
                      ? 'border-rose-500/50 focus:ring-rose-500/35 focus:border-rose-500'
                      : 'border-slate-800 focus:ring-indigo-500/35 focus:border-indigo-500'
                  }`}
                  placeholder="john_doe"
                />
              </div>
              {errors.username && <p className="text-rose-455 text-xs mt-1.5">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500/50 focus:ring-rose-500/35 focus:border-rose-500'
                      : 'border-slate-800 focus:ring-indigo-500/35 focus:border-indigo-500'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-rose-455 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-500/50 focus:ring-rose-500/35 focus:border-rose-500'
                      : 'border-slate-800 focus:ring-indigo-500/35 focus:border-indigo-500'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-rose-455 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? 'border-rose-500/50 focus:ring-rose-500/35 focus:border-rose-500'
                      : 'border-slate-800 focus:ring-indigo-500/35 focus:border-indigo-500'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-rose-455 text-xs mt-1.5">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>

          </form>
        </div>

        <div className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
