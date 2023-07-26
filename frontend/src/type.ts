export interface User {
  USER_NAME: string;
  ID: number;
  TOKEN: string
}


export interface AuthContextProps {
  user?: User;
  setLogin: (user: User) => void;
  setSignup: (user: User) => void;
  setLogout: () => void;
}

export interface Theme {
  PRIMARY_COLOUR: string;
  SECONDARY_COLOUR: string;
  TEXT_COLOUR: string;
  FONT_SIZE: number;
  FONT: string;
}

export interface ThemeContextProps {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

