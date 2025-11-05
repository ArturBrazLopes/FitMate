import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fm_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ message: errorMessage, ...error.response?.data });
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/register', data),
  login: (data) => api.post('/api/login', data)
};

// Transactions API
export const transactionsAPI = {
  getTransactions: (params) => api.get('/api/transactions', { params }),
  createTransaction: (data) => api.post('/api/transactions', data),
  updateTransaction: (id, data) => api.put(`/api/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/api/transactions/${id}`),
  getSummary: (params) => api.get('/api/transactions/summary', { params })
};

export default api;

