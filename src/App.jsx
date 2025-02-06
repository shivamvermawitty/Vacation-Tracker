import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import RouteGaurd from './components/RouteGaurd/RauteGaurd'
import { jwtDecode } from "jwt-decode";
import React,{ createContext, useState } from "react"
import AddEvent from "./components/AddEvent/AddEvent";

const UserContext=createContext()

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    
    <Register />
    </>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <RouteGaurd>
        <Navbar />
        <Profile />
      </RouteGaurd>
    ),
  },
  {
    path:'/home',
    element: (
      <RouteGaurd>
        <Navbar />
        <Home />
      </RouteGaurd>
    )
  },
  {
    path:'/addEvent',
    element:(
      <RouteGaurd>
        <Navbar />
        <AddEvent/>
      </RouteGaurd>
    )
  }
]);

function App() {
  
  const [userDetails,setUserDetails]=useState({name:'Shivam'})
  const [leaveDetails,setLeaveDetails]=useState(null)
  
  return (
    <div>
      {/* <Register />
      <Login /> */}
      <UserContext.Provider value={{userDetails,setUserDetails , leaveDetails , setLeaveDetails}}>
      
      <RouterProvider router={router} />
      </UserContext.Provider>
    
      
      
    </div>
  );
}


export default App;
export {UserContext};