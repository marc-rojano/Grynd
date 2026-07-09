import axios, { isAxiosError } from 'axios';

const apiClient = axios.create({
    // Todas las peticiones se dirigirán a /api, que será gestionado por el proxy de Vite
    baseURL: '/api',
});

// Interceptor para añadir automáticamente el token de autenticación a todas las peticiones
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { isAxiosError };
export default apiClient;