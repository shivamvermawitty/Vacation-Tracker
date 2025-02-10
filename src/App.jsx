import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RouteGaurd from './components/RouteGaurd';
import { UserProvider } from './UserProvider';
import AddEvent from './components/AddEvent/AddEvent';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <RouteGaurd>
                <Navbar />
                <Profile />
              </RouteGaurd>
            }
          />
          <Route
            path="/home"
            element={
              <RouteGaurd>
                <Navbar />
                <Home />
              </RouteGaurd>
            }
          />
          <Route
            path="/addEvent"
            element={
              <RouteGaurd>
                <Navbar />
                <AddEvent />
              </RouteGaurd>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </UserProvider>
  );
}

export default App;
