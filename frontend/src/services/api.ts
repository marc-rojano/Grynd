import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || 'http://localhost:3000/api',
});

export default api;