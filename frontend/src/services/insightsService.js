import api from "./api";

export default {
  summary: async(token)=> (await api.get("/insights/summary",{headers:{Authorization:`Bearer ${token}`}})).data,
  trend: async(token)=> (await api.get("/insights/orders-by-date",{headers:{Authorization:`Bearer ${token}`}})).data,
  topCustomers: async(token)=> (await api.get("/insights/top-customers",{headers:{Authorization:`Bearer ${token}`}})).data
};
