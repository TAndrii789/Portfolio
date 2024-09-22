import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Handles both .jsx and .tsx files
    createHtmlPlugin(), // For HTML handling
  ],
  base: '/',
  publicDir: 'public',
  server: {  
    watch: {
      usePolling: true,
    }
},
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure Vite resolves both JS and TS extensions
  },
  assetsInclude: ['**/*.html'], // Handles HTML assets
})
