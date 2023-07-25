import React, { useState } from "react";
import { useAuth } from "../Components/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
        auth?.login(username, password);
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
      {auth?.user && (
        <div> {auth.user.existingUser.USER_NAME} is logged In </div>
      )}
      {!auth?.user && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button type="submit">Log in</button>
          </form>
          {error && <div>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Login;
