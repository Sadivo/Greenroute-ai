import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:8000',
      '/submit-delivery': 'http://localhost:8000',
      '/deliveries': 'http://localhost:8000',
      '/dashboard-summary': 'http://localhost:8000',
      '/delete-delivery': 'http://localhost:8000',
    },
  },
})
