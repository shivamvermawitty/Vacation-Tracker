import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserContext } from './UserContext';
import { getStorage } from './storageMethod';

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userToken, setUserToken] = useState(getStorage('authToken'));

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
