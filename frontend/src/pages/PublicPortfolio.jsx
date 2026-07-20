import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { PortfolioRenderer } from '../themes';
import { HelpCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import API from '../services/api';

const PublicPortfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null); // null | 404 | 500

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setErrorStatus(null);
        // GET the user's public portfolio by username
        const response = await API.get(`/${username}`);
        if (response.data && response.data.success) {
          setPortfolio(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching public portfolio:', error);
        if (error.response && error.response.status === 404) {
          setErrorStatus(404);
        } else {
          setErrorStatus(500);
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicPortfolio();
    }
  }, [username]);

  // Loading skeleton screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-400">
        <div className="max-w-md w-full space-y-6 animate-pulse">
          <div className="h-10 bg-slate-900 rounded-lg w-1/3 mx-auto"></div>
          <div className="w-32 h-32 bg-slate-900 rounded-full mx-auto"></div>
          <div className="space-y-3">
            <div className="h-6 bg-slate-900 rounded-lg w-3/4 mx-auto"></div>
            <div className="h-4 bg-slate-900 rounded-lg w-5/6 mx-auto"></div>
          </div>
          <div className="space-y-4 pt-10">
            <div className="h-20 bg-slate-900 rounded-2xl"></div>
            <div className="h-20 bg-slate-900 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Not found (404) fallback screen
  if (errorStatus === 404 || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6 text-center font-sans">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-rose-600/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400 mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight">Portfolio Not Found</h1>
            <p className="text-sm text-slate-450 leading-relaxed">
              The user page <code className="text-indigo-400 font-mono">/{username}</code> does not exist or hasn't been set up yet.
            </p>
          </div>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Server error fallback screen
  if (errorStatus === 500) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6 text-center font-sans">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-amber-600/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight">Temporary Failure</h1>
            <p className="text-sm text-slate-450">
              An error occurred while loading this portfolio page. Please try refreshing again.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-xs font-semibold rounded-xl transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare dynamic SEO tags
  const siteTitle = `${portfolio.fullName || username} | ${portfolio.role || 'Portfolio'}`;
  const siteDesc = portfolio.bio || `Check out ${portfolio.fullName || username}'s professional developer portfolio.`;
  const canonicalUrl = `${window.location.origin}/${username}`;
  const metaImage = portfolio.profileImage || '';

  return (
    <>
      <Helmet>
        {/* Basic SEO Tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph Tags (Facebook, LinkedIn) */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:url" content={canonicalUrl} />
        {metaImage && <meta property="og:image" content={metaImage} />}
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        {metaImage && <meta name="twitter:image" content={metaImage} />}
      </Helmet>

      {/* Render the selected portfolio layout */}
      <PortfolioRenderer selectedTheme={portfolio.selectedTheme} data={portfolio} isPreview={false} />
    </>
  );
};

export default PublicPortfolio;
