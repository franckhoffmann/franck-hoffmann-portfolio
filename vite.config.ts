import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH env var at build time to match your GitHub repo name.
// e.g., VITE_BASE_PATH=/franck-hoffmann-portfolio/ npm run build
// Defaults to '/' for local dev.
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
