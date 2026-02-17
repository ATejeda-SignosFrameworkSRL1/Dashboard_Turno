import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Evita CORS en desarrollo: la URL de appsettings se reescribe a ruta relativa
      // y Vite reenvía a la API. Target por defecto 127.0.0.1; para otro puerto usa .env VITE_API_PROXY_TARGET.
      '/TurnosAPI': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1',
        changeOrigin: true,
      },
    },
  },
})
