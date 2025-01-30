import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (false) {
          return (
            <Navigate
              to={{
                pathname: "/auth/login",
              }}
            />
          );
        }

        // const loggedInUser = api.getLoggedInUser();

        // check if route is restricted by role
        if (roles) {
          // role not authorised so redirect to login page
          return <Navigate to={{ pathname: "/" }} />;
        }
        // authorised so return component
        return <Component {...props} />
      }}
    />
  );
};

export default PrivateRoute;
