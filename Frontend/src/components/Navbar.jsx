// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import PropTypes from 'prop-types'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = "http://localhost:4000/api/v1/logout"
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include', //Include cookies in the request

        }
      );
      const result = await response.json();
      console.log("logout",result);
      const { message } = result;
      if (response.ok && result.success) {
        handleSuccess(message);
        // console.log('response.ok and result.success:',response.ok,result.success)
        setTimeout(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          navigate('/login');
        }, 2000);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(`Network error. Please try again.${error}`);
    }
    // console.log('useauth check kro')
  };
  return (
    <nav className='text-xl bg-blue-500 drop-shadow-xl backdrop-filter backdrop-blur-xl bg-opacity-90 '>
      <ul className='flex justify-around gap-3 p-1 '>
        <li className='hover:text-green-400'><Link to="/home">Home</Link></li>
        {isAuthenticated ? (
          <><button
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition hover:text-black"
              onClick={handleLogout}
            >Log Out</button>
          </> ) : (
          <div className='flex gap-2'> 
            <li className=' hover:text-green-400'><Link to="/login">Login</Link></li>
            <li className=' hover:text-green-400'><Link to="/signup">Signup</Link></li>
          </div>
        )}
      </ul>
    </nav>
  );
};
// Define prop types for PrivateRoute
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired
};

export default Navbar;
