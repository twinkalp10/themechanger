import React from "react";
import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth?.setLogout();
    navigate("/login");
  };
  return (
    <div className="profileContainer">
      <h1>Welcome {auth?.user?.USER_NAME}! </h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Profile;
