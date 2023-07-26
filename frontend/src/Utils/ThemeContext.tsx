import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextProps, ThemeProviderProps } from "../type";

const ThemeContext = createContext<ThemeContextProps | null>(null);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>({
    PRIMARY_COLOUR: "#007bff",
    SECONDARY_COLOUR: "#6c757d",
    TEXT_COLOUR: "#333",
    FONT_SIZE: 16,
    FONT: "Arial",
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--SECONDARY_COLOUR",
      theme.SECONDARY_COLOUR
    );
    document.documentElement.style.setProperty(
      "--PRIMARY_COLOUR",
      theme.PRIMARY_COLOUR
    );
    document.documentElement.style.setProperty(
      "--TEXT_COLOUR",
      theme.TEXT_COLOUR
    );
    document.documentElement.style.setProperty(
      "--FONT_SIZE",
      theme.FONT_SIZE + "px"
    );

    document.documentElement.style.setProperty("--FONT", theme.FONT);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = (): ThemeContextProps => {
  if (!useContext(ThemeContext))
    throw new Error("useTheme must be used within a ThemeProvider");

  return useContext(ThemeContext) as ThemeContextProps;
};
