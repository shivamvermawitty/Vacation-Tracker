import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RouteGaurd from './components/RouteGaurd';
import { createContext, useState } from 'react';
import AddEvent from './components/AddEvent/AddEvent';

const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: (
      <RouteGaurd>
        <Navbar />
        <Profile />
      </RouteGaurd>
    ),
  },
  {
    path: '/home',
    element: (
      <RouteGaurd>
        <Navbar />
        <Home />
      </RouteGaurd>
    ),
  },
  {
    path: '/addEvent',
    element: (
      <RouteGaurd>
        <Navbar />
        <AddEvent />
      </RouteGaurd>
    ),
  },
]);

function App() {
  const [userDetails, setUserDetails] = useState({ name: 'Shivam' });
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [eventDetails, setEventDetails] = useState([
    {
      eventName: 'Maha Shivratri',
      date: '2025-02-26T00:00:00.000+00:00',
    },
    {
      eventName: 'New Year',
      date: '2025-01-01T00:00:00.000+00:00',
    },
    {
      eventName: 'Makar Shankranti',
      date: '2025-01-14T00:00:00.000+00:00',
    },
  ]);

  return (
    <div>
      {/* <Register />
      <Login /> */}
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
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
