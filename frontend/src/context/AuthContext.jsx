import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [tenantName, setTenantName] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, tenantName, setTenantName }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
