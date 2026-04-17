import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext/AuthContext';

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/" }) => {
  const { userRole } = useAuth();

  // If no allowedRoles, allow access (public route)
  if (!allowedRoles) return children;

  // If userRole is not in allowedRoles, redirect
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // If allowed, render children
  return children;
};

export default ProtectedRoute;
