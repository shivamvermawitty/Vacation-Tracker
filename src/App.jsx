import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Home from './components/Home';
import { UserProvider } from './UserProvider';
import AddEvent from './components/AddEvent';
import RouteWrapper from './components/RouteWrapper';

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
              <RouteWrapper>
                <Profile />
              </RouteWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <RouteWrapper>
                <Home />
              </RouteWrapper>
            }
          />
          <Route
            path="/addEvent"
            element={
              <RouteWrapper>
                <AddEvent />
              </RouteWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </UserProvider>
  );
}

export default App;
