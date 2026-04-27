// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Call this after successful login with the response body
  const login = (userData) => {
    // userData = { token, type, email, name, avatarUrl, role, message }
    const userToStore = {
      email: userData.email,
      name: userData.name,
      role: userData.role, // "USER" or "ADMIN"
      avatarUrl: userData.avatarUrl,
    };
    setUser(userToStore);
    localStorage.setItem("user", JSON.stringify(userToStore));
    localStorage.setItem("token", userData.token); // for API calls
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
