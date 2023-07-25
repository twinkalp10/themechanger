import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  PRIMARY_COLOUR: string;
  SECONDARY_COLOUR: string;
  TEXT_COLOUR: string;
  FONT_SIZE: string;
  FONT_FAMILY: string;
}

interface ThemeContextProps {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>({
    PRIMARY_COLOUR: "#007bff",
    SECONDARY_COLOUR: "#6c757d",
    TEXT_COLOUR: "#333",
    FONT_SIZE: "16px",
    FONT_FAMILY: "Arial, sans-serif",
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
    document.documentElement.style.setProperty("--FONT_SIZE", theme.FONT_SIZE);
    document.documentElement.style.setProperty(
      "--FONT_FAMILY",
      theme.FONT_FAMILY
    );
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
