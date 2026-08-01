import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The custom domain serves this GitHub Pages site from its root.
export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
}))
