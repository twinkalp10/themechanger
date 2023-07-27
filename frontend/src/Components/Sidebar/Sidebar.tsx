import React from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/info",
    name: "Info",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const excludePaths = ["/login", "/signup"];

  if (excludePaths.includes(currentPath)) {
    return null;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebarmenu">
          {sidebarItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              {item.name}{" "}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
