
import { Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {

  const isAuthenticated = localStorage.getItem('authToken'); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RouteGuard;
