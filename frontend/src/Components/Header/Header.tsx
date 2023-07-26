import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const Header = () => {
  const auth = useAuth();
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
