import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserContext } from './UserContext';
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ name: '' });
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [eventDetails, setEventDetails] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        leaveDetails,
        setLeaveDetails,
        eventDetails,
        setEventDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
