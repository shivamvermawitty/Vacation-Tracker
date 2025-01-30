import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../App";
import getData from "../../ApiMethods";



export default function Navbar() {
 
  const {userDetails,setUserDetails}=useContext(UserContext)
  const [userName,setUserName]=useState()
  const [showLogOut, setShowLogOut] = useState(false);
  const navigate = useNavigate();
  // console.log(user)
  useEffect(()=>{
    async function fetchData() {
          try {
            const response =await getData()
            
            // setFormData((data) => ({
            //   ...data,
            //   firstName: response.firstName,
            //   lastName: response.lastName,
            //   email: response.email,
            //   password: response.password,
            //   contact: response.contact,
            //   dob: new Date(response.dob).toISOString().split("T")[0],
            //   gender: response.gender,
            // }));
            setUserName(response.firstName)
            setUserDetails(response)

          } catch (err) {
            console.log("Error fetching Data");
          }
        }
        fetchData();
  },[])

  function handleClick() {
    setShowLogOut((d) => !d);
  }
  function handleLogOut() {
    localStorage.clear();
   
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
                className=" btn fs col-12 m-0 p-0 d-flex align-items-center text-white"
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
