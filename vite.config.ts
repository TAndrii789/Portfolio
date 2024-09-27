import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    // createHtmlPlugin(), 
  ],
  base: "/Portfolio/",
  build: {
    outDir: 'dist', // Check that this path is correct
  },
  // publicDir: 'public',
  // resolve: {
  //   extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure Vite resolves both JS and TS extensions
  // },
})
