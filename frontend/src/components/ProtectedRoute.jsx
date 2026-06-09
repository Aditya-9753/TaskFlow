import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

/**
 * Route wrapper that redirects unauthenticated users to the Login page.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main transition-theme">
        <Loader size="lg" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * Route wrapper that redirects authenticated users to the Dashboard page.
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main transition-theme">
        <Loader size="lg" />
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};
