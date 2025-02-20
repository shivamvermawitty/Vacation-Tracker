import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ name: '' });
  const [userToken, setUserToken] = useState(null);
  let c = useRef(0);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userToken,
        setUserToken,
        c,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
