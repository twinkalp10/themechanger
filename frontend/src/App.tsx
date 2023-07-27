import React from "react";
import { AuthProvider } from "./Utils/AuthContext";
import ThemeProvider from "./Utils/ThemeContext";
import MainRouter from "./MainRouter";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
