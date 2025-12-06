import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => setCheckingAuth(false), 150);
    return () => clearTimeout(timer);
  }, []);

  if (checkingAuth) return null; 

  return token ? children : <Navigate to="/login" replace />;
}
