import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy para redirigir las peticiones /api al backend
    proxy: {
      '/api': {
        target: 'http://backend:3000', // El backend dentro de Docker
        changeOrigin: true,
        secure: false,
      },
    },
  },
})