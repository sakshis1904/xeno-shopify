import api from "./api";

export default {
  login: (data) => api.post("/tenants/login", data),
  register: (data) => api.post("/tenants/register", data),
};
