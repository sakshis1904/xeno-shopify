import { useTenant } from "../context/TenantContext";
import tenantService from "../services/tenantService";
import { useEffect, useState } from "react";

export default function TenantSelect() {
  const { selectedTenant, setSelectedTenant } = useTenant();
  const [tenants, setTenants] = useState([]);

  const load = async () => setTenants(await tenantService.getTenants());

  useEffect(() => { load(); }, []);

  return (
    <select
      className="border p-2 rounded-md"
      onChange={(e) => setSelectedTenant(e.target.value)}
      value={selectedTenant || ""}
    >
      <option value="">Select Tenant</option>
      {tenants.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  );
}
