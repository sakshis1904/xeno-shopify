import api from "./api";

export default {
  getTenants: async () => (await api.get("/tenants/all")).data,
  switchTenant: async (id) => (await api.post(`/tenants/switch/${id}`)).data,
};
