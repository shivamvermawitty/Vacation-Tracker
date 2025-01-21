import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
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
