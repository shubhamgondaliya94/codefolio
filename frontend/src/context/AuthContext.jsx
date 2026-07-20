import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists in localStorage on startup
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user dashboard to verify token is valid
        const response = await API.get('/api/dashboard');
        if (response.data && response.data.success) {
          const portfolio = response.data.data;
          setUser({
            id: portfolio.userId,
            username: portfolio.username,
            email: portfolio.email || '',
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Initial auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login handler
  const login = async (username, password) => {
    try {
      const response = await API.post('/api/login', { username, password });
      if (response.data && response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || {},
      };
    }
  };

  // Signup handler
  const signup = async (username, email, password) => {
    try {
      const response = await API.post('/api/signup', { username, email, password });
      if (response.data && response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
        errors: error.response?.data?.errors || {},
      };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await API.post('/api/logout');
    } catch (error) {
      console.error('Logout API warning:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
