// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', // URL de tu backend
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores 401 (no autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo rechaza el error sin redirigir
    return Promise.reject(error);
  }
);

export default api;
