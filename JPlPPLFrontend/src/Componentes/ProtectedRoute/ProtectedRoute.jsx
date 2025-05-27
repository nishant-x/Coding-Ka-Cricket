// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useAuth();

  // If no allowedRoles, allow access (public route)
  if (!allowedRoles) return children;

  // If userRole is not in allowedRoles, redirect
  if (!allowedRoles.includes(userRole)) {
    return userRole === 'guest' ? (
      <Navigate to="/" replace />  // Guests go to login
    ) : (
      <Navigate to="/" replace />  // Logged-in but wrong role
    );
  }

  // If allowed, render children
  return children;
};

export default ProtectedRoute;