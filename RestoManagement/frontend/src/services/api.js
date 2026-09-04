import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const roomApi = {
  getAll: () => api.get('/rooms'),
  getAvailable: () => api.get('/rooms/available'),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

export const bookingApi = {
  create: (data) => api.post('/bookings', data),
  getMy: () => api.get('/bookings/my'),
  getAll: () => api.get('/bookings'),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export const menuApi = {
  getAll: () => api.get('/menu'),
  getAvailable: () => api.get('/menu/available'),
  getCategories: () => api.get('/menu/categories'),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

export const orderApi = {
  create: (data) => api.post('/orders', data),
  getMy: () => api.get('/orders/my'),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status?status=${status}`),
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

export const aiApi = {
  getRecommendations: () => api.get('/ai/recommendations'),
  chat: (message) => api.post('/ai/chat', { message }),
};

export default api;
