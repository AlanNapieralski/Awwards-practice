import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: set the correct base path for GitHub Pages project site
  // Match the repository name case exactly
  base: '/Awwards-practice/',
  // Output build to 'docs' so GitHub Pages can serve it from main/docs
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
})
