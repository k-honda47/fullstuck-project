// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTransactions = () => api.get('/transactions');
export const getTransactionsWithCategories = () => api.get('/transactions/with-categories');
export const addTransaction = (transaction) => api.post('/transactions', transaction);
export const getCategories = () => api.get('/categories');
export const addCategory = (category) => api.post('/categories', category);
export const uploadCSV = (formData) => {
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
