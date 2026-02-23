import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
      babel: {
        plugins: ['styled-jsx/babel']
      }
    })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'], 
    include: ['src/**/*.{test,spec}.{js,jsx}'], 
  }
})
