import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <p>Header</p>
      <NavLink to="/login">
        <button>Log in</button>
      </NavLink>
    </div>
  );
};

export default Header;
