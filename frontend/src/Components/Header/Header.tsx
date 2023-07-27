import React from "react";
import "./header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const excludePaths = ["/login", "/signup"];

  if (excludePaths.includes(currentPath)) {
    return null;
  }
  return (
    <div className="header">
      <p>Theme Changer</p>
      {!auth?.user ? (
        <NavLink to="/login">
          <button>Log in</button>
        </NavLink>
      ) : (
        <p> {auth.user.USER_NAME} </p>
      )}
    </div>
  );
};

export default Header;
