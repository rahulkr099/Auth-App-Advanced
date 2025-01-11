import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './hooks/RefreshHandler';
import useAuth from './hooks/useAuth'
import Navbar from './components/Navbar';
import PropTypes from 'prop-types'
import ResetPassword from './components/ResetPassword';
import ResetPasswordRequest from './components/ResetPasswordRequest';

// PrivateRoute Component
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  // console.log('app me isauth ka value',isAuthenticated);
  return (
    <div>
      {/* Navbar is available on every page */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* Ensures the authentication state is refreshed on page load */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />

      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected route for authenticated users */}
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />}
        />

        {/* Public routes for Login and Signup */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password-token" element={<ResetPasswordRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

// Define prop types for PrivateRoute
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
