import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ name: '' });
  const [userToken, setUserToken] = useState(null);
  let c = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let tempC = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const pos = useRef({});

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userToken,
        setUserToken,
        c,
        pos,
        tempC,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
