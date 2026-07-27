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
    <div className="bg-noise bg-background text-text min-h-screen flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-accent selection:text-background">
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-8 h-8 bg-accent border border-accent flex items-center justify-center font-display font-bold text-black text-lg group-hover:bg-transparent group-hover:text-accent transition-colors">
              CF
            </div>
            <span className="font-display font-bold tracking-tight text-xl text-text">CODEFOLIO</span>
          </Link>
          <h2 className="text-4xl font-display font-bold tracking-tighter uppercase text-text">Authenticate</h2>
          <p className="text-muted uppercase tracking-widest text-xs font-bold">Access Identity Dashboard</p>
        </div>

        {/* Display System Notifications */}
        {isSessionExpired && (
          <div className="p-4 border border-rose-500 bg-background text-rose-500 text-sm flex items-start gap-3 uppercase font-bold tracking-wider">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Session expired. Re-authenticate.</span>
          </div>
        )}
        {justSignedUp && (
          <div className="p-4 border border-accent bg-background text-accent text-sm flex items-start gap-3 uppercase font-bold tracking-wider">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Identity initialized. Proceed to login.</span>
          </div>
        )}
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
                Username
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

            <button
              type="submit"
              disabled={loading}
              className="brutalist-button w-full py-4 text-sm mt-4 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Initialize Session'
              )}
            </button>

          </form>
        </div>

        <div className="text-center text-xs font-bold uppercase tracking-widest text-muted">
          No Identity?{' '}
          <Link to="/signup" className="text-accent hover:text-text transition-colors border-b border-transparent hover:border-text pb-0.5">
            Construct One
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
