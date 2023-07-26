import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ThemeColorPicker from "../../Components/ThemeColorPicker";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <h2>Select your theme preferences</h2>
      <div>
        <ThemeColorPicker />
      </div>
    </div>
  );
};

export default Dashboard;
