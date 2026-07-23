import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

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
    <div className="bg-noise bg-background text-text min-h-screen flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-accent selection:text-background">
      
      <div className="w-full max-w-md space-y-8 relative z-10 py-12">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-8 h-8 bg-accent border border-accent flex items-center justify-center font-display font-bold text-black text-lg group-hover:bg-transparent group-hover:text-accent transition-colors">
              CF
            </div>
            <span className="font-display font-bold tracking-tight text-xl text-text">CODEFOLIO</span>
          </Link>
          <h2 className="text-4xl font-display font-bold tracking-tighter uppercase text-text">Construct Identity</h2>
          <p className="text-muted uppercase tracking-widest text-xs font-bold">Initialize your developer portfolio</p>
        </div>

        {generalError && (
          <div className="p-4 border border-rose-500 bg-background text-rose-500 text-sm flex items-start gap-3 uppercase font-bold tracking-wider">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        <div className="brutalist-card p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Username Identifier
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b-2 rounded-none px-0 py-3 text-lg focus:outline-none focus:ring-0 transition-colors ${
                    errors.username
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-muted focus:border-accent'
                  }`}
                  placeholder="ID_STRING"
                />
              </div>
              {errors.username && <p className="text-rose-500 font-bold uppercase tracking-wider text-xs mt-2">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Comm Channel (Email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b-2 rounded-none px-0 py-3 text-lg focus:outline-none focus:ring-0 transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-muted focus:border-accent'
                  }`}
                  placeholder="USER@HOST.COM"
                />
              </div>
              {errors.email && <p className="text-rose-500 font-bold uppercase tracking-wider text-xs mt-2">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Access Token (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b-2 rounded-none px-0 py-3 text-lg focus:outline-none focus:ring-0 transition-colors ${
                    errors.password
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-muted focus:border-accent'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-rose-500 font-bold uppercase tracking-wider text-xs mt-2">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Verify Access Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b-2 rounded-none px-0 py-3 text-lg focus:outline-none focus:ring-0 transition-colors ${
                    errors.confirmPassword
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-muted focus:border-accent'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-rose-500 font-bold uppercase tracking-wider text-xs mt-2">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutalist-button w-full py-4 text-sm mt-4 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Identity'
              )}
            </button>

          </form>
        </div>

        <div className="text-center text-xs font-bold uppercase tracking-widest text-muted">
          Already Initialized?{' '}
          <Link to="/login" className="text-accent hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
            Authenticate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
