import React from "react";
import Sidebar from "./Components/Sidebar";
import "./Styles/Sidebar.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Pages/Profile";
import { AuthProvider } from "./Components/Auth";
import Login from "./Components/Login";
import RequireAuth from "./Components/RequireAuth";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import ThemeProvider from "./Components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/header" element={<Header />} />
              <Route path="/footer" element={<Footer />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
