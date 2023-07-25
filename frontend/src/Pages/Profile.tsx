import React from "react";
import { useAuth } from "../Components/Auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };
  console.log(auth);
  return (
    <div>
      <React.Fragment>
        <div>Welcome {auth?.user?.existingUser.USER_NAME} </div>
        <button onClick={handleLogout}>Log out</button>
      </React.Fragment>
    </div>
  );
};

export default Profile;
