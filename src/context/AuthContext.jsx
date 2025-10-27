// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(
    localStorage.getItem("ticketapp_session")
  );

  // Sync session when localStorage changes
  useEffect(() => {
    const storedSession = localStorage.getItem("ticketapp_session");
    if (storedSession) setSession(storedSession);
  }, []);

  const login = (token) => {
    localStorage.setItem("ticketapp_session", token);
    setSession(token);
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
