import React from "react";
import { AuthProvider } from "./Components/Auth";
import ThemeProvider from "./Components/ThemeContext";
import MainRouter from "./MainRouter";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
