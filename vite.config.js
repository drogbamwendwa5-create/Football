import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.football-data.org/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('X-Auth-Token', '52ad9e5212c62c527f5ed56e67a9e934')
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('PROXY STATUS:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  }
})