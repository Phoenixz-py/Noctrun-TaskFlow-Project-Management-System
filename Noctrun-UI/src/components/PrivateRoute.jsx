// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated"); // Example check

//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;
// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is logged in (using localStorage, session, or context)
  const isLoggedIn = localStorage.getItem('user'); // Assuming 'user' is stored after login

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }

  // Allow access to the dashboard if logged in
  return children;
};

export default PrivateRoute;
