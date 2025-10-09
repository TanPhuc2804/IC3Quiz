import axios from "axios";
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  id: string;
  fullname: string;
  status: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setAuth: (data: User) => void;
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

  const setAuth = (data: User) => {
    setUser(data);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(`${apiUrl}/auth/logout`, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          localStorage.removeItem("authUser");
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
