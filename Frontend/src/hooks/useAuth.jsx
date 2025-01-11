import { useState, useEffect } from 'react';
import fetchWithAuth from '../api/fetchWithAuth';
import refreshToken from '../api/refreshToken';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetchWithAuth(`http://localhost:4000/api/v1/auth/status`, {
          method: 'POST',
          credentials: 'include', // To include cookies if needed
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }), // Send the token as a JSON object
        });

        const data = await response.json(); // Parse response as JSON
        console.log('useAuth.jsx response:', data);
        console.log('message:', data.message);
        if (response.ok && data.success) {
          // setIsAuthenticated(!!accessToken); // Set true if accessToken exists
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);

        }
      } else {
        setIsAuthenticated(false);
      }


    }

    checkLoginStatus();
        // Set up token refresh logic
        const refreshInterval = setInterval(async () => {
          const newAccessToken = await refreshToken();
          if (!newAccessToken) {
            setIsAuthenticated(false);
            clearInterval(refreshInterval);
          }
        }, 4 * 60 * 1000); // Refresh token every 4 minutes
    
        return () => clearInterval(refreshInterval);
      
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken'); // Clear the token
    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirect to login
  };
  return { isAuthenticated, setIsAuthenticated, logout };
};

export default useAuth;
