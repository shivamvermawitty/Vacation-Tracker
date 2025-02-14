import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserContext } from './UserContext';
import getData from './ApiMethods';
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(getData() && { name: '' });
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
