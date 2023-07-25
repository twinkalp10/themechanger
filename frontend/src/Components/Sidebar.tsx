import React from "react";
import "../Styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth";

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
    path: "/header",
    name: "Header",
  },
  {
    path: "/footer",
    name: "Footer",
  },
];

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const auth = useAuth();

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebarmenu">
          <div className="loginButton">
            {!auth?.user && (
              <NavLink to="/login" className="link">
                Log In
              </NavLink>
            )}
          </div>
          {sidebarItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              {item.name}{" "}
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
