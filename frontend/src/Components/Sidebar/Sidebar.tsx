import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

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
