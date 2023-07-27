import React from "react";
import "./footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const excludePaths = ["/login", "/signup"];

  if (excludePaths.includes(currentPath)) {
    return null;
  }
  return (
    <div className="footer">
      <div className="footerText">@Footer.io</div>
    </div>
  );
};

export default Footer;
