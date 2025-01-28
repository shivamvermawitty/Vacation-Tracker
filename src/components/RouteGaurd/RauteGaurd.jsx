import React from 'react';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {
  // Replace this with your actual authentication check logic
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); // or use context/store

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RouteGuard;
