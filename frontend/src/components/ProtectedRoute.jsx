import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
