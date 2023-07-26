import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  existingUser: {
    USER_NAME: string;
    PASSWORD: string;
  };
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  // signup: (USER_NAME: string, PASSWORD: string) => void;
  login: (USER_NAME: string, PASSWORD: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const storedUser = localStorage.getItem("user");
  storedUser && console.log(JSON.parse(storedUser));

  useEffect(() => {
    if (storedUser && JSON.parse(storedUser)) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (USER_NAME: string, PASSWORD: string) => {
    const response = await axios.post("http://localhost:3000/login", {
      USER_NAME: USER_NAME,
      PASSWORD: PASSWORD,
    });

    if (response.status === 200) {
      setUser(response.data);
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
