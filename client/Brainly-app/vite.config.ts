import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    dedupe: ['react', 'react-dom', 'recoil'], 
  },
  server: {
    host: true, // listen on 0.0.0.0 so nginx/proxy can reach it
    allowedHosts: [
      'brainly.tajinder.xyz'
    ],
    port: 4000 // optional: fix your dev port
  }
})
