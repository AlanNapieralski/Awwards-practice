import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: set the correct base path for GitHub Pages project site
  // Replace 'awwards-practice' if your repository name changes
  base: '/awwards-practice/',
  plugins: [
    vue(),
    tailwindcss()
  ],
})
