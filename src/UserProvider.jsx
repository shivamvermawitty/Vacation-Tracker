import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ name: '' });
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
