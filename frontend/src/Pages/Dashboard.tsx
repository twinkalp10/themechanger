import React from "react";
import Sidebar from "../Components/Sidebar";
import ThemeColorPicker from "../Components/ThemeColorPicker";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <div>
        <ThemeColorPicker />
      </div>
    </div>
  );
};

export default Dashboard;
