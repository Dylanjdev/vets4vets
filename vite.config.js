import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repository from /vets4vets/.
// Keep the development server at / for a normal local workflow.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/vets4vets/' : '/',
  plugins: [react()],
}))
