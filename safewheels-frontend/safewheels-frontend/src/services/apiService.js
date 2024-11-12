import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3939/api',
});

export const getCars = async () => api.get('/cars');
export const getCarDetails = async (id) => api.get(`/cars/${id}`);
export const createUser = async (userData) => api.post('/users', userData);
export const loginUser = async (credentials) => api.post('/users/login', credentials);
export const getUserProfile = async (token) =>
  api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
