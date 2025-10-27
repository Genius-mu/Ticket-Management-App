// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useContext(AuthContext);
  return session ? children : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
