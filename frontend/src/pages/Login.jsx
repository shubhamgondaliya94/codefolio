import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Extract query messages
  const isSessionExpired = searchParams.get('message') === 'session_expired';
  const justSignedUp = searchParams.get('signup') === 'success';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.username.trim()) validationErrors.username = 'Username is required';
    if (!formData.password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    const result = await login(formData.username, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      if (result.errors && Object.keys(result.errors).length > 0) {
        setErrors(result.errors);
      } else {
        setGeneralError(result.message || 'Invalid credentials. Please try again.');
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
          <h2 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
          <p className="text-sm text-slate-400">Manage and edit your portfolio profile</p>
        </div>

        {/* Display System Notifications */}
        {isSessionExpired && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-350 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>Your session has expired. Please authenticate again to access dashboard.</span>
          </div>
        )}
        {justSignedUp && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-350 text-xs rounded-xl flex items-start gap-2">
            <CheckCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>Account created successfully! Log in below.</span>
          </div>
        )}
        {generalError && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-350 text-xs rounded-xl flex items-start gap-2">
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
                  placeholder="enter username"
                />
              </div>
              {errors.username && <p className="text-rose-455 text-xs mt-1.5">{errors.username}</p>}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>

          </form>
        </div>

        <div className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
