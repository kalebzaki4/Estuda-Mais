import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
      babel: {
        plugins: ['styled-jsx/babel']
      }
    })],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/api/auth'),
      },
    },
  },
test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'], 
    include: ['src/**/*.{test,spec}.{js,jsx}'], 
  }
})