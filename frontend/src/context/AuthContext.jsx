import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tenantName, setTenantName] = useState(localStorage.getItem("tenantName") || "");

  useEffect(() => {
    if(token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if(tenantName) localStorage.setItem("tenantName", tenantName);
  }, [tenantName]);

  return (
    <AuthContext.Provider value={{ token, setToken, tenantName, setTenantName }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
