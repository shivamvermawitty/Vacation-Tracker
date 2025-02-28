import getData from '../../ApiMethods';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from '../../storageMethod';
import './Navbar.css';
import { useUser } from '../../useUser';
import NavBarLink from './NavBarLink';

export default function Navbar() {
  const { userDetails, setUserDetails, userToken, setUserToken } = useUser();
  const [userName, setUserName] = useState(null);
  const [showLogOut, setShowLogOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getData();
        setUserName(response.firstName);
        setUserDetails(response);
      } catch (err) {
        console.log('Error fetching Data', err);
      }
    }

    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  function handleClick() {
    setShowLogOut((d) => !d);
  }
  function handleLogOut() {
    clearStorage();
    setUserName(null);
    setUserDetails(null);
    setShowLogOut((val) => !val);
    setUserToken(null);
    navigate('/');
  }
  return (
    <>
      <div className="row navBar">
        <ul className=" col-8 d-flex align-items-center gap-3">
          <NavBarLink value="Home" route="/" />

          {userToken ? (
            <NavBarLink value="Profile" route="/profile" />
          ) : (
            <>
              <NavBarLink value="LogIn" route="/login" />
              <NavBarLink value="SignUp" route="/register" />
            </>
          )}

          {userDetails?.email == 'admin@admin.com' ? (
            <>
              <NavBarLink value="Events" route="/event" />
            </>
          ) : (
            ''
          )}
        </ul>
        {userToken ? (
          <div className="col-4 d-flex flex-column">
            <p
              className=" btn fs d-flex justify-content-end text-white"
              onClick={handleClick}
            >
              Welcome {userName}
            </p>
          </div>
        ) : null}
      </div>
      <div className="d-flex justify-content-end mx-4">
        {showLogOut && (
          <button className="bg-white logOutBtn" onClick={handleLogOut}>
            LogOut
          </button>
        )}
      </div>
    </>
  );
}
