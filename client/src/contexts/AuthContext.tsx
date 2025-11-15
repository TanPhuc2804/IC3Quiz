import axios from "axios";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  id: string;
  fullname: string;
  status: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setAuth: (data: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setAuth = (data: User | null) => {
    setUser(data);
    if (data) {
      localStorage.setItem("authUser", JSON.stringify(data));
    } else {
      localStorage.removeItem("authUser");
    }
  };

  const logout = () => {
    setUser(null);
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(`${apiUrl}/auth/logout`, { withCredentials: true })
      .then(async response => {
        if (response.data.status) {
          await new Promise(resolve => setTimeout(resolve, 50))
          window.location.href = '/';
        }
      });

  };

  const value: AuthContextType = { user, setAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
