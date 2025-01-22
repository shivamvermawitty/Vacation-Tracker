import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


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
    element: <>
    <Navbar/>
    <Profile />
    </>,
  },
  {
    path:'/home',
    element:<>
    <Navbar/>
    <Home/>
    </>
  }
]);

function App() {
  return (
    <div>
      {/* <Register />
      <Login /> */}
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
