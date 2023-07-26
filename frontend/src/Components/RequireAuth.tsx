import React from "react";
import { useAuth } from "../Utils/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <div>{children}</div>;
};

export default RequireAuth;
