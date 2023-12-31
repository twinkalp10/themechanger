import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps, User } from "../type";
import { getUserLocalStorage } from "./getUserLocalStorage";

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const loggedInUser = getUserLocalStorage();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const setLogin = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const setSignup = (user: User) => {
    localStorage.setItem("newUser", JSON.stringify(user));
  };

  const setLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setLogin, setLogout, setSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
