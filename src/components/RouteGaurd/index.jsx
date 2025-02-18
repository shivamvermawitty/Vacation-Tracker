import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStorage } from '../../storageMethod';

const RouteGuard = ({ children }) => {
  const isAuthenticated = getStorage('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteGuard;
