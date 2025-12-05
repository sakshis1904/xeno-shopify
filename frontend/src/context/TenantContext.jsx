import { createContext, useContext, useState } from "react";

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [selectedTenant, setSelectedTenant] = useState(null);

  return (
    <TenantContext.Provider value={{ selectedTenant, setSelectedTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
