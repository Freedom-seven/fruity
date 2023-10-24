import React from "react";
import { Route, Navigate } from "react-router-dom";

// Replace this with your actual authentication logic
const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., by checking if a user token exists in localStorage)
  const userToken = localStorage.getItem("userToken");
  return userToken !== null;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate replace to="/login" /> // Redirect to the login page if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute;
