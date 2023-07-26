import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth";

const sidebarItems = [
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/info",
    name: "Info",
  },
];

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = () => {
  const auth = useAuth();

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
