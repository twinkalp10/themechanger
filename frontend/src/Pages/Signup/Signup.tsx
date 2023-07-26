import React, { useState } from "react";
import { useAuth } from "../../Utils/AuthContext";
import { useNavigate, useLocation, Navigate, NavLink } from "react-router-dom";
import axios from "../../lib/axios";
import "../Login/Login.css";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        USER_NAME: username,
        PASSWORD: password,
      });

      if (response.status === 200) {
        auth?.setSignup(response.data);
        console.log(response.data);
        navigate("/login", { replace: true });
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      setError("something went wrong with signup");
    }
  };

  return (
    <div>
      {!auth?.user && (
        <div className="loginContainer">
          <h1>Create a new account</h1>
          <p>Customise dashboard in your way!</p>
          <form onSubmit={handleSignup} className="loginForm">
            <div className="inputContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="username">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button type="submit">Sign up</button>
          </form>

          <div className="signupLink">
            <p>
              Already have an account?
              <NavLink to="/login">
                <span>Log in</span>
              </NavLink>
            </p>
          </div>
          {error && <div>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Signup;
