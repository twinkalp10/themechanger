import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "./layout.css";
import "../../Styles/main.css";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <div>
        <Sidebar />
      </div>
      <div className="mainContent">
        <Header />
        <div className="children">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
