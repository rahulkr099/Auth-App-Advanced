import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function RefreshHandler({ setIsAuthenticated, isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage
    // const token = localStorage.getItem("token");
    if (isAuthenticated == true) {
      setIsAuthenticated(true);
      console.log('authenticate', isAuthenticated)
      // Redirect to home if accessing public routes
      const publicRoutes = ["/", "/login", "/signup"];
      if (publicRoutes.includes(location.pathname)) {
        navigate("/home", { replace: false });
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [location.pathname, setIsAuthenticated, navigate, isAuthenticated]);

  // No UI rendering for this component
  return null;
}

export default RefreshHandler;
