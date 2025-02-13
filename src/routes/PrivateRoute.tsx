import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { APICore } from "../helpers/api/apiCore";

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const api = new APICore();
  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (api.isUserAuthenticated() === false) {
          // not logged in so redirect to login page with the return url
          return (
            <Navigate
              // state={from: props['path']}
              to={{
                pathname: "/auth/login",
                // state: { from: props['path'] },
              }}
            />
          );
        }

        const loggedInUser = api.getLoggedInUser();
        // check if route is restricted by role
        // if (roles && roles.indexOf(loggedInUser.role) === -1) {
        if (roles) {
          // role not authorised so redirect to login page
          return <Navigate to={{ pathname: "/" }} />;
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
