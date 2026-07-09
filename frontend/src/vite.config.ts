import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Necesario para que el servidor sea accesible desde Docker
        port: 5173,
        proxy: {
            // Redirige las peticiones de /api al backend
            '/api': {
                target: 'http://backend:3000', // El nombre del servicio del backend en docker-compose.yml
                changeOrigin: true,
            }
        }
    }
})