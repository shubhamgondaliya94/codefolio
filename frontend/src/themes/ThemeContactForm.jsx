import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';

const ThemeContactForm = ({ username, themeVariant = 'dark' }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      setStatus({ type: 'error', text: 'All fields are required!' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Direct POST to public contact API
      const response = await API.post(`/api/contact/${username}`, formData);
      if (response.data && response.data.success) {
        setStatus({ type: 'success', text: response.data.message || 'Message sent successfully!' });
        setFormData({ senderName: '', senderEmail: '', message: '' });
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus({
        type: 'error',
        text: error.response?.data?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const isLight = themeVariant === 'light';

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {status && (
        <div
          className={`p-3 rounded-lg flex items-start gap-2 border text-sm ${
            status.type === 'success'
              ? isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : isLight
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <div>
        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Your Name
        </label>
        <input
          type="text"
          name="senderName"
          value={formData.senderName}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-400'
              : 'bg-slate-900/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50 focus:border-indigo-500'
          }`}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Your Email
        </label>
        <input
          type="email"
          name="senderEmail"
          value={formData.senderEmail}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-400'
              : 'bg-slate-900/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50 focus:border-indigo-500'
          }`}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-400'
              : 'bg-slate-900/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50 focus:border-indigo-500'
          }`}
          placeholder="Hi, I would love to collaborate..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${
          isLight
            ? 'bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 disabled:opacity-50'
        }`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ThemeContactForm;
