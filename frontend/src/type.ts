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

