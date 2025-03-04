import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './screen/Register';
import Login from './screen/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './screen/Profile';
import Home from './screen/Home';
import { UserProvider } from './UserProvider';
import AddEvent from './screen/Events/AddEvent';
import Events from './screen/Events';
import RouteWrapper from './components/RouteWrapper';
import UpdateEvent from './screen/Events/UpdateEvent';
import AdminRouteGuard from './components/AdminRouteGaurd';
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteWrapper>
                <Profile />
              </RouteWrapper>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/event"
            element={
              <RouteWrapper>
                <AdminRouteGuard>
                  <Events />
                </AdminRouteGuard>
              </RouteWrapper>
            }
          />
          <Route
            path="/event/addEvent"
            element={
              <RouteWrapper>
                <AdminRouteGuard>
                  <AddEvent />
                </AdminRouteGuard>
              </RouteWrapper>
            }
          />
          <Route
            path="/event/updateEvent/:id"
            element={
              <RouteWrapper>
                <AdminRouteGuard>
                  <UpdateEvent />
                </AdminRouteGuard>
              </RouteWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
