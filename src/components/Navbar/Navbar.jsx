import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const userName = JSON.parse(localStorage.getItem("userData"))?.firstName;
  console.log(userName);
  const [showLogOut, setShowLogOut] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setShowLogOut((d) => !d);
  }
  function handleLogOut() {
    navigate("/Login");
  }
  return (
    <div className=" d-grid container-fluid navBar">
      <div className="row">
        <ul className=" col-6 d-flex gap-3">
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
        </ul>
        <div className="col-6 d-flex justify-content-end">
          <div className="d-grid">
            <div className="row">
              <p
                className=" btn fs col-12 m-0 p-0 d-flex align-items-center"
                onClick={handleClick}
              >
                Welcome {userName}
              </p>
              <div className="row">
                {showLogOut && (
                  <button className="col-6 bg-white btn" onClick={handleLogOut}>
                    LogOut
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
