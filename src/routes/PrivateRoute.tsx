import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { APICore } from "../helpers/api/apiCore";

interface PrivateRouteProps {
  roles?: string[];
  children: ReactNode;
}
interface LoggedInUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, children }) => {
  const api = new APICore();
  const location = useLocation();

  const isAuthenticated = api.isUserAuthenticated();
  const loggedInUser = api.getLoggedInUserInfo() as LoggedInUser | null;

  if (!isAuthenticated) {
    console.log("Redirecting to /auth/login");
    return <Navigate to="/auth/login" />;
  } 

  if (roles && roles.length > 0) {
    if (
      !roles.some(
        (role) => role.toLowerCase() === loggedInUser?.role.toLowerCase()
      )
    ) {
      console.log("User does not have required role. Redirecting to /");
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
