import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (token) => {
    setIsLogged(true);
    const decodedToken = jwtDecode(token);
    const userIdFromToken = decodedToken.id;
    setUserId(userIdFromToken);
  };

  const logout = () => {
    setIsLogged(false);
    setUserId(null);
  };
  return (
    <AuthContext.Provider value={{ isLogged, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
