import api from "./api";

const UserService = {
  getAll: () => api.get("/users"),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  remove: (id) => api.delete(`/users/${id}`),
  getById: (id) => api.get(`/users/${id}`),
};

export default UserService;