import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  // First check if we're still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Then check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Finally check for role-based access
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    console.log('User role:', userRole, 'Required roles:', requiredRoles);
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

export default ProtectedRoute;