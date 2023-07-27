import React, { useState } from "react";
import { useNavigate, useLocation, Navigate, NavLink } from "react-router-dom";
import axios from "../../lib/axios";
import "./Login.css";
import { useAuth } from "../../Utils/AuthContext";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        USER_NAME: username,
        PASSWORD: password,
      });

      if (response.status === 200) {
        console.log(response.data);
        auth?.setLogin(response.data);
        navigate(redirectPath, { replace: true });
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      setError("something went wrong with login");
    }
  };

  return (
    <div>
      {auth?.user && <Navigate to={redirectPath} replace={true} />}
      {!auth?.user && (
        <div className="loginContainer">
          <h1>Log in to your account</h1>
          <p>Welcome back! Please enter your details.</p>
          <form onSubmit={handleLogin} className="loginForm">
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

            <button type="submit">Log in</button>
          </form>

          <div className="signupLink">
            <p>
              Don’t have an account?
              <NavLink to="/signup">
                <span>Sign up</span>
              </NavLink>
            </p>
          </div>
          {error && <div>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Login;
