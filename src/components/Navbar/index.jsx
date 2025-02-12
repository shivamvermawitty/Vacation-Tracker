import getData from '../../ApiMethods';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';
import { useUser } from '../../useUser';

export default function Navbar() {
  const { userDetails, setUserDetails } = useUser();
  const [userName, setUserName] = useState();
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

    fetchUserData();
    // fetchLeaveDetail();
  }, [setUserDetails]);

  function handleClick() {
    setShowLogOut((d) => !d);
  }
  function handleLogOut() {
    localStorage.clear();

    navigate('/Login');
  }
  return (
    <>
      <div className="row navBar">
        <ul className=" col-8 d-flex gap-3">
          <li className="p-2 list-unstyled">
            <Link className=" fs text-white text-decoration-none" to="/home">
              Home
            </Link>
          </li>
          <li className="p-2 list-unstyled">
            <Link className=" fs text-white text-decoration-none" to="/profile">
              Profile
            </Link>
          </li>
          {userDetails.email == 'admin@admin.com' ? (
            <li className="p-2 list-unstyled">
              <Link
                className=" fs text-white text-decoration-none"
                to="/addEvent"
              >
                Add Event
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
        <div className="col-4 d-flex flex-column justify-content-end">
          <p
            className=" btn fs d-flex justify-content-end text-white"
            onClick={handleClick}
          >
            Welcome {userName}
          </p>
        </div>
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
