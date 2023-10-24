import React from "react";
import { Route, Navigate } from "react-router-dom";

// Define a PrivateRoute component
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate replace to="/login" /> // Redirect to the login page if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute;
